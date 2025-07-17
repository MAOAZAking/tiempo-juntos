// // Elementos clave
// const orientationWarning = document.getElementById('orientation-warning');
// const orientationVideo = document.getElementById('orientacionVideo');
// const body = document.body;
// const musica = document.getElementById('bg-music');

// let musicaPausadaPorOrientacion = false;

// // Función para pausar todo al estar en vertical
// function pausarTodoPorOrientacion() {
//   orientationWarning.style.display = 'flex';
//   body.classList.add('pausar-animaciones');

//   if (musica && !musica.paused) {
//     musica.pause();
//     musicaPausadaPorOrientacion = true;
//   }

//   document.body.style.pointerEvents = 'none'; // Bloquear interacción
// }

// // Función para reanudar al volver a horizontal
// function reanudarTodoPorOrientacion() {
//   orientationWarning.style.display = 'none';
//   body.classList.remove('pausar-animaciones');

//   document.body.style.pointerEvents = 'auto'; // Restaurar interacción

//   if (musicaPausadaPorOrientacion && musica) {
//     try {
//       musica.play();
//     } catch (e) {
//       // Algunas políticas de autoplay podrían bloquearlo
//       console.warn("La música no se pudo reproducir automáticamente:", e);
//     }
//     musicaPausadaPorOrientacion = false;
//   }
// }

// // Verifica orientación actual y aplica lógica
// function verificarOrientacion() {
//   const esVertical = window.innerHeight > window.innerWidth;

//   if (esVertical) {
//     pausarTodoPorOrientacion();
//   } else {
//     reanudarTodoPorOrientacion();
//   }
// }

// // Detectar cambios de orientación
// window.addEventListener("load", verificarOrientacion);
// window.addEventListener("resize", verificarOrientacion);
// window.addEventListener("orientationchange", verificarOrientacion);

///////////////////////////////////Abajo esta lo original//////////////////////////////////////////////////////////////////////

// Control de la experiencia principal
let mainExperienceStarted = false;

function startMainExperience() {
  if (mainExperienceStarted) return;
  mainExperienceStarted = true;

  const container = document.getElementById('tree-container');

  // Cargar el SVG desde la carpeta externa "Img/treelove-new"
    // Cargar el SVG desde la carpeta externa "Img/treelove-new"
fetch('Img/treelove-new.svg')
  .then(response => response.text()) // Convertir la respuesta en texto (el contenido del SVG)
  .then(svgText => {
    console.log(svgText); // Verifica si el SVG se está cargando correctamente
    const container = document.getElementById('tree-container'); // Obtener el contenedor
    container.innerHTML = svgText; // Insertar el SVG cargado dinámicamente en el contenedor

    const svg = container.querySelector('svg'); // Buscar el elemento <svg>
    if (!svg) return; // Si no hay un SVG, no hacer nada

    // Animación de "dibujo" para todos los paths
    const allPaths = Array.from(svg.querySelectorAll('path')); // Obtener todos los paths del SVG
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    // Forzar reflow y luego animar
    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;
        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      // Después de la animación de dibujo, mueve y agranda el SVG
      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');

        // Mostrar texto con efecto typing
        setTimeout(() => {
          showDedicationText(); // Función de máquina de escribir para dedicatoria
          // Mostrar pétalos flotando
          startFloatingObjects(); // Función para los objetos flotantes
          // Mostrar cuenta regresiva
          showCountdown(); // Función para la cuenta regresiva
        }, 1200); // Tiempo para agrandar el SVG
      }, totalDuration);
    }, 50);

    // Selecciona los corazones (formas rojas)
    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  })
  .catch(error => {
    console.error("Error cargando el SVG:", error);
  });


  // No hay cambios en el resto del flujo. Sigue igual:
  // Sección de interacciones, petalos, cuenta regresiva, etc.
}

