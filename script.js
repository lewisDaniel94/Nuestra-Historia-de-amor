// --- CONTADOR DE TIEMPO TRANSCURRIDO ---
// Fecha de inicio: 5 de noviembre de 2024 (Mes 10 = Noviembre, ya que enero es 0)
const startDate = new Date(2024, 10, 5, 0, 0, 0);

function updateCounter() {
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();

    // Ajustar minutos negativos
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    // Ajustar horas negativas
    if (hours < 0) {
        hours += 24;
        days--;
    }

    // Ajustar días negativos tomando los días del mes anterior
    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    // Ajustar meses negativos
    if (months < 0) {
        months += 12;
        years--;
    }

    // Mostrar los resultados en el HTML asegurando 2 dígitos
    document.getElementById('years').innerText = String(years).padStart(2, '0');
    document.getElementById('months').innerText = String(months).padStart(2, '0');
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
}

// Ejecutar inmediatamente y luego cada segundo
updateCounter();
setInterval(updateCounter, 1000);


// --- REPRODUCTOR DE MÚSICA AUTOMÁTICO Y CONTROLADOR ---
const audio = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');

// Intentar reproducir automáticamente al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    audio.play().then(() => {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }).catch(error => {
        console.log("Reproducción automática bloqueada por el navegador. Esperando interacción.");
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    });
});

// Función para pausar o reproducir con el mismo botón
function togglePlay() {
    if (!audio.paused) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }).catch(e => console.log("Error al reproducir:", e));
    }
}


// --- FUNCIONES EXTRA (Descarga y Copiar Enlace) ---
// --- FUNCIÓN DE DESCARGA REAL DEL QR ---
function downloadQR() {
    const imageUrl = 'img/QR.png'; // Ruta de tu imagen QR
    const fileName = 'codigo-qr-nuestra-historia.png'; // Nombre que tendrá el archivo al descargarse
    
    // Crear un enlace temporal para forzar la descarga en el navegador
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("¡Enlace copiado al portapapeles!");
}

// --- MODAL DE IMÁGENES (ZOOM / LIGHTBOX) ---
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');

// Seleccionamos solo la foto de portada y los recuerdos (el QR ya no se amplía)
const clickableImages = document.querySelectorAll('.hero-bg-img, .memory-card img');

clickableImages.forEach(img => {
    img.style.cursor = 'pointer'; // Cambia el cursor para indicar que se puede hacer clic
    img.addEventListener('click', () => {
        modal.classList.add('show');
        modalImg.src = img.src;
    });
});

// Función para cerrar el modal al hacer clic en el fondo o en la X
function closeModal() {
    modal.classList.remove('show');
}

// --- DESBLOQUEO GLOBAL DE AUDIO CON EL PRIMER TOQUE ---
document.addEventListener('click', function unlockAudio() {
    if (audio.paused) {
        audio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            // Una vez que arranca, removemos el evento para que no se dispare en cada clic
            document.removeEventListener('click', unlockAudio);
        }).catch(e => console.log("Esperando interacción para reproducir", e));
    }
}, { once: true });