/**
 * assets/js/main.js
 * Este archivo solo debe contener la lógica para la interfaz de usuario,
 * como animaciones y el banner para instalar la PWA.
 * * TODA LA LÓGICA DE FIREBASE DEBE ESTAR EN EL ARCHIVO index.html
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARA EL BANNER DE INSTALACIÓN DE LA PWA ---
    let deferredPrompt;
    const pwaBanner = document.getElementById('pwa-install-banner');
    const installButton = document.getElementById('install-button');
    const closeButton = document.getElementById('close-install-banner'); 
    const pwaModal = document.getElementById('pwa-install-modal');
    const closeInstallModalButton = document.getElementById('close-install-modal');

    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    // Sólo mostrar el banner si la aplicación no está instalada y estamos en un dispositivo móvil.
    if (isMobile() && !isStandalone) {
        
        pwaBanner.classList.add('show');

        const hideTimeout = setTimeout(() => {
            pwaBanner.classList.remove('show');
        }, 10000);

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
        });

        installButton.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            pwaBanner.classList.remove('show');
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    } else {
                        console.log('User dismissed the install prompt');
                    }
                    deferredPrompt = null;
                });
            } else {
                console.log("El evento de instalación no está disponible o ya se usó. Mostrando modal de ayuda.");
                pwaModal.classList.add('show');
            }
        });
        
        closeButton.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            pwaBanner.classList.remove('show');
        });

        closeInstallModalButton.addEventListener('click', () => {
            pwaModal.classList.remove('show');
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
});