function showDedicationText() {
  // Función para simular el efecto máquina de escribir
  const dedicationText = "Gracias por ser parte de este momento tan especial.";
  const dedicationElement = document.getElementById('dedication-text');
  let index = 0;

  function type() {
    if (index < dedicationText.length) {
      dedicationElement.innerHTML += dedicationText.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  type();
}

function startFloatingObjects() {
  // Función para simular los pétalos flotando o cualquier objeto flotante
  const petal = document.createElement('div');
  petal.classList.add('floating-object');
  document.body.appendChild(petal);

  // Simular movimiento de los objetos flotantes (pétalos, etc.)
  setInterval(() => {
    petal.style.transform = `translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px)`;
  }, 2000);
}

function showCountdown() {
  // Función para mostrar la cuenta regresiva
  let countdown = 10;
  const countdownElement = document.getElementById('countdown');
  countdownElement.innerHTML = countdown;

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.innerHTML = countdown;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = '¡Feliz día!';
    }
  }, 1000);
}

// Iniciar la experiencia al hacer clic en la pantalla de inicio
document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const mainContent = document.getElementById('main-content');

  function initExperience() {
    if (startScreen) startScreen.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    
    startMainExperience(); 
    
    // Esta llamada asegura que la música intente reproducirse justo después de que se descarte la pantalla de inicio.
    // playBackgroundMusic tiene su propia bandera 'musicInitialized'.
    playBackgroundMusic(); 
  }

  if (startScreen) {
    startScreen.addEventListener('click', initExperience, { once: true });
    startScreen.addEventListener('touchstart', initExperience, { once: true, passive: true });
  } else {
    // Fallback si no se encuentra start-screen
    initExperience();
  }
});

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function showDedicationText() {
  const dedicationText = document.getElementById('dedication-text');
  let text = "¡Gracias por ser parte de esta experiencia!";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      dedicationText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
}

// Funciones adicionales de animación
function startFloatingObjects() {
  // Aquí va el código para los objetos flotantes (pueden ser hojas o partículas)
  console.log("Los objetos están flotando.");
}

function showCountdown() {
  // Aquí va el código para mostrar la cuenta regresiva
  const countdownElement = document.getElementById('countdown');
  let count = 5;
  countdownElement.innerHTML = count;
  
  const interval = setInterval(() => {
    count--;
    countdownElement.innerHTML = count;
    if (count === 0) {
      clearInterval(interval);
      countdownElement.innerHTML = "¡Listo!";
    }
  }, 1000);
}

function playBackgroundMusic() {
  const audio = new Audio('path_to_your_background_music.mp3');
  audio.loop = true;
  audio.play();
  console.log("La música de fondo está sonando.");
}

