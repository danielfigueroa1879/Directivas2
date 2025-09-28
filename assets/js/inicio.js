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

// Variables para submenu - DIAGNÓSTICO
let activeSubmenu = null;
let hideSubmenuTimeout = null;
let currentTriggerButton = null;

console.log('🚀 === INICIO.JS CARGADO CON DIAGNÓSTICO ===');

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
        console.log('✅ Menú trámites mostrado');
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
        console.log('✅ Menú trámites cerrado');
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

// === SISTEMA DE SUBMENU CON DIAGNÓSTICO COMPLETO ===

// Función de diagnóstico mejorada
function diagnosticarSubmenu() {
    console.log('🔍 === DIAGNÓSTICO COMPLETO DEL SUBMENU ===');
    
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    console.log('1. Menú trámites encontrado:', !!tramitesDropdown);
    
    if (tramitesDropdown) {
        console.log('   - Display:', window.getComputedStyle(tramitesDropdown).display);
        console.log('   - Visibility:', window.getComputedStyle(tramitesDropdown).visibility);
        console.log('   - Clases:', tramitesDropdown.className);
    }
    
    const hasSubmenuElements = document.querySelectorAll('.has-submenu');
    console.log('2. Elementos .has-submenu encontrados:', hasSubmenuElements.length);
    
    const submenuElements = document.querySelectorAll('.submenu');
    console.log('3. Elementos .submenu encontrados:', submenuElements.length);
    
    const allButtons = document.querySelectorAll('.dropdown-menu button');
    console.log('4. Total de botones en dropdown:', allButtons.length);
    
    hasSubmenuElements.forEach((element, index) => {
        const button = element.querySelector('button');
        const submenu = element.querySelector('.submenu');
        
        console.log(`   📂 Item ${index + 1}:`, {
            texto: button?.textContent.trim(),
            hasSubmenu: !!submenu,
            submenuButtons: submenu?.querySelectorAll('button').length || 0,
            clases: element.className
        });
        
        if (submenu) {
            const submenuButtons = submenu.querySelectorAll('button');
            submenuButtons.forEach((btn, btnIndex) => {
                console.log(`      🔸 Botón ${btnIndex + 1}:`, btn.textContent.trim());
            });
        }
    });
    
    // Verificar CSS
    const submenuCSS = document.querySelector('.dropdown-menu .submenu');
    if (submenuCSS) {
        const styles = window.getComputedStyle(submenuCSS);
        console.log('5. Estilos CSS del submenu:', {
            position: styles.position,
            display: styles.display,
            opacity: styles.opacity,
            visibility: styles.visibility,
            zIndex: styles.zIndex
        });
    }
    
    console.log('🔍 === FIN DIAGNÓSTICO ===');
    return {
        tramitesDropdown: !!tramitesDropdown,
        hasSubmenuCount: hasSubmenuElements.length,
        submenuCount: submenuElements.length,
        totalButtons: allButtons.length
    };
}

