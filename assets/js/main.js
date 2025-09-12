document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARA EL BANNER DE INSTALACIÓN DE LA PWA ---
    let deferredPrompt = null;
    let bannerTimeout = null;
    const pwaBanner = document.getElementById('pwa-install-banner');
    const installButton = document.getElementById('install-button');
    const closeButton = document.getElementById('close-install-banner'); 
    const pwaModal = document.getElementById('pwa-install-modal');
    const closeInstallModalButton = document.getElementById('close-install-modal');

    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    // Registrar el evento beforeinstallprompt ANTES de mostrar el banner
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA: beforeinstallprompt event captured');
        e.preventDefault();
        deferredPrompt = e;
        
        // Solo mostrar el banner si es móvil y no está instalado
        if (isMobile() && !isStandalone) {
            console.log('PWA: Showing install banner');
            pwaBanner.classList.add('show');
            
            // Auto-hide banner after 10 seconds
            bannerTimeout = setTimeout(() => {
                pwaBanner.classList.remove('show');
            }, 10000);
        }
    });

    // Event listener para el botón de instalación
    installButton.addEventListener('click', async () => {
        console.log('PWA: Install button clicked');
        
        // Clear timeout and hide banner
        if (bannerTimeout) {
            clearTimeout(bannerTimeout);
            bannerTimeout = null;
        }
        pwaBanner.classList.remove('show');
        
        // Trigger installation if available
        if (deferredPrompt) {
            console.log('PWA: Triggering installation prompt');
            try {
                deferredPrompt.prompt();
                const choiceResult = await deferredPrompt.userChoice;
                console.log('PWA: User choice:', choiceResult.outcome);
                
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA: Installation accepted');
                } else {
                    console.log('PWA: Installation dismissed');
                }
                
                deferredPrompt = null;
            } catch (error) {
                console.error('PWA: Error during installation:', error);
                // Fallback to manual instructions
                pwaModal.classList.add('show');
            }
        } else {
            console.log('PWA: No deferred prompt available, showing manual instructions');
            pwaModal.classList.add('show');
        }
    });
    
    // Event listener para cerrar el banner
    closeButton.addEventListener('click', () => {
        console.log('PWA: Banner closed by user');
        if (bannerTimeout) {
            clearTimeout(bannerTimeout);
            bannerTimeout = null;
        }
        pwaBanner.classList.remove('show');
    });

    // Event listener para cerrar el modal
    closeInstallModalButton.addEventListener('click', () => {
        pwaModal.classList.remove('show');
    });

    // Fallback: Si después de 3 segundos no se capturó el evento y es móvil, mostrar el banner anyway
    setTimeout(() => {
        if (!deferredPrompt && isMobile() && !isStandalone) {
            console.log('PWA: No beforeinstallprompt event detected, showing banner anyway');
            pwaBanner.classList.add('show');
            
            bannerTimeout = setTimeout(() => {
                pwaBanner.classList.remove('show');
            }, 10000);
        }
    }, 3000);