// Función para obtener parámetros de la URL (si los necesitas)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { 
  let text = getURLParam('text');
  
  if (!text) {
    // Ahora agregamos la propiedad data-emoji para crear el duplicado
    text = `<span class="red-text">Para:</span><span class="emoji-border" data-emoji="🩵">🩵</span><span class="emoji-border" data-emoji="😍">😍</span><span class="texto-resaltado">Mi Amorcito Lindo</span><span class="emoji-border" data-emoji="😘">😘</span><span class="emoji-border" data-emoji="🤍">🤍</span>\n
    No hay distancia que nos separe, ni reloj que el fin marque;

    mi amor por ti sigue intacto, aunque en silencio yo me encuentre aquí.
    
    Te amo en cada rincón del día, en cada paso, en cada instante,
    
    aunque tus palabras me eviten, aunque tu mirada se haga distante.


    
    Me duele el alma verte distante,
    
    como si no importara el amor que por ti arde,
    
    y aunque mis palabras se ahogan en el aire,
    
    mi corazón no deja de llamarte.


    
    No recibir un "hola", ni saber de ti,
    
    me hace sentir vacío, me duele muy dentro… ¡SÍ, AQUÍ!👉🏼💔
    
    Pero, aunque el silencio me consume y la ausencia me reclama,
    
    mi amor por ti no decae; este amor nunca se acaba.

    Porque en mi mente sigues presente,
    
    aunque a veces no lo demuestre,
    
    yo te sigo eligiendo, aun en la agonía de cada palpitar,
    
    pues mi amor no pierde la calma, no deja de luchar.



    Quizá no entiendas lo que me duele,
    
    quizá no sepas que en mi alma duele el olvido,
    
    pero en mi corazón sigues siendo mi todo,
    
    y mi amor por ti nunca será un olvido..`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
/////TEXTO PRIMARIO
// No hay distancia que me aparte,
//         ni reloj que me limite;
//         te amo en cada instante,
//         aunque el abrazo se evite.

//         Y aunque me duela y se me parta el alma,
//         porque me tratas como si no te importara,
//         no recibo de ti un hola, ni un como estas,
//         el no poderte hablar me lastima,
//         me hace sentir desmayar y querer renunciar,
//         pero mi amor no pierde la calma,
//         ni deja de luchar más.

//         Porque sigues en mi mente,
//         aunque a veces no lo ves,
//         yo te elijo, fiel y fuerte,
//         una y otra y otra vez.
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  container.setAttribute('data-text', text);  // Asignamos el texto al atributo data-text
  let i = 0;

  function type() {
    if (i <= text.length) {
      container.innerHTML = text.slice(0, i); // Usamos innerHTML para procesar el HTML
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      // Al terminar el typing, mostrar la firma animada
      setTimeout(showSignature, 600);
    }
  }

  type();
}

// Firma manuscrita animada
// Firma manuscrita animada
function showSignature() {
  // Cambia para buscar la firma dentro del contenedor de dedicatoria
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  let firma = getURLParam('firma');
  const defaultText = "Con muchísimo\ncódigo y amor"; // Cambié esto a añadir un salto de línea
  const defaultSignature = "De: Tu Ángel"; // Cambié esto a "De: Tu Ángel" como ejemplo

  // Crea los elementos que se mostrarán en la firma
  const fullSignature = firma ? decodeURIComponent(firma) : `${defaultText}\n${defaultSignature}`;

  // Dividir el texto en dos partes: el mensaje de amor y la firma
  const parts = fullSignature.split("\n");

  // Limpiar el contenido anterior
  signature.innerHTML = '';

  // Crear el primer span para el texto de "Con muchísimo" y "código y amor"
  const loveAndCodePart = document.createElement('span');
  loveAndCodePart.innerHTML = parts[0] + '<br>' + parts[1]; // Añadir salto de línea entre "Con muchísimo" y "código y amor"
  loveAndCodePart.classList.add('love-and-code'); // Añadir la clase para estilos personalizados

  // Crear el segundo span para el texto "De:" (usando la clase .red-text-de)
  const dePart = document.createElement('span');
  dePart.textContent = parts[2].split(":")[0] + ":"; // El texto "De:"
  dePart.classList.add('red-text-de'); // Usamos la clase 'red-text-de'

  // Crear el tercer span para el nombre "Tu Ángel" (usando la clase .signature-name)
  const namePart = document.createElement('span');
  namePart.textContent = parts[2].split(":")[1]; // El nombre de la firma "Tu Ángel"
  namePart.classList.add('signature-name'); // Usamos la clase 'signature-name'

  // Añadir los spans a la firma
  signature.appendChild(loveAndCodePart); // Añadir el texto "Con muchísimo código y amor" con salto de línea
  signature.appendChild(document.createElement('br')); // Salto de línea
  signature.appendChild(dePart); // Añadir "De:"
  signature.appendChild(namePart); // Añadir el nombre "Tu Ángel"

  // Añadir la clase visible
  signature.classList.add('visible');

  // Espacio de 100px debajo de la firma (agregado por JS)
  signature.style.marginBottom = "160px";
}




// Controlador de objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    // Posición inicial
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    // Animación flotante
    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    // Eliminar después de animar
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    // Generar más objetos
    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}

