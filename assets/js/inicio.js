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

// This function is now smarter
function openLink(url) {
    window.open(url, '_blank');
    closeTramitesMenu();
    hideSubmenu(); // Hide teleported submenu as well
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
}

// === SISTEMA DE SUBMENU FLYOUT CORREGIDO ===

// Variables para control de submenus
let activeSubmenu = null;
let hideSubmenuTimeout = null;
let currentTriggerButton = null;

function showSubmenu(triggerButton) {
    console.log('🎯 Intentando mostrar submenu para:', triggerButton.textContent);
    
    // Limpiar timeout si existe
    clearTimeout(hideSubmenuTimeout);
    
    // Encontrar el submenu asociado al botón
    const submenuTemplate = triggerButton.parentElement.querySelector('.submenu');
    if (!submenuTemplate) {
        console.log('❌ No submenu found for button:', triggerButton.textContent);
        return;
    }

    // Si ya hay un submenu activo del mismo botón, no hacer nada
    if (activeSubmenu && currentTriggerButton === triggerButton) {
        console.log('⚠️ Submenu ya activo para este botón');
        return;
    }

    // Ocultar submenu anterior si existe
    hideSubmenu();

    // Obtener posición del botón trigger y del menú principal
    const triggerRect = triggerButton.getBoundingClientRect();
    const dropdownMenu = document.getElementById('tramites-dropdown');
    const dropdownRect = dropdownMenu.getBoundingClientRect();

    console.log('📐 Posiciones calculadas:', {
        trigger: triggerRect,
        dropdown: dropdownRect
    });

    // Crear nuevo submenu clonando el template
    activeSubmenu = submenuTemplate.cloneNode(true);
    activeSubmenu.classList.add('show');
    
    // CLAVE: Agregar al body para que aparezca FUERA del contenedor principal
    document.body.appendChild(activeSubmenu);

    // Calcular posición para que aparezca al lado derecho del menú principal
    let leftPosition = dropdownRect.right + 10; // 10px de separación
    let topPosition = triggerRect.top - 5; // Alineado con el botón trigger

    // Verificar si se sale de la pantalla horizontalmente
    const submenuWidth = 280;
    const windowWidth = window.innerWidth;
    
    if (leftPosition + submenuWidth > windowWidth) {
        // Si se sale por la derecha, mostrar por la izquierda
        leftPosition = dropdownRect.left - submenuWidth - 10;
        console.log('📱 Reposicionando submenu a la izquierda');
    }

    // Verificar si se sale de la pantalla verticalmente
    const submenuHeight = activeSubmenu.scrollHeight;
    const windowHeight = window.innerHeight;
    
    if (topPosition + submenuHeight > windowHeight) {
        topPosition = windowHeight - submenuHeight - 20;
        console.log('📱 Ajustando posición vertical');
    }

    // Para móviles, centrar horizontalmente
    if (window.innerWidth <= 1024) {
        leftPosition = (windowWidth - submenuWidth) / 2;
        topPosition = Math.max(80, topPosition); // No muy arriba
    }

    // Aplicar posición calculada
    activeSubmenu.style.left = `${leftPosition}px`;
    activeSubmenu.style.top = `${topPosition}px`;

    console.log('✅ Submenu posicionado en:', { left: leftPosition, top: topPosition });

    // Guardar referencia del botón actual
    currentTriggerButton = triggerButton;

    // Agregar event listeners al nuevo submenu
    activeSubmenu.addEventListener('mouseenter', () => {
        clearTimeout(hideSubmenuTimeout);
    });

    activeSubmenu.addEventListener('mouseleave', () => {
        hideSubmenuTimeout = setTimeout(hideSubmenu, 300);
    });

    console.log('🎉 Submenu mostrado exitosamente para:', triggerButton.textContent);
}

