/**
 * assets/js/main.js
 * Este archivo contiene la lógica para la interfaz de usuario,
 * animaciones y el banner para instalar la PWA.
 */

// Variables globales para PWA
let deferredPrompt = null;
let bannerShown = false;

// Registrar el evento beforeinstallprompt INMEDIATAMENTE
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('🎯 PWA: beforeinstallprompt event captured');
    e.preventDefault();
    deferredPrompt = e;
    
    // Si es móvil y no está instalado, mostrar banner después de que cargue el DOM
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    
    if (isMobile && !isStandalone && !bannerShown) {
        showPWABanner();
    }
});

// Función para mostrar el banner PWA
function showPWABanner() {
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (!pwaBanner || bannerShown) return;
    
    console.log('📱 PWA: Showing install banner');
    bannerShown = true;
    pwaBanner.classList.add('show');
    
    // Auto-hide después de 10 segundos
    setTimeout(() => {
        if (pwaBanner.classList.contains('show')) {
            pwaBanner.classList.remove('show');
        }
    }, 10000);
}

// Función para instalar PWA
async function installPWA() {
    console.log('🔽 PWA: Install button clicked');
    const pwaBanner = document.getElementById('pwa-install-banner');
    const pwaModal = document.getElementById('pwa-install-modal');
    
    // Ocultar banner
    if (pwaBanner) {
        pwaBanner.classList.remove('show');
    }
    
    if (deferredPrompt) {
        console.log('✅ PWA: Triggering installation prompt');
        try {
            await deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            
            console.log(`🎯 PWA: User choice: ${choiceResult.outcome}`);
            
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ PWA: Installation accepted');
            } else {
                console.log('❌ PWA: Installation dismissed');
            }
            
            deferredPrompt = null;
        } catch (error) {
            console.error('💥 PWA: Error during installation:', error);
            // Mostrar modal como fallback solo si hay error
            if (pwaModal) {
                pwaModal.classList.add('show');
            }
        }
    } else {
        console.log('⚠️ PWA: No deferred prompt available, showing manual instructions');
        // Mostrar modal con instrucciones manuales
        if (pwaModal) {
            pwaModal.classList.add('show');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing PWA and UI components');
    
    // --- ELEMENTOS PWA ---
    const pwaBanner = document.getElementById('pwa-install-banner');
    const installButton = document.getElementById('install-button');
    const closeButton = document.getElementById('close-install-banner');
    const pwaModal = document.getElementById('pwa-install-modal');
    const closeInstallModalButton = document.getElementById('close-install-modal');

    // Detectar tipo de dispositivo
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    console.log(`📱 Device: Mobile=${isMobile()}, Standalone=${isStandalone()}, DeferredPrompt=${!!deferredPrompt}`);

    // Si es móvil, no está instalado y no se ha mostrado banner, mostrarlo
    if (isMobile() && !isStandalone() && !bannerShown) {
        if (deferredPrompt) {
            // Si ya tenemos el prompt, mostrar banner inmediatamente
            showPWABanner();
        } else {
            // Si no tenemos el prompt, esperamos un poco y luego mostramos el banner
            setTimeout(() => {
                if (!bannerShown) {
                    showPWABanner();
                }
            }, 2000);
        }
    }

    // Event listeners para PWA
    if (installButton) {
        installButton.addEventListener('click', installPWA);
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('❌ PWA: Banner closed by user');
            if (pwaBanner) {
                pwaBanner.classList.remove('show');
            }
        });
    }

    if (closeInstallModalButton) {
        closeInstallModalButton.addEventListener('click', () => {
            console.log('❌ PWA: Modal closed by user');
            if (pwaModal) {
                pwaModal.classList.remove('show');
            }
        });
    }

    // --- ANIMACIONES Y EFECTOS DE LA INTERFAZ ---

    // 1. Animación de rebote para el botón de "Tramitar Credenciales"
    const tramitarBtn = document.getElementById('tramitarCredencialesBtn');
    if (tramitarBtn) {
        setInterval(() => {
            tramitarBtn.classList.add('bounce-animation');
            setTimeout(() => {
                tramitarBtn.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);
    }
    
    // 2. Efecto de "clic" para resaltar la sección activa
    const sections = document.querySelectorAll('.section-card');
    sections.forEach(section => {
        section.addEventListener('click', () => {
            sections.forEach(s => s.classList.remove('clicked'));
            section.classList.add('clicked');
        });
    });

    // Código para mostrar el tooltip del chatbot al cargar la página
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbotTooltip = document.getElementById('chatbot-tooltip');

    if (chatToggleButton && chatbotTooltip) {
        // Mostrar el tooltip por 15 segundos
        chatbotTooltip.classList.remove('hidden');
        chatbotTooltip.classList.add('show');
        
        setTimeout(() => {
            chatbotTooltip.classList.remove('show');
            setTimeout(() => {
                chatbotTooltip.classList.add('hidden');
            }, 500); // Duración de la transición de opacidad
        }, 15000); // 15 segundos
    }

    console.log('✅ All components initialized successfully');
});

// Event listener adicional para detectar cuando la app se instala
window.addEventListener('appinstalled', (e) => {
    console.log('🎉 PWA: App was installed successfully');
    deferredPrompt = null;
    bannerShown = false; // Reset para futuras instalaciones
});

// Debug: Mostrar información del entorno
console.log('🔧 PWA Environment:', {
    userAgent: navigator.userAgent,
    standalone: window.matchMedia('(display-mode: standalone)').matches,
    navigatorStandalone: navigator.standalone,
    serviceWorker: 'serviceWorker' in navigator
});

// Función para detectar capacidades PWA específicas
function detectarCapacidadesPWA() {
    const userAgent = navigator.userAgent;
    
    // Detectar sistema operativo y navegador
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);
    const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSamsungBrowser = /SamsungBrowser/.test(userAgent);
    
    console.log('🔍 COMPATIBILIDAD PWA POR DISPOSITIVO:');
    
    if (isIOS) {
        console.log('📱 iOS DETECTADO:');
        if (isSafari) {
            console.log('   Safari iOS: ⚠️ LIMITADO');
            console.log('   - Instalación: Manual (Add to Home Screen)');
            console.log('   - beforeinstallprompt: ❌ No soportado');
            console.log('   - Service Worker: ✅ Soportado');
            console.log('   - Manifest: ✅ Soportado');
            return { canAutoInstall: false, method: 'manual', platform: 'iOS Safari' };
        } else {
            console.log('   Otro navegador iOS: ❌ Muy limitado');
            return { canAutoInstall: false, method: 'none', platform: 'iOS Other' };
        }
    }
    
    if (isAndroid) {
        console.log('🤖 ANDROID DETECTADO:');
        if (isChrome) {
            console.log('   Chrome Android: ✅ PERFECTO');
            console.log('   - Instalación: Automática');
            return { canAutoInstall: true, method: 'auto', platform: 'Android Chrome' };
        } else if (isEdge) {
            console.log('   Edge Android: ✅ BUENO');
            return { canAutoInstall: true, method: 'auto', platform: 'Android Edge' };
        } else if (isSamsungBrowser) {
            console.log('   Samsung Browser: ⚠️ LIMITADO');
            return { canAutoInstall: false, method: 'manual', platform: 'Samsung Browser' };
        } else if (isFirefox) {
            console.log('   Firefox Android: ⚠️ LIMITADO');
            return { canAutoInstall: false, method: 'limited', platform: 'Firefox Android' };
        } else {
            console.log('   Otro navegador Android: ❌ Variable');
            return { canAutoInstall: false, method: 'unknown', platform: 'Android Other' };
        }
    }
    
    // Desktop
    console.log('💻 ESCRITORIO DETECTADO:');
    if (isChrome) {
        console.log('   Chrome Desktop: ⚠️ Limitado (solo algunas PWA)');
        return { canAutoInstall: false, method: 'limited', platform: 'Chrome Desktop' };
    } else if (isEdge) {
        console.log('   Edge Desktop: ⚠️ Limitado');
        return { canAutoInstall: false, method: 'limited', platform: 'Edge Desktop' };
    } else {
        console.log('   Otro navegador Desktop: ❌ No soportado');
        return { canAutoInstall: false, method: 'none', platform: 'Desktop Other' };
    }
}