// Función mejorada para mostrar submenu con debugging extenso
function showSubmenu(triggerButton) {
    console.log('🎯 === INICIANDO showSubmenu ===');
    console.log('📍 Trigger button:', triggerButton.textContent.trim());
    console.log('📍 Trigger classes:', triggerButton.className);
    console.log('📍 Parent classes:', triggerButton.parentElement.className);
    
    // Limpiar timeout si existe
    clearTimeout(hideSubmenuTimeout);
    
    // Encontrar el submenu asociado al botón
    const submenuTemplate = triggerButton.parentElement.querySelector('.submenu');
    console.log('📍 Template encontrado:', !!submenuTemplate);
    
    if (!submenuTemplate) {
        console.error('❌ No se encontró submenu template para:', triggerButton.textContent);
        
        // Diagnóstico adicional
        console.log('🔍 Estructura del parent:', triggerButton.parentElement.innerHTML);
        return;
    }
    
    const templateButtons = submenuTemplate.querySelectorAll('button');
    console.log('📍 Número de botones en template:', templateButtons.length);
    templateButtons.forEach((btn, index) => {
        console.log(`   📍 Botón ${index + 1}:`, btn.textContent.trim());
    });

    // Si ya hay un submenu activo del mismo botón, no hacer nada
    if (activeSubmenu && currentTriggerButton === triggerButton) {
        console.log('⚠️ Submenu ya activo para este botón');
        return;
    }

    // Ocultar submenu anterior si existe
    console.log('📍 Ocultando submenu anterior...');
    hideSubmenu();

    // Obtener posiciones con debugging
    const triggerRect = triggerButton.getBoundingClientRect();
    const dropdownMenu = document.getElementById('tramites-dropdown');
    const dropdownRect = dropdownMenu.getBoundingClientRect();

    console.log('📍 Posiciones detalladas:', {
        trigger: { 
            top: Math.round(triggerRect.top), 
            left: Math.round(triggerRect.left), 
            right: Math.round(triggerRect.right),
            bottom: Math.round(triggerRect.bottom),
            width: Math.round(triggerRect.width),
            height: Math.round(triggerRect.height)
        },
        dropdown: { 
            top: Math.round(dropdownRect.top), 
            left: Math.round(dropdownRect.left), 
            right: Math.round(dropdownRect.right),
            bottom: Math.round(dropdownRect.bottom),
            width: Math.round(dropdownRect.width),
            height: Math.round(dropdownRect.height)
        },
        window: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    });

    // Crear nuevo submenu clonando el template
    console.log('📍 Clonando template...');
    activeSubmenu = submenuTemplate.cloneNode(true);
    
    console.log('📍 Clonación completada. Clases antes de modificar:', activeSubmenu.className);
    
    // Limpiar clases y agregar la clase show
    activeSubmenu.classList.remove('hidden');
    activeSubmenu.classList.add('show');
    
    console.log('📍 Clases después de modificar:', activeSubmenu.className);
    console.log('📍 Agregando al body...');
    
    // Agregar al body
    document.body.appendChild(activeSubmenu);
    console.log('📍 Agregado al body correctamente');

    // Calcular posición con más detalle
    let leftPosition = dropdownRect.right + 15; // Más separación
    let topPosition = triggerRect.top - 5;

    const submenuWidth = 280;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    console.log('📍 Cálculo inicial de posición:', { leftPosition, topPosition });
    
    // Ajustar si se sale de pantalla horizontalmente
    if (leftPosition + submenuWidth > windowWidth) {
        leftPosition = dropdownRect.left - submenuWidth - 15;
        console.log('📱 Reposicionando a la izquierda. Nueva posición:', leftPosition);
    }

    // Ajustar si se sale de pantalla verticalmente
    const submenuHeight = 300; // Estimado
    if (topPosition + submenuHeight > windowHeight) {
        topPosition = windowHeight - submenuHeight - 20;
        console.log('📱 Ajustando posición vertical. Nueva posición:', topPosition);
    }

    // Para móviles, centrar
    if (window.innerWidth <= 1024) {
        leftPosition = (windowWidth - submenuWidth) / 2;
        topPosition = Math.max(100, topPosition);
        console.log('📱 Modo móvil activado. Posición centrada:', { leftPosition, topPosition });
    }

    console.log('📍 Posición final calculada:', { left: leftPosition, top: topPosition });

    // Aplicar estilos directamente con debugging
    console.log('📍 Aplicando estilos...');
    
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
    
    console.log('📍 Estilos aplicados:', stylesToApply);

    // Guardar referencia
    currentTriggerButton = triggerButton;

    // Event listeners para el submenu con debugging
    activeSubmenu.addEventListener('mouseenter', () => {
        console.log('🖱️ Mouse enter en submenu');
        clearTimeout(hideSubmenuTimeout);
    });

    activeSubmenu.addEventListener('mouseleave', () => {
        console.log('🖱️ Mouse leave en submenu');
        hideSubmenuTimeout = setTimeout(() => {
            console.log('⏰ Timeout: ocultando submenu después de mouseleave');
            hideSubmenu();
        }, 300);
    });

    console.log('✅ === SUBMENU MOSTRADO EXITOSAMENTE ===');
    
    // Verificación final detallada
    setTimeout(() => {
        if (activeSubmenu) {
            const submenuInDom = document.body.contains(activeSubmenu);
            const computedStyles = window.getComputedStyle(activeSubmenu);
            const rect = activeSubmenu.getBoundingClientRect();
            
            console.log('🔍 === VERIFICACIÓN FINAL ===');
            console.log('📍 En DOM:', submenuInDom);
            console.log('📍 Posición real:', {
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            });
            console.log('📍 Estilos computados:', {
                position: computedStyles.position,
                opacity: computedStyles.opacity,
                visibility: computedStyles.visibility,
                display: computedStyles.display,
                zIndex: computedStyles.zIndex,
                transform: computedStyles.transform
            });
            console.log('📍 ¿Visible en pantalla?', rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
            console.log('🔍 === FIN VERIFICACIÓN ===');
        } else {
            console.error('❌ activeSubmenu es null en verificación final');
        }
    }, 100);
}

// Función mejorada para ocultar submenu con debugging
function hideSubmenu() {
    console.log('🗑️ === OCULTANDO SUBMENU ===');
    
    if (activeSubmenu) {
        console.log('📍 Submenu existe, procediendo a remover...');
        try {
            if (document.body.contains(activeSubmenu)) {
                document.body.removeChild(activeSubmenu);
                console.log('✅ Submenu removido del DOM');
            } else {
                console.warn('⚠️ Submenu no estaba en el DOM');
            }
        } catch (e) {
            console.error('❌ Error al remover submenu:', e);
        }
        activeSubmenu = null;
        currentTriggerButton = null;
        console.log('📍 Referencias limpiadas');
    } else {
        console.log('📍 No hay submenu para ocultar');
    }
    clearTimeout(hideSubmenuTimeout);
    console.log('🗑️ === FIN OCULTAR SUBMENU ===');
}

// Función para configurar triggers con debugging extenso
function setupSubmenuTriggers() {
    console.log('🔧 === CONFIGURANDO TRIGGERS DE SUBMENU ===');
    
    const submenuTriggers = document.querySelectorAll('.has-submenu > button');
    console.log('📍 Triggers encontrados:', submenuTriggers.length);
    
    if (submenuTriggers.length === 0) {
        console.warn('⚠️ No se encontraron triggers de submenu');
        console.log('🔍 Elementos .has-submenu disponibles:', document.querySelectorAll('.has-submenu').length);
        return;
    }
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    console.log('📍 Dispositivo táctil:', isTouchDevice);
    
    submenuTriggers.forEach((trigger, index) => {
        const buttonText = trigger.textContent.trim();
        console.log(`🔧 Configurando trigger ${index + 1}: "${buttonText}"`);
        
        // Verificar que el trigger tiene un submenu
        const hasSubmenu = trigger.parentElement.querySelector('.submenu');
        console.log(`   📍 Tiene submenu:`, !!hasSubmenu);
        
        if (!hasSubmenu) {
            console.warn(`   ⚠️ Trigger "${buttonText}" no tiene submenu`);
            return;
        }
        
        // Limpiar listeners anteriores clonando el elemento
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        if (!isTouchDevice) {
            // Desktop: hover
            console.log(`   🖱️ Configurando hover para "${buttonText}"`);
            
            newTrigger.addEventListener('mouseenter', (e) => {
                console.log(`🖱️ === MOUSE ENTER en "${e.currentTarget.textContent.trim()}" ===`);
                clearTimeout(hideSubmenuTimeout);
                showSubmenu(e.currentTarget);
            });
            
            newTrigger.addEventListener('mouseleave', () => {
                console.log(`🖱️ === MOUSE LEAVE en "${buttonText}" ===`);
                hideSubmenuTimeout = setTimeout(() => {
                    console.log(`⏰ Timeout desde trigger "${buttonText}": ocultando submenu`);
                    hideSubmenu();
                }, 300);
            });
        } else {
            // Móvil: click
            console.log(`   👆 Configurando click para "${buttonText}"`);
            
            newTrigger.addEventListener('click', (e) => {
                console.log(`👆 === CLICK en "${e.currentTarget.textContent.trim()}" ===`);
                e.stopPropagation();
                e.preventDefault();
                showSubmenu(e.currentTarget);
            });
        }
        
        console.log(`✅ Trigger "${buttonText}" configurado`);
    });
    
    console.log('🔧 === TRIGGERS CONFIGURADOS ===');
}

// Función de limpieza global con debugging
function setupGlobalListeners() {
    console.log('🌐 === CONFIGURANDO LISTENERS GLOBALES ===');
    
    // Click fuera
    document.addEventListener('click', (e) => {
        if (activeSubmenu && !activeSubmenu.contains(e.target)) {
            const triggerContainer = currentTriggerButton?.parentElement;
            if (!triggerContainer || !triggerContainer.contains(e.target)) {
                console.log('👆 Click fuera del submenu detectado, ocultando...');
                hideSubmenu();
            }
        }
    });

    // Scroll
    window.addEventListener('scroll', () => {
        if (activeSubmenu) {
            console.log('📜 Scroll detectado, ocultando submenu');
            hideSubmenu();
        }
    });
    
    // Resize
    window.addEventListener('resize', () => {
        if (activeSubmenu) {
            console.log('📏 Resize detectado, ocultando submenu');
            hideSubmenu();
        }
    });
    
    console.log('🌐 === LISTENERS GLOBALES CONFIGURADOS ===');
}

// Función de inicialización completa
function initializeSubmenuSystem() {
    console.log('🚀 === INICIALIZANDO SISTEMA DE SUBMENU COMPLETO ===');
    
    // Diagnóstico inicial
    setTimeout(() => {
        console.log('📊 Ejecutando diagnóstico inicial...');
        const diagnostico = diagnosticarSubmenu();
        
        if (diagnostico.hasSubmenuCount === 0) {
            console.error('❌ No se encontraron elementos con submenu. Verifica el HTML.');
        }
    }, 500);
    
    // Configurar triggers
    setTimeout(() => {
        console.log('⚙️ Configurando triggers...');
        setupSubmenuTriggers();
    }, 600);
    
    // Configurar listeners globales
    setTimeout(() => {
        console.log('🌐 Configurando listeners globales...');
        setupGlobalListeners();
    }, 700);
    
    // Observador para cambios en el DOM
    const observer = new MutationObserver((mutations) => {
        console.log('🔄 Cambios en DOM detectados:', mutations.length, 'mutaciones');
        setTimeout(() => {
            console.log('🔄 Reconfigurando triggers después de cambios en DOM...');
            setupSubmenuTriggers();
        }, 100);
    });
    
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    if (tramitesDropdown) {
        observer.observe(tramitesDropdown, { childList: true, subtree: true });
        console.log('👁️ Observador de DOM configurado');
    }
    
    console.log('🚀 === SISTEMA DE SUBMENU INICIALIZADO ===');
}

// DOMContentLoaded principal
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 === DOM CONTENT LOADED ===');
    
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn?.parentElement;
    let tramitesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    console.log('📱 Dispositivo táctil detectado:', isTouchDevice);

    // --- Main Menu Logic ---
    if (!isTouchDevice && tramitesContainer) {
        console.log('🖱️ Configurando lógica hover para menú principal');
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
        console.log('👆 Configurando lógica click para menú principal');
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

    console.log('✅ Todos los listeners configurados');
    showHomepage();
});

// Exponer funciones globalmente para debugging manual
window.showSubmenu = showSubmenu;
window.hideSubmenu = hideSubmenu;
window.diagnosticarSubmenu = diagnosticarSubmenu;
window.setupSubmenuTriggers = setupSubmenuTriggers;
window.showTramitesMenu = showTramitesMenu;
window.closeTramitesMenu = closeTramitesMenu;

console.log('🎯 === INICIO.JS COMPLETAMENTE CARGADO ===');
