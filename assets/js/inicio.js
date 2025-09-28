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

// Variables globales para el sistema de menú
let activeSubmenu = null;
let hideSubmenuTimeout = null;
let currentTriggerButton = null;
let mainMenuTimeout = null; // CRÍTICO: Timer para el menú principal

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
    clearTimeout(mainMenuTimeout); // Asegurar que el timer principal se detenga
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

// === SISTEMA DE SUBMENU CRÍTICO CORREGIDO ===

/**
 * Muestra el submenú flotante para un botón.
 * @param {HTMLElement} triggerButton - El botón que activó el submenú (ej. 'Doc. editable').
 */
function showSubmenu(triggerButton) {
    
    // 1. Limpieza inicial y validaciones
    clearTimeout(hideSubmenuTimeout);
    
    const submenuTemplate = triggerButton.parentElement.querySelector('.submenu');
    if (!submenuTemplate) return;
    if (activeSubmenu && currentTriggerButton === triggerButton) return;

    // 2. Ocultar el submenú anterior
    if (activeSubmenu) {
        hideSubmenu(0); 
    }

    // 3. Clonar, configurar y adjuntar al DOM
    activeSubmenu = submenuTemplate.cloneNode(true);
    activeSubmenu.classList.remove('hidden');
    activeSubmenu.classList.add('show');
    document.body.appendChild(activeSubmenu);

    // CRÍTICO: Reasignar los onclick y añadir el listener de mouseenter/mouseleave
    const submenuButtons = activeSubmenu.querySelectorAll('button');
    submenuButtons.forEach(button => {
        const originalOnClick = button.getAttribute('onclick');
        if (originalOnClick) {
            button.onclick = (e) => {
                e.stopPropagation();
                const match = originalOnClick.match(/openLink\('(.*?)'\)/);
                if (match && match[1]) {
                    openLink(match[1]);
                } else if (originalOnClick.includes('handle')) {
                    try {
                         const funcName = originalOnClick.match(/(\w+)\(\)/)[1];
                         if (typeof window[funcName] === 'function') {
                            window[funcName]();
                         }
                    } catch (error) {
                        console.error("Error al ejecutar función del submenú:", error);
                    }
                }
            };
        }
        button.removeAttribute('onclick'); 
    });

    // 4. Configurar listeners de hover/cierre
    // CRÍTICO ANTI-FLICKER: Si el mouse entra al submenú flotante, cancela el cierre de ambos menús.
    activeSubmenu.addEventListener('mouseenter', () => {
        clearTimeout(hideSubmenuTimeout);
        // Cancelar el cierre del menú principal (tramites-dropdown) si el mouse entra al submenu
        clearTimeout(mainMenuTimeout); 
    });

    activeSubmenu.addEventListener('mouseleave', () => {
        // Al salir del submenú flotante, iniciar el proceso de cierre de ambos
        hideSubmenuTimeout = setTimeout(() => {
            hideSubmenu();
            // Cerrar el menú principal también, usando su propia lógica de cierre
            const tramitesDropdown = document.getElementById('tramites-dropdown');
            if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
                 // Usar el timer principal del menú para cerrar después de que el submenú se oculte
                 mainMenuTimeout = setTimeout(closeTramitesMenu, 100);
            }
        }, 200); 
    });


    // 5. Calcular y aplicar posición (Lógica sin cambios)
    const triggerRect = triggerButton.getBoundingClientRect();
    const dropdownMenu = document.getElementById('tramites-dropdown');
    if (!dropdownMenu) return;
    const dropdownRect = dropdownMenu.getBoundingClientRect();

    const submenuWidth = 280;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let leftPosition = dropdownRect.right + 5; 
    let topPosition = triggerRect.top; 

    // Ajuste horizontal (Escritorio)
    if (windowWidth > 1024) {
        if (leftPosition + submenuWidth > windowWidth) {
            leftPosition = dropdownRect.left - submenuWidth - 15; 
        }
    } else {
        const mobileMargin = 40; 
        leftPosition = (windowWidth - submenuWidth) / 2 + mobileMargin; 
    }

    // Ajuste vertical
    const submenuHeight = activeSubmenu.offsetHeight || 300; 
    if (topPosition + submenuHeight > windowHeight - 20) {
        topPosition = windowHeight - submenuHeight - 20;
    }
    topPosition = Math.max(topPosition, 65); 

    // Aplicar estilos
    const stylesToApply = {
        position: 'fixed',
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
        zIndex: '1350',
        opacity: '1',
        visibility: 'visible',
        transform: 'translateX(0) scale(1)', 
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 
        width: `${submenuWidth}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        border: '1px solid rgba(229, 231, 235, 1)',
        boxShadow: '15px 5px 40px rgba(0, 0, 0, 0.2)',
        padding: '12px 0'
    };
    
    for (const [key, value] of Object.entries(stylesToApply)) {
        activeSubmenu.style[key] = value;
    }
    activeSubmenu.style.setProperty('transition', 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 'important');

    // 6. Guardar referencia
    currentTriggerButton = triggerButton;
}

/**
 * Oculta el submenú con una transición suave.
 * @param {number} delay - Retraso para remover el elemento del DOM.
 */
function hideSubmenu(delay = 300) {
    if (activeSubmenu) {
        // Añadir transición de cierre
        Object.assign(activeSubmenu.style, {
            opacity: '0',
            transform: 'translateX(-10px) scale(0.95)',
            pointerEvents: 'none',
        });
        
        // Retraso para eliminar del DOM después de la transición
        setTimeout(() => {
            try {
                if (document.body.contains(activeSubmenu)) {
                    document.body.removeChild(activeSubmenu);
                }
            } catch (e) {
                console.warn("Error al remover submenú del DOM:", e);
            }
            activeSubmenu = null;
            currentTriggerButton = null;
        }, delay); 
    }
    clearTimeout(hideSubmenuTimeout);
}

/**
 * Configura los eventos de hover para los elementos con submenú.
 */
function setupSubmenuTriggers() {
    
    const submenuTriggers = document.querySelectorAll('.has-submenu > button');
    
    if (submenuTriggers.length === 0) return;
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Iterar sobre los contenedores para aplicar listeners
    document.querySelectorAll('.has-submenu').forEach((container) => {
        const trigger = container.querySelector('button');
        const hasSubmenu = container.querySelector('.submenu');
        
        if (!trigger || !hasSubmenu) return;
        
        // Clonar y reemplazar para un manejo limpio del DOM (necesario para el hover en el contenedor)
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        if (!isTouchDevice) {
            // Desktop: Hover/Debounce Logic
            
            // CRÍTICO: Usamos el contenedor padre para que el mouse pueda moverse un poco
            container.addEventListener('mouseenter', (e) => {
                clearTimeout(hideSubmenuTimeout); // Cancelar timer de cierre del submenú
                clearTimeout(mainMenuTimeout);    // Cancelar timer de cierre del menú principal
                showSubmenu(newTrigger);
            });

            container.addEventListener('mouseleave', () => {
                // Si el mouse sale del área (contenedor del botón), iniciar el timer de cierre
                hideSubmenuTimeout = setTimeout(() => {
                    hideSubmenu();
                }, 300);
            });
            
        } else {
            // Móvil: Click
            newTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (currentTriggerButton === newTrigger) {
                     hideSubmenu();
                } else {
                    showSubmenu(e.currentTarget);
                }
            });
        }
    });
}

/**
 * Configura listeners globales para cerrar menús al hacer scroll, resize o click fuera.
 */
function setupGlobalListeners() {
    
    // Click fuera
    document.addEventListener('click', (e) => {
        const tramitesDropdown = document.getElementById('tramites-dropdown');
        const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
        
        if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
            // Verificar si el click fue fuera del menú principal Y fuera del submenú flotante
            const isClickOutsideBoth = !tramitesDropdown.contains(e.target) && 
                                       e.target !== tramitesMenuBtn &&
                                       (!activeSubmenu || !activeSubmenu.contains(e.target));
            
            if (isClickOutsideBoth) {
                closeTramitesMenu();
            }
        }
        
        // Cerrar submenú flotante si el click cae fuera de él (si el menú principal está cerrado, ya se cierra)
        if (activeSubmenu && !activeSubmenu.contains(e.target) && e.target !== currentTriggerButton) {
            hideSubmenu();
        }
    });

    // Scroll y Resize
    window.addEventListener('scroll', () => {
        closeTramitesMenu();
        hideSubmenu();
    });
    
    window.addEventListener('resize', () => {
        closeTramitesMenu();
        hideSubmenu();
    });
}

/**
 * Inicializa los sistemas de menú y submenú.
 */
function initializeSubmenuSystem() {
    
    // Un pequeño retraso para asegurar que el DOM esté estable
    setTimeout(() => {
        setupSubmenuTriggers();
    }, 600);
    
    setTimeout(() => {
        setupGlobalListeners();
    }, 700);
    
    // Observador para re-inicializar triggers si el contenido del menú principal cambia
    const observer = new MutationObserver((mutations) => {
        setTimeout(() => {
            setupSubmenuTriggers();
        }, 100);
    });
    
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    if (tramitesDropdown) {
        observer.observe(tramitesDropdown, { childList: true, subtree: true, attributes: true });
    }
}

// DOMContentLoaded principal
document.addEventListener('DOMContentLoaded', () => {
    
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn?.parentElement;
    let tramitesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Main Menu Logic (Hover para PC) ---
    if (!isTouchDevice) {
        // Hover logic for desktop menu (main dropdown)
        
        if (tramitesMenuBtn) {
            tramitesMenuBtn.addEventListener('mouseenter', () => {
                clearTimeout(tramitesTimeout);
                showTramitesMenu();
            });
            tramitesMenuBtn.addEventListener('mouseleave', () => {
                // Iniciar timer para cerrar el menú principal si sale del botón
                tramitesTimeout = setTimeout(closeTramitesMenu, 300);
            });
        }
        
        if (tramitesDropdown) {
            tramitesDropdown.addEventListener('mouseenter', () => {
                clearTimeout(tramitesTimeout); // Si entra al dropdown, cancela el cierre
            });
            tramitesDropdown.addEventListener('mouseleave', () => {
                // Si sale del dropdown, inicia el cierre
                tramitesTimeout = setTimeout(closeTramitesMenu, 300);
            });
        }
        
    } else if (tramitesMenuBtn) {
        // Lógica de click para móviles
        tramitesMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = tramitesDropdown.classList.contains('hidden');
            if (isHidden) showTramitesMenu();
            else closeTramitesMenu();
        });
    }

    // Inicializar sistema de submenu
    initializeSubmenuSystem();

    // --- Resto de listeners originales ---
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