function showCountdown() {
  const container = document.getElementById('countdown');
  
  // Fecha de inicio: 23 de febrero de 2025 a las 3:30 PM
  const startDate = new Date('2025-02-23T15:30:00');  // Fecha y hora de inicio

  function update() {
    const now = new Date();  // Hora actual
    let diff = now - startDate;  // Diferencia de tiempo entre ahora y la fecha de inicio

    // Si la fecha de inicio es en el pasado, mostramos el tiempo transcurrido
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));  // Días transcurridos
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);  // Horas transcurridas
    let minutes = Math.floor((diff / (1000 * 60)) % 60);  // Minutos transcurridos
    let seconds = Math.floor((diff / 1000) % 60);  // Segundos transcurridos

    // Actualiza el contenido del contenedor con el tiempo transcurrido
    container.innerHTML =
      `Llevamos juntos: <b>${days}d ${hours}h ${minutes}m ${seconds}s</b>`;
    
    // Hace visible el contenedor (en caso de que tuviera alguna animación o estilo)
    container.classList.add('visible');
  }

  update();  // Ejecuta inmediatamente al cargar la página
  setInterval(update, 1000);  // Actualiza cada segundo
}

//########################################INICIO AUTOMATICO DE LA CANCION AL QUITAR LA PANTALLA DE INICIO########################################

let musicInitialized = false; // Bandera para asegurar que la música se inicializa solo una vez

