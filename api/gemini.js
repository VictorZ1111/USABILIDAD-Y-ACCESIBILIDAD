// API Serverless para proteger la clave de Gemini
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { prompt, tipo } = req.body;

    console.log('🔍 Request recibido:', { tipo, promptLength: prompt?.length });

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt requerido' });
    }

    // Obtener API key desde variables de entorno (segura)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('❌ API key no encontrada en variables de entorno');
      return res.status(500).json({ error: 'API key no configurada en el servidor' });
    }

    console.log('✅ API key encontrada');

    const modelo = 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${GEMINI_API_KEY}`;

    // Crear prompt según el tipo
    let promptFinal = '';
    if (tipo === 'diagnostico') {
      promptFinal = `Eres un asistente médico virtual. Analiza los siguientes síntomas y proporciona un diagnóstico preliminar educativo.

Síntomas del paciente: ${prompt}

Proporciona tu respuesta EXACTAMENTE con estas secciones en este orden:

### Análisis
[Explica qué condición o enfermedad podría tener el paciente basándote en los síntomas. Sé claro y directo sobre el posible diagnóstico]

### Posibles Causas
* [Lista las posibles causas de estos síntomas]
* [Una causa por línea con viñetas]

### Evaluación Preliminar
[Indica el nivel de urgencia (leve/moderado/urgente) y qué tan serio podría ser el cuadro]

### Recomendaciones
* [Lista recomendaciones para sentirse mejor]
* [Qué hacer en casa]
* [Medicamentos de venta libre si aplica]
* [Cuándo buscar ayuda médica]

Recuerda: Esto NO sustituye una consulta médica real.`;
    } else if (tipo === 'consejo') {
      promptFinal = `Eres un consejero de salud. Proporciona información confiable y consejos prácticos sobre el siguiente tema de salud:

Tema: ${prompt}

Incluye:
1. Información general y confiable
2. Consejos prácticos y aplicables
3. Prevención cuando sea relevante
4. Cuándo consultar a un profesional`;
    } else {
      promptFinal = prompt;
    }

    // Llamar a Gemini API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: promptFinal
          }]
        }]
      })
    });

    console.log('📡 Respuesta de Gemini status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Error de Gemini:', errorData);
      return res.status(response.status).json({ 
        error: 'Error al conectar con Gemini AI',
        details: errorData 
      });
    }

    const data = await response.json();
    
    // Extraer respuesta
    const respuesta = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      'No se pudo generar una respuesta';

    console.log('✅ Respuesta generada exitosamente');

    return res.status(200).json({ 
      success: true, 
      respuesta: respuesta 
    });

  } catch (error) {
    console.error('❌ Error en API serverless:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
}
