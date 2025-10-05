// Background rotation for homepage
let backgroundImages = [
    'assets/images/foto (1).webp',
    'assets/images/foto (2).webp',
    'assets/images/foto (3).webp',
    'assets/images/foto (4).webp',
    'assets/images/foto (5).webp',
    'assets/images/foto (6).webp',
    'assets/images/foto (7).webp',
    'assets/images/foto (8).webp',
    'assets/images/foto (9).webp',
    'assets/images/foto (10).webp',
    'assets/images/foto (11).webp',
    'assets/images/foto (12).webp',
    'assets/images/foto (13).webp',
    'assets/images/foto (14).webp',
    'assets/images/foto (15).webp',
    'assets/images/foto (16).webp',
    'assets/images/foto (17).webp',
    'assets/images/foto (18).webp',
    'assets/images/foto (19).webp',
    'assets/images/foto (20).webp',
    'assets/images/foto (21).webp',
    'assets/images/foto (223).webp', /* Se reemplaza foto (22).webp por una existente */
    'assets/images/foto (224).webp', /* Se reemplaza foto (23).webp por una existente */
    'assets/images/foto (226).webp', /* Se reemplaza foto (24).webp por una existente */
    'assets/images/foto (2333).webp' /* Se reemplaza foto (25).webp por una existente */
];

let currentImageIndex = 0;
let rotationStarted = false; // Flag para controlar el inicio del carrusel

function rotateBackground() {
    const homepageSection = document.getElementById('homepage-section');
    if (homepageSection && document.body.classList.contains('homepage') && rotationStarted) {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        
        // Preload y fade in de la siguiente imagen
        const nextImageUrl = backgroundImages[currentImageIndex];
        const nextImage = new Image();
        nextImage.src = nextImageUrl;
        
        nextImage.onload = () => {
            // Aplicar la nueva imagen solo después de que haya cargado
            homepageSection.style.backgroundImage = `url('${nextImageUrl}')`;
            console.log(`🖼️ Fondo rotado a: ${nextImageUrl}`);
        };
    }
}

// Start background rotation every 12 seconds
// Se llama por primera vez después de un retraso para no bloquear el LCP
setTimeout(() => {
    rotationStarted = true;
    // La rotación inicializa el carrusel DESPUÉS de 12 segundos
    setInterval(rotateBackground, 12000); 
    console.log('🔄 Carrusel de imágenes programado para iniciar en 12 segundos.');
}, 100); // Pequeño retraso para asegurar que el LCP pase primero.


// Functions to switch between sections (called by main.js or HTML)
function showHomepage() {
    document.getElementById('homepage-section').style.display = 'flex';
    document.getElementById('homepage-content-wrapper').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    document.getElementById('contenido').style.display = 'none';
    document.body.className = 'homepage background-transition';
    const homepageSection = document.getElementById('homepage-section');
    if (homepageSection) {
        // Asegura que la imagen inicial pre-cargada sea la primera
        homepageSection.style.backgroundImage = `url('${backgroundImages[0]}')`;
    }
    currentImageIndex = 0;
    rotationStarted = true; // Permite que el carrusel siga funcionando
    document.getElementById('credenciales-arrow-back-btn')?.classList.add('hidden');
    window.scrollTo(0, 0);
}

function showDirectiva() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('credenciales-section')?.classList.remove('active');
    document.body.className = '';
    document.getElementById('credenciales-arrow-back-btn')?.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showCredenciales() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('credenciales-section')?.classList.add('active');
    document.body.className = '';
    document.getElementById('credenciales-arrow-back-btn')?.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Handlers para los enlaces del menú
function handleCerofilas() { window.open('https://dal5.short.gy/CFil', '_blank'); }
function handleDirectiva() { showDirectiva(); }
function handleCredenciales() { showCredenciales(); }
function handleCredencialIndependiente() {
    const link = document.querySelector('.indep-btn');
    if (link) window.open(link.href, '_blank');
}
function handleValores() {
    const link = document.getElementById('valoresImageLink');
    if (link) window.open(link.href, '_blank');
}
function handleValorPlan() { window.open('https://os10.short.gy/Pl4n', '_blank'); }
function handleCursoFormacion() { window.open('https://dal5.short.gy/Form', '_blank'); }
function handleBuscarCurso(url) { window.open(url, '_blank'); } // Función para abrir enlaces del menú

document.addEventListener('DOMContentLoaded', () => {
    // Non-menu related listeners and initializers
    document.getElementById('os10-home-btn')?.addEventListener('click', showHomepage);

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        };
        backToTopButton.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }

    showHomepage();
});
