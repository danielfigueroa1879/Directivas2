// Background rotation for homepage
let backgroundImages = [
    'assets/images/foto (1).jpeg',
    'assets/images/foto (2).jpeg',
    'assets/images/foto (3).jpeg',
    'assets/images/foto (4).jpeg',
    'assets/images/foto (5).jpeg',
    'assets/images/foto (6).jpeg',
    'assets/images/foto (7).jpeg',
    'assets/images/foto (8).jpeg',
    'assets/images/foto (9).jpeg',
    'assets/images/foto (10).jpeg',
    'assets/images/foto (11).jpeg',
    'assets/images/foto (12).jpeg',
    'assets/images/foto (13).jpeg',
    'assets/images/foto (14).jpeg',
    'assets/images/foto (15).jpeg',
    'assets/images/foto (16).jpeg',
    'assets/images/foto (17).jpeg',
    'assets/images/foto (18).jpeg',
    'assets/images/foto (19).jpeg'
];

let currentImageIndex = 0;

function rotateBackground() {
    const homepageSection = document.getElementById('homepage-section');
    if (homepageSection && document.body.classList.contains('homepage')) {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        homepageSection.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    }
}

// Start background rotation every 12 seconds for homepage
setInterval(rotateBackground, 12000);

// Functions to switch between sections
function showHomepage() {
    document.getElementById('homepage-section').style.display = 'flex';
    document.getElementById('homepage-content-wrapper').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    document.getElementById('contenido').style.display = 'none';
    
    document.body.className = 'homepage background-transition';
    
    const homepageSection = document.getElementById('homepage-section');
    homepageSection.style.backgroundImage = `url('${backgroundImages[0]}')`;
    currentImageIndex = 0;
    
    document.getElementById('credenciales-arrow-back-btn').classList.add('hidden');
    
    window.scrollTo(0, 0);
}

function showDirectiva() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('credenciales-section').classList.remove('active');
    
    document.body.className = '';
    
    document.getElementById('credenciales-arrow-back-btn').classList.remove('hidden');
    
    window.scrollTo(0, 0);
}

function showCredenciales() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('credenciales-section').classList.add('active');
    
    document.body.className = '';
    
    document.getElementById('credenciales-arrow-back-btn').classList.remove('hidden');

    window.scrollTo(0, 0);
}

function openLink(url) {
    window.open(url, '_blank');
    closeTramitesMenu();
}

// Functions for the new tramites menu
function handleCerofilas() {
    window.open('https://dal5.short.gy/CFil', '_blank');
    closeTramitesMenu();
}

function handleDirectiva() {
    showDirectiva();
    closeTramitesMenu();
}

function handleCredenciales() {
    showCredenciales();
    closeTramitesMenu();
}

function handleCredencialIndependiente() {
    const independienteLink = document.querySelector('.indep-btn');
    if (independienteLink && independienteLink.href) {
        window.open(independienteLink.href, '_blank');
    }
    closeTramitesMenu();
}

function handleValores() {
    const valoresLink = document.getElementById('valoresImageLink');
    if (valoresLink && valoresLink.href) {
        window.open(valoresLink.href, '_blank');
    }
    closeTramitesMenu();
}

function handleValorPlan() {
    window.open('https://os10.short.gy/Pl4n', '_blank');
    closeTramitesMenu();
}

function handleCursoFormacion() {
    window.open('https://dal5.short.gy/Form', '_blank');
    closeTramitesMenu();
}

function showTramitesMenu() {
    const dropdown = document.getElementById('tramites-dropdown');
    const arrow = document.getElementById('tramites-arrow');
    const menuBtn = document.getElementById('tramites-menu-btn');
    
    dropdown.classList.remove('hidden');
    arrow.style.transform = 'rotate(180deg)';
    menuBtn.classList.add('panel-active');
}

