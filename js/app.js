const particlesContainer = document.getElementById('particles');
const particleCount = 35;
const shapes = ['🎈', '🎉', '🎂', '🎁', '✨', '💖', '🌸', '💫', '❤️'];

for (let i = 0; i < particleCount; i++) {
    createAmbientParticle();
}

/**
 * Función par crear las partículas (iconos) que subirán por el fondo de pantalla.
 */
function createAmbientParticle() {
    const particle = document.createElement('div');
    particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    particle.className = 'particle';

    // Random properties for organic feel
    const size = Math.random() * 20 + 10;
    particle.style.fontSize = size + 'px';
    particle.style.left = Math.random() * 100 + 'vw';

    const duration = Math.random() * 15 + 15; // 15s to 30s
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = (Math.random() * 10 - 5) + 's';

    particlesContainer.appendChild(particle);
}

/**
 * Función para abrir la caja de regalo y ejecutar las animaciones.
 */
function revealGift() {
    const gift = document.getElementById('giftWrapper');
    const card = document.getElementById('birthdayCard');
    const cakeScene = document.getElementById('cakeScene');

    // Add animation class
    gift.classList.add('opened');

    // Trigger spectacular burst
    triggerBurst(40); // Initial smaller burst

    // Transition to Cake scene
    setTimeout(() => {
        gift.style.display = 'none';
        card.classList.add('show');
        // startSlideshow(); // Pendiente de implementar.
    }, 1300);
}

/**
 * Función para hacer explotar la caja de regalo al presionar la caja.
 */
function triggerBurst(count) {
    const burstCount = 30;
    /* const burstCount = count || 60; */
    const burstEmojis = ['🎈', '🎉', '✨', '💖', '🎁', '🎊', '❤️'];
    for (let i = 0; i < burstCount; i++) {
        const burstItem = document.createElement('div');
        burstItem.className = 'burst-heart';
        burstItem.innerHTML = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];

        // Position at center
        burstItem.style.left = '50%';
        burstItem.style.top = '50%';
        burstItem.style.transform = 'translate(-50%, -50%)';
        burstItem.style.fontSize = (Math.random() * 25 + 15) + 'px';

        // Physics calculation for burst
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 80;
        const tx = Math.cos(angle) * velocity;
        // Add a gravity arc feel by shifting Y negative
        const ty = Math.sin(angle) * velocity - 150;

        burstItem.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1, offset: 0.2 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.8) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1800 + 1000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });

        document.body.appendChild(burstItem);

        // Cleanup
        setTimeout(() => burstItem.remove(), 2500);
    }
}


/**
 * Función para crear un carrusel de imagines que pasara de forma automática.
 * Queda pendiente de implementar.
 */
/********************************
let currentSlideIdx = 0;
function startSlideshow() {
    const slides = document.querySelectorAll('.slide-text');
    if (slides.length === 0) return;

    setInterval(() => {
        slides[currentSlideIdx].classList.remove('active');
        currentSlideIdx = (currentSlideIdx + 1) % slides.length;
        slides[currentSlideIdx].classList.add('active');
    }, 3500); // Change text every 3.5 seconds
}
********************************/


/**
 * Funciones para abrir y cerrar el modal con el mensaje.
 */
function openMessageModal() {
    document.getElementById('messageModal').classList.add('active');
}

function closeMessageModal() {
    document.getElementById('messageModal').classList.remove('active');
}

/**
 * Función para descargar el cupón
 */
function downloadCoupon() {
    const coupon = "./img/cupon.png"; // Ruta de la imagen

    const enlace = document.createElement("a");
    enlace.href = coupon;
    enlace.download = "regalo.jpg";

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}