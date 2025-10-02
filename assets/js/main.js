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


// ===== FUNCIONES DEL MENÚ DE TRÁMITES (CORREGIDAS Y RECUPERADAS) =====

document.addEventListener('DOMContentLoaded', () => {
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');

    // Función para cerrar todos los submenús
    const closeAllSubmenus = (except = null) => {
        document.querySelectorAll('.submenu.show').forEach(submenu => {
            if (submenu !== except && !submenu.contains(except)) {
                submenu.classList.remove('show');
                submenu.closest('.has-submenu')?.classList.remove('submenu-open');
            }
        });
    };

    // Función para cerrar el menú principal
    const closeMainMenu = () => {
        tramitesDropdown.classList.add('hidden');
        tramitesMenuBtn.classList.remove('panel-active');
        const arrow = tramitesMenuBtn.querySelector('#tramites-arrow');
        if(arrow) arrow.style.transform = 'rotate(-90deg)';
        closeAllSubmenus();
    };

    // Toggle para el botón principal "Trámites"
    tramitesMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = tramitesDropdown.classList.contains('hidden');
        if (isHidden) {
            tramitesDropdown.classList.remove('hidden');
            tramitesMenuBtn.classList.add('panel-active');
            const arrow = tramitesMenuBtn.querySelector('#tramites-arrow');
            if(arrow) arrow.style.transform = 'rotate(0deg)';
        } else {
            closeMainMenu();
        }
    });

    // Lógica para todos los botones que tienen un submenú
    document.querySelectorAll('.has-submenu > button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentElement = button.parentElement;
            const submenu = parentElement.querySelector('.submenu');
            
            const isOpen = submenu.classList.contains('show');

            // Cerrar otros submenús en el mismo nivel
            const siblings = [...parentElement.parentElement.children].filter(child => child !== parentElement && child.classList.contains('has-submenu'));
            siblings.forEach(sibling => {
                sibling.classList.remove('submenu-open');
                sibling.querySelector('.submenu')?.classList.remove('show');
            });

            // Toggle del submenú actual
            if(isOpen){
                parentElement.classList.remove('submenu-open');
                submenu.classList.remove('show');
            } else {
                parentElement.classList.add('submenu-open');
                submenu.classList.add('show');
            }


            // Posicionamiento del submenú
            const rect = button.getBoundingClientRect();
            if (window.innerWidth > 1024) { // Desktop
                submenu.style.left = `${rect.right + 5}px`;
                submenu.style.top = `${rect.top}px`;
            } else { // Mobile
                submenu.style.left = '5px';
                submenu.style.top = `${rect.bottom + 5}px`;
            }
        });
    });

    // Cerrar todo al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!tramitesDropdown.contains(e.target)) {
            closeMainMenu();
        }
    });
});


// Handlers de navegación de secciones (Hacemos que sean globales)
window.openNewLink = function(url) {
    if (url) {
        window.open(url, '_blank');
    }
    // Cierre del menú al hacer clic en un enlace
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    if (tramitesDropdown) {
        tramitesDropdown.classList.add('hidden');
        document.getElementById('tramites-menu-btn').classList.remove('panel-active');
        const arrow = document.getElementById('tramites-arrow');
        if(arrow) arrow.style.transform = 'rotate(-90deg)';
        document.querySelectorAll('.submenu.show').forEach(submenu => {
            submenu.classList.remove('show');
            submenu.closest('.has-submenu')?.classList.remove('submenu-open');
        });
    }
};


window.handleCerofilas = function() { window.openNewLink('https://dal5.short.gy/CFil'); }
window.handleDirectiva = function() { showDirectiva(); window.openNewLink(''); } // Cierra el menú
window.handleCredenciales = function() { showCredenciales(); window.openNewLink(''); } // Cierra el menú
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