function hideSubmenu() {
    if (activeSubmenu) {
        console.log('🗑️ Ocultando submenu');
        try {
            document.body.removeChild(activeSubmenu);
        } catch (e) {
            console.warn('⚠️ Error al remover submenu:', e);
        }
        activeSubmenu = null;
        currentTriggerButton = null;
    }
    clearTimeout(hideSubmenuTimeout);
}

// --- REWRITTEN DOMCONTENTLOADED ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando sistema de menús...');
    
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn?.parentElement;
    let tramitesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    console.log('📱 Dispositivo táctil detectado:', isTouchDevice);

    // --- Main Menu Logic ---
    if (!isTouchDevice && tramitesContainer) {
        const mainDropdownElements = [tramitesContainer, tramitesDropdown];
        mainDropdownElements.forEach(el => {
            if (el) {
                el.addEventListener('mouseenter', () => {
                    clearTimeout(tramitesTimeout);
                    hideSubmenu();
                    showTramitesMenu();
                });
                el.addEventListener('mouseleave', () => {
                    tramitesTimeout = setTimeout(closeTramitesMenu, 300);
                });
            }
        });
    } else if (tramitesMenuBtn) {
        // Click logic for touch devices
        tramitesMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = tramitesDropdown.classList.contains('hidden');
            if (isHidden) showTramitesMenu();
            else closeTramitesMenu();
        });
    }

    // --- Función para configurar triggers de submenu ---
    function setupSubmenuTriggers() {
        const submenuTriggers = document.querySelectorAll('.has-submenu > button');
        console.log('🎯 Configurando', submenuTriggers.length, 'triggers de submenu');
        
        submenuTriggers.forEach((trigger, index) => {
            // Limpiar event listeners anteriores
            trigger.replaceWith(trigger.cloneNode(true));
            const newTrigger = document.querySelectorAll('.has-submenu > button')[index];
            
            if (!isTouchDevice) {
                // Desktop: usar hover
                newTrigger.addEventListener('mouseenter', (e) => {
                    clearTimeout(tramitesTimeout); // Keep main menu open
                    showSubmenu(e.currentTarget);
                });
                newTrigger.addEventListener('mouseleave', () => {
                    hideSubmenuTimeout = setTimeout(hideSubmenu, 300);
                });
            } else {
                // Móvil: usar click
                newTrigger.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent closing the main menu
                    e.preventDefault();
                    showSubmenu(e.currentTarget);
                });
            }
        });
    }

    // Configurar triggers inicialmente
    setTimeout(setupSubmenuTriggers, 100);

    // Re-configurar cuando el menú se abra (para elementos dinámicos)
    if (tramitesDropdown) {
        const observer = new MutationObserver(() => {
            setTimeout(setupSubmenuTriggers, 50);
        });
        observer.observe(tramitesDropdown, { childList: true, subtree: true });
    }

    // --- Global Click Listener ---
    window.addEventListener('click', (e) => {
        // Close main menu if click is outside
        if (tramitesContainer && !tramitesContainer.contains(e.target) && 
            tramitesDropdown && !tramitesDropdown.contains(e.target)) {
            closeTramitesMenu();
        }
        // Close submenu if click is outside
        if (activeSubmenu && !activeSubmenu.contains(e.target)) {
            const triggerContainer = currentTriggerButton?.parentElement;
            if (!triggerContainer || !triggerContainer.contains(e.target)) {
                hideSubmenu();
            }
        }
    });

    // Cerrar submenus al hacer scroll o redimensionar
    window.addEventListener('scroll', hideSubmenu);
    window.addEventListener('resize', hideSubmenu);

    // --- All other original listeners from the old file ---
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
            console.log(`Attempting to download: ${fileName} from ${pdfUrl}`);
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

    // Exponer funciones globalmente
    window.showSubmenu = showSubmenu;
    window.hideSubmenu = hideSubmenu;
    window.showTramitesMenu = showTramitesMenu;
    window.closeTramitesMenu = closeTramitesMenu;

    console.log('✅ Sistema de menús inicializado correctamente');
    showHomepage();
});
