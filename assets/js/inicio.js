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

// Variables para submenu
let activeSubmenu = null;
let hideSubmenuTimeout = null;
let currentTriggerButton = null;

// Tiempos de retardo optimizados para estabilidad en PC (Fix Flicker)
const HIDE_TIMEOUT_MS = 300;
const SHOW_TIMEOUT_MS = 50;
let mainMenuTimeout = null;


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

function showTramitesMenu() {
    const dropdown = document.getElementById('tramites-dropdown');
    const arrow = document.getElementById('tramites-arrow');
    const menuBtn = document.getElementById('tramites-menu-btn');
    
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        arrow.style.transform = 'rotate(180deg)';
        menuBtn.classList.add('panel-active');
    }
}

function closeTramitesMenu() {
    const dropdown = document.getElementById('tramites-dropdown');
    const arrow = document.getElementById('tramites-arrow');
    const menuBtn = document.getElementById('tramites-menu-btn');
    
    if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
        menuBtn.classList.remove('panel-active');
    }
    
    // También ocultar submenu al cerrar menú principal
    hideSubmenu();
}

// Functions for the tramites menu
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

function openLink(url) {
    window.open(url, '_blank');
    closeTramitesMenu();
    hideSubmenu();
}

// === SISTEMA DE SUBMENU ESTABLE ===

/**
 * Función para mostrar un submenú flotante.
 * @param {HTMLElement} triggerButton - El botón que activa el submenú.
 */
function showSubmenu(triggerButton) {
    
    clearTimeout(hideSubmenuTimeout);
    
    const submenuTemplate = triggerButton.parentElement.querySelector('.submenu');
    
    if (!submenuTemplate) {
        return;
    }
    
    if (activeSubmenu && currentTriggerButton === triggerButton) {
        return;
    }

    hideSubmenu();

    const triggerRect = triggerButton.getBoundingClientRect();
    const dropdownMenu = document.getElementById('tramites-dropdown');
    const dropdownRect = dropdownMenu.getBoundingClientRect();

    activeSubmenu = submenuTemplate.cloneNode(true);
    
    activeSubmenu.classList.remove('hidden');
    activeSubmenu.classList.add('show');
    
    document.body.appendChild(activeSubmenu);

    // Cálculo de posición para PC
    let leftPosition = dropdownRect.right + 15;
    let topPosition = triggerRect.top; // Usamos el top exacto del trigger

    const submenuWidth = 280;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const submenuHeight = 450;
    
    // 1. Ajuste horizontal (si se sale por la derecha)
    if (leftPosition + submenuWidth > windowWidth) {
        leftPosition = dropdownRect.left - submenuWidth - 15;
    }

    // 2. Ajuste vertical (si se sale por abajo)
    if (topPosition + submenuHeight > windowHeight) {
        // Mueve hacia arriba, alineando la parte inferior del submenú con la parte inferior del trigger
        topPosition = Math.max(triggerRect.bottom - submenuHeight, 50); 
    }

    // 3. Centrado/posición para Móviles (si aplica)
    if (window.innerWidth <= 1024) {
        leftPosition = (windowWidth - submenuWidth) / 2;
        topPosition = Math.max(100, topPosition);
    }

    // Aplicar estilos
    const stylesToApply = {
        position: 'fixed',
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
        zIndex: '1350',
        opacity: '1',
        visibility: 'visible',
        pointerEvents: 'auto',
        transform: 'translateX(0) scale(1)',
        width: `${submenuWidth}px`,
    };
    
    Object.assign(activeSubmenu.style, stylesToApply);

    currentTriggerButton = triggerButton;

    // AÑADIR ESCUCHAS AL SUBMENÚ CLONADO PARA QUE NO SE CIERRE AL ENTRAR EN ÉL
    activeSubmenu.addEventListener('mouseenter', () => {
        clearTimeout(hideSubmenuTimeout);
        clearTimeout(mainMenuTimeout);
    });

    activeSubmenu.addEventListener('mouseleave', () => {
        // Al salir del submenú clonado, iniciar el cierre de ambos menús
        hideSubmenuTimeout = setTimeout(hideSubmenu, HIDE_TIMEOUT_MS);
        
        const tramitesContainer = document.getElementById('tramites-menu-btn')?.parentElement;
        if (tramitesContainer) {
            mainMenuTimeout = setTimeout(closeTramitesMenu, HIDE_TIMEOUT_MS);
        }
    });
}

// Función para ocultar submenu
function hideSubmenu() {
    if (activeSubmenu) {
        try {
            if (document.body.contains(activeSubmenu)) {
                document.body.removeChild(activeSubmenu);
            }
        } catch (e) {
            // Ignorar
        }
        activeSubmenu = null;
        currentTriggerButton = null;
    }
    clearTimeout(hideSubmenuTimeout);
}

