// ========== MENÚ FLOTANTE ==========
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', () => {
    const isActive = sidebar.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive);
  });
}

// ========== FUNCIÓN PARA MENÚS DESPLEGABLES ==========
function toggleSubmenu(submenuId) {
  const submenu = document.getElementById(submenuId);
  const button = event.target.closest('.menu-toggle');
  
  if (submenu && button) {
    const isHidden = submenu.hasAttribute('hidden');
    
    // Cerrar todos los otros submenús
    document.querySelectorAll('.submenu').forEach(s => {
      if (s.id !== submenuId) {
        s.setAttribute('hidden', '');
        const btn = s.previousElementSibling;
        if (btn && btn.classList.contains('menu-toggle')) {
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    });
    
    // Toggle el submenú actual
    if (isHidden) {
      submenu.removeAttribute('hidden');
      button.setAttribute('aria-expanded', 'true');
    } else {
      submenu.setAttribute('hidden', '');
      button.setAttribute('aria-expanded', 'false');
    }
  }
}

// ========== ACCESIBILIDAD ==========
// Función mejorada para cambiar tema
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Mantener compatibilidad con función antigua
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

let fontSize = 16;
function increaseText() {
  fontSize = Math.min(24, fontSize + 2);
  document.body.style.fontSize = fontSize + "px";
  localStorage.setItem('fontSize', fontSize);
}

function decreaseText() {
  fontSize = Math.max(12, fontSize - 2);
  document.body.style.fontSize = fontSize + "px";
  localStorage.setItem('fontSize', fontSize);
}

function resetText() {
  fontSize = 16;
  document.body.style.fontSize = fontSize + "px";
  localStorage.setItem('fontSize', fontSize);
}

// Cargar tamaño de texto guardado
document.addEventListener('DOMContentLoaded', () => {
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    document.body.style.fontSize = fontSize + "px";
  }
});

let synth = window.speechSynthesis;
function textToSpeech() {
  let text = document.body.innerText;
  let utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  synth.speak(utter);
}
function stopSpeech() { synth.cancel(); }

// ========== FUNCIÓN PARA MOSTRAR AYUDA ==========
function mostrarAyuda(event) {
  event.preventDefault();
  const ayudaHTML = `
    <div id="modal-ayuda" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;" onclick="cerrarAyuda()">
      <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; max-height: 80vh; overflow-y: auto;" onclick="event.stopPropagation()">
        <h2 style="color: #2ecc71; margin-bottom: 20px;">⌨️ Atajos de Teclado</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f0f0f0;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #2ecc71;">Tecla</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #2ecc71;">Acción</th>
          </tr>
          <tr><td style="padding: 8px;"><strong>M</strong></td><td style="padding: 8px;">Abrir/cerrar menú de accesibilidad</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px;"><strong>D</strong></td><td style="padding: 8px;">Activar modo oscuro</td></tr>
          <tr><td style="padding: 8px;"><strong>+ / =</strong></td><td style="padding: 8px;">Aumentar tamaño de texto</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px;"><strong>-</strong></td><td style="padding: 8px;">Disminuir tamaño de texto</td></tr>
          <tr><td style="padding: 8px;"><strong>L</strong></td><td style="padding: 8px;">Activar lectura de texto</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px;"><strong>S</strong></td><td style="padding: 8px;">Detener lectura</td></tr>
          <tr><td style="padding: 8px;"><strong>F</strong></td><td style="padding: 8px;">Foco en búsqueda</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px;"><strong>H</strong></td><td style="padding: 8px;">Ir al inicio de la página</td></tr>
          <tr><td style="padding: 8px;"><strong>?</strong></td><td style="padding: 8px;">Mostrar esta ayuda</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px;"><strong>Tab</strong></td><td style="padding: 8px;">Navegar entre elementos</td></tr>
        </table>
        <button onclick="cerrarAyuda()" style="margin-top: 20px; background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold;">Cerrar</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', ayudaHTML);
}

function cerrarAyuda() {
  const modal = document.getElementById('modal-ayuda');
  if (modal) modal.remove();
}

// ========== FUNCIÓN PARA MOSTRAR POLÍTICA DE PRIVACIDAD ==========
function mostrarPoliticas(event) {
  event.preventDefault();
  const politicasHTML = `
    <div id="modal-politicas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;" onclick="cerrarPoliticas()">
      <div style="background: white; padding: 30px; border-radius: 15px; max-width: 700px; max-height: 80vh; overflow-y: auto;" onclick="event.stopPropagation()">
        <h2 style="color: #3498db; margin-bottom: 20px;">🔒 Política de Privacidad</h2>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">1. Recopilación de Datos</h3>
        <p style="line-height: 1.6; color: #555;">
          Este sistema recopila únicamente los datos necesarios para proporcionar el servicio de diagnóstico preliminar:
          información de usuario (nombre, correo), síntomas ingresados y resultados de diagnósticos.
        </p>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">2. Uso de la Información</h3>
        <p style="line-height: 1.6; color: #555;">
          Los datos se utilizan exclusivamente para:
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Proporcionar análisis de síntomas mediante IA</li>
            <li>Mantener historial de diagnósticos del usuario</li>
            <li>Mejorar la precisión del sistema</li>
          </ul>
        </p>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">3. Seguridad</h3>
        <p style="line-height: 1.6; color: #555;">
          Utilizamos Supabase con Row Level Security (RLS) para garantizar que cada usuario solo acceda a sus propios datos.
          Todas las conexiones son cifradas mediante HTTPS.
        </p>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">4. No Compartimos Datos</h3>
        <p style="line-height: 1.6; color: #555;">
          Tus datos personales y médicos <strong>nunca</strong> se comparten con terceros. Este es un proyecto académico 
          y toda la información permanece privada y segura.
        </p>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">5. Tus Derechos</h3>
        <p style="line-height: 1.6; color: #555;">
          Tienes derecho a acceder, modificar o eliminar tus datos en cualquier momento desde tu panel de usuario.
        </p>
        
        <p style="margin-top: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
          ⚠️ <strong>Aviso importante:</strong> Este sistema es educativo y NO reemplaza una consulta médica profesional.
        </p>
        
        <button onclick="cerrarPoliticas()" style="margin-top: 20px; background: #3498db; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%;">Cerrar</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', politicasHTML);
}

function cerrarPoliticas() {
  const modal = document.getElementById('modal-politicas');
  if (modal) modal.remove();
}

// ========== FUNCIÓN PARA MOSTRAR ACERCA DEL PROYECTO ==========
function mostrarAcercaDe(event) {
  event.preventDefault();
  const acercaHTML = `
    <div id="modal-acerca" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;" onclick="cerrarAcerca()">
      <div style="background: white; padding: 30px; border-radius: 15px; max-width: 700px; max-height: 80vh; overflow-y: auto;" onclick="event.stopPropagation()">
        <h2 style="color: #2ecc71; margin-bottom: 20px;">ℹ️ Acerca del Proyecto</h2>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">🎓 Proyecto Académico</h3>
        <p style="line-height: 1.6; color: #555;">
          Este es un <strong>proyecto de la materia Usabilidad</strong> enfocado en crear una plataforma web completamente 
          accesible para personas con discapacidades visuales, auditivas, motoras y cognitivas.
        </p>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">🤖 Tecnologías Utilizadas</h3>
        <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.8; color: #555;">
          <li><strong>Google Gemini API:</strong> Inteligencia artificial para análisis de síntomas</li>
          <li><strong>Supabase:</strong> Base de datos PostgreSQL en la nube</li>
          <li><strong>HTML5, CSS3, JavaScript:</strong> Frontend moderno y responsive</li>
          <li><strong>WebVTT:</strong> Subtítulos accesibles en videos</li>
          <li><strong>ARIA:</strong> Etiquetas para tecnologías asistivas</li>
        </ul>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">♿ Características de Accesibilidad</h3>
        <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.8; color: #555;">
          <li>Navegación completa por teclado</li>
          <li>Lector de pantalla integrado (Text-to-Speech)</li>
          <li>Modo oscuro para reducir fatiga visual</li>
          <li>Ajuste dinámico de tamaño de texto</li>
          <li>Subtítulos multiidioma en videos</li>
          <li>Alto contraste y diseño responsive</li>
          <li>Cumplimiento WCAG 2.1 AA</li>
        </ul>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">🌍 Multiidioma</h3>
        <p style="line-height: 1.6; color: #555;">
          Sistema de internacionalización (i18n) con soporte para <strong>Español</strong> e <strong>Inglés</strong>, 
          fácilmente extensible a más idiomas.
        </p>
        
        <h3 style="color: #2c3e50; margin-top: 15px;">🎯 Objetivo</h3>
        <p style="line-height: 1.6; color: #555;">
          Demostrar que la tecnología puede ser inclusiva y accesible para todos, proporcionando herramientas de salud 
          preliminares que respeten los principios de diseño universal.
        </p>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f8f5; border-left: 4px solid #2ecc71; border-radius: 5px;">
          <strong>Versión:</strong> 1.0.0<br>
          <strong>Última actualización:</strong> Diciembre 2025<br>
          <strong>Licencia:</strong> Proyecto Académico
        </div>
        
        <button onclick="cerrarAcerca()" style="margin-top: 20px; background: #2ecc71; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%;">Cerrar</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', acercaHTML);
}

function cerrarAcerca() {
  const modal = document.getElementById('modal-acerca');
  if (modal) modal.remove();
}

// ========== NAVEGACIÓN Y MENÚ DESPLEGABLE ==========
function toggleNavDropdown() {
  const dropdown = document.getElementById('ayuda-dropdown');
  const button = document.getElementById('nav-ayuda');
  
  if (dropdown && button) {
    const isHidden = dropdown.hasAttribute('hidden');
    
    if (isHidden) {
      dropdown.removeAttribute('hidden');
      button.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.setAttribute('hidden', '');
      button.setAttribute('aria-expanded', 'false');
    }
  }
}

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('ayuda-dropdown');
  const navDropdown = document.querySelector('.nav-dropdown');
  
  if (dropdown && navDropdown && !navDropdown.contains(e.target)) {
    dropdown.setAttribute('hidden', '');
    const button = document.getElementById('nav-ayuda');
    if (button) button.setAttribute('aria-expanded', 'false');
  }
});

// Función para ir a una sección y actualizar menú
function irASeccion(seccionId) {
  const seccion = document.getElementById(seccionId);
  if (seccion) {
    seccion.scrollIntoView({ behavior: 'smooth' });
  }
  actualizarMenuActivo(seccionId);
}

// Cargar diagnósticos desde la base de datos
async function cargarHistorialDiagnosticos() {
  const lista = document.getElementById('listaDiagnosticos');
  if (!lista) return;
  
  try {
    const resultado = await supabaseDB.obtenerDiagnosticos();
    
    if (resultado.success && resultado.data && resultado.data.length > 0) {
      lista.innerHTML = '';
      resultado.data.forEach(diagnostico => {
        const div = document.createElement('div');
        div.className = 'diagnostico-item';
        div.style.cursor = 'pointer';
        
        // Usar los síntomas como título en lugar del concepto
        const sintomas = diagnostico.sintomas || 'Diagnóstico sin detalles';
        const sintomasCorto = sintomas.length > 100 ? sintomas.substring(0, 100) + '...' : sintomas;
        
        div.innerHTML = `
          <p>🩺 ${sintomasCorto}</p>
          <small>${new Date(diagnostico.fecha).toLocaleString('es-ES')}</small>
        `;
        
        // Hacer clic para ver el detalle completo
        div.addEventListener('click', () => {
          mostrarDetalleDiagnostico(diagnostico);
        });
        
        lista.appendChild(div);
      });
    } else {
      lista.innerHTML = '<p>No hay diagnósticos registrados aún.</p>';
    }
  } catch (error) {
    console.error('Error al cargar diagnósticos:', error);
    lista.innerHTML = '<p>No hay diagnósticos registrados aún.</p>';
  }
}

// Mostrar detalle completo de un diagnóstico
function mostrarDetalleDiagnostico(diagnostico) {
  console.log('Diagnóstico completo:', diagnostico);
  
  // Si resultado es string JSON, parsearlo
  let resultado = diagnostico.resultado;
  if (typeof resultado === 'string') {
    try {
      resultado = JSON.parse(resultado);
    } catch (e) {
      console.error('Error al parsear resultado:', e);
    }
  }
  
  const sintomas = diagnostico.sintomas;
  
  let html = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 10px 0;">📋 Diagnóstico Completo</h2>
      <p style="margin: 0; opacity: 0.9;">${new Date(diagnostico.fecha).toLocaleString('es-ES')}</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #667eea;">
      <h3 style="color: #667eea; margin-top: 0;">💬 Síntomas Reportados</h3>
      <p style="line-height: 1.6; color: #333;">${sintomas}</p>
    </div>
  `;
  
  if (resultado) {
    if (resultado.concepto) {
      html += `
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="color: #2ecc71; margin-top: 0;">🔍 Análisis</h3>
          <p style="line-height: 1.6; color: #333;">${resultado.concepto}</p>
        </div>
      `;
    }
    
    if (resultado.causas && resultado.causas.length > 0) {
      html += `
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="color: #e74c3c; margin-top: 0;">⚠️ Posibles Causas</h3>
          <ul style="line-height: 1.8; color: #333;">
            ${resultado.causas.map(causa => `<li>${causa}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    if (resultado.evaluacion) {
      html += `
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="color: #3498db; margin-top: 0;">📊 Evaluación Preliminar</h3>
          <p style="line-height: 1.6; color: #333;">${resultado.evaluacion}</p>
        </div>
      `;
    }
    
    if (resultado.recomendaciones && resultado.recomendaciones.length > 0) {
      html += `
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="color: #9b59b6; margin-top: 0;">💡 Recomendaciones</h3>
          <ul style="line-height: 1.8; color: #333;">
            ${resultado.recomendaciones.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  }
  
  html += `
    <button onclick="cerrarDetalleDiagnostico()" style="background: #667eea; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-top: 10px;">
      ← Volver al historial
    </button>
  `;
  
  const container = document.getElementById('result');
  if (container) {
    container.innerHTML = html;
    container.scrollIntoView({ behavior: 'smooth' });
  }
}

// Cerrar detalle y volver a mostrar el formulario
function cerrarDetalleDiagnostico() {
  const container = document.getElementById('result');
  if (container) {
    container.innerHTML = '';
  }
}

// Cambiar entre vistas del dashboard
function mostrarVista(vistaId) {
  // Ocultar todas las secciones del dashboard
  const secciones = document.querySelectorAll('.dashboard-section');
  secciones.forEach(seccion => {
    seccion.setAttribute('hidden', '');
    seccion.classList.remove('active');
  });
  
  // Mostrar la vista seleccionada
  const vistaSeleccionada = document.getElementById(`vista-${vistaId}`);
  if (vistaSeleccionada) {
    vistaSeleccionada.removeAttribute('hidden');
    vistaSeleccionada.classList.add('active');
    
    // Si es la vista de diagnóstico, cargar el historial
    if (vistaId === 'diagnostico') {
      cargarHistorialDiagnosticos();
    }
    
    // Scroll suave al inicio de la vista
    vistaSeleccionada.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Actualizar menú de navegación
  actualizarMenuActivo(vistaId);
}

// Actualizar qué opción del menú está activa y ocultar la actual
function actualizarMenuActivo(paginaActual) {
  // Obtener todas las opciones del menú
  const navInicio = document.getElementById('nav-inicio');
  const navDiagnostico = document.getElementById('nav-diagnostico');
  const navVideos = document.getElementById('nav-videos');
  const navConsejos = document.getElementById('nav-consejos');
  const navAyuda = document.querySelector('.nav-dropdown');
  
  // Mostrar todas primero
  if (navInicio) navInicio.classList.remove('hidden');
  if (navDiagnostico) navDiagnostico.classList.remove('hidden');
  if (navVideos) navVideos.classList.remove('hidden');
  if (navConsejos) navConsejos.classList.remove('hidden');
  if (navAyuda) navAyuda.classList.remove('hidden');
  
  // Ocultar la opción actual
  if (paginaActual === 'inicio' && navInicio) {
    navInicio.classList.add('hidden');
  } else if (paginaActual === 'diagnostico' && navDiagnostico) {
    navDiagnostico.classList.add('hidden');
  } else if (paginaActual === 'videos' && navVideos) {
    navVideos.classList.add('hidden');
  } else if (paginaActual === 'consejos' && navConsejos) {
    navConsejos.classList.add('hidden');
  }
  
  // Para soporte, ocultar el desplegable de Ayuda
  if (paginaActual === 'soporte' && navAyuda) {
    navAyuda.classList.add('hidden');
  }
}

// Detectar página actual al cargar
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  // Si estamos en dashboard, mostrar vista de inicio por defecto
  if (currentPath.includes('dashboard.html')) {
    if (currentHash === '#diagnostico') {
      mostrarVista('diagnostico');
    } else if (currentHash === '#videos') {
      mostrarVista('videos');
    } else if (currentHash === '#consejos') {
      mostrarVista('consejos');
    } else {
      mostrarVista('inicio');
    }
    
    // Cargar consejo personalizado
    cargarConsejoPersonalizado();
  } else if (currentPath.includes('soporte.html')) {
    actualizarMenuActivo('soporte');
  }
});

// ========== CARGAR CONSEJO PERSONALIZADO ==========
async function cargarConsejoPersonalizado() {
  const tipDelDiaElement = document.getElementById('tip-del-dia');
  if (!tipDelDiaElement) return;
  
  try {
    // Obtener diagnósticos del historial
    let diagnosticos = [];
    
    // Intentar obtener de Supabase si está autenticado
    if (supabaseClient && supabaseClient._supabase) {
      const { data: { user } } = await supabaseClient._supabase.auth.getUser();
      if (user) {
        const { data } = await supabaseClient._supabase
          .from('diagnosticos')
          .select('sintomas')
          .eq('usuario_id', user.id)
          .order('fecha', { ascending: false })
          .limit(3);
        
        if (data) diagnosticos = data;
      }
    }
    
    // Generar consejo personalizado
    const consejo = await geminiAI.generarConsejoPersonalizado(diagnosticos);
    tipDelDiaElement.textContent = consejo;
  } catch (error) {
    console.error('Error cargando consejo personalizado:', error);
    // Mostrar consejo del día si falla
    tipDelDiaElement.textContent = geminiAI.consejoDiario();
  }
}

// ========== SESIÓN ==========
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Intentar login con Supabase (o modo local si no está configurado)
    const result = await supabaseDB.iniciarSesion(user, password);
    
    if (result.success) {
      localStorage.setItem('usuario', user);
      window.location.href = 'dashboard.html';
    } else {
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  });
}

if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async e => {
    e.preventDefault();
    const newEmail = document.getElementById('newEmail').value;
    const newUser = document.getElementById('newUser').value;
    const newPass = document.getElementById('newPass').value;
    
    // Validación básica
    if (newPass.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    // Intentar registro con Supabase (o modo local si no está configurado)
    const result = await supabaseDB.registrarUsuario(newEmail, newPass, newUser);
    
    if (result.success) {
      alert("✅ Cuenta creada exitosamente. Inicia sesión para continuar.");
      window.location.href = 'login.html';
    } else {
      alert('❌ Error al crear cuenta: ' + (result.error || 'Intenta de nuevo'));
    }
  });
}

if (document.getElementById('welcomeUser')) {
  const user = localStorage.getItem('usuario');
  if (!user) {
    // No hay sesión, redirigir a login
    window.location.href = 'login.html';
  } else {
    document.getElementById('welcomeUser').innerText = `Bienvenido, ${user}`;
  }
}

function logout() {
  localStorage.removeItem('usuario');
  window.location.href = 'index.html';
}

// ========== DIAGNÓSTICO MEJORADO CON IA ==========
if (document.getElementById('symptom-form')) {
  document.getElementById('symptom-form').addEventListener('submit', async e => {
    e.preventDefault();
    const symptomsInput = document.getElementById('symptoms');
    const symptoms = symptomsInput.value;
    const result = document.getElementById('result');
    
    // Mostrar loading
    result.innerHTML = '<p>⏳ Analizando síntomas con IA...</p>';
    
    try {
      // Analizar con Gemini AI
      let analisis = await geminiAI.analizarSintomas(symptoms);
      
      console.log('📊 Análisis recibido:', analisis);
      
      const severidadInfo = geminiAI.getSeveridadInfo(analisis.severidad);
      
      // LIMPIAR el formulario
      symptomsInput.value = '';
      
      // Mostrar resultado completo y bonito
      let html = `
        <div class="diagnostico-completo" style="border-left: 4px solid #2ecc71; background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- ENCABEZADO -->
          <div class="diagnostico-header" style="background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; color: white; text-align: center;">
            <h3 style="margin: 0; font-size: 1.5em;">🩺 Diagnóstico Preliminar</h3>
            <p style="margin: 8px 0 0 0; font-size: 0.95em; opacity: 0.95;">Análisis generado por Inteligencia Artificial</p>
          </div>
      `;

      // 1. CONCEPTO
      if (analisis.concepto) {
        html += `
          <div class="seccion-diagnostico" style="margin-bottom: 25px;">
            <h4 style="color: #2c3e50; font-size: 1.3em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>📋</span> Análisis
            </h4>
            <p style="line-height: 1.7; color: #555; font-size: 1.05em; background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 0;">${analisis.concepto}</p>
          </div>
        `;
      }
      
      // 2. CAUSAS
      if (analisis.causas && analisis.causas.length > 0) {
        html += `
          <div class="seccion-diagnostico" style="margin-bottom: 25px;">
            <h4 style="color: #2c3e50; font-size: 1.3em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>🔍</span> Posibles Causas
            </h4>
            <ul class="lista-diagnostico" style="list-style: none; padding: 0; margin: 0;">
              ${analisis.causas.map(causa => `
                <li style="background: #fff3cd; padding: 12px 15px; margin-bottom: 10px; border-radius: 8px; border-left: 3px solid #ffc107; color: #856404; line-height: 1.6;">
                  • ${causa}
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }
      
      // 3. EVALUACIÓN
      if (analisis.evaluacion) {
        html += `
          <div class="seccion-diagnostico" style="margin-bottom: 25px;">
            <h4 style="color: #2c3e50; font-size: 1.3em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>⚕️</span> Evaluación Preliminar
            </h4>
            <p style="line-height: 1.7; color: #555; font-size: 1.1em; background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 0; font-weight: 500;">${analisis.evaluacion}</p>
          </div>
        `;
      }

      // 2. RECOMENDACIONES - Para mejorar la condición
      if (analisis.recomendaciones && analisis.recomendaciones.length > 0) {
        html += `
          <div class="seccion-diagnostico" style="margin-bottom: 25px;">
            <h4 style="color: #2c3e50; font-size: 1.3em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>💡</span> Recomendaciones para Mejorar tu Condición
            </h4>
            <ul class="lista-diagnostico" style="list-style: none; padding: 0; margin: 0;">
              ${analisis.recomendaciones.map(rec => `
                <li style="background: #e8f5e9; padding: 12px 15px; margin-bottom: 10px; border-radius: 8px; border-left: 3px solid #2ecc71; color: #2c3e50; line-height: 1.6;">
                  ✓ ${rec}
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }

      // 3. CRÉDITOS Y DISCLAIMER
      html += `
        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 10px; border: 1px solid #dee2e6;">
          <div style="text-align: center; margin-bottom: 15px;">
            <p style="margin: 0; font-size: 0.95em; color: #6c757d; line-height: 1.6;">
              <strong style="color: #2c3e50;">⚠️ Aviso Importante:</strong><br>
              Este es un análisis orientativo generado por Inteligencia Artificial. 
              <strong>No reemplaza una consulta médica profesional.</strong><br>
              Siempre consulta con un médico calificado para un diagnóstico preciso.
            </p>
          </div>
          
          ${analisis.esIA ? `
          <div style="text-align: center; padding-top: 15px; border-top: 1px solid #dee2e6;">
            <p style="margin: 0; font-size: 0.9em; color: #888; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span style="font-size: 1.2em;">✨</span>
              <span>Powered by <strong style="color: #4285f4;">Google Gemini AI</strong></span>
            </p>
            <p style="margin: 5px 0 0 0; font-size: 0.8em; color: #999;">Sistema de Diagnóstico IA - Proyecto Académico Usabilidad</p>
          </div>
          ` : ''}
        </div>
      </div>
      `;
      
      result.innerHTML = html;
      
      // Guardar en base de datos con el objeto completo de análisis
      await supabaseDB.guardarDiagnostico({
        sintomas: symptoms,
        resultado: analisis,  // Guardar el objeto completo, no solo concepto
        severidad: analisis.severidad
      });
      
      // Recargar lista de diagnósticos recientes
      cargarHistorialDiagnosticos();
      
    } catch (error) {
      console.error('Error en diagnóstico:', error);
      result.innerHTML = '<p style="color: red;">❌ Error al analizar. Por favor, intenta de nuevo.</p>';
    }
  });
}

// ========== BÚSQUEDA DE INFORMACIÓN MÉDICA ==========
if (document.getElementById('searchBtn')) {
  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const searchResult = document.getElementById('searchResult');

    let info = "No se encontraron resultados relacionados.";

    if (query.includes("alimentación") || query.includes("comida")) {
      info = "Una alimentación balanceada ayuda a fortalecer tu sistema inmunológico. Incluye frutas, verduras y proteínas magras.";
    } else if (query.includes("ejercicio") || query.includes("actividad")) {
      info = "El ejercicio regular mejora la salud cardiovascular, reduce el estrés y fortalece el sistema inmune.";
    } else if (query.includes("sueño") || query.includes("descanso")) {
      info = "Dormir de 7 a 8 horas diarias es clave para una buena salud mental y física.";
    } else if (query.includes("salud mental") || query.includes("estrés")) {
      info = "Practicar meditación, hablar con amigos o acudir a terapia puede mejorar tu bienestar emocional.";
    } else if (query.includes("hidratación") || query.includes("agua")) {
      info = "Beber al menos 2 litros de agua al día ayuda a mantener tus órganos funcionando correctamente.";
    }

    searchResult.innerHTML = `<strong>Resultado:</strong> ${info}`;
  });
}

// ========== FORMULARIO DE CONTACTO ==========
if (document.getElementById('contactForm')) {
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    alert("Gracias por tu mensaje. Te responderemos pronto.");
    document.getElementById('contactForm').reset();
  });
}

// ========== ACCESIBILIDAD POR TECLADO ==========
document.addEventListener("keydown", function (e) {
  // Ignorar si el usuario está escribiendo en un input o textarea
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

  switch (e.key.toLowerCase()) {
    case "m": // Menú lateral
      e.preventDefault();
      if (sidebar) sidebar.classList.toggle("active");
      break;

    case "d": // Modo oscuro
      e.preventDefault();
      toggleDarkMode();
      break;

    case "+": // Aumentar texto
    case "=":
      e.preventDefault();
      increaseText();
      break;

    case "-": // Disminuir texto
      e.preventDefault();
      decreaseText();
      break;

    case "l": // Lectura de texto
      e.preventDefault();
      textToSpeech();
      break;

    case "s": // Detener lectura
      e.preventDefault();
      stopSpeech();
      break;

    case "f": // Foco en barra de búsqueda
      e.preventDefault();
      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.focus();
      break;

    case "enter": // Ejecutar búsqueda
      if (document.activeElement.id === "searchInput") {
        e.preventDefault();
        const searchBtn = document.getElementById("searchBtn");
        if (searchBtn) searchBtn.click();
      }
      break;

    case "h": // Ir al inicio
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;

    case "?": // Mostrar ayuda
      e.preventDefault();
      alert(
        "⌨️ Atajos disponibles:\n\n" +
        "M → Abrir/cerrar menú lateral\n" +
        "D → Activar modo oscuro\n" +
        "+ / - → Aumentar o disminuir texto\n" +
        "L → Leer texto\n" +
        "S → Detener lectura\n" +
        "F → Foco en barra de búsqueda\n" +
        "Enter → Ejecutar búsqueda\n" +
        "H → Ir al inicio\n" +
        "? → Mostrar esta ayuda"
      );
      break;
  }
});

// ========== FUNCIÓN DE BÚSQUEDA CON IA ==========
async function buscar() {
  const input = document.getElementById("searchInput").value.trim();
  const results = document.getElementById("searchResults");

  if (!input) {
    results.innerHTML = '<p>Por favor, ingresa un término de búsqueda.</p>';
    return;
  }

  // Mostrar loading
  results.innerHTML = '<p>🔍 Buscando información con IA...</p>';

  try {
    // Generar consejo con Gemini AI
    const consejo = await geminiAI.generarConsejo(input);
    
    // Mostrar resultados
    let html = `
      <div class="consejo-resultado">
        <h3>✨ ${consejo.titulo}</h3>
        <p><strong>📋 Información:</strong></p>
        <p>${consejo.explicacion}</p>
    `;

    if (consejo.consejos && consejo.consejos.length > 0) {
      html += `
        <p><strong>💡 Consejos Prácticos:</strong></p>
        <ul>
          ${consejo.consejos.map(c => `<li>${c}</li>`).join('')}
        </ul>
      `;
    }

    if (consejo.senalesAlerta && consejo.senalesAlerta.length > 0) {
      html += `
        <p><strong>⚠️ Señales de Alerta:</strong></p>
        <ul>
          ${consejo.senalesAlerta.map(s => `<li>${s}</li>`).join('')}
        </ul>
      `;
    }

    if (consejo.prevencion && consejo.prevencion.length > 0) {
      html += `
        <p><strong>🛡️ Prevención:</strong></p>
        <ul>
          ${consejo.prevencion.map(p => `<li>${p}</li>`).join('')}
        </ul>
      `;
    }

    html += `
        <p style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 8px;">
          <strong>⚠️ Nota:</strong> Esta información es orientativa. Siempre consulta con un profesional de la salud.
        </p>
        ${consejo.esIA ? '<p style="font-size: 0.9em; color: #666;">✨ Generado por Gemini AI</p>' : ''}
      </div>
    `;

    results.innerHTML = html;
  } catch (error) {
    console.error('Error en búsqueda:', error);
    results.innerHTML = `
      <p style="color: #d9534f;">❌ Error al buscar información. Por favor, intenta nuevamente.</p>
      <p>Mientras tanto, aquí hay algunos consejos generales:</p>
      <ul>
        <li>💧 Mantén una buena hidratación</li>
        <li>🥗 Come de forma balanceada</li>
        <li>😴 Descansa adecuadamente</li>
        <li>🏃 Realiza actividad física</li>
      </ul>
    `;
  }
}