// --- Música de fondo ---
function playBackgroundMusic() {
  if (musicInitialized) return; // Si ya se inicializó, no hacer nada más
  musicInitialized = true;

  const audio = document.getElementById('bg-music');
  if (!audio) return;

  // --- Opción archivo local por parámetro 'musica' ---
  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    // Decodifica y previene rutas maliciosas
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
    audio.src = 'Music/' + musicaParam;
  }

  // --- Opción YouTube (solo mensaje de ayuda) ---
  let youtubeParam = getURLParam('youtube');
  if (youtubeParam) {
    // Muestra mensaje de ayuda para descargar el audio
    let helpMsg = document.getElementById('yt-help-msg');
    if (!helpMsg) {
      helpMsg = document.createElement('div');
      helpMsg.id = 'yt-help-msg';
      helpMsg.style.position = 'fixed';
      helpMsg.style.right = '18px';
      helpMsg.style.bottom = '180px';
      helpMsg.style.background = 'rgba(255,255,255,0.95)';
      helpMsg.style.color = '#e60026';
      helpMsg.style.padding = '10px 16px';
      helpMsg.style.borderRadius = '12px';
      helpMsg.style.boxShadow = '0 2px 8px #e6002633';
      helpMsg.style.fontSize = '1.05em';
      helpMsg.style.zIndex = 100;
      helpMsg.innerHTML = 'Para usar música de YouTube, descarga el audio (por ejemplo, usando y2mate, 4K Video Downloader, etc.), colócalo en la carpeta <b>Music</b> y usa la URL así:<br><br><code>?musica=nombre.mp3</code>';
      document.body.appendChild(helpMsg);
      setTimeout(() => { if (helpMsg) helpMsg.remove(); }, 15000);
    }
  }

  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn'; // El texto se establecerá después del intento de play
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
  }

  // Estado inicial del botón antes de intentar reproducir
  if (btn && audio.paused) btn.textContent = '▶️ Música';

  audio.volume = 0.7;
  audio.loop = true;

  let listenersAttached = false;

  // Función para intentar reproducir y actualizar el botón
  const tryPlayAudioAndUpdateButton = () => {
    if (audio.paused) {
      audio.play().then(() => {
        if (btn) btn.textContent = '🔊 Música';
        removeGeneralEventListeners(); // Usar el nombre correcto de la función
      }).catch(() => {
        if (btn) btn.textContent = '▶️ Música';
      });
    } else {
      // Si ya está sonando, asegurarse de que los listeners se hayan ido.
      if (btn) btn.textContent = '🔊 Música'; // Asegurar que el botón refleje el estado
      removeGeneralEventListeners(); // Usar el nombre correcto de la función
    }
  };

  // Manejador para la primera interacción general del usuario (click, touch, scroll)
  const handleGeneralInteraction = (event) => {
    const target = event.target;
    const treeContainer = document.getElementById('tree-container'); // El div que contiene el SVG
    const dedicationTextEl = document.getElementById('dedication-text');

    // 1. Ignorar si el evento es en el botón de música
    if (event && btn && (event.target === btn || btn.contains(event.target))) {
      return;
    }

    // 2. Condición para touchmove (ignorar si es un solo dedo deslizando sin ser scroll)
    if (event.type === 'touchmove' && (!event.touches || event.touches.length < 2)) {
        return;
    }

    // 3. Determinar si la interacción es válida para iniciar música
    let interactionShouldAttemptPlay = false;
    if (event.type === 'scroll') { // Scroll en la ventana
        interactionShouldAttemptPlay = true;
    } else if (event.type === 'click' || event.type === 'touchstart' || (event.type === 'touchmove' && event.touches && event.touches.length >=2) ) {
        // Para click, touchstart, o zoom (touchmove con >=2 dedos)
        if ((treeContainer && treeContainer.contains(target)) || // Dentro del SVG/su contenedor
            (dedicationTextEl && dedicationTextEl.contains(target)) || // Dentro de la dedicatoria
            target === document.body || target === document.documentElement) { // Clic/toque directo en body/html (fondo)
            interactionShouldAttemptPlay = true;
        }
    }

    if (!interactionShouldAttemptPlay) {
        return;
    }

    // Si es una interacción válida:
    if (audio.paused) {
      audio.play().then(() => {
        if (btn) btn.textContent = '🔊 Música';
        removeGeneralEventListeners(); 
      }).catch(() => {
        if (btn) btn.textContent = '▶️ Música';
        removeGeneralEventListeners(); // Quitar listeners incluso si este intento falla, para que solo el botón quede.
      });
    } else {
      removeGeneralEventListeners();
    }
  };

  const eventListenersConfig = [
    { target: document, type: 'click', handler: handleGeneralInteraction },
    { target: document, type: 'touchstart', handler: handleGeneralInteraction, options: { passive: true } },
    { target: window, type: 'scroll', handler: handleGeneralInteraction, options: { passive: true } },
    { target: document, type: 'touchmove', handler: handleGeneralInteraction, options: { passive: true } },
  ];

  const addGeneralEventListeners = () => {
    if (listenersAttached) return;
    eventListenersConfig.forEach(listener => {
      listener.target.addEventListener(listener.type, listener.handler, listener.options || false);
    });
    listenersAttached = true;
  };

  // Renombrar para claridad, ya que se usa arriba.
  const removeGeneralEventListeners = () => {
    eventListenersConfig.forEach(listener => {
      listener.target.removeEventListener(listener.type, listener.handler, listener.options || false);
    });
    listenersAttached = false;
  };

  // Intentar reproducir inmediatamente (autoplay)
  audio.play().then(() => {
    // Autoplay fue "exitoso" según el navegador (la promesa se resolvió)
    if (btn) btn.textContent = '🔊 Música';

    setTimeout(() => {
      if (audio.paused) {
        // Autoplay falló silenciosamente o el navegador lo pausó.
        if (btn) btn.textContent = '▶️ Música'; // Corregir el estado del botón
        addGeneralEventListeners();
      }
    }, 100); // Pequeño delay para verificar el estado real

  }).catch(() => {
    // Autoplay falló.
    if (btn) btn.textContent = '▶️ Música';
    // Adjuntar listeners para la primera interacción del usuario si el autoplay falla.
    addGeneralEventListeners();
  });

  // Lógica del botón de música
  if (btn) {
    btn.onclick = () => {
      if (audio.paused) {
        audio.play().then(() => { // El botón también usa la misma lógica de reproducción y limpieza
          if (btn) btn.textContent = '🔊 Música';
          removeGeneralEventListeners();
        }).catch(() => {
          if (btn) btn.textContent = '▶️ Música';
        });
      } else {
        audio.pause();
        btn.textContent = '🔈 Música';
      }
    };
  }
}

