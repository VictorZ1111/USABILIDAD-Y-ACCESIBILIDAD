// ========== CONFIGURACIÓN GENERAL DEL PROYECTO ==========

const CONFIG = {
  // === SUPABASE ===
  supabase: {
    url: 'https://usjwbrvpezbzqbyqbhdj.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzandicnZwZXpienFieXFiaGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTU5MDIsImV4cCI6MjA4MTUzMTkwMn0.M0dDymI25956VYZiGrGFZJyABuIzgU4-vmFLCyrOFq0',
  },

  // === GEMINI AI ===
  gemini: {
    apiKey: 'AIzaSyBh64QGGbw6tJyVFkUyepK34C9rM8hmkww',
    model: 'gemini-3-flash-preview', 
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/',
  },

  // === IDIOMAS DISPONIBLES ===
  languages: {
    default: 'es',
    available: ['es', 'en'],
  },

  // === CONFIGURACIÓN DE VIDEOS ===
  videos: {
    path: './videos/',
    subtitles: './videos/subtitulos/',
    formats: ['mp4', 'webm'],
  },

  // === SISTEMA DE SEVERIDAD ===
  severity: {
    low: {
      color: '#4CAF50',
      icon: '🟢',
      label: 'Leve',
      description: 'Síntomas menores. Puedes manejarlos en casa.',
    },
    moderate: {
      color: '#FF9800',
      icon: '🟡',
      label: 'Moderado',
      description: 'Requiere atención médica pronto.',
    },
    urgent: {
      color: '#F44336',
      icon: '🔴',
      label: 'Urgente',
      description: '¡Busca atención médica inmediata!',
    },
  },

  // === ACCESIBILIDAD ===
  accessibility: {
    minFontSize: 12,
    maxFontSize: 24,
    defaultFontSize: 16,
    speechRate: 1.0,
    speechLang: 'es-ES',
  },

  // === MENSAJES DEL SISTEMA ===
  messages: {
    sessionExpired: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    diagnosticSaved: 'Diagnóstico guardado exitosamente.',
    error: 'Ocurrió un error. Por favor, intenta de nuevo.',
    noInternet: 'No hay conexión a Internet. Verifica tu conexión.',
  },
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
