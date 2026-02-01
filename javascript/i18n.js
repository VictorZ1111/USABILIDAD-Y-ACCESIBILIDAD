// ========== SISTEMA DE INTERNACIONALIZACIÓN (i18n) ==========

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || CONFIG.languages.default;
    this.translations = {};
    this.loadTranslations();
  }

  // Cargar traducciones
  async loadTranslations() {
    try {
      const response = await fetch(`../javascript/translations/${this.currentLang}.json`);
      this.translations = await response.json();
      this.applyTranslations();
    } catch (error) {
      console.error('Error cargando traducciones:', error);
      // Cargar español por defecto si falla
      if (this.currentLang !== 'es') {
        this.currentLang = 'es';
        this.loadTranslations();
      }
    }
  }

  // Obtener traducción
  t(key) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  }

  // Cambiar idioma
  async changeLanguage(lang) {
    if (!CONFIG.languages.available.includes(lang)) {
      console.warn(`Idioma ${lang} no disponible`);
      return;
    }

    this.currentLang = lang;
    localStorage.setItem('language', lang);
    await this.loadTranslations();
    
    // Actualizar atributo HTML
    document.documentElement.setAttribute('lang', lang);
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  // Aplicar traducciones a elementos con data-i18n
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });

    // Aplicar traducciones a atributos aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      element.setAttribute('aria-label', this.t(key));
    });
  }

  // Obtener idioma actual
  getCurrentLanguage() {
    return this.currentLang;
  }

  // Obtener idiomas disponibles
  getAvailableLanguages() {
    return CONFIG.languages.available;
  }
}

// Instancia global
const i18n = new I18n();