function closeTramitesMenu() {
    const dropdown = document.getElementById('tramites-dropdown');
    const arrow = document.getElementById('tramites-arrow');
    const menuBtn = document.getElementById('tramites-menu-btn');
    
    dropdown.classList.add('hidden');
    arrow.style.transform = 'rotate(0deg)';
    menuBtn.classList.remove('panel-active');
}



// Event listeners for menu and other elements
document.addEventListener('DOMContentLoaded', () => {
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn.parentElement;
    let tramitesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // Click logic for touch devices
        if (tramitesMenuBtn) {
            tramitesMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = tramitesDropdown.classList.contains('hidden');
                if (isHidden) {
                    showTramitesMenu();
                } else {
                    closeTramitesMenu();
                }
            });
        }
    } else {
        // Hover logic for non-touch devices
        if (tramitesContainer) {
            tramitesContainer.addEventListener('mouseenter', () => {
                clearTimeout(tramitesTimeout);
                showTramitesMenu();
            });
            tramitesContainer.addEventListener('mouseleave', () => {
                tramitesTimeout = setTimeout(closeTramitesMenu, 200);
            });
        }
    }

    // Close menu when clicking outside, but not inside the dropdown
    window.addEventListener('click', (e) => {
        if (!tramitesContainer.contains(e.target)) {
            closeTramitesMenu();
        }
    });

    // Keep the menu open when the mouse enters the dropdown itself
    if (tramitesDropdown) {
        tramitesDropdown.addEventListener('mouseenter', () => {
            clearTimeout(tramitesTimeout);
        });
        tramitesDropdown.addEventListener('mouseleave', () => {
            tramitesTimeout = setTimeout(closeTramitesMenu, 200);
        });
    }

    // Original independent button logic
    const independentButton = document.querySelector('.indep-btn');
    if (independentButton) {
        setInterval(() => {
            independentButton.classList.add('bounce-animation');
            setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);

        setTimeout(() => {
            independentButton.classList.add('bounce-animation');
            setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 3000);
    }

    // Automatic PDF download when clicking "valores.png" image
    const valoresImageLink = document.getElementById('valoresImageLink');
    if (valoresImageLink) {
        valoresImageLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const pdfUrl = valoresImageLink.href;
            const fileName = valoresImageLink.download || 'documento.pdf';

            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            console.log(`Attempting to download: ${fileName} from ${pdfUrl}`);
        });
    }

    // Event listener for OS10 Home Button (in banner)
    document.getElementById('os10-home-btn').addEventListener('click', showHomepage);
    
    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    };

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // --- Open chatbot on hover ---
    const chatToggleButton = document.getElementById('chat-toggle-button');
    if (chatToggleButton) {
        chatToggleButton.addEventListener('mouseenter', () => {
            const popup = document.getElementById('chat-popup');
            if (popup.classList.contains('hidden')) {
                const backdrop = document.getElementById('chat-backdrop');
                const button = document.getElementById('chat-toggle-button');
                
                popup.classList.remove('hidden');
                backdrop.classList.remove('hidden');
                button.classList.add('hidden');
            }
        });
    }
    /* ===== ESTILOS MEJORADOS PARA SUBMENU (FLYOUT) ===== */
.dropdown-menu .has-submenu {
    position: relative;
}

.dropdown-menu .submenu {
    position: absolute;
    top: -8px; /* Align with the top of the parent button */
    left: 100%; /* Position it to the right of the parent */
    width: 280px; /* Slightly wider for better content */
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 0 12px 12px 12px;
    box-shadow: 15px 0 35px rgba(0, 0, 0, 0.15);
    z-index: 1300; /* Higher than the main dropdown */
    display: none; /* Hidden by default */
    padding: 12px 0; /* Add some padding */
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
}

/* Show submenu on hover or active state */
.dropdown-menu .has-submenu:hover > .submenu,
.dropdown-menu .has-submenu.submenu-active > .submenu {
    display: block;
    opacity: 1;
    transform: translateX(0);
}

/* Style for the submenu parent button */
.dropdown-menu .has-submenu > button {
    position: relative;
}

