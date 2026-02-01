# 🏥 Sistema Web de Diagnóstico Médico Preliminar con IA

Sistema web accesible que analiza síntomas ingresados por el usuario y ofrece posibles diagnósticos preliminares y recomendaciones mediante inteligencia artificial.

---

## 📋 Descripción del Proyecto

Este es un proyecto académico de la materia **Usabilidad** enfocado en crear una plataforma web completamente accesible para personas con discapacidades visuales, auditivas, motoras y cognitivas. El sistema integra IA (Google Gemini) para proporcionar diagnósticos médicos preliminares basados en síntomas ingresados.

**⚠️ IMPORTANTE:** Este sistema es orientativo y educativo. NO reemplaza una consulta médica profesional.

---

## ✨ Características Principales

### 🤖 Inteligencia Artificial
- Integración con **Google Gemini API** para análisis inteligente de síntomas
- Sistema de fallback con diagnóstico basado en reglas si la IA no está disponible
- Clasificación de severidad: Leve, Moderado, Urgente

### 📊 Base de Datos
- Integración con **Supabase** para almacenamiento en la nube
- Historial de diagnósticos por usuario
- Autenticación segura de usuarios
- Modo offline con localStorage como fallback

### 🌍 Multiidioma (i18n)
- Español (por defecto)
- Inglés
- Sistema extensible para agregar más idiomas

### ♿ Accesibilidad (WCAG 2.1 AA)
- **Navegación completa por teclado**
- **Lector de pantalla integrado** (Text-to-Speech)
- **Modo oscuro** para reducir fatiga visual
- **Ajuste de tamaño de texto**
- **Subtítulos en videos** (español/inglés)
- **ARIA labels** para tecnologías asistivas
- **Alto contraste** y diseño responsive

### 🎥 Videos Educativos
- Tutoriales de uso del sistema
- Guías de accesibilidad
- Consejos de salud
- Subtítulos multiidioma (.vtt)

---

## 📁 Estructura del Proyecto

```
USABILIDAD/
│
├── index.html                 # Archivo de redirección a html/index.html
├── README.md                  # Documentación del proyecto
│
├── html/                      # Páginas HTML
│   ├── index.html            # Página principal
│   ├── dashboard.html        # Panel de usuario con diagnóstico
│   ├── login.html            # Inicio de sesión
│   ├── register.html         # Registro de usuarios
│   └── soporte.html          # Página de soporte
│
├── css/                       # Estilos
│   └── style.css             # Estilos principales
│
├── javascript/                # Scripts JavaScript
│   ├── config.js             # Configuración global (API keys, settings)
│   ├── supabase-client.js    # Cliente de Supabase (BD)
│   ├── gemini-service.js     # Servicio de IA (Google Gemini)
│   ├── i18n.js               # Sistema de internacionalización
│   ├── script.js             # Lógica principal de la aplicación
│   └── translations/         # Archivos de traducción
│       ├── es.json           # Traducciones en español
│       └── en.json           # Traducciones en inglés
│
├── assets/                    # Recursos multimedia
│   ├── videos/               # Videos educativos
│   │   ├── video.mp4         # Video principal
│   │   └── subtitulos/       # Subtítulos WebVTT
│   │       ├── subtitulos_es.vtt
│   │       └── subtitulos_en.vtt
│   ├── images/               # Imágenes del proyecto
│   └── icons/                # Iconos
│
└── images/                    # Imágenes adicionales
    └── icono.png             # Icono de la aplicación
```

---

## 🚀 Instalación y Configuración

### 1️⃣ Clonar o Descargar el Proyecto

```bash
# Si usas Git
git clone [tu-repositorio]
cd USABILIDAD
```

### 2️⃣ Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. En el panel de Supabase, ve a **Settings** → **API**
4. Copia tu **URL** y **anon key**
5. Abre `config.js` y reemplaza:
   ```javascript
   supabase: {
     url: 'https://tu-proyecto.supabase.co',
     anonKey: 'tu-clave-anon-aqui',
   }
   ```

#### Crear las tablas en Supabase:

En el **SQL Editor** de Supabase, ejecuta:

```sql
-- Tabla de diagnósticos
CREATE TABLE diagnosticos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id),
  sintomas TEXT NOT NULL,
  resultado TEXT NOT NULL,
  severidad TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;

-- Política: usuarios solo ven sus propios diagnósticos
CREATE POLICY "Usuarios ven solo sus diagnósticos"
ON diagnosticos FOR SELECT
USING (auth.uid() = usuario_id);

-- Política: usuarios pueden insertar sus diagnósticos
CREATE POLICY "Usuarios pueden crear diagnósticos"
ON diagnosticos FOR INSERT
WITH CHECK (auth.uid() = usuario_id);
```

### 3️⃣ Configurar Google Gemini API

