// ========== MENÚ FLOTANTE ==========
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// ========== ACCESIBILIDAD ==========
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

let fontSize = 16;
function increaseText() {
  fontSize += 2;
  document.body.style.fontSize = fontSize + "px";
}
function decreaseText() {
  fontSize = Math.max(12, fontSize - 2);
  document.body.style.fontSize = fontSize + "px";
}

let synth = window.speechSynthesis;
function textToSpeech() {
  let text = document.body.innerText;
  let utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  synth.speak(utter);
}
function stopSpeech() { synth.cancel(); }

// ========== SESIÓN ==========
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    localStorage.setItem('usuario', user);
    window.location.href = 'dashboard.html';
  });
}

if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const newUser = document.getElementById('newUser').value;
    localStorage.setItem('usuario', newUser);
    alert("Cuenta creada exitosamente. Inicia sesión para continuar.");
    window.location.href = 'login.html';
  });
}

if (document.getElementById('welcomeUser')) {
  const user = localStorage.getItem('usuario');
  if (!user) window.location.href = 'login.html';
  document.getElementById('welcomeUser').innerText = `Bienvenido, ${user}`;
}

function logout() {
  localStorage.removeItem('usuario');
  window.location.href = 'index.html';
}

// ========== DIAGNÓSTICO MEJORADO ==========
if (document.getElementById('symptom-form')) {
  document.getElementById('symptom-form').addEventListener('submit', e => {
    e.preventDefault();
    const symptoms = document.getElementById('symptoms').value.toLowerCase();
    const result = document.getElementById('result');

    let diagnosis = "No se pudo determinar un diagnóstico. Consulte un médico.";

    if (symptoms.includes("fiebre") && symptoms.includes("tos")) {
      diagnosis = "Posible gripe o infección respiratoria. Mantén reposo, buena hidratación y monitorea tu temperatura.";
    } else if (symptoms.includes("dolor") && symptoms.includes("cabeza")) {
      diagnosis = "Podrías tener migraña o cefalea tensional. Descansa, evita el estrés y la exposición a pantallas.";
    } else if (symptoms.includes("mareo") || symptoms.includes("náusea")) {
      diagnosis = "Podría ser un malestar gastrointestinal, deshidratación o vértigo leve. Bebe líquidos y descansa.";
    } else if (symptoms.includes("dolor") && symptoms.includes("garganta")) {
      diagnosis = "Probable faringitis o irritación de garganta. Evita bebidas frías y mantente hidratado.";
    } else if (symptoms.includes("dolor") && symptoms.includes("estómago")) {
      diagnosis = "Podría tratarse de una indigestión o gastritis. Come ligero y evita alimentos grasosos.";
    } else if (symptoms.includes("fatiga") || symptoms.includes("cansancio")) {
      diagnosis = "Posible agotamiento físico o estrés. Duerme bien y mantén una dieta balanceada.";
    }

    result.innerHTML = `<strong>Diagnóstico preliminar:</strong> ${diagnosis}`;
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
