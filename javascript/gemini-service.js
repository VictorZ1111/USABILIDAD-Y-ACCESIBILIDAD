// ========== SERVICIO DE IA CON GEMINI ==========

class GeminiService {
  constructor() {
    // Detectar si estamos en local o producción
    this.isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
    
    if (this.isLocal) {
      // En local, usar API directamente (solo para pruebas)
      this.apiKey = 'AIzaSyAdU7BvVd8LiHs7Hv4TL8j8fT8anNCUwP0';
      this.model = 'gemini-1.5-flash-latest';
      this.endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/';
    } else {
      // En producción, usar API serverless (protegida)
      this.apiEndpoint = '/api/gemini';
    }
  }

  // === ANÁLISIS DE SÍNTOMAS CON IA ===
  async analizarSintomas(sintomas) {
    console.log('🔍 Iniciando análisis de síntomas...');
    console.log('📝 Síntomas recibidos:', sintomas);
    
    if (this.isLocal) {
      // Modo local - usar API directamente
      return await this.analizarSintomasDirecto(sintomas);
    } else {
      // Modo producción - usar API serverless
      return await this.analizarSintomasSeguro(sintomas);
    }
  }
  
  // Análisis directo (solo local)
  async analizarSintomasDirecto(sintomas) {
    try {
      const url = `${this.endpoint}${this.model}:generateContent?key=${this.apiKey}`;
      
      const prompt = `Eres un asistente médico virtual. Analiza los siguientes síntomas y proporciona un diagnóstico preliminar educativo.

Síntomas del paciente: ${sintomas}

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

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de Gemini');
      }

      const data = await response.json();
      const respuesta = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        'No se pudo generar una respuesta';
      
      console.log('✅ Diagnóstico generado (local)');
      return respuesta;
      
    } catch (error) {
      console.error('❌ Error:', error);
      return 'Error: No se pudo obtener el diagnóstico. Verifica tu conexión.';
    }
  }
  
  // Análisis seguro (producción con serverless)
  async analizarSintomasSeguro(sintomas) {
    try {
      alert('🔍 Modo PRODUCCIÓN - Llamando a API serverless en: ' + this.apiEndpoint);
      
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: sintomas,
          tipo: 'diagnostico'
        })
      });

      alert('📡 Respuesta recibida. Status: ' + response.status);

      if (!response.ok) {
        const errorText = await response.text();
        alert('❌ Error del servidor: ' + errorText);
        throw new Error('Error en la respuesta del servidor: ' + response.status);
      }

      const data = await response.json();
      
      alert('📦 Datos recibidos. Success: ' + data.success);
      
      if (!data.success) {
        alert('❌ API respondió con error: ' + (data.error || 'Error desconocido'));
        throw new Error(data.error || 'Error desconocido');
      }
      
      alert('✅ Respuesta de IA recibida correctamente!');
      
      return data.respuesta;
      
    } catch (error) {
      alert('💥 ERROR CATCH: ' + error.message);
      console.error('❌ Error con API:', error);
      console.error('📋 Detalles del error:', error.message);
      return 'Error: No se pudo obtener el diagnóstico. Por favor, verifica tu conexión e intenta nuevamente.';
    }
  }

  // === CREAR PROMPT MÉDICO OPTIMIZADO ===
  crearPromptMedico(sintomas) {
    return `Eres un asistente médico virtual experto. Un paciente describe los siguientes síntomas: "${sintomas}".

Realiza un análisis completo y detallado:

1. **Concepto**: Explica qué significan estos síntomas en términos médicos básicos
2. **Posibles Causas**: Lista 3-4 causas probables de estos síntomas
3. **Evaluación Preliminar**: Indica qué condición específica podría padecer (gripe, gastroenteritis, estrés, etc.)
4. **Recomendaciones**: Da 4-5 consejos prácticos para sentirse mejor
5. **Señales de Alerta**: Lista síntomas adicionales que indicarían la necesidad de atención médica inmediata
6. **Urgencia**: Clasifica como Leve, Moderado o Urgente

IMPORTANTE:
- Usa lenguaje claro y empático
- Sé específico y práctico
- Esto es orientativo, NO un diagnóstico oficial
- Menciona cuándo consultar a un profesional

Responde en formato JSON:
{
  "concepto": "Explicación clara de qué significan estos síntomas",
  "causas": ["Causa 1", "Causa 2", "Causa 3", "Causa 4"],
  "evaluacion": "Condición específica que podría padecer (ejemplo: Gripe común, Gastritis, etc.)",
  "recomendaciones": ["Recomendación 1", "Recomendación 2", "Recomendación 3", "Recomendación 4"],
  "senalesAlerta": ["Señal 1", "Señal 2", "Señal 3"],
  "urgencia": "Leve/Moderado/Urgente",
  "consultarSi": "Cuándo buscar ayuda profesional"
}`;
  }

  // === LLAMAR A GEMINI API ===
  async llamarGeminiAPI(prompt) {
    const url = `${this.endpoint}${this.model}:generateContent?key=${this.apiKey}`;
    
    console.log('🌐 URL de Gemini:', url.replace(this.apiKey, 'API_KEY_OCULTA'));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    console.log('📡 Status de respuesta:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de API:', errorText);
      throw new Error(`Error API: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    let textoRespuesta = data.candidates[0].content.parts[0].text;
    
    // Limpiar marcadores de código, espacios y LLAVES/CORCHETES extras
    textoRespuesta = textoRespuesta
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    
    // PARSEAR EL JSON SIEMPRE
    try {
      const jsonData = JSON.parse(textoRespuesta);
      
      // Limpiar SOLO llaves y corchetes del texto de cada campo
      const limpiarTexto = (texto) => {
        if (typeof texto !== 'string') return texto;
        return texto.replace(/[{}[\]]/g, '').replace(/\\/g, '').trim();
      };
      
      return {
        concepto: limpiarTexto(jsonData.concepto) || 'Análisis de síntomas',
        causas: Array.isArray(jsonData.causas) ? jsonData.causas.map(limpiarTexto) : [],
        evaluacion: limpiarTexto(jsonData.evaluacion) || 'Evaluación preliminar',
        recomendaciones: Array.isArray(jsonData.recomendaciones) ? jsonData.recomendaciones.map(limpiarTexto) : ['Consulta con un médico'],
        senalesAlerta: Array.isArray(jsonData.senalesAlerta) ? jsonData.senalesAlerta.map(limpiarTexto) : [],
        urgencia: limpiarTexto(jsonData.urgencia) || 'Moderado',
        consultarSi: limpiarTexto(jsonData.consultarSi) || 'Si los síntomas persisten o empeoran'
      };
    } catch (e) {
      console.error('❌ Error parseando JSON:', e);
      console.log('📄 Texto recibido:', textoRespuesta.substring(0, 200));
      
      // FALLBACK: limpiar todo el texto de llaves y corchetes
      const textoLimpio = textoRespuesta.replace(/[{}[\]"]/g, '').replace(/\\/g, '');
      
      return {
        concepto: textoLimpio,
        causas: [],
        evaluacion: 'Requiere evaluación',
        recomendaciones: ['Consulta con un médico para confirmación'],
        senalesAlerta: [],
        urgencia: 'Moderado',
        consultarSi: 'Si los síntomas persisten'
      };
    }
  }

  // === DIAGNÓSTICO BÁSICO (FALLBACK SIN IA) ===
  diagnosticoBasico(sintomas) {
    const sintomasLower = sintomas.toLowerCase();
    let diagnostico = 'No se pudo determinar un diagnóstico específico.';
    let recomendaciones = ['Consulta con un médico profesional.'];
    let severidad = 'moderate';

    // Reglas básicas mejoradas
    if (sintomasLower.includes('fiebre') && sintomasLower.includes('tos')) {
      diagnostico = 'Posible infección respiratoria (gripe, resfriado común o bronquitis leve).';
      recomendaciones = [
        'Mantén reposo en casa',
        'Bebe abundantes líquidos',
        'Monitorea tu temperatura',
        'Si la fiebre supera 38.5°C por más de 3 días, consulta un médico'
      ];
      severidad = 'moderate';
    } 
    else if (sintomasLower.includes('dolor') && sintomasLower.includes('cabeza')) {
      diagnostico = 'Posible cefalea tensional o migraña.';
      recomendaciones = [
        'Descansa en un lugar tranquilo y oscuro',
        'Evita pantallas y ruidos fuertes',
        'Mantente hidratado',
        'Si el dolor es muy intenso o recurrente, consulta un neurólogo'
      ];
      severidad = 'low';
    }
    else if (sintomasLower.includes('dolor') && sintomasLower.includes('pecho')) {
      diagnostico = 'Dolor torácico - REQUIERE EVALUACIÓN URGENTE.';
      recomendaciones = [
        '🚨 BUSCA ATENCIÓN MÉDICA INMEDIATA',
        'No conduzcas, pide ayuda o llama una ambulancia',
        'Siéntate y mantén la calma'
      ];
      severidad = 'urgent';
    }
    else if (sintomasLower.includes('dificultad') && (sintomasLower.includes('respirar') || sintomasLower.includes('respiración'))) {
      diagnostico = 'Dificultad respiratoria - REQUIERE ATENCIÓN URGENTE.';
      recomendaciones = [
        '🚨 BUSCA ATENCIÓN MÉDICA INMEDIATA',
        'Siéntate en posición erguida',
        'Mantén la calma e intenta respirar lentamente'
      ];
      severidad = 'urgent';
    }
    else if (sintomasLower.includes('náusea') || sintomasLower.includes('mareo')) {
      diagnostico = 'Posible malestar gastrointestinal, deshidratación o vértigo leve.';
      recomendaciones = [
        'Bebe agua en pequeños sorbos',
        'Descansa y evita movimientos bruscos',
        'Come alimentos ligeros (galletas, tostadas)',
        'Si persiste por más de 24 horas, consulta un médico'
      ];
      severidad = 'low';
    }
    else if (sintomasLower.includes('dolor') && sintomasLower.includes('estómago')) {
      diagnostico = 'Posible indigestión, gastritis o malestar estomacal.';
      recomendaciones = [
        'Evita alimentos grasosos y picantes',
        'Come porciones pequeñas',
        'Bebe té de manzanilla',
        'Si hay sangre en vómito o heces, busca atención inmediata'
      ];
      severidad = 'low';
    }
    else if (sintomasLower.includes('fatiga') || sintomasLower.includes('cansancio')) {
      diagnostico = 'Posible agotamiento físico, estrés o deficiencia nutricional.';
      recomendaciones = [
        'Duerme al menos 7-8 horas diarias',
        'Mantén una dieta balanceada',
        'Practica ejercicio moderado',
        'Si persiste, podría ser anemia u otra condición'
      ];
      severidad = 'low';
    }

    return {
      concepto: 'Análisis basado en reglas predefinidas',
      causas: ['Síntomas generales que requieren evaluación'],
      evaluacion: diagnostico,
      recomendaciones,
      senalesAlerta: ['Síntomas que empeoran', 'Fiebre alta persistente', 'Dolor intenso'],
      consultarSi: 'Si los síntomas persisten por más de 48 horas o empeoran',
      severidad,
      esIA: false
    };
  }

  // === DETERMINAR SEVERIDAD ===
  determinarSeveridad(diagnostico) {
    const texto = diagnostico.toLowerCase();
    
    // Urgente
    if (texto.includes('urgente') || texto.includes('inmediata') || 
        texto.includes('emergencia') || texto.includes('grave')) {
      return 'urgent';
    }
    
    // Leve
    if (texto.includes('leve') || texto.includes('menor') || 
        texto.includes('simple') || texto.includes('común')) {
      return 'low';
    }
    
    // Por defecto: Moderado
    return 'moderate';
  }

  // === OBTENER INFO DE SEVERIDAD ===
  getSeveridadInfo(nivel) {
    const niveles = {
      'low': CONFIG.severity.low,
      'moderate': CONFIG.severity.moderate,
      'urgent': CONFIG.severity.urgent
    };
    return niveles[nivel] || niveles.moderate;
  }

  // === GENERAR CONSEJO DE SALUD ===

  async generarConsejo(tema) {
    if (this.isLocal) {
      // Modo local - usar API directamente
      return await this.generarConsejoDirecto(tema);
    } else {
      // Modo producción - usar API serverless
      return await this.generarConsejoSeguro(tema);
    }
  }
  
  // Consejo directo (solo local)
  async generarConsejoDirecto(tema) {
    try {
      const url = `${this.endpoint}${this.model}:generateContent?key=${this.apiKey}`;
      
      const prompt = `Eres un consejero de salud. Proporciona información confiable y consejos prácticos sobre el siguiente tema de salud:

Tema: ${tema}

Incluye:
1. Información general y confiable
2. Consejos prácticos y aplicables
3. Prevención cuando sea relevante
4. Cuándo consultar a un profesional`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de Gemini');
      }

      const data = await response.json();
      const respuesta = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        'No se pudo generar un consejo';
      
      console.log('✅ Consejo generado (local)');
      return respuesta;
      
    } catch (error) {
      console.error('❌ Error:', error);
      return 'Error: No se pudo generar el consejo. Verifica tu conexión.';
    }
  }
  
  // Consejo seguro (producción con serverless)
  async generarConsejoSeguro(tema) {
    try {
      alert('💡 Generando consejo en PRODUCCIÓN para: ' + tema);
      
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: tema,
          tipo: 'consejo'
        })
      });