1. Ve a [Google AI Studio](https://ai.google.dev/)
2. Inicia sesión con tu cuenta de Google
3. Crea una **API Key** (es gratuita)
4. Abre `javascript/config.js` y reemplaza:
   ```javascript
   gemini: {
     apiKey: 'tu-api-key-de-gemini-aqui',
     model: 'gemini-pro',
   }
   ```

### 4️⃣ Verificar Referencias en HTML

Todos los archivos HTML ya están configurados con las rutas correctas:

```html
<!-- CSS -->
<link rel="stylesheet" href="../css/style.css">

<!-- Supabase Client CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- JavaScript del proyecto -->
<script src="../javascript/config.js"></script>
<script src="../javascript/supabase-client.js"></script>
<script src="../javascript/gemini-service.js"></script>
<script src="../javascript/i18n.js"></script>
<script src="../javascript/script.js"></script>
```
<script src="i18n.js"></script>
```

### 5️⃣ Ejecutar el Proyecto

Opción A - Usar **Live Server** (VS Code):
1. Instala la extensión "Live Server"
2. Click derecho en `index.html` → **Open with Live Server**

Opción B - Usar Python:
```bash
python -m http.server 8000
# Visita: http://localhost:8000
```

Opción C - Usar Node.js:
```bash
npx http-server
```

---

## 🎮 Uso del Sistema

### Navegación por Teclado (Atajos)

| Tecla | Acción |
|-------|--------|
| `M` | Abrir/cerrar menú de accesibilidad |
| `D` | Activar modo oscuro |
| `+` / `=` | Aumentar tamaño de texto |
| `-` | Disminuir tamaño de texto |
| `L` | Activar lectura de texto (TTS) |
| `S` | Detener lectura |
| `F` | Foco en barra de búsqueda |
| `H` | Ir al inicio de la página |
| `?` | Mostrar ayuda de atajos |
| `Tab` | Navegar entre elementos |

### Flujo de Usuario

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Ingresar síntomas**: Describe tus síntomas en el formulario
3. **Análisis con IA**: El sistema analiza y clasifica severidad
4. **Ver diagnóstico**: Recibe recomendaciones y orientación
5. **Historial**: Consulta diagnósticos anteriores

---

## 🎥 Videos Recomendados para el Proyecto

### Videos que DEBES incluir:

1. **Tutorial de navegación** (2-3 min)
   - Cómo usar el menú de accesibilidad
   - Navegación por teclado
   - Uso de lectores de pantalla

2. **Cómo ingresar síntomas** (1-2 min)
   - Ejemplos de descripciones correctas
   - Qué información incluir

3. **Interpretación de resultados** (2 min)
   - Niveles de severidad
   - Cuándo buscar ayuda médica

4. **Prevención y salud** (3-4 min)
   - Hábitos saludables
   - Señales de alerta

### Características obligatorias de los videos:
- ✅ Subtítulos en español/inglés (.vtt)
- ✅ Controles accesibles
- ✅ Transcripciones de texto
- ✅ Descripción auditiva opcional

### Dónde conseguir/crear videos:
- **OBS Studio** (grabar pantalla)
- **DaVinci Resolve** (edición gratuita)
- **YouTube** (con licencia Creative Commons)
- **Pexels/Pixabay** (videos gratuitos)

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend/BD** | Supabase (PostgreSQL + Auth) |
| **IA** | Google Gemini API |
| **Accesibilidad** | ARIA, WCAG 2.1, Web Speech API |
| **i18n** | Sistema personalizado JSON |
| **Videos** | HTML5 Video + WebVTT |

---

## 📊 Configuración de Severidad

El sistema clasifica automáticamente los diagnósticos en 3 niveles:

| Nivel | Color | Descripción |
|-------|-------|-------------|
| 🟢 **Leve** | Verde | Síntomas menores manejables en casa |
| 🟡 **Moderado** | Naranja | Requiere atención médica pronto |
| 🔴 **Urgente** | Rojo | Atención médica inmediata necesaria |

---

## ♿ Características de Accesibilidad

### Para personas con discapacidad visual:
- ✅ Lector de pantalla integrado
- ✅ Navegación completa por teclado
- ✅ ARIA labels en todos los elementos
- ✅ Alto contraste (modo oscuro)
- ✅ Texto alternativo en imágenes

### Para personas con discapacidad auditiva:
- ✅ Subtítulos en todos los videos
- ✅ Transcripciones de texto
- ✅ Alertas visuales (no solo sonoras)

### Para personas con discapacidad motriz:
- ✅ Áreas de clic grandes (min 44x44px)
- ✅ Sin límite de tiempo en formularios
- ✅ Navegación solo con teclado

### Para personas con discapacidad cognitiva:
- ✅ Lenguaje simple y claro
- ✅ Instrucciones paso a paso
- ✅ Confirmaciones para acciones importantes

---

## 🔐 Seguridad y Privacidad

- Autenticación segura con Supabase Auth
- Datos encriptados en tránsito (HTTPS)
- Row Level Security (RLS) en base de datos
- No se comparten datos con terceros
- Cumple con principios de GDPR

---

## 📝 Próximas Mejoras (Roadmap)

- [ ] Chat en tiempo real con IA
- [ ] Exportar diagnósticos a PDF
- [ ] Notificaciones push
- [ ] Integración con wearables
- [ ] Análisis de tendencias de salud
- [ ] Soporte para más idiomas
- [ ] App móvil (PWA)

---

## 👥 Contribuir

Este es un proyecto académico, pero si deseas contribuir:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de carácter académico para la materia de **Usabilidad**.

---

## 📞 Soporte y Contacto

- **Soporte técnico**: Usa la página de [soporte.html](soporte.html)
- **Reportar problemas**: Abre un issue en el repositorio
- **Preguntas**: Consulta la sección de FAQ en el sistema

---

## ⚠️ Descargo de Responsabilidad

Este sistema es **SOLO PARA FINES EDUCATIVOS Y DE ORIENTACIÓN**.

- ❌ NO es un diagnóstico médico oficial
- ❌ NO reemplaza la consulta con un profesional de la salud
- ❌ NO debe usarse para tomar decisiones médicas sin supervisión
- ✅ Siempre consulta a un médico certificado para diagnósticos reales

---

## 🎓 Créditos

- Proyecto desarrollado para la materia de **Usabilidad**
- Inteligencia artificial: **Google Gemini**
- Base de datos: **Supabase**
- Año: 2025

---

**¡Gracias por usar nuestro sistema! 🚀**

Para más información, visita la sección de ayuda dentro del sistema.
