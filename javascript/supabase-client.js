// ========== CLIENTE DE SUPABASE ==========

class SupabaseClient {
  constructor() {
    this.supabaseUrl = CONFIG.supabase.url;
    this.supabaseKey = CONFIG.supabase.anonKey;
    this.client = null;
    this.init();
  }

  // Inicializar cliente de Supabase
  init() {
    if (!this.supabaseUrl || !this.supabaseKey || 
        this.supabaseUrl.includes('TU_SUPABASE') || 
        this.supabaseKey.includes('TU_SUPABASE')) {
      console.warn('⚠️ Supabase no configurado. Usando modo local (localStorage)');
      this.useMockMode = true;
      return;
    }

    try {
      // Importar Supabase desde CDN (agregar en HTML)
      this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
      console.log('✅ Supabase conectado correctamente');
      this.useMockMode = false;
    } catch (error) {
      console.error('❌ Error al conectar con Supabase:', error);
      this.useMockMode = true;
    }
  }

  // === AUTENTICACIÓN ===

  async registrarUsuario(email, password, username) {
    if (this.useMockMode) {
      return this.mockRegister(email, password, username);
    }

    try {
      const { data, error } = await this.client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { username: username }
        }
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error al registrar:', error);
      return { success: false, error: error.message };
    }
  }

  async iniciarSesion(email, password) {
    if (this.useMockMode) {
      return this.mockLogin(email, password);
    }

    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;
      localStorage.setItem('usuario', data.user.user_metadata?.username || email);
      return { success: true, data };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return { success: false, error: error.message };
    }
  }

  async cerrarSesion() {
    if (this.useMockMode) {
      localStorage.removeItem('usuario');
      return { success: true };
    }

    try {
      const { error } = await this.client.auth.signOut();
      if (error) throw error;
      localStorage.removeItem('usuario');
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { success: false, error: error.message };
    }
  }

  // === DIAGNÓSTICOS ===

  async guardarDiagnostico(diagnostico) {
    if (this.useMockMode) {
      return this.mockSaveDiagnostic(diagnostico);
    }

    try {
      const user = await this.getUsuarioActual();
      if (!user) throw new Error('Usuario no autenticado');

      const { data, error } = await this.client
        .from('diagnosticos')
        .insert([{
          usuario_id: user.id,
          sintomas: diagnostico.sintomas,
          resultado: diagnostico.resultado,
          severidad: diagnostico.severidad,
          fecha: new Date().toISOString()
        }]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error al guardar diagnóstico:', error);
      return { success: false, error: error.message };
    }
  }

  async obtenerDiagnosticos() {
    if (this.useMockMode) {
      return this.mockGetDiagnostics();
    }

    try {
      const user = await this.getUsuarioActual();
      if (!user) throw new Error('Usuario no autenticado');

      const { data, error } = await this.client
        .from('diagnosticos')
        .select('*')
        .eq('usuario_id', user.id)
        .order('fecha', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error al obtener diagnósticos:', error);
      return { success: false, error: error.message };
    }
  }

  async getUsuarioActual() {
    if (this.useMockMode) {
      return { id: 'mock-user', email: localStorage.getItem('usuario') };
    }

    try {
      const { data: { user } } = await this.client.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  // === MODOS MOCK (SIN BASE DE DATOS) ===

  mockRegister(email, password, username) {
    localStorage.setItem('usuario', username);
    return { success: true, data: { username } };
  }

  mockLogin(email, password) {
    // Simplemente guarda en localStorage
    localStorage.setItem('usuario', email);
    return { success: true, data: { email } };
  }

  mockSaveDiagnostic(diagnostico) {
    const diagnosticos = JSON.parse(localStorage.getItem('diagnosticos') || '[]');
    diagnosticos.push({
      ...diagnostico,
      fecha: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('diagnosticos', JSON.stringify(diagnosticos));
    return { success: true };
  }

  mockGetDiagnostics() {
    const diagnosticos = JSON.parse(localStorage.getItem('diagnosticos') || '[]');
    return { success: true, data: diagnosticos };
  }
}

// Instancia global
const supabaseDB = new SupabaseClient();