      alert('📡 Respuesta consejo status: ' + response.status);

      if (!response.ok) {
        const errorText = await response.text();
        alert('❌ Error consejo: ' + errorText);
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      
      if (!data.success) {
        alert('❌ Consejo sin success: ' + (data.error || 'Error desconocido'));
        throw new Error(data.error || 'Error desconocido');
      }
      
      alert('✅ Consejo generado exitosamente!');
      
      return data.respuesta;
      
    } catch (error) {
      alert('💥 ERROR generando consejo: ' + error.message);
      console.error('❌ Error generando consejo:', error);
      return 'Error: No se pudo generar el consejo. Por favor, verifica tu conexión e intenta nuevamente.';
    }
  }

  // === LLAMAR A GEMINI PARA CONSEJOS ===
  async llamarGeminiConsejoAPI(prompt) {
    const url = `${this.endpoint}${this.model}:generateContent?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error API: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let textoRespuesta = data.candidates[0].content.parts[0].text;
    
    textoRespuesta = textoRespuesta
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    
    try {
      const jsonData = JSON.parse(textoRespuesta);
      return {
        titulo: jsonData.titulo || 'Información de Salud',
        explicacion: jsonData.explicacion || textoRespuesta,
        consejos: Array.isArray(jsonData.consejos) ? jsonData.consejos : [],
        senalesAlerta: Array.isArray(jsonData.senalesAlerta) ? jsonData.senalesAlerta : [],
        prevencion: Array.isArray(jsonData.prevencion) ? jsonData.prevencion : [],
        esIA: true
      };
    } catch (e) {
      return {
        titulo: 'Información de Salud',
        explicacion: textoRespuesta,
        consejos: [],
        senalesAlerta: [],
        prevencion: [],
        esIA: true
      };
    }
  }

  // === CONSEJO PREDETERMINADO (FALLBACK) ===
  consejoPredeterminado(tema) {
    const temaLower = tema.toLowerCase();
    const consejosPredefinidos = {
      'diabetes': {
        titulo: 'Diabetes - Información General',
        explicacion: 'La diabetes es una condición en la que el cuerpo no puede regular adecuadamente los niveles de azúcar en la sangre. Es importante controlarla mediante dieta, ejercicio y medicación cuando sea necesario.',
        consejos: [
          'Controla tu nivel de glucosa regularmente',
          'Mantén una dieta baja en azúcares refinados',
          'Realiza ejercicio físico moderado 30 min al día',
          'Toma tus medicamentos según prescripción médica'
        ],
        senalesAlerta: ['Visión borrosa', 'Sed excesiva', 'Heridas que no cicatrizan'],
        prevencion: ['Mantén peso saludable', 'Dieta balanceada', 'Actividad física regular']
      },
      'hipertension': {
        titulo: 'Hipertensión Arterial',
        explicacion: 'La presión arterial alta es una condición común que puede aumentar el riesgo de enfermedades cardíacas y accidentes cerebrovasculares.',
        consejos: [
          'Reduce el consumo de sal',
          'Mantén un peso saludable',
          'Evita el estrés',
          'Limita el alcohol'
        ],
        senalesAlerta: ['Dolores de cabeza frecuentes', 'Mareos', 'Sangrado nasal'],
        prevencion: ['Dieta baja en sodio', 'Ejercicio regular', 'Evita el tabaco']
      }
    };

    // Buscar tema relacionado
    for (const [key, value] of Object.entries(consejosPredefinidos)) {
      if (temaLower.includes(key)) {
        return { ...value, esIA: false };
      }
    }

    // Consejo genérico
    return {
      titulo: 'Información General de Salud',
      explicacion: `La búsqueda sobre "${tema}" no arrojó resultados específicos. Te recomendamos consultar con un profesional de la salud para información precisa y personalizada.`,
      consejos: [
        'Mantén una dieta balanceada',
        'Realiza actividad física regular',
        'Duerme 7-8 horas diarias',
        'Consulta a tu médico periódicamente'
      ],
      senalesAlerta: ['Síntomas persistentes', 'Dolor intenso', 'Cambios repentinos en tu salud'],
      prevencion: ['Chequeos médicos regulares', 'Estilo de vida saludable'],
      esIA: false
    };
  }

  // === GENERAR CONSEJO PERSONALIZADO BASADO EN HISTORIAL ===
  async generarConsejoPersonalizado(diagnosticos) {
    if (!diagnosticos || diagnosticos.length === 0) {
      return this.consejoDiario();
    }

    if (!this.isConfigured) {
      return this.consejoDiario();
    }

    try {
      const ultimosDiagnosticos = diagnosticos.slice(0, 3).map(d => d.sintomas).join(', ');
      const prompt = `Basándote en el historial de síntomas de un usuario: "${ultimosDiagnosticos}", genera un consejo de salud personalizado y preventivo.

El consejo debe:
- Ser específico a los síntomas mencionados
- Incluir recomendaciones preventivas
- Ser motivador y positivo
- Máximo 2-3 párrafos

Responde SOLO con el texto del consejo, sin formato JSON.`;

      const url = `${this.endpoint}${this.model}:generateContent?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 512 }
        })
      });

      if (!response.ok) throw new Error('Error en API');

      const data = await response.json();
      const consejo = data.candidates[0].content.parts[0].text.trim();
      return consejo;
    } catch (error) {
      console.error('❌ Error generando consejo personalizado:', error);
      return this.consejoDiario();
    }
  }

  // === CONSEJO DIARIO ALEATORIO ===
  consejoDiario() {
    const consejos = [
      '💧 Mantén una buena hidratación: bebe al menos 2 litros de agua diarios para mantener tu cuerpo funcionando correctamente.',
      '😴 El descanso es fundamental: dormir 7-8 horas ayuda a tu sistema inmunológico y mejora tu concentración.',
      '🥗 Come variado: incluye frutas y verduras de diferentes colores para obtener todos los nutrientes necesarios.',
      '🚶 Muévete más: 30 minutos de caminata diaria pueden reducir significativamente el riesgo de enfermedades.',
      '🧘 Gestiona el estrés: practica técnicas de relajación como respiración profunda o meditación.',
      '🌞 Toma sol: 15 minutos de exposición solar ayudan a sintetizar vitamina D, esencial para tus huesos.',
      '🧼 Lávate las manos: la higiene frecuente previene muchas infecciones comunes.',
      '📱 Desconecta: reduce el tiempo frente a pantallas antes de dormir para mejorar la calidad del sueño.'
    ];
    return consejos[Math.floor(Math.random() * consejos.length)];
  }
}

// Instancia global
const geminiAI = new GeminiService();
