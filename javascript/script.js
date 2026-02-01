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
  
  const sintomas = diagnostico.sintomas;
  let resultadoTexto = diagnostico.resultado;
  
  // Función para limpiar texto markdown
  const limpiarTexto = (texto) => {
    return texto
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/###/g, '')
      .replace(/##/g, '')
      .replace(/#/g, '')
      .replace(/---/g, '')
      .replace(/\[([^\]]+)\]/g, '$1')
      .trim();
  };
  
  // Extraer secciones del texto guardado
  const secciones = {
    analisis: '',
    causas: [],
    evaluacion: '',
    recomendaciones: []
  };
  
  // Si hay un resultado en texto, parsearlo
  if (resultadoTexto && typeof resultadoTexto === 'string') {
    const lineas = resultadoTexto.split('\n');
    let seccionActual = 'analisis';
    
    lineas.forEach(linea => {
      const lineaLimpia = linea.trim();
      
      if (lineaLimpia.toLowerCase().includes('posibles causas')) {
        seccionActual = 'causas';
        return;
      } else if (lineaLimpia.toLowerCase().includes('evaluación') || lineaLimpia.toLowerCase().includes('nivel de urgencia')) {
        seccionActual = 'evaluacion';
        return;
      } else if (lineaLimpia.toLowerCase().includes('recomendaciones')) {
        seccionActual = 'recomendaciones';
        return;
      }
      
      if (!lineaLimpia || lineaLimpia.startsWith('###') || lineaLimpia.startsWith('##') || lineaLimpia === '---') {
        return;
      }
      
      if (lineaLimpia.startsWith('*') || lineaLimpia.startsWith('-')) {
        const textoLimpio = limpiarTexto(lineaLimpia.replace(/^[\*\-]\s*/, ''));
        if (textoLimpio.length > 3) {
          if (seccionActual === 'causas') {
            secciones.causas.push(textoLimpio);
          } else if (seccionActual === 'recomendaciones') {
            secciones.recomendaciones.push(textoLimpio);
          }
        }
      } else if (lineaLimpia.length > 10) {
        const textoLimpio = limpiarTexto(lineaLimpia);
        if (seccionActual === 'analisis') {
          secciones.analisis += textoLimpio + ' ';
        } else if (seccionActual === 'evaluacion') {
          secciones.evaluacion += textoLimpio + ' ';
        }
      }
    });
  }
  
  let html = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
        <span style="font-size: 2.5em;">📋</span>
        <div>
          <h2 style="margin: 0; font-size: 1.8em; font-weight: 600;">Diagnóstico Guardado</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.95; font-size: 0.95em;">${new Date(diagnostico.fecha).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p>
        </div>
      </div>
    </div>
    
    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 5px solid #667eea; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: start; gap: 12px;">
        <span style="font-size: 1.8em; margin-top: 2px;">💬</span>
        <div style="flex: 1;">
          <h3 style="color: #495057; margin: 0 0 10px 0; font-size: 1.3em; font-weight: 600;">Síntomas Reportados</h3>
          <p style="line-height: 1.8; color: #495057; margin: 0; font-size: 1.05em;">${sintomas}</p>
        </div>
      </div>
    </div>
  `;
  
  // Análisis
  if (secciones.analisis) {
    html += `
      <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #2ecc71;">
        <div style="display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 1.8em; margin-top: 2px;">🔍</span>
          <div style="flex: 1;">
            <h3 style="color: #2ecc71; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Análisis del Cuadro</h3>
            <p style="line-height: 1.8; color: #495057; margin: 0; font-size: 1.05em; text-align: justify;">${secciones.analisis.trim()}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  // Causas
  if (secciones.causas.length > 0) {
    html += `
      <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #e74c3c;">
        <div style="display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 1.8em; margin-top: 2px;">⚠️</span>
          <div style="flex: 1;">
            <h3 style="color: #e74c3c; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Posibles Causas</h3>
            <ul style="margin: 0; padding-left: 0; list-style: none;">
              ${secciones.causas.map(causa => `
                <li style="padding: 12px 0; border-bottom: 1px solid #f1f3f5; display: flex; align-items: start; gap: 10px;">
                  <span style="color: #e74c3c; font-weight: bold; font-size: 1.2em; min-width: 20px;">•</span>
                  <span style="color: #495057; line-height: 1.6; font-size: 1.05em;">${causa}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  
  // Evaluación
  if (secciones.evaluacion) {
    html += `
      <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #3498db;">
        <div style="display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 1.8em; margin-top: 2px;">📊</span>
          <div style="flex: 1;">
            <h3 style="color: #3498db; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Evaluación Preliminar</h3>
            <p style="line-height: 1.8; color: #495057; margin: 0; font-size: 1.05em; text-align: justify;">${secciones.evaluacion.trim()}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  // Recomendaciones
  if (secciones.recomendaciones.length > 0) {
    html += `
      <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #9b59b6;">
        <div style="display: flex; align-items: start; gap: 12px;">
          <span style="font-size: 1.8em; margin-top: 2px;">💡</span>
          <div style="flex: 1;">
            <h3 style="color: #9b59b6; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Recomendaciones para Sentirte Mejor</h3>
            <ul style="margin: 0; padding-left: 0; list-style: none;">
              ${secciones.recomendaciones.map(rec => `
                <li style="padding: 12px 0; border-bottom: 1px solid #f1f3f5; display: flex; align-items: start; gap: 10px;">
                  <span style="color: #9b59b6; font-weight: bold; font-size: 1.2em; min-width: 20px;">✓</span>
                  <span style="color: #495057; line-height: 1.6; font-size: 1.05em;">${rec}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  
  html += `
    <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, #fff3cd 0%, #fff8e1 100%); border-radius: 12px; border: 2px solid #ffc107; box-shadow: 0 2px 8px rgba(255, 193, 7, 0.2);">
      <div style="display: flex; align-items: start; gap: 15px;">
        <span style="font-size: 2em; margin-top: 2px;">⚠️</span>
        <div style="flex: 1;">
          <h4 style="color: #856404; margin: 0 0 10px 0; font-size: 1.2em; font-weight: 600;">Aviso Importante</h4>
          <p style="margin: 0; color: #856404; line-height: 1.7; font-size: 1em;">
            Este es un análisis orientativo generado por Inteligencia Artificial. 
            <strong>No reemplaza una consulta médica profesional.</strong>
          </p>
        </div>
      </div>
    </div>
    
    <button onclick="cerrarDetalleDiagnostico()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 35px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 600; margin-top: 25px; box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3); transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
      ← Volver al Historial
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
    result.innerHTML = '<div style="text-align:center;padding:30px;"><p style="font-size:1.2em;color:#666;">⏳ Analizando síntomas con IA...</p></div>';
    
    try {
      // Analizar con Gemini AI
      let diagnostico = await geminiAI.analizarSintomas(symptoms);
      
      console.log('📊 Diagnóstico recibido:', diagnostico);
      
      // LIMPIAR el formulario
      symptomsInput.value = '';
      
      // Limpiar el texto de markdown
      const limpiarTexto = (texto) => {
        return texto
          .replace(/\*\*/g, '') // Eliminar **
          .replace(/\*/g, '')   // Eliminar *
          .replace(/###/g, '')  // Eliminar ###
          .replace(/##/g, '')   // Eliminar ##
          .replace(/#/g, '')    // Eliminar #
          .replace(/---/g, '')  // Eliminar ---
          .replace(/\[([^\]]+)\]/g, '$1') // Eliminar []
          .trim();
      };
      
      // Extraer secciones del diagnóstico
      const secciones = {
        analisis: '',
        causas: [],
        evaluacion: '',
        recomendaciones: []
      };
      
      // Buscar secciones en el texto
      const lineas = diagnostico.split('\n');
      let seccionActual = 'analisis';
      
      lineas.forEach(linea => {
        const lineaLimpia = linea.trim();
        
        // Detectar cambios de sección
        if (lineaLimpia.toLowerCase().includes('posibles causas')) {
          seccionActual = 'causas';
          return;
        } else if (lineaLimpia.toLowerCase().includes('evaluación') || lineaLimpia.toLowerCase().includes('nivel de urgencia')) {
          seccionActual = 'evaluacion';
          return;
        } else if (lineaLimpia.toLowerCase().includes('recomendaciones')) {
          seccionActual = 'recomendaciones';
          return;
        }
        
        // Saltar líneas vacías o headers
        if (!lineaLimpia || lineaLimpia.startsWith('###') || lineaLimpia.startsWith('##') || lineaLimpia === '---') {
          return;
        }
        
        // Procesar listas (con * o -)
        if (lineaLimpia.startsWith('*') || lineaLimpia.startsWith('-')) {
          const textoLimpio = limpiarTexto(lineaLimpia.replace(/^[\*\-]\s*/, ''));
          if (textoLimpio.length > 3) {
            if (seccionActual === 'causas') {
              secciones.causas.push(textoLimpio);
            } else if (seccionActual === 'recomendaciones') {
              secciones.recomendaciones.push(textoLimpio);
            }
          }
        } 
        // Procesar texto normal
        else if (lineaLimpia.length > 10) {
          const textoLimpio = limpiarTexto(lineaLimpia);
          if (seccionActual === 'analisis') {
            secciones.analisis += textoLimpio + ' ';
          } else if (seccionActual === 'evaluacion') {
            secciones.evaluacion += textoLimpio + ' ';
          }
        }
      });
      
      // Construir HTML con diseño bonito y profesional
      let html = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
            <span style="font-size: 2.5em;">🩺</span>
            <div>
              <h2 style="margin: 0; font-size: 1.8em; font-weight: 600;">Diagnóstico Preliminar</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.95; font-size: 0.95em;">${new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p>
            </div>
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 12px; margin-bottom: 20px; border-left: 5px solid #667eea; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <div style="display: flex; align-items: start; gap: 12px;">
            <span style="font-size: 1.8em; margin-top: 2px;">💬</span>
            <div style="flex: 1;">
              <h3 style="color: #495057; margin: 0 0 10px 0; font-size: 1.3em; font-weight: 600;">Síntomas Reportados</h3>
              <p style="line-height: 1.8; color: #495057; margin: 0; font-size: 1.05em;">${symptoms}</p>
            </div>
          </div>
        </div>
      `;
      
      // Análisis
      if (secciones.analisis) {
        html += `
          <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #2ecc71;">
            <div style="display: flex; align-items: start; gap: 12px;">
              <span style="font-size: 1.8em; margin-top: 2px;">🔍</span>
              <div style="flex: 1;">
                <h3 style="color: #2ecc71; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Análisis del Cuadro</h3>
                <p style="line-height: 1.8; color: #495057; margin: 0; font-size: 1.05em; text-align: justify;">${secciones.analisis.trim()}</p>
              </div>
            </div>
          </div>
        `;
      }
      
      // Causas
      if (secciones.causas.length > 0) {
        html += `
          <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #e74c3c;">
            <div style="display: flex; align-items: start; gap: 12px;">
              <span style="font-size: 1.8em; margin-top: 2px;">⚠️</span>
              <div style="flex: 1;">
                <h3 style="color: #e74c3c; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Posibles Causas</h3>
                <ul style="margin: 0; padding-left: 0; list-style: none;">
                  ${secciones.causas.map(causa => `
                    <li style="padding: 12px 0; border-bottom: 1px solid #f1f3f5; display: flex; align-items: start; gap: 10px;">
                      <span style="color: #e74c3c; font-weight: bold; font-size: 1.2em; min-width: 20px;">•</span>
                      <span style="color: #495057; line-height: 1.6; font-size: 1.05em;">${causa}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
      }
      
      // Evaluación
      if (secciones.evaluacion) {
        html += `
          <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #3498db;">
            <div style="display: flex; align-items: start; gap: 12px;">
              <span style="font-size: 1.8em; margin-top: 2px;">📊</span>
              <div style="flex: 1;">
                <h3 style="color: #3498db; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Evaluación Preliminar</h3>
                <p style="line-height: 1.8; color: #495057; margin: 0; font-size: 1.05em; text-align: justify;">${secciones.evaluacion.trim()}</p>
              </div>
            </div>
          </div>
        `;
      }
      
      // Recomendaciones
      if (secciones.recomendaciones.length > 0) {
        html += `
          <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-top: 4px solid #9b59b6;">
            <div style="display: flex; align-items: start; gap: 12px;">
              <span style="font-size: 1.8em; margin-top: 2px;">💡</span>
              <div style="flex: 1;">
                <h3 style="color: #9b59b6; margin: 0 0 15px 0; font-size: 1.3em; font-weight: 600;">Recomendaciones para Sentirte Mejor</h3>
                <ul style="margin: 0; padding-left: 0; list-style: none;">
                  ${secciones.recomendaciones.map(rec => `
                    <li style="padding: 12px 0; border-bottom: 1px solid #f1f3f5; display: flex; align-items: start; gap: 10px;">
                      <span style="color: #9b59b6; font-weight: bold; font-size: 1.2em; min-width: 20px;">✓</span>
                      <span style="color: #495057; line-height: 1.6; font-size: 1.05em;">${rec}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
      }
      
      // Aviso importante
      html += `
        <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, #fff3cd 0%, #fff8e1 100%); border-radius: 12px; border: 2px solid #ffc107; box-shadow: 0 2px 8px rgba(255, 193, 7, 0.2);">
          <div style="display: flex; align-items: start; gap: 15px;">
            <span style="font-size: 2em; margin-top: 2px;">⚠️</span>
            <div style="flex: 1;">
              <h4 style="color: #856404; margin: 0 0 10px 0; font-size: 1.2em; font-weight: 600;">Aviso Importante</h4>
              <p style="margin: 0; color: #856404; line-height: 1.7; font-size: 1em;">
                Este es un análisis orientativo generado por Inteligencia Artificial. 
                <strong>No reemplaza una consulta médica profesional.</strong><br>
                Siempre consulta con un médico calificado para un diagnóstico preciso y tratamiento adecuado.
              </p>
            </div>
          </div>
        </div>
      `;
      
      result.innerHTML = html;
      
      // Guardar en base de datos con información completa
      await supabaseDB.guardarDiagnostico({
        sintomas: symptoms,
        resultado: diagnostico,
        analisis: secciones.analisis || diagnostico.substring(0, 200),
        causas: secciones.causas.join(', '),
        evaluacion: secciones.evaluacion,
        recomendaciones: secciones.recomendaciones.join(', '),
        severidad: 'moderado'
      });
      
      // Recargar lista de diagnósticos recientes
      cargarHistorialDiagnosticos();
      
    } catch (error) {
      console.error('Error en diagnóstico:', error);
      result.innerHTML = '<div style="background:#ffebee;border:2px solid #f44336;padding:20px;border-radius:10px;margin-top:20px;"><p style="color:#c62828;margin:0;"><strong>❌ Error:</strong> No se pudo analizar los síntomas. Por favor, verifica tu conexión e intenta nuevamente.</p></div>';
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
    results.innerHTML = '<p style="color:#999;text-align:center;padding:20px;">Por favor, ingresa un término de búsqueda.</p>';
    return;
  }

  // Mostrar loading
  results.innerHTML = '<div style="text-align:center;padding:30px;"><p style="font-size:1.2em;color:#666;">🔍 Buscando información con IA...</p></div>';

  try {
    // Generar consejo con Gemini AI (ahora devuelve texto simple)
    const consejo = await geminiAI.generarConsejo(input);
    
    // Convertir markdown a HTML formateado
    let htmlFormateado = consejo
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/---/g, '<hr style="border:none;border-top:2px solid #e0e0e0;margin:20px 0;">')
      .replace(/### ([^\n]+)/g, '<h4 style="color:#4CAF50;margin:20px 0 10px 0;font-size:1.2em;">$1</h4>')
      .replace(/## ([^\n]+)/g, '<h3 style="color:#2e7d32;margin:25px 0 15px 0;font-size:1.4em;">$1</h3>')
      .replace(/# ([^\n]+)/g, '<h2 style="color:#1b5e20;margin:30px 0 20px 0;font-size:1.6em;">$1</h2>')
      .replace(/\n\* ([^\n]+)/g, '<li style="margin-left:20px;margin-bottom:8px;line-height:1.6;">$1</li>')
      .replace(/(<li[^>]*>.*<\/li>)/gs, '<ul style="margin:10px 0;padding-left:20px;list-style-type:disc;">$1</ul>')
      .replace(/\n\n/g, '</p><p style="margin:15px 0;line-height:1.8;color:#333;">')
      .replace(/\n/g, '<br>');
    
    if (!htmlFormateado.startsWith('<')) {
      htmlFormateado = '<p style="margin:15px 0;line-height:1.8;color:#333;">' + htmlFormateado + '</p>';
    }
    
    // Mostrar resultados
    let html = `
      <div class="consejo-resultado" style="background:#fff;padding:25px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin-top:20px;border-left:4px solid #4CAF50;">
        
        <div style="background:linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%);padding:20px;border-radius:10px;margin-bottom:25px;color:white;text-align:center;">
          <h3 style="margin:0;font-size:1.5em;">💡 Información de Salud</h3>
          <p style="margin:8px 0 0 0;font-size:0.95em;opacity:0.95;">Generado por Inteligencia Artificial</p>
        </div>
        
        <div style="font-size:1.05em;background:#f8f9fa;padding:20px;border-radius:8px;margin-bottom:20px;">${htmlFormateado}</div>
        
        <div style="background:#fff3cd;border:2px solid #ffc107;padding:15px;border-radius:8px;text-align:center;">
          <p style="margin:0;color:#856404;"><strong>⚠️ Nota:</strong> Esta información es orientativa. Siempre consulta con un profesional de la salud.</p>
        </div>
      </div>
    `;

    results.innerHTML = html;
  } catch (error) {
    console.error('Error en búsqueda:', error);
    results.innerHTML = `
      <div style="background:#ffebee;border:2px solid #f44336;padding:20px;border-radius:10px;margin-top:20px;">
        <p style="color:#c62828;margin:0;"><strong>❌ Error:</strong> No se pudo obtener la información. Por favor, verifica tu conexión e intenta nuevamente.</p>
      </div>
    `;
  }
}