// Función para mostrar instrucciones específicas según el dispositivo
function mostrarInstruccionesEspecificas(capacidades) {
    const banner = document.getElementById('pwa-install-banner');
    if (!banner) return;
    
    // Si no puede instalar automáticamente, mostrar instrucciones específicas
    if (!capacidades.canAutoInstall && capacidades.method !== 'none') {
        
        // Crear un banner especial para iOS
        if (capacidades.platform === 'iOS Safari') {
            const iosBanner = document.createElement('div');
            iosBanner.id = 'ios-install-banner';
            iosBanner.className = 'pwa-install-banner md:block'; // Mostrar también en desktop para testing
            iosBanner.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span class="text-gray-800 text-sm font-medium">
                        Para instalar: Toca 
                        <svg class="inline w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        y luego "Añadir a pantalla de inicio"
                    </span>
                </div>
                <button id="close-ios-banner" class="text-gray-500 hover:text-gray-800 p-1 rounded-full">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            `;
            
            // Insertar el banner iOS
            banner.parentNode.insertBefore(iosBanner, banner);
            iosBanner.classList.add('show');
            
            // Event listener para cerrar
            document.getElementById('close-ios-banner')?.addEventListener('click', () => {
                iosBanner.classList.remove('show');
            });
            
            // Auto-hide después de 15 segundos
            setTimeout(() => {
                if (iosBanner.classList.contains('show')) {
                    iosBanner.classList.remove('show');
                }
            }, 15000);
        }
    }
}

// Función mejorada para manejar instalación según el dispositivo
function handleInstallacionUniversal() {
    const capacidades = detectarCapacidadesPWA();
    
    // Si puede instalar automáticamente, usar el método normal
    if (capacidades.canAutoInstall && deferredPrompt) {
        return installPWA(); // Función original
    }
    
    // Si es iOS Safari, mostrar instrucciones específicas
    if (capacidades.platform === 'iOS Safari') {
        mostrarInstruccionesEspecificas(capacidades);
        return;
    }
    
    // Para otros casos, solo ocultar banner
    console.log(`⚠️ Instalación no disponible en ${capacidades.platform}`);
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
        banner.classList.remove('show');
    }
}

// Ejecutar detección al cargar
document.addEventListener('DOMContentLoaded', () => {
    const capacidades = detectarCapacidadesPWA();
    
    // Reemplazar el event listener del botón install
    const installButton = document.getElementById('install-button');
    if (installButton) {
        // Remover listener anterior
        installButton.removeEventListener('click', installPWA);
        // Agregar nuevo listener universal
        installButton.addEventListener('click', handleInstallacionUniversal);
    }
});

// Event listener adicional para detectar cuando la app se instala
window.addEventListener('appinstalled', (e) => {
    console.log('🎉 PWA: App was installed successfully');
    deferredPrompt = null;
    bannerShown = false; // Reset para futuras instalaciones
});


// ===== FUNCIONES DEL MENÚ DE TRÁMITES (CORREGIDAS Y MEJORADAS) =====

// Variable de estado para el menú principal
let tramitesDropdownOpen = false;
let hideMainMenuTimeout;
// AUMENTADO el tiempo de retardo para que el mouse alcance a entrar al submenú (250ms)
let submenuTimeout; 

// Función para abrir el menú principal de Trámites
function showTramitesDropdown() {
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesArrow = document.getElementById('tramites-arrow');
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    
    clearTimeout(hideMainMenuTimeout);
    if (!tramitesDropdownOpen) {
        tramitesDropdownOpen = true;
        tramitesDropdown.classList.remove('hidden');
        // Usar requestAnimationFrame para forzar la actualización de estilos antes de la transición
        requestAnimationFrame(() => {
            tramitesDropdown.classList.add('show');
            tramitesMenuBtn.classList.add('panel-active');
            // La flecha principal ahora rota 180° (apunta arriba)
            tramitesArrow.style.transform = 'rotate(180deg)'; 
        });
    }
}

// Función para cerrar el menú principal de Trámites
function hideTramitesDropdown() {
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesArrow = document.getElementById('tramites-arrow');
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    // Cerrar submenús inmediatamente antes de cerrar el menú principal
    hasSubmenus.forEach(item => {
        item.querySelector('.submenu')?.classList.remove('show');
        item.classList.remove('submenu-open');
    });

    hideMainMenuTimeout = setTimeout(() => {
        if (tramitesDropdownOpen) {
            tramitesDropdownOpen = false;
            tramitesDropdown.classList.remove('show');
            tramitesMenuBtn.classList.remove('panel-active');
            // La flecha principal vuelve a 0° (apunta abajo)
            tramitesArrow.style.transform = 'rotate(0deg)'; 
            
            setTimeout(() => {
                tramitesDropdown.classList.add('hidden');
            }, 300); // Espera la duración de la transición CSS
        }
    }, 200); // Retardo de 200ms para asegurar que el mouse tiene tiempo de salir
}

// Función para toggle del menú principal (solo móvil)
function toggleTramitesDropdown(event) {
    // Evita el cierre inmediato si se está usando el hover en PC
    if (window.innerWidth > 1024 && !('ontouchstart' in window)) return;
    
    if (tramitesDropdownOpen) {
        hideTramitesDropdown();
        clearTimeout(hideMainMenuTimeout); // Forzar cierre inmediato en móvil/touch
        tramitesDropdownOpen = false;
        
        // Cierre CSS inmediato
        document.getElementById('tramites-dropdown').classList.remove('show');
        document.getElementById('tramites-menu-btn').classList.remove('panel-active');
        document.getElementById('tramites-arrow').style.transform = 'rotate(0deg)';
        
        // Cerrar todos los submenús al cerrar el menú principal
        document.querySelectorAll('.has-submenu').forEach(item => {
            item.querySelector('.submenu')?.classList.remove('show');
            item.classList.remove('submenu-open');
        });
        
        setTimeout(() => {
            document.getElementById('tramites-dropdown').classList.add('hidden');
        }, 50); // Mínimo delay para asegurar la clase 'hidden'
    } else {
        showTramitesDropdown();
    }
}


// CONFIGURACIÓN PRINCIPAL DEL MENÚ TRÁMITES
document.addEventListener('DOMContentLoaded', () => {
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn.parentElement;
    const hasSubmenus = document.querySelectorAll('.has-submenu');
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktop = window.innerWidth > 1024;
    
    // --- Lógica del Menú Principal (Trámites) ---
    if (tramitesMenuBtn) {
        if (isDesktop && !isTouchDevice) {
            // PC: HOVER automático
            tramitesContainer.addEventListener('mouseenter', showTramitesDropdown);
            tramitesContainer.addEventListener('mouseleave', hideTramitesDropdown);
            
            // Mantener abierto cuando el mouse está sobre el dropdown
            tramitesDropdown.addEventListener('mouseenter', () => {
                clearTimeout(hideMainMenuTimeout);
            });
            tramitesDropdown.addEventListener('mouseleave', hideTramitesDropdown);
        } else {
            // MÓVIL: CLICK
            tramitesMenuBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleTramitesDropdown(event);
            });
        }
    }

    // --- Lógica de los Submenús Flyout (Componentes, Doc. Editables, etc.) ---
    hasSubmenus.forEach(item => {
        const submenuButton = item.querySelector('button');
        const submenu = item.querySelector('.submenu');

        if (submenuButton && submenu) {
            
            // Función para mostrar el submenú con posicionamiento y clases
            const showSubmenu = (event) => {
                clearTimeout(submenuTimeout);
                
                // 1. Cerrar otros submenús (y remover la clase de iluminación)
                hasSubmenus.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.submenu')?.classList.remove('show');
                        otherItem.classList.remove('submenu-open');
                    }
                });
                
                // 2. Añadir clase de iluminación al item principal
                item.classList.add('submenu-open');
                
                // 3. Calcular y aplicar posicionamiento FIXED para PC
                const rect = submenuButton.getBoundingClientRect();
                
                if (window.innerWidth > 1024 && !isTouchDevice) {
                    // Desktop: Fly-out to the right (fixed position is cleaner for flyout)
                    // AJUSTE SOLICITADO: Mover el submenú un poco más a la izquierda (de +5px a -10px)
                    // -10px significa que se solapa 10px con el menú principal.
                    submenu.style.left = `${rect.right - 15}px`; 
                    submenu.style.top = `${rect.top}px`;
                    submenu.style.right = 'auto'; // Asegurar que no esté anclado a la derecha
                } else {
                    // Mobile: Desplegable debajo (CSS ya maneja el layout absoluto/ancho completo)
                    // En móvil, la visibilidad se maneja con el display: block/none del CSS
                    // No se necesita reposicionar, solo se agrega la clase 'show' para que CSS lo haga visible
                }
                
                // 4. Mostrar el submenú (activa las transiciones CSS)
                submenu.classList.add('show');
            };

            // Función para ocultar el submenú con un retardo (para PC/Hover)
            const hideSubmenuWithDelay = () => {
                clearTimeout(submenuTimeout);
                // Mantenemos el retardo de 250ms que se ajustó para la estabilidad
                submenuTimeout = setTimeout(() => {
                    submenu.classList.remove('show');
                    item.classList.remove('submenu-open');
                }, 250); 
            };
            
            // Lógica por dispositivo
            if (isDesktop && !isTouchDevice) {
                // PC: HOVER
                item.addEventListener('mouseenter', showSubmenu);
                item.addEventListener('mouseleave', hideSubmenuWithDelay);
                
                // Si el mouse entra al submenú flyout, cancela el cierre
                submenu.addEventListener('mouseenter', () => clearTimeout(submenuTimeout));
                // Si el mouse sale del submenú flyout, activa el cierre
                submenu.addEventListener('mouseleave', hideSubmenuWithDelay); 
            } else {
                // MÓVIL: CLICK (Toggle)
                submenuButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const isVisible = submenu.classList.contains('show');

                    // 1. Cerrar todos los otros submenús (incluye reset de flecha y iluminación)
                    hasSubmenus.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.querySelector('.submenu')?.classList.remove('show');
                            otherItem.classList.remove('submenu-open');
                        }
                    });

                    // 2. Toggle el actual con UN SOLO CLICK
                    if (!isVisible) {
                        showSubmenu(event);
                    } else {
                        submenu.classList.remove('show');
                        item.classList.remove('submenu-open');
                    }
                });
            }
            
            // Cierre del menú principal y submenús al hacer clic en un enlace de submenú
            submenu.querySelectorAll('button').forEach(linkButton => {
                linkButton.addEventListener('click', () => {
                    hideTramitesDropdown();
                });
            });
        }
    });

    // Cerrar menús al hacer clic fuera (en móvil)
    document.addEventListener('click', (event) => {
        if (tramitesDropdownOpen && !tramitesDropdown.contains(event.target) && !tramitesMenuBtn.contains(event.target)) {
            toggleTramitesDropdown(event);
        }
    });

    // Asegurarse de que el menú principal esté oculto al inicio
    if (tramitesDropdown) {
         tramitesDropdown.classList.add('hidden');
    }
});


// Handlers de navegación de secciones (Hacemos que sean globales)
window.openNewLink = function(url) {
    window.open(url, '_blank');
    // Cierre del menú al hacer clic en un enlace (recuperado de la lógica de menú)
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesArrow = document.getElementById('tramites-arrow');
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    if (tramitesDropdown && !tramitesDropdown.classList.contains('hidden')) {
        tramitesDropdown.classList.remove('show');
        tramitesMenuBtn.classList.remove('panel-active');
        tramitesArrow.style.transform = 'rotate(0deg)';

        hasSubmenus.forEach(item => {
            item.querySelector('.submenu')?.classList.remove('show');
            // Asegurar que se quita la clase de rotación al cerrar
            item.classList.remove('submenu-open');
        });
        
        setTimeout(() => {
            tramitesDropdown.classList.add('hidden');
        }, 300);
    }
};


window.handleCerofilas = function() { window.openNewLink('https://dal5.short.gy/CFil'); }
window.handleDirectiva = function() { showDirectiva(); }
window.handleCredenciales = function() { showCredenciales(); }
window.handleCredencialIndependiente = function() {
    const link = document.querySelector('.indep-btn');
    if (link) window.openNewLink(link.href);
}
window.handleValores = function() {
    const link = document.getElementById('valoresImageLink');
    if (link) window.openNewLink(link.href);
}
window.handleValorPlan = function() { window.openNewLink('https://os10.short.gy/Pl4n'); }
window.handleCursoFormacion = function() { window.openNewLink('https://dal5.short.gy/Form'); }
window.handleMarcoLegal = function() { window.openNewLink('https://www.zosepcar.cl/OS10.php#leyes'); }
