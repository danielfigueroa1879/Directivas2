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
    const closeButton = document.getElementById('close-install-banner'); // Nuevo botón de cerrar
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

    // Solo mostrar el banner en dispositivos móviles y si la app no está instalada
    if (isMobile && !isStandalone) {
        // En lugar de esperar el evento, lo mostramos directamente
        pwaBanner.classList.remove('hidden');
        setTimeout(() => {
            pwaBanner.classList.add('show');
        }, 100);

        // Ocultar el banner después de 10 segundos
        const hideTimeout = setTimeout(() => {
            pwaBanner.classList.remove('show');
            pwaBanner.classList.add('hidden');
        }, 10000);

        // Guardar el evento de instalación si se dispara
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
        });

        installButton.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            pwaBanner.classList.remove('show');
            pwaBanner.classList.add('hidden');
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
            }
        });
        
        // Listener para el nuevo botón de cerrar
        closeButton.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            pwaBanner.classList.remove('show');
            pwaBanner.classList.add('hidden');
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
