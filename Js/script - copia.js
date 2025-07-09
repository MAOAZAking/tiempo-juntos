//© Zero - Código libre no comercial


// Cargar el SVG y animar los corazones
fetch('Img/treelove-new.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    // Animación de "dibujo" para todos los paths
    const allPaths = Array.from(svg.querySelectorAll('path'));
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
          showDedicationText();
          // Mostrar petalos flotando
          startFloatingObjects();
          // Mostrar cuenta regresiva
          showCountdown();
          // Iniciar música de fondo
          playBackgroundMusic();
        }, 1200); //Tiempo para agrandar el SVG
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
  });

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { 
  let text = getURLParam('text');
  
  if (!text) {
    // Ahora agregamos la propiedad data-emoji para crear el duplicado
    text = `<span class="red-text">Para:</span><span class="emoji-border" data-emoji="🩵">🩵</span><span class="emoji-border" data-emoji="😍">😍</span><span class="texto-resaltado"> Mi Amorcito Lindo </span><span class="emoji-border" data-emoji="😘">😘</span><span class="emoji-border" data-emoji="🤍">🤍</span>\n
    No hay distancia que nos separe, ni reloj que el fin marque,
    mi amor por ti sigue intacto, aunque en silencio yo me encuentre aquí.
    Te amo en cada rincón del día, en cada paso, en cada instante,
    aunque tus palabras me eviten, aunque tu mirada se haga distante.
    Me duele el alma verte distante,
    como si no importara el amor que por ti arde,
    y aunque mis palabras se ahogan en el aire,
    mi corazón no deja de llamarte.
    No recibir un hola, ni saber de ti,
    me hace sentir vacío, me duele muy dentro, ¡SÍ AQUÍ!👉🏼💔
    pero aunque el silencio me consume y la ausencia me reclama,
    mi amor por ti no decae, este amor nunca se acaba.
    Porque en mi mente sigues presente,
    aunque a veces no lo demuestre,
    yo te sigo eligiendo, aun en la agodia de cada parpitar,
    pues mi amor no pierde la calma, no deja de luchar.
    Quizá no entiendas lo que me duele,
    quizá no sepas que en mi alma duele el olvido,
    pero en mi corazón sigues siendo mi todo,
    y mi amor por ti nunca será un olvido.`;
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
  signature.textContent = firma ? decodeURIComponent(firma) : "Con mucho amor y esfuerzo: Tu Ángel";
  signature.classList.add('visible');
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

// // Cuenta regresiva o fecha especial
// function showCountdown() {
//   const container = document.getElementById('countdown');
  
//   // Obtiene los parámetros start y event de la URL (si los hay)
//   let startParam = getURLParam('start');
//   let eventParam = getURLParam('event');
  
//   // Si no hay parámetro 'start', por defecto es el 23 de febrero de 2025 a las 3 PM
//   let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2025-02-23T15:00:00');
  
//   // Si no hay parámetro 'event', por defecto es el 3 de agosto de 2025
//   let eventDate = eventParam ? new Date(eventParam + 'T00:00:00') : new Date('2025-08-03T00:00:00');

//   function update() {
//     const now = new Date();  // Hora actual

//     // Calcula la diferencia de tiempo entre la fecha actual y la fecha de inicio
//     let diff = now - startDate;
    
//     // Si la fecha de inicio es en el futuro, mostramos el tiempo restante
//     if (diff < 0) {
//       let eventDiff = startDate - now;
//       let eventDays = Math.max(0, Math.floor(eventDiff / (1000 * 60 * 60 * 24)));  // Días hasta la fecha de inicio
//       let eventHours = Math.max(0, Math.floor((eventDiff / (1000 * 60 * 60)) % 24));  // Horas hasta la fecha de inicio
//       let eventMinutes = Math.max(0, Math.floor((eventDiff / (1000 * 60)) % 60));  // Minutos hasta la fecha de inicio
//       let eventSeconds = Math.max(0, Math.floor((eventDiff / 1000) % 60));  // Segundos hasta la fecha de inicio

//       container.innerHTML =
//         `Faltan para estar juntos: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b><br>` +
//         `Nuestro aniversario: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;
//     } 
//     else {
//       // Si ya pasó la fecha de inicio, mostramos el tiempo transcurrido
//       let days = Math.floor(diff / (1000 * 60 * 60 * 24));  // Días transcurridos
//       let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);  // Horas transcurridas
//       let minutes = Math.floor((diff / (1000 * 60)) % 60);  // Minutos transcurridos
//       let seconds = Math.floor((diff / 1000) % 60);  // Segundos transcurridos

//       container.innerHTML =
//         `Llevamos juntos: <b>${days}d ${hours}h ${minutes}m ${seconds}s</b><br>` +
//         `Nuestro aniversario: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;
//     }

//     // Hace visible el contenedor (en caso de que tuviera alguna animación o estilo)
//     container.classList.add('visible');
//   }

//   update();  // Ejecuta inmediatamente al cargar la página
//   setInterval(update, 1000);  // Actualiza cada segundo
// }
//////////////////////////////////////////////////////
// function showCountdown() {
//   const container = document.getElementById('countdown');
  
//   // Definir la fecha de destino: 30 de junio a las 2 PM
//   const targetDate = new Date('2025-06-30T14:00:00');  // Fecha y hora destino

//   function update() {
//     const now = new Date();  // Hora actual
//     let diff = targetDate - now;  // Diferencia de tiempo entre ahora y el 30 de junio a las 2 PM

//     // Si la fecha ya pasó, mostramos un mensaje (por ejemplo: "El evento ya ocurrió")
//     if (diff <= 0) {
//       container.innerHTML = "¡La cuenta regresiva ha terminado!";
//       container.classList.add('visible');
//       return;
//     }

//     // Calcula la diferencia en días, horas, minutos y segundos
//     let days = Math.floor(diff / (1000 * 60 * 60 * 24));  // Días restantes
//     let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);  // Horas restantes
//     let minutes = Math.floor((diff / (1000 * 60)) % 60);  // Minutos restantes
//     let seconds = Math.floor((diff / 1000) % 60);  // Segundos restantes

//     // Actualiza el contenido del contenedor con el tiempo restante
//     container.innerHTML =
//       `Faltan: <b>${days}d ${hours}h ${minutes}m ${seconds}s</b> para el evento.`;

//     // Hace visible el contenedor (en caso de que tuviera alguna animación o estilo)
//     container.classList.add('visible');
//   }

//   update();  // Ejecuta inmediatamente al cargar la página
//   setInterval(update, 1000);  // Actualiza cada segundo
// }
///////////////////////////////////////////////////////////////////////////////////////////////////
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


// --- Música de fondo ---
function playBackgroundMusic() {
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
      setTimeout(() => { if(helpMsg) helpMsg.remove(); }, 15000);
    }
  }

  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
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
  audio.volume = 0.7;
  audio.loop = true;
  // Intentar reproducir inmediatamente
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    // Si falla el autoplay, esperar click en el botón
    btn.textContent = '▶️ Música';
  });
  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}

// Intentar reproducir la música lo antes posible (al cargar la página)
window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
});