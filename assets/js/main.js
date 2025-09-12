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