// ===============================
// CONFIGURACIÓN INICIAL
// ===============================

const orientationWarning = document.getElementById('orientation-warning');
const orientationVideo = document.getElementById('orientacionVideo');
const body = document.body;
const musica = document.getElementById('bg-music');

let musicaPausadaPorOrientacion = false;
let animacionesPausadas = false;
let escrituraActiva = false;
let intervaloEscritura = null;
let contenidoEscritura = "";
let indiceEscritura = 0;

const elementoTexto = document.getElementById("dedicatoria"); // Ajusta si tu ID es otro

// ===============================
// ESCRITURA TIPO MÁQUINA
// ===============================

function iniciarEscritura(textoCompleto) {
  contenidoEscritura = textoCompleto;
  indiceEscritura = 0;
  escrituraActiva = true;
  elementoTexto.innerHTML = "";

  intervaloEscritura = setInterval(() => {
    if (indiceEscritura < contenidoEscritura.length && !animacionesPausadas) {
      elementoTexto.innerHTML += contenidoEscritura.charAt(indiceEscritura);
      indiceEscritura++;
    } else {
      clearInterval(intervaloEscritura);
      escrituraActiva = false;
    }
  }, 100);
}

// Llama esta función después de mostrar la carta, por ejemplo:
// iniciarEscritura("Querida mamá, gracias por todo tu amor...");


// ===============================
// PAUSA GENERAL POR ORIENTACIÓN
// ===============================

function pausarTodoPorOrientacion() {
  orientationWarning.style.display = 'flex';
  body.classList.add('pausar-animaciones');

  // Pausar música
  if (musica && !musica.paused) {
    musica.pause();
    musicaPausadaPorOrientacion = true;
  }

  // Pausar escritura
  animacionesPausadas = true;

  // Detener animaciones con estilo
  document.querySelectorAll("*").forEach(el => {
    el.style.animationPlayState = "paused";
    el.style.transition = "none";
  });

  // Evitar interacción
  document.body.style.pointerEvents = 'none';
}

// ===============================
// REANUDAR AL VOLVER A HORIZONTAL
// ===============================

function reanudarTodoPorOrientacion() {
  orientationWarning.style.display = 'none';
  body.classList.remove('pausar-animaciones');

  // Restaurar interacción
  document.body.style.pointerEvents = 'auto';

  // Reanudar música si estaba pausada por orientación
  if (musicaPausadaPorOrientacion && musica) {
    try {
      musica.play();
    } catch (e) {
      console.warn("La música no se pudo reproducir automáticamente:", e);
    }
    musicaPausadaPorOrientacion = false;
  }

  // Reanudar escritura
  animacionesPausadas = false;

  if (escrituraActiva && intervaloEscritura === null) {
    iniciarEscritura(contenidoEscritura);
  }

  // Restaurar animaciones
  document.querySelectorAll("*").forEach(el => {
    el.style.animationPlayState = "running";
    el.style.transition = "";
  });
}

// ===============================
// VERIFICAR ORIENTACIÓN
// ===============================

function verificarOrientacion() {
  const esVertical = window.innerHeight > window.innerWidth;

  if (esVertical) {
    pausarTodoPorOrientacion();
  } else {
    reanudarTodoPorOrientacion();
  }
}

// ===============================
// EVENTOS
// ===============================

window.addEventListener("load", verificarOrientacion);
window.addEventListener("resize", verificarOrientacion);
window.addEventListener("orientationchange", verificarOrientacion);



//########################################Codigo original de respaldo########################################

// let musicInitialized = false; // Bandera para asegurar que la música se inicializa solo una vez

// // --- Música de fondo ---
// function playBackgroundMusic() {
//   if (musicInitialized) return; // Si ya se inicializó, no hacer nada más
//   musicInitialized = true;

