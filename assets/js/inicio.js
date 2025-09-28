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
    const dropdownRect = dropdownMenu.getBoundingClientRect();

    // Crear nuevo submenu clonando el template
    activeSubmenu = submenuTemplate.cloneNode(true);
    
    // Limpiar clases y agregar la clase show
    activeSubmenu.classList.remove('hidden');
    activeSubmenu.classList.add('show');
    
    // Agregar al body
    document.body.appendChild(activeSubmenu);

    // Calcular posición
    // POSICIONAMIENTO AJUSTADO PARA CUMPLIR REQUISITOS 1 Y 2
    let leftPosition = dropdownRect.right + 25; // Márgen 25px en PC (se mueve a la derecha)
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
    const submenuHeight = 300; // Estimado
    if (topPosition + submenuHeight > windowHeight) {
        topPosition = windowHeight - submenuHeight - 20;
    }

    // Para móviles, centrar y mover LIGERAMENTE a la derecha (PUNTO 1b)
    if (window.innerWidth <= 1024) {
        const mobileMargin = 10; // Margen para desplazar a la derecha en móvil (10px)
        leftPosition = (windowWidth - submenuWidth) / 2 + mobileMargin; // Desplazar un poco a la derecha
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
        pointerEvents: 'auto',
        transform: 'translateX(0) scale(1)',
        width: `${submenuWidth}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        border: '1px solid rgba(229, 231, 235, 1)',
        borderRadius: '12px',
        boxShadow: '15px 5px 40px rgba(0, 0, 0, 0.2)',
        padding: '12px 0'
    };
    
    Object.assign(activeSubmenu.style, stylesToApply);

    // Guardar referencia
    currentTriggerButton = triggerButton;

    // Event listeners para el submenu (necesarios para evitar que se cierre)
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
        try {
            if (document.body.contains(activeSubmenu)) {
                document.body.removeChild(activeSubmenu);
            }
        } catch (e) {
            // Ignorar errores al remover del DOM si ya fue removido
        }
        activeSubmenu = null;
        currentTriggerButton = null;
    }
    clearTimeout(hideSubmenuTimeout);
}

// Función para configurar triggers
function setupSubmenuTriggers() {
    
    const submenuTriggers = document.querySelectorAll('.has-submenu > button');
    
    if (submenuTriggers.length === 0) {
        return;
    }
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    submenuTriggers.forEach((trigger, index) => {
        
        // Verificar que el trigger tiene un submenu
        const hasSubmenu = trigger.parentElement.querySelector('.submenu');
        
        if (!hasSubmenu) {
            return;
        }
        
        // Clonar para limpiar listeners anteriores es una buena práctica
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        if (!isTouchDevice) {
            // Desktop: hover
            
            // Listener para el botón principal del submenú (ej. "Doc. editable")
            newTrigger.addEventListener('mouseenter', (e) => {
                clearTimeout(hideSubmenuTimeout);
                // Mostrar el submenú usando el contenedor .has-submenu como área de hover
                showSubmenu(e.currentTarget);
            });
            
            newTrigger.addEventListener('mouseleave', () => {
                // Al salir del botón, establecer un timeout para ocultar,
                // si el mouse entra al submenu, el timeout se cancela.
                hideSubmenuTimeout = setTimeout(() => {
                    hideSubmenu();
                }, 300);
            });
            
            // Configurar listeners en el contenedor completo (.has-submenu)
            const submenuContainer = newTrigger.parentElement;
            
            submenuContainer.addEventListener('mouseenter', () => {
                clearTimeout(hideSubmenuTimeout);
                // Asegurar que el submenu se muestre si se entra al contenedor
                showSubmenu(newTrigger); 
            });

            submenuContainer.addEventListener('mouseleave', () => {
                // Al salir del contenedor, establecer un timeout para ocultar
                hideSubmenuTimeout = setTimeout(() => {
                    hideSubmenu();
                }, 300);
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
    
    // Click fuera (siempre necesario para cerrar el menú principal y submenú)
    document.addEventListener('click', (e) => {
        const tramitesDropdown = document.getElementById('tramites-dropdown');
        const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
        
        if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
             // Si se hace clic fuera del menú desplegable y no es el botón que lo activa
            if (!tramitesDropdown.contains(e.target) && e.target !== tramitesMenuBtn) {
                closeTramitesMenu();
            }
        }
        
        // Cerrar submenú si se hace clic fuera de él y de su botón
        if (activeSubmenu && !activeSubmenu.contains(e.target)) {
            const triggerContainer = currentTriggerButton?.parentElement;
            if (!triggerContainer || !triggerContainer.contains(e.target)) {
                hideSubmenu();
            }
        }
    });

    // Scroll
    window.addEventListener('scroll', () => {
        // Cerrar ambos al hacer scroll, ya que su posición es fija/absoluta
        closeTramitesMenu();
    });
    
    // Resize
    window.addEventListener('resize', () => {
        // Forzar cierre y reinicio al cambiar tamaño
        closeTramitesMenu();
    });
}

// Función de inicialización completa
function initializeSubmenuSystem() {
    
    // Configurar triggers
    // Un pequeño retraso para asegurar que el DOM esté estable
    setTimeout(() => {
        setupSubmenuTriggers();
    }, 600);
    
    // Configurar listeners globales
    setTimeout(() => {
        setupGlobalListeners();
    }, 700);
    
    // Observador para cambios en el DOM (en caso de que el menú se reconstruya)
    const observer = new MutationObserver((mutations) => {
        // Retraso para no re-ejecutar constantemente durante cambios masivos
        setTimeout(() => {
            setupSubmenuTriggers();
        }, 100);
    });
    
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    if (tramitesDropdown) {
        // Observar cambios en el contenido para reconfigurar los listeners del submenú
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

    // --- Main Menu Logic ---
    if (!isTouchDevice && tramitesContainer) {
        // En escritorio, el menú principal debe responder al hover del contenedor
        const mainDropdownElements = [tramitesContainer, tramitesDropdown];
        mainDropdownElements.forEach(el => {
            if (el) {
                el.addEventListener('mouseenter', () => {
                    clearTimeout(tramitesTimeout);
                    showTramitesMenu();
                    // Importante: No cerramos el submenu aquí para evitar parpadeos
                });
                el.addEventListener('mouseleave', () => {
                    // Si sale del área, empieza el timeout para cerrar el menú principal
                    tramitesTimeout = setTimeout(closeTramitesMenu, 300);
                });
            }
        });
        
        // Agregar un listener al dropdown mismo para detener el cierre si el mouse entra
        if(tramitesDropdown) {
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
