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
let mainMenuTimeout = null;
let currentSubmenuContainer = null; // CRÍTICO: Referencia al contenedor de hover


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
    clearTimeout(mainMenuTimeout);
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

// Función para mostrar submenu
function showSubmenu(triggerButton, container) {
    
    clearTimeout(hideSubmenuTimeout);
    
    // 1. Obtener el template del submenú
    const submenuTemplate = container.querySelector('.submenu'); 
    
    if (!submenuTemplate) return;
    
    // Si ya está abierto el correcto, no hacer nada
    if (activeSubmenu && currentTriggerButton === triggerButton) return;

    // 2. Ocultar y limpiar el submenú anterior antes de crear el nuevo
    if (activeSubmenu) {
        // Asegurarse de que el submenú anterior no se cierre inmediatamente si está siendo abierto
        hideSubmenu(0); 
    }

    // 3. Clonar y configurar el nuevo submenú
    activeSubmenu = submenuTemplate.cloneNode(true);
    activeSubmenu.classList.remove('hidden');
    activeSubmenu.classList.add('show');
    
    // Es CRUCIAL reasignar los listeners de click a los botones del CLONADO
    const submenuButtons = activeSubmenu.querySelectorAll('button');
    submenuButtons.forEach(button => {
        const originalOnClick = button.getAttribute('onclick');
        if (originalOnClick) {
            button.onclick = (e) => {
                e.stopPropagation();
                // Extraer URL de la cadena 'openLink('URL')' y ejecutar
                const match = originalOnClick.match(/openLink\('(.*?)'\)/);
                if (match && match[1]) {
                    openLink(match[1]);
                }
            };
        }
    });

    document.body.appendChild(activeSubmenu);

    // 4. Calcular y aplicar posición
    
    const triggerRect = triggerButton.getBoundingClientRect();
    const dropdownMenu = document.getElementById('tramites-dropdown');
    const dropdownRect = dropdownMenu ? dropdownMenu.getBoundingClientRect() : null;
    
    if (!dropdownRect) return;

    const submenuWidth = 280;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let leftPosition = dropdownRect.right + 5; 
    let topPosition = triggerRect.top; 

    // Ajuste horizontal (Escritorio)
    if (windowWidth > 1024) {
        if (leftPosition + submenuWidth > windowWidth) {
            // Mover a la izquierda del menú principal si no cabe
            leftPosition = dropdownRect.left - submenuWidth - 15; 
        }
    } else {
        // Ajuste horizontal (Móvil)
        const mobileMargin = 40; 
        leftPosition = (windowWidth - submenuWidth) / 2 + mobileMargin; 
    }

    // Ajuste vertical: Se mide después de añadirlo al DOM
    const submenuHeight = activeSubmenu.offsetHeight; 
    
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
        borderRadius: '12px',
        boxShadow: '15px 5px 40px rgba(0, 0, 0, 0.2)',
        padding: '12px 0'
    };
    
    Object.assign(activeSubmenu.style, stylesToApply);
    activeSubmenu.style.setProperty('transition', 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 'important');

    // 5. Guardar referencias y añadir listeners de hover
    currentTriggerButton = triggerButton;
    currentSubmenuContainer = container; // Guardar el contenedor original

    // Listeners del elemento clonado para evitar el parpadeo
    activeSubmenu.addEventListener('mouseenter', () => {
        clearTimeout(hideSubmenuTimeout);
        // Si el mouse entra al submenu clonado, cancelar el cierre global del menú principal también
        clearTimeout(mainMenuTimeout); 
    });

    activeSubmenu.addEventListener('mouseleave', () => {
        // Al salir del submenú, iniciar el proceso de cierre con retraso
        hideSubmenuTimeout = setTimeout(() => {
            hideSubmenu();
            // Iniciar cierre del menú principal (si sigue activo)
            const tramitesDropdown = document.getElementById('tramites-dropdown');
            if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
                 mainMenuTimeout = setTimeout(closeTramitesMenu, 100);
            }
        }, 200);
    });
}

// Función para ocultar submenu
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
                // Ignore
            }
            activeSubmenu = null;
            currentTriggerButton = null;
            currentSubmenuContainer = null;
        }, delay); 
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
        
        const triggerButton = container.querySelector('button');
        
        if (!triggerButton) return;
        
        // Clonar para asegurar limpieza total de listeners antiguos
        const oldTrigger = triggerButton.cloneNode(true);
        triggerButton.parentNode.replaceChild(oldTrigger, triggerButton);
        const newTrigger = oldTrigger;

        if (!isTouchDevice) {
            
            let containerShowTimeout;
            
            // Listener de ENTRADA en el contenedor (que incluye el botón y el submenú invisible)
            container.addEventListener('mouseenter', () => {
                clearTimeout(hideSubmenuTimeout); // CANCELA EL CIERRE DEL SUBMENU
                clearTimeout(containerShowTimeout);
                clearTimeout(mainMenuTimeout); // CANCELA EL CIERRE DEL MENÚ PRINCIPAL
                
                // Mostrar con un pequeño retraso para evitar el flickering inicial
                containerShowTimeout = setTimeout(() => {
                    showSubmenu(newTrigger, container);
                }, 100); 
            });

            // Listener de SALIDA en el contenedor (que incluye el botón y el submenú invisible)
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
                    showSubmenu(e.currentTarget, container);
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
        if (activeSubmenu) {
            // Si el click no fue en el submenú ni en el botón que lo activó
            if (!activeSubmenu.contains(e.target) && e.target !== currentTriggerButton) {
                hideSubmenu();
            }
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
            // Si hay un cambio en la lista de hijos (botones añadidos/eliminados) o en las clases del menú
            if (mutation.type === 'childList' || (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target.id === 'tramites-dropdown')) {
                needsReInit = true;
                break;
            }
        }
        
        if (needsReInit) {
            // Ocultar cualquier submenú activo antes de reiniciar los listeners
            hideSubmenu(0);
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

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Main Menu Logic ---
    if (!isTouchDevice) {
        // Hover logic for desktop menu (main dropdown)
        
        if (tramitesMenuBtn) {
            tramitesMenuBtn.addEventListener('mouseenter', () => {
                clearTimeout(mainMenuTimeout);
                showTramitesMenu();
            });
            tramitesMenuBtn.addEventListener('mouseleave', () => {
                // Permitir un retraso si el mouse sale del botón principal, pero puede entrar al dropdown
                mainMenuTimeout = setTimeout(closeTramitesMenu, 300);
            });
        }
        
        if (tramitesDropdown) {
            tramitesDropdown.addEventListener('mouseenter', () => {
                clearTimeout(mainMenuTimeout); // Si entra al dropdown, cancela el cierre
            });
            tramitesDropdown.addEventListener('mouseleave', () => {
                // Si sale del dropdown, inicia el cierre
                mainMenuTimeout = setTimeout(closeTramitesMenu, 300);
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