//   const audio = document.getElementById('bg-music');
//   if (!audio) return;


//   // --- Opción archivo local por parámetro 'musica' ---
//   let musicaParam = getURLParam('musica');
//   if (musicaParam) {
//     // Decodifica y previene rutas maliciosas
//     musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
//     audio.src = 'Music/' + musicaParam;
//   } else {
//   }

//   // --- Opción YouTube (solo mensaje de ayuda) ---
//   let youtubeParam = getURLParam('youtube');
//   if (youtubeParam) {
//     // Muestra mensaje de ayuda para descargar el audio
//     let helpMsg = document.getElementById('yt-help-msg');
//     if (!helpMsg) {
//       helpMsg = document.createElement('div');
//       helpMsg.id = 'yt-help-msg';
//       helpMsg.style.position = 'fixed';
//       helpMsg.style.right = '18px';
//       helpMsg.style.bottom = '180px';
//       helpMsg.style.background = 'rgba(255,255,255,0.95)';
//       helpMsg.style.color = '#e60026';
//       helpMsg.style.padding = '10px 16px';
//       helpMsg.style.borderRadius = '12px';
//       helpMsg.style.boxShadow = '0 2px 8px #e6002633';
//       helpMsg.style.fontSize = '1.05em';
//       helpMsg.style.zIndex = 100;
//       helpMsg.innerHTML = 'Para usar música de YouTube, descarga el audio (por ejemplo, usando y2mate, 4K Video Downloader, etc.), colócalo en la carpeta <b>Music</b> y usa la URL así:<br><br><code>?musica=nombre.mp3</code>';
//       document.body.appendChild(helpMsg);
//       setTimeout(() => { if(helpMsg) helpMsg.remove(); }, 15000);
//     }
//   }

//   let btn = document.getElementById('music-btn');
//   if (!btn) {
//     btn = document.createElement('button');
//     btn.id = 'music-btn'; // El texto se establecerá después del intento de play
//     btn.style.position = 'fixed';
//     btn.style.bottom = '18px';
//     btn.style.right = '18px';
//     btn.style.zIndex = 99;
//     btn.style.background = 'rgba(255,255,255,0.85)';
//     btn.style.border = 'none';
//     btn.style.borderRadius = '24px';
//     btn.style.padding = '10px 18px';
//     btn.style.fontSize = '1.1em';
//     btn.style.cursor = 'pointer';
//     document.body.appendChild(btn);
//   }
//   // Estado inicial del botón antes de intentar reproducir
//   if (btn && audio.paused) btn.textContent = '▶️ Música';

//   audio.volume = 0.7;
//   audio.loop = true;

//   const removeGeneralInteractionListeners = () => {
//     eventListenersConfig.forEach(listener => {
//       listener.target.removeEventListener(listener.type, listener.handler, listener.options || false);
//     });
//     listenersAttached = false;
//   };
//   let listenersAttached = false;

//   // Función para intentar reproducir y actualizar el botón
//   const tryPlayAudioAndUpdateButton = () => {
//     if (audio.paused) {
//       audio.play().then(() => {
//         if (btn) btn.textContent = '🔊 Música';
//         removeGeneralEventListeners(); // Usar el nombre correcto de la función
//       }).catch(() => {
//         if (btn) btn.textContent = '▶️ Música';
//       });
//     } else {
//       // Si ya está sonando, asegurarse de que los listeners se hayan ido.
//       if (btn) btn.textContent = '🔊 Música'; // Asegurar que el botón refleje el estado
//       removeGeneralEventListeners(); // Usar el nombre correcto de la función
//     }
//   };

//   // Manejador para la primera interacción general del usuario (click, touch, scroll)
//   const handleGeneralInteraction = (event) => {
//     const target = event.target;
//     const treeContainer = document.getElementById('tree-container'); // El div que contiene el SVG
//     const dedicationTextEl = document.getElementById('dedication-text');

