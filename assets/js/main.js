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
            console.log('   - beforeinstallprompt: ✅ Soportado');
            return { canAutoInstall: true, method: 'auto', platform: 'Android Chrome' };
        } else if (isEdge) {
            console.log('   Edge Android: ✅ BUENO');
            console.log('   - Instalación: Automática');
            return { canAutoInstall: true, method: 'auto', platform: 'Android Edge' };
        } else if (isSamsungBrowser) {
            console.log('   Samsung Browser: ⚠️ LIMITADO');
            console.log('   - Instalación: Parcial');
            return { canAutoInstall: false, method: 'manual', platform: 'Samsung Browser' };
        } else if (isFirefox) {
            console.log('   Firefox Android: ⚠️ LIMITADO');
            console.log('   - Instalación: Limitada');
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
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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

// Ejecutar detección también al cambiar a móvil
setTimeout(() => {
    detectarCapacidadesPWA();
}, 3000);
