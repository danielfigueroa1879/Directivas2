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

// === SISTEMA DE SUBMENU CORREGIDO ===

// Función para mostrar submenu (con manejo de clones para posicionamiento fijo)
function showSubmenu(triggerButton) {
    
    // Limpiar timeout si existe
    clearTimeout(hideSubmenuTimeout);
    
    // Encontrar el submenu asociado al botón (es un template oculto)
    const submenuTemplate = triggerButton.parentElement.querySelector('.submenu'); 
    
    if (!submenuTemplate) {
        console.error("No se encontró el .submenu para el botón de disparo.");
        return;
    }
    
    // Si ya hay un submenu activo del mismo botón, no hacer nada
    if (activeSubmenu && currentTriggerButton === triggerButton) {
        return;
    }

    // Ocultar submenu anterior si existe (y si es un submenu diferente)
    if (activeSubmenu && currentTriggerButton !== triggerButton) {
        hideSubmenu();
    }

    // Obtener posiciones
    const triggerRect = triggerButton.getBoundingClientRect();
    const dropdownMenu = document.getElementById('tramites-dropdown');
    
    if (!dropdownMenu) {
        console.error("No se encontró el menú principal 'tramites-dropdown'.");
        return;
    }
    const dropdownRect = dropdownMenu.getBoundingClientRect();

    // Crear nuevo submenu clonando el template
    activeSubmenu = submenuTemplate.cloneNode(true);
    
    // Limpiar clases y agregar la clase show
    activeSubmenu.classList.remove('hidden');
    activeSubmenu.classList.add('show');
    
    // Agregar al body
    document.body.appendChild(activeSubmenu);

    // Calcular posición
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
        // Ajuste horizontal (Móvil)
        const mobileMargin = 40; 
        leftPosition = (windowWidth - submenuWidth) / 2 + mobileMargin; 
        topPosition = Math.max(80, topPosition); 
    }

    // Ajuste vertical
    const submenuHeight = activeSubmenu.offsetHeight || 350;
    if (topPosition + submenuHeight > windowHeight - 20) {
        topPosition = windowHeight - submenuHeight - 20;
    }
    topPosition = Math.max(topPosition, 65); 


    // Aplicar estilos directamente
    const stylesToApply = {
        position: 'fixed',
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
        zIndex: '1350',
        opacity: '1',
        visibility: 'visible',
        transform: 'translateX(0) scale(1)', 
        // Usar !important para anular la transición del CSS y controlar la apertura/cierre
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 
        width: `${submenuWidth}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        border: '1px solid rgba(229, 231, 235, 1)',
        borderRadius: '12px',
        boxShadow: '15px 5px 40px rgba(0, 0, 0, 0.2)',
        padding: '12px 0'
    };
    
    Object.assign(activeSubmenu.style, stylesToApply);
    activeSubmenu.style.setProperty('transition', 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 'important');


    // Guardar referencia
    currentTriggerButton = triggerButton;

    // Re-añadir listeners de mouse al elemento dinámico para evitar el parpadeo
    activeSubmenu.addEventListener('mouseenter', () => {
        clearTimeout(hideSubmenuTimeout);
    });

    activeSubmenu.addEventListener('mouseleave', () => {
        // Establecer un tiempo de espera para ocultar el submenu
        hideSubmenuTimeout = setTimeout(() => {
            hideSubmenu();
        }, 300);
    });
}

// Función para ocultar submenu
function hideSubmenu() {
    if (activeSubmenu) {
        // Añadir una transición rápida para el cierre
        Object.assign(activeSubmenu.style, {
            opacity: '0',
            transform: 'translateX(-10px) scale(0.95)',
            pointerEvents: 'none',
        });
        
        // Retraso para eliminar del DOM después de la transición
        setTimeout(() => {
            try {
                // Previene el error si el elemento ya fue removido
                if (document.body.contains(activeSubmenu)) {
                    document.body.removeChild(activeSubmenu);
                }
            } catch (e) {
                console.warn('Error al intentar remover el submenu del DOM:', e);
            }
            activeSubmenu = null;
            currentTriggerButton = null;
        }, 300); 
    }
    clearTimeout(hideSubmenuTimeout);
}

// Función para configurar triggers de hover/click
function setupSubmenuTriggers() {
    
    const submenuContainers = document.querySelectorAll('#tramites-dropdown .has-submenu');
    
    if (submenuContainers.length === 0) {
        return;
    }
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    submenuContainers.forEach((container) => {
        
        // El botón dentro del contenedor es el trigger
        const triggerButton = container.querySelector('button');
        
        if (!triggerButton) return;
        
        // Limpiar listeners existentes (si se llama por el observer)
        const oldTrigger = triggerButton.cloneNode(true);
        triggerButton.parentNode.replaceChild(oldTrigger, triggerButton);
        const newTrigger = oldTrigger;

        if (!isTouchDevice) {
            // Desktop: Hover (Sistema Anti-Flickering con Delay)
            
            let containerShowTimeout;
            
            // Mouse Enter: Abrir menú o cancelar cierre
            container.addEventListener('mouseenter', () => {
                clearTimeout(hideSubmenuTimeout); // CANCELA EL CIERRE DEL SUBMENU
                clearTimeout(containerShowTimeout);
                
                // Mostrar con un pequeño retraso
                containerShowTimeout = setTimeout(() => {
                    showSubmenu(newTrigger);
                }, 100); 
            });

            // Mouse Leave: Iniciar cierre con retraso
            container.addEventListener('mouseleave', () => {
                clearTimeout(containerShowTimeout); // CANCELA LA APERTURA SI ESTÁ PENDIENTE
                // Al salir del área, establecer un timeout para ocultar el submenu
                hideSubmenuTimeout = setTimeout(() => {
                    hideSubmenu();
                }, 200); 
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

// Función de limpieza global
function setupGlobalListeners() {
    
    // Click fuera (siempre necesario para cerrar el menú principal y submenú)
    document.addEventListener('click', (e) => {
        const tramitesDropdown = document.getElementById('tramites-dropdown');
        const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
        
        // 1. Cerrar menú principal si se hace click fuera
        if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
            if (!tramitesDropdown.contains(e.target) && e.target !== tramitesMenuBtn) {
                closeTramitesMenu();
            }
        }
        
        // 2. Cerrar submenú si se hace clic fuera de él
        if (activeSubmenu && !activeSubmenu.contains(e.target) && e.target !== currentTriggerButton) {
            hideSubmenu();
        }
    });

    // Scroll
    window.addEventListener('scroll', () => {
        closeTramitesMenu();
        hideSubmenu();
    });
    
    // Resize
    window.addEventListener('resize', () => {
        closeTramitesMenu();
        hideSubmenu();
    });
}

// Función de inicialización completa
function initializeSubmenuSystem() {
    
    // Configurar triggers
    setTimeout(() => {
        setupSubmenuTriggers();
    }, 600);
    
    // Configurar listeners globales
    setTimeout(() => {
        setupGlobalListeners();
    }, 700);
    
    // Observador para cambios en el DOM (reconfiguración si el menú cambia)
    const observer = new MutationObserver((mutations) => {
        let needsReInit = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'attributes' && mutation.attributeName === 'class') {
                needsReInit = true;
                break;
            }
        }
        
        if (needsReInit) {
            setTimeout(() => {
                setupSubmenuTriggers();
            }, 100);
        }
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
    let tramitesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Main Menu Logic ---
    if (!isTouchDevice) {
        // Hover logic for desktop menu (main dropdown)
        
        if (tramitesMenuBtn) {
            tramitesMenuBtn.addEventListener('mouseenter', () => {
                clearTimeout(tramitesTimeout);
                showTramitesMenu();
            });
            tramitesMenuBtn.addEventListener('mouseleave', () => {
                tramitesTimeout = setTimeout(closeTramitesMenu, 300);
            });
        }
        
        if (tramitesDropdown) {
            tramitesDropdown.addEventListener('mouseenter', () => {
                clearTimeout(tramitesTimeout);
            });
            tramitesDropdown.addEventListener('mouseleave', () => {
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