.dropdown-menu .has-submenu > button::after {
    content: '▸'; /* Right-pointing arrow */
    position: absolute;
    right: 15px;
    font-size: 1.1em;
    transition: transform 0.2s ease;
    color: rgba(59, 130, 246, 0.7);
}

.dropdown-menu .has-submenu:hover > button::after,
.dropdown-menu .has-submenu.submenu-active > button::after {
    transform: rotate(0deg);
    color: rgba(37, 99, 235, 1);
}

/* Submenu buttons styling */
.dropdown-menu .submenu button {
    width: 100%;
    text-align: left;
    padding: 12px 20px;
    font-size: 0.85rem;
    color: rgba(31, 41, 55, 0.9);
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(229, 231, 235, 0.2);
    transform: translateX(0);
}

.dropdown-menu .submenu button:last-child {
    border-bottom: none;
}

.dropdown-menu .submenu button:hover {
    background-color: rgba(34, 197, 94, 0.15);
    color: rgba(22, 163, 74, 1);
    transform: translateX(6px);
    padding-left: 26px;
    backdrop-filter: blur(15px);
}

.dropdown-menu .submenu button:active {
    transform: translateX(3px);
    background-color: rgba(34, 197, 94, 0.25);
}

/* Active state for parent button when submenu is open */
.dropdown-menu .has-submenu.submenu-active > button {
    background-color: rgba(59, 130, 246, 0.15);
    color: rgba(37, 99, 235, 1);
}

/* Animation for submenu items */
.dropdown-menu .submenu button {
    animation: slideInFromLeft 0.3s ease both;
}

@keyframes slideInFromLeft {
    from {
        transform: translateX(-15px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Staggered animation for submenu items */
.dropdown-menu .submenu button:nth-child(1) { animation-delay: 0.05s; }
.dropdown-menu .submenu button:nth-child(2) { animation-delay: 0.1s; }
.dropdown-menu .submenu button:nth-child(3) { animation-delay: 0.15s; }
.dropdown-menu .submenu button:nth-child(4) { animation-delay: 0.2s; }
.dropdown-menu .submenu button:nth-child(5) { animation-delay: 0.25s; }
.dropdown-menu .submenu button:nth-child(6) { animation-delay: 0.3s; }
.dropdown-menu .submenu button:nth-child(7) { animation-delay: 0.35s; }
.dropdown-menu .submenu button:nth-child(8) { animation-delay: 0.4s; }
.dropdown-menu .submenu button:nth-child(9) { animation-delay: 0.45s; }
.dropdown-menu .submenu button:nth-child(10) { animation-delay: 0.5s; }
.dropdown-menu .submenu button:nth-child(11) { animation-delay: 0.55s; }
.dropdown-menu .submenu button:nth-child(12) { animation-delay: 0.6s; }

/* Adjust submenu for smaller screens */
@media (max-width: 1024px) {
    .dropdown-menu .submenu {
        left: 100%;
        border-radius: 0 12px 12px 0;
        top: 0;
        width: 260px;
    }
}

@media (max-width: 640px) {
    .dropdown-menu .submenu {
        width: 240px;
    }
    
    .dropdown-menu .submenu button {
        padding: 10px 16px;
        font-size: 0.8rem;
    }
    
    .dropdown-menu .submenu button:hover {
        transform: translateX(4px);
        padding-left: 20px;
    }
}

/* Improve visibility with better glass effect */
.dropdown-menu .submenu::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        135deg, 
        rgba(255, 255, 255, 0.2) 0%, 
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.2) 100%
    );
    pointer-events: none;
    z-index: -1;
}

/* Scrollbar for submenu if needed */
.dropdown-menu .submenu::-webkit-scrollbar {
    width: 3px;
}

.dropdown-menu .submenu::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
}

.dropdown-menu .submenu::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.6);
    border-radius: 2px;
}

.dropdown-menu .submenu::-webkit-scrollbar-thumb:hover {
    background: rgba(22, 163, 74, 0.8);
}

    // Initialize homepage view
    showHomepage();
});
