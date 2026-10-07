// --- CONTADOR DE TIEMPO TRANSCURRIDO ---
// Cambia la fecha de inicio aquí (Año, Mes (0-11, ej: 11 es Diciembre), Día, Hora, Minuto)
const startDate = new Date(2024, 11, 5, 0, 0, 0);

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    // Cálculo aproximado de años y meses
    const years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    
    if (months < 0) {
        months += 12;
    }
    
    // Días transcurridos en el mes actual
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth(), startDate.getDate());
    const currentDays = Math.floor((now - lastMonthDate) / (1000 * 60 * 60 * 24));
    
    const displayDays = currentDays >= 0 ? currentDays : 0;
    const displayHours = hours % 24;
    const displayMinutes = minutes % 60;

    // Actualizar elementos en el HTML asegurando formato de 2 dígitos
    document.getElementById('years').innerText = String(years).padStart(2, '0');
    document.getElementById('months').innerText = String(months).padStart(2, '0');
    document.getElementById('days').innerText = String(displayDays).padStart(2, '0');
    document.getElementById('hours').innerText = String(displayHours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(displayMinutes).padStart(2, '0');
}

// Ejecutar cada segundo
setInterval(updateCounter, 1000);
updateCounter();


// --- REPRODUCTOR DE MÚSICA FLOTANTE ---
const audio = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audio.play().catch(e => console.log("Reproducción automática bloqueada por el navegador."));
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}


// --- FUNCIONES EXTRA (Descarga y Copiar Enlace) ---
function downloadQR() {
    alert("Aquí se descargará la imagen del código QR.");
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("¡Enlace copiado al portapapeles!");
}