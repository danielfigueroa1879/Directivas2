document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE DEPURACIÓN Y PWA ---

    // 1. Imprimir información de depuración en la consola.
    console.log("--- Depuración de Banner PWA ---");
    console.log("User Agent del Navegador:", navigator.userAgent);
    
    // 2. Función para detectar si el código se está ejecutando en un dispositivo móvil.
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 3. Decidir si mostrar el banner basándose en la detección.
    if (isMobile()) {
        // Mensaje para confirmar que se detectó como móvil.
        console.log("Resultado: Dispositivo detectado como MÓVIL. La lógica del banner se ejecutará.");
        
        // Si es móvil, se ejecuta toda la lógica del banner.
        let deferredPrompt;
        const androidBanner = document.getElementById('install-banner-android');
        const iosBanner = document.getElementById('install-banner-ios');

        const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isSafari = () => !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        const showBanner = (banner) => {
            if (banner) {
                banner.classList.add('visible');
            }
        };

        const hideBanner = (banner) => {
            if (banner) {
                banner.classList.remove('visible');
            }
        };
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            if (!localStorage.getItem('androidBannerClosed')) {
                showBanner(androidBanner);
            }
        });

        const installButtonAndroid = document.getElementById('install-button-android');
        if (installButtonAndroid) {
            installButtonAndroid.addEventListener('click', () => {
                hideBanner(androidBanner);
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                }
            });
        }

        const closeButtonAndroid = document.getElementById('close-banner-android');
        if (closeButtonAndroid) {
            closeButtonAndroid.addEventListener('click', () => {
                hideBanner(androidBanner);
                localStorage.setItem('androidBannerClosed', 'true');
            });
        }
        
        if (isIOS() && isSafari() && !isInStandaloneMode()) {
            if (!localStorage.getItem('iosBannerClosed')) {
                setTimeout(() => showBanner(iosBanner), 2000);
            }
        }

        const closeButtonIOS = document.getElementById('close-banner-ios');
        if (closeButtonIOS) {
            closeButtonIOS.addEventListener('click', () => {
                hideBanner(iosBanner);
                localStorage.setItem('iosBannerClosed', 'true');
            });
        }
    } else {
        // Mensaje para confirmar que se detectó como PC.
        console.log("Resultado: Dispositivo detectado como PC. El banner de instalación NO se mostrará.");
        // Si no es móvil, no se hace nada y el banner permanece oculto por defecto en el CSS.
    }


    // --- ANIMACIONES Y EFECTOS DE LA INTERFAZ (Esto funciona siempre) ---

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