// Función para configurar triggers de submenú (solo para elementos con .has-submenu)
function setupSubmenuTriggers() {
    
    // Solo seleccionar los botones que están inmediatamente dentro de un .has-submenu
    const submenuTriggers = document.querySelectorAll('.has-submenu > button');
    
    if (submenuTriggers.length === 0) {
        return;
    }
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    submenuTriggers.forEach((trigger) => {
        
        const hasSubmenu = trigger.parentElement.querySelector('.submenu');
        
        if (!hasSubmenu) {
            return;
        }
        
        // Clonar para limpiar listeners
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        if (!isTouchDevice) {
            // Desktop: hover estable
            
            newTrigger.addEventListener('mouseenter', (e) => {
                clearTimeout(hideSubmenuTimeout);
                // Retardo mínimo para mostrar el submenú y evitar el flicker si se pasa rápido
                setTimeout(() => showSubmenu(e.currentTarget), SHOW_TIMEOUT_MS);
            });
            
            newTrigger.addEventListener('mouseleave', () => {
                // Inicia el retardo para ocultar el submenú
                hideSubmenuTimeout = setTimeout(hideSubmenu, HIDE_TIMEOUT_MS);
            });
        } else {
            // Móvil: click
            
            newTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                showSubmenu(e.currentTarget);
            });
        }
    });
}

// Función de limpieza global
function setupGlobalListeners() {
    
    // Click fuera (cierra todos los menús si el click no está en un menú)
    document.addEventListener('click', (e) => {
        const tramitesDropdown = document.getElementById('tramites-dropdown');
        const isMenuClick = tramitesDropdown && tramitesDropdown.contains(e.target);
        
        if (activeSubmenu && !activeSubmenu.contains(e.target)) {
            hideSubmenu();
        }
        
        if (tramitesDropdown && !isMenuClick) {
            closeTramitesMenu();
        }
    });

    // Scroll y Resize
    const closeOnEvent = () => {
        if (activeSubmenu) {
            hideSubmenu();
        }
        closeTramitesMenu();
    };
    
    window.addEventListener('scroll', closeOnEvent);
    window.addEventListener('resize', closeOnEvent);
}

// Función de inicialización completa
function initializeSubmenuSystem() {
    
    // Configurar triggers (con un pequeño retardo para asegurar que el DOM esté listo)
    setTimeout(() => {
        setupSubmenuTriggers();
    }, 600);
    
    // Configurar listeners globales
    setTimeout(() => {
        setupGlobalListeners();
    }, 700);
    
    // Observador para cambios en el DOM
    const observer = new MutationObserver(() => {
        setTimeout(setupSubmenuTriggers, 100);
    });
    
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    if (tramitesDropdown) {
        observer.observe(tramitesDropdown, { childList: true, subtree: true });
    }
}

// DOMContentLoaded principal
document.addEventListener('DOMContentLoaded', () => {
    
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn?.parentElement;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Main Menu Logic (Hover más estable) ---
    if (!isTouchDevice && tramitesContainer) {
        const mainDropdownElements = [tramitesContainer, tramitesDropdown];
        mainDropdownElements.forEach(el => {
            if (el) {
                el.addEventListener('mouseenter', () => {
                    clearTimeout(mainMenuTimeout);
                    clearTimeout(hideSubmenuTimeout); // Prevenir cierre si venía de un submenu
                    mainMenuTimeout = setTimeout(showTramitesMenu, SHOW_TIMEOUT_MS);
                });
                el.addEventListener('mouseleave', () => {
                    clearTimeout(mainMenuTimeout);
                    mainMenuTimeout = setTimeout(closeTramitesMenu, HIDE_TIMEOUT_MS);
                });
            }
        });
    } else if (tramitesMenuBtn) {
        // Lógica de click para móviles/tablets
        tramitesMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = tramitesDropdown.classList.contains('hidden');
            if (isHidden) showTramitesMenu();
            else closeTramitesMenu();
        });
    }

    // Inicializar sistema de submenu
    initializeSubmenuSystem();

    // --- Resto de lógica de botones y navegación ---
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
        });
    }

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
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    const chatToggleButton = document.getElementById('chat-toggle-button');
    if (chatToggleButton) {
        chatToggleButton.addEventListener('mouseenter', () => {
            const popup = document.getElementById('chat-popup');
            if (popup && popup.classList.contains('hidden')) {
                const backdrop = document.getElementById('chat-backdrop');
                const button = document.getElementById('chat-toggle-button');
                popup.classList.remove('hidden');
                backdrop?.classList.remove('hidden');
                button.classList.add('hidden');
            }
        });
    }

    showHomepage();
});

// Exponer funciones globalmente para ser accesibles desde el HTML
window.showDirectiva = showDirectiva;
window.showCredenciales = showCredenciales;
window.handleCerofilas = handleCerofilas;
window.handleDirectiva = handleDirectiva;
window.handleCredenciales = handleCredenciales;
window.handleCredencialIndependiente = handleCredencialIndependiente;
window.handleValores = handleValores;
window.handleValorPlan = handleValorPlan;
window.handleCursoFormacion = handleCursoFormacion;
window.openLink = openLink;

