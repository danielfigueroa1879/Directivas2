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
let mainMenuTimeout = null; // Variable agregada para manejar el timer del menú principal


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
    clearTimeout(mainMenuTimeout); // Asegurar que se cancele el timer del menú principal
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

// === SISTEMA DE SUBMENU ===

// Función para mostrar submenu
function showSubmenu(triggerButton) {
    
    // Limpiar timeout si existe
    clearTimeout(hideSubmenuTimeout);
    
    // Encontrar el submenu asociado al botón
    const submenuTemplate = triggerButton.parentElement.querySelector('.submenu');
    
    if (!submenuTemplate) {
        return;
    }
    
    // Si ya hay un submenu activo del mismo botón, no hacer nada
    if (activeSubmenu && currentTriggerButton === triggerButton) {
        return;
    }

    // Ocultar submenu anterior si existe
    hideSubmenu();

    // Obtener posiciones
    const triggerRect = triggerButton.getBoundingClientRect();
    const dropdownMenu = document.getElementById('tramites-dropdown');
    // CRÍTICO: Asegurarse de que el elemento exista antes de llamar a getBoundingClientRect
    if (!dropdownMenu) {
        console.error("Error: El elemento 'tramites-dropdown' no se encontró.");
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

    // CRÍTICO: Reasignar los onclick de los botones del submenu clonado inmediatamente
    const submenuButtons = activeSubmenu.querySelectorAll('button');
    submenuButtons.forEach(button => {
        const originalOnClick = button.getAttribute('onclick');
        if (originalOnClick) {
            button.onclick = (e) => {
                e.stopPropagation();
                // Extracción de la URL para openLink(url)
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


    // Calcular posición
    // POSICIONAMIENTO AJUSTADO PARA PC (Mover a la izquierda)
    let leftPosition = dropdownRect.right + 5; // Mantenido en 5px para PC (más a la izquierda)
    let topPosition = triggerRect.top - 5; 
    
    // Determinar la posición Y del menú desplegable principal para alinear el submenu
    const submenuTopAnchor = dropdownRect.top + (triggerRect.top - dropdownRect.top);
    topPosition = submenuTopAnchor;

    const submenuWidth = 280;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Ajustar si se sale de pantalla horizontalmente (para navegadores de escritorio)
    if (leftPosition + submenuWidth > windowWidth) {
        leftPosition = dropdownRect.left - submenuWidth - 15;
    }

    // Ajustar si se sale de pantalla verticalmente
    const submenuHeight = activeSubmenu.offsetHeight || 300; // Usar offsetHeight después de añadir al body
    if (topPosition + submenuHeight > windowHeight) {
        topPosition = windowHeight - submenuHeight - 20;
    }

    // Para móviles, centrar y mover LIGERAMENTE a la derecha (CELULAR MÁS A LA DERECHA)
    if (window.innerWidth <= 1024) {
        const mobileMargin = 40; // AUMENTADO a 40px para desplazar más a la derecha en móvil
        leftPosition = (windowWidth - submenuWidth) / 2 + mobileMargin; // Desplazar a la derecha
        // Ajustar la posición vertical para que no quede demasiado arriba en móviles
        topPosition = Math.max(80, topPosition); 
    }

    // Aplicar estilos directamente
    const stylesToApply = {
        position: 'fixed',
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
        zIndex: '1350',
        opacity: '1',
        visibility: 'visible',
        transform: 'translateX(0) scale(1)', 
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Transición suave para entrada (PUNTO 3)
        width: `${submenuWidth}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        border: '1px solid rgba(229, 231, 235, 1)',
        boxShadow: '15px 5px 40px rgba(0, 0, 0, 0.2)',
        padding: '12px 0'
    };
    
    // Se usa setProperty para asegurar que el CSS se aplique correctamente
    for (const [key, value] of Object.entries(stylesToApply)) {
        activeSubmenu.style[key] = value;
    }
    activeSubmenu.style.setProperty('transition', 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 'important');

    // Guardar referencia
    currentTriggerButton = triggerButton;

    // Event listeners para el submenu (necesarios para evitar que se cierre)
    activeSubmenu.addEventListener('mouseenter', () => {
        clearTimeout(hideSubmenuTimeout);
        // CRÍTICO: Cancelar el timer del menú principal si el mouse entra al submenú flotante
        const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
        const tramitesDropdown = document.getElementById('tramites-dropdown');
        if (tramitesMenuBtn && tramitesDropdown) {
             clearTimeout(mainMenuTimeout);
        }
    });

    activeSubmenu.addEventListener('mouseleave', () => {
        // Establecer un tiempo de espera para ocultar el submenu
        hideSubmenuTimeout = setTimeout(() => {
            hideSubmenu();
            // Si el submenú se oculta, cerrar el menú principal también
            const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
            const tramitesDropdown = document.getElementById('tramites-dropdown');
            if (tramitesMenuBtn && tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
                // Usar el timer principal para cerrar el menú principal con retraso
                mainMenuTimeout = setTimeout(closeTramitesMenu, 100); 
            }
        }, 300);
    });
}

// Función para ocultar submenu
function hideSubmenu() {
    if (activeSubmenu) {
        // Añadir una transición rápida para el cierre (PUNTO 3)
        Object.assign(activeSubmenu.style, {
            opacity: '0',
            transform: 'translateX(-10px) scale(0.95)',
            pointerEvents: 'none',
        });
        
        // Retraso para eliminar del DOM después de la transición
        setTimeout(() => {
            try {
                // Verificar si todavía está en el body para evitar errores
                if (document.body.contains(activeSubmenu)) {
                    document.body.removeChild(activeSubmenu);
                }
            } catch (e) {
                // Ignorar errores al remover del DOM si ya fue removido
                console.warn("Error al remover submenú del DOM:", e);
            }
            activeSubmenu = null;
            currentTriggerButton = null;
        }, 300); 
    }
    clearTimeout(hideSubmenuTimeout);
}

// Función para configurar triggers
function setupSubmenuTriggers() {
    
    // CRÍTICO: Seleccionamos todos los contenedores para aplicar los listeners de hover
    const submenuContainers = document.querySelectorAll('.has-submenu');
    
    if (submenuContainers.length === 0) {
        return;
    }
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    submenuContainers.forEach((container) => {
        
        const trigger = container.querySelector('button');
        const hasSubmenu = container.querySelector('.submenu');
        
        if (!trigger || !hasSubmenu) return;
        
        // Clonar y reemplazar para un manejo limpio de listeners (evita duplicados)
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        if (!isTouchDevice) {
            // Desktop: hover (Anti-flickering a nivel de JS)
            
            // Listener de ENTRADA en el CONTENEDOR (incluye el botón)
            container.addEventListener('mouseenter', (e) => {
                clearTimeout(hideSubmenuTimeout); // Cancelar timer de cierre del submenú
                clearTimeout(mainMenuTimeout);    // Cancelar timer de cierre del menú principal
                showSubmenu(newTrigger);
            });

            // Listener de SALIDA en el CONTENEDOR
            container.addEventListener('mouseleave', () => {
                // Al salir del área, iniciar el timer de cierre del submenú
                hideSubmenuTimeout = setTimeout(() => {
                    hideSubmenu();
                }, 300); 
            });
            
        } else {
            // Móvil: click
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
    
    // Click fuera 
    document.addEventListener('click', (e) => {
        const tramitesDropdown = document.getElementById('tramites-dropdown');
        const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
        
        if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
            const isClickOutsideBoth = !tramitesDropdown.contains(e.target) && 
                                       e.target !== tramitesMenuBtn &&
                                       (!activeSubmenu || !activeSubmenu.contains(e.target));
            
            if (isClickOutsideBoth) {
                closeTramitesMenu();
            }
        }
        
        // Cerrar submenú flotante si el click cae fuera de él
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

// Función de inicialización completa
function initializeSubmenuSystem() {
    
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
    let tramitesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Main Menu Logic (Hover para PC) ---
    if (!isTouchDevice) {
        
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
                clearTimeout(tramitesTimeout); // Si entra al dropdown, cancela el cierre
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
