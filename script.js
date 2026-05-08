AOS.init({
    duration: 1200,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});
lucide.createIcons();

// 1. Typewriter Effect
const nameToType = "Wanita Hebatku! 🌹";
let i = 0;
function typeWriter() {
    const el = document.getElementById('typewriter');
    if (el && i < nameToType.length) {
        el.innerHTML += nameToType.charAt(i);
        i++;
        setTimeout(typeWriter, 120);
    }
}

// 2. Optimized Rose Petals Rain
function createRosePetal() {
    const container = document.getElementById('rose-rain');
    if (!container) return;

    const petal = document.createElement('div');
    petal.classList.add('rose-petal');

    // Randomize properties
    const size = Math.random() * 15 + 10 + 'px';
    const startPos = Math.random() * 100 + 'vw';
    const duration = Math.random() * 4 + 5 + 's';
    const delay = Math.random() * 5 + 's';

    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = startPos;
    petal.style.animation = `fall ${duration} linear forwards`;
    petal.style.opacity = Math.random() * 0.5 + 0.3;

    container.appendChild(petal);

    // Cleanup
    setTimeout(() => petal.remove(), 8000);
}

// Munculkan kelopak secara bertahap
setInterval(createRosePetal, 400);

// 3. Music Toggle Logic
const music = document.getElementById('bgMusic');
const icon = document.getElementById('musicIcon');

const initAudio = () => {
    if (music && music.paused) {
        music.play().then(() => {
            if(icon) icon.setAttribute('data-lucide', 'pause');
            lucide.createIcons();
        }).catch(() => {});
    }
    document.removeEventListener('click', initAudio);
    document.removeEventListener('touchstart', initAudio);
};

document.addEventListener('click', initAudio);
document.addEventListener('touchstart', initAudio);

function toggleMusic() {
    if (!music || !icon) return;
    
    if (music.paused) {
        music.play();
        icon.setAttribute('data-lucide', 'pause');
    } else {
        music.pause();
        icon.setAttribute('data-lucide', 'music-2');
    }
    lucide.createIcons();
}

// 4. Progress Bar & Scroll Animation
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
});

// 5. Parallax Effect for Main Photo
document.addEventListener('mousemove', (e) => {
    const photo = document.querySelector('.main-photo');
    if (!photo) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    photo.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
});

// 6. Custom Cursor Trail
const dot = document.createElement('div');
dot.classList.add('cursor-dot');
document.body.appendChild(dot);

const outline = document.createElement('div');
outline.classList.add('cursor-outline');
document.body.appendChild(outline);

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Outline follows with a slight delay
    setTimeout(() => {
        outline.style.left = `${posX - 11}px`;
        outline.style.top = `${posY - 11}px`;
    }, 50);
});

// 3. Surprise Logic with Enhanced Confetti
function startSurprise() {
    const btn = document.getElementById('surpriseBtn');
    const overlay = document.getElementById('surpriseOverlay');

    btn.innerHTML = "Sending Love... 💖";
    btn.classList.add('opacity-80');

    // Confetti Burst
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
            colors: ['#db2777', '#f472b6', '#ffffff', '#fb7185']
        });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });

    setTimeout(() => {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        btn.innerHTML = "Kado Terkirim! ❤️";
    }, 1500);
}

function closeSurprise() {
    const overlay = document.getElementById('surpriseOverlay');
    overlay.classList.add('animate__fadeOut');
    setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex', 'animate__fadeOut');
    }, 500);
}

function showSecret() {
    const note = document.getElementById('secret-note');
    note.classList.toggle('hidden');
    if (!note.classList.contains('hidden')) {
        note.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Jalankan typewriter saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 500);
});

// 8. Friendship Timer
function updateFriendshipTimer() {
    // Tanggal jadian/pertemanan: 7 Agustus 2025 (bulan di JS dimulai dari 0, jadi Agustus = 7)
    // Format: YYYY, MM (0-indexed), DD
    const startDate = new Date(2025, 7, 7, 0, 0, 0).getTime();
    const now = new Date().getTime();
    
    // Perbedaan waktu dalam milidetik
    let difference = now - startDate;
    
    // Jika waktu saat ini belum mencapai 7 Agustus 2025
    if (difference < 0) difference = 0;

    // Kalkulasi waktu
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Menampilkan dengan format 2 digit
    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.innerHTML = days.toString().padStart(2, '0');
        hoursEl.innerHTML = hours.toString().padStart(2, '0');
        minutesEl.innerHTML = minutes.toString().padStart(2, '0');
        secondsEl.innerHTML = seconds.toString().padStart(2, '0');
    }
}

// Update timer setiap detik
setInterval(updateFriendshipTimer, 1000);
// Panggil sekali agar tidak menunggu 1 detik saat load
updateFriendshipTimer();