//     // 1. Ignorar si el evento es en el botón de música
//     if (event && btn && (event.target === btn || btn.contains(event.target))) {
//       return;
//     }

//     // 2. Condición para touchmove (ignorar si es un solo dedo deslizando sin ser scroll)
//     if (event.type === 'touchmove' && (!event.touches || event.touches.length < 2)) {
//         return;
//     }

//     // 3. Determinar si la interacción es válida para iniciar música
//     let interactionShouldAttemptPlay = false;
//     if (event.type === 'scroll') { // Scroll en la ventana
//         interactionShouldAttemptPlay = true;
//     } else if (event.type === 'click' || event.type === 'touchstart' || (event.type === 'touchmove' && event.touches && event.touches.length >=2) ) {
//         // Para click, touchstart, o zoom (touchmove con >=2 dedos)
//         if ((treeContainer && treeContainer.contains(target)) || // Dentro del SVG/su contenedor
//             (dedicationTextEl && dedicationTextEl.contains(target)) || // Dentro de la dedicatoria
//             target === document.body || target === document.documentElement) { // Clic/toque directo en body/html (fondo)
//             interactionShouldAttemptPlay = true;
//         }
//     }
    
//     if (!interactionShouldAttemptPlay) {
//         return;
//     }

//     // Si es una interacción válida:
//     if (audio.paused) {
//       audio.play().then(() => {
//         if (btn) btn.textContent = '🔊 Música';
//         removeGeneralEventListeners(); 
//       }).catch(() => {
//         if (btn) btn.textContent = '▶️ Música';
//         removeGeneralEventListeners(); // Quitar listeners incluso si este intento falla, para que solo el botón quede.
//       });
//     } else {
//       removeGeneralEventListeners();
//     }
//   };

//   const eventListenersConfig = [
//     { target: document, type: 'click', handler: handleGeneralInteraction },
//     { target: document, type: 'touchstart', handler: handleGeneralInteraction, options: { passive: true } },
//     { target: window, type: 'scroll', handler: handleGeneralInteraction, options: { passive: true } },
//     { target: document, type: 'touchmove', handler: handleGeneralInteraction, options: { passive: true } },
//   ];

//   const addGeneralEventListeners = () => {
//     if (listenersAttached) return;
//     eventListenersConfig.forEach(listener => {
//       listener.target.addEventListener(listener.type, listener.handler, listener.options || false);
//     });
//     listenersAttached = true;
//   };

//   // Renombrar para claridad, ya que se usa arriba.
//   const removeGeneralEventListeners = removeGeneralInteractionListeners;

//   // Intentar reproducir inmediatamente (autoplay)
//   audio.play().then(() => {
//     // Autoplay fue "exitoso" según el navegador (la promesa se resolvió)
//     if (btn) btn.textContent = '🔊 Música';


//     setTimeout(() => {
//       if (audio.paused) {
//         // Autoplay falló silenciosamente o el navegador lo pausó.
//         if (btn) btn.textContent = '▶️ Música'; // Corregir el estado del botón
//         addGeneralEventListeners();
//       } else {
//       }
//     }, 100); // Pequeño delay para verificar el estado real

//   }).catch(() => {
//     // Autoplay falló.
//     if (btn) btn.textContent = '▶️ Música';
//     // Adjuntar listeners para la primera interacción del usuario si el autoplay falla.
//     addGeneralEventListeners();
//   });

//   // Lógica del botón de música
//   if (btn) {
//     btn.onclick = () => {
//       if (audio.paused) {
//         audio.play().then(() => { // El botón también usa la misma lógica de reproducción y limpieza
//           if (btn) btn.textContent = '🔊 Música';
//           removeGeneralEventListeners();
//         }).catch(() => {
//           if (btn) btn.textContent = '▶️ Música';
//         });
//       } else {
//         audio.pause();
//         btn.textContent = '🔈 Música';
//       }
//     };
//   }
// }