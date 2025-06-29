document.addEventListener('DOMContentLoaded', function() {
    let deferredPrompt;
    let bannerTimeout;

    // Función para detectar si es un dispositivo móvil
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Solo se ejecuta el código si es un dispositivo móvil
    if (isMobile()) {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevenir que Chrome 67 y anteriores muestren el prompt automáticamente
            e.preventDefault(); 
            // Guardar el evento para poder dispararlo más tarde.
            deferredPrompt = e;

            // Crear el banner dinámicamente con los nuevos estilos
            const installBanner = document.createElement('div');
            // Se le aplica la clase definida en el nuevo CSS
            installBanner.className = 'install-banner-custom'; 
            
            installBanner.innerHTML = `
                <span>¿Quieres instalar esta app?</span>
                <button id="install-button-custom">Instalar</button>
            `;

            // Acción del botón de instalación
            installBanner.querySelector('#install-button-custom').addEventListener('click', () => {
                // Ocultar nuestro banner
                installBanner.remove();
                // Mostrar el prompt de instalación
                deferredPrompt.prompt();
                // Esperar a que el usuario responda al prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('Usuario aceptó la instalación');
                    } else {
                        console.log('Usuario rechazó la instalación');
                    }
                    deferredPrompt = null;
                });
            });

            // Agregar el banner al body
            document.body.appendChild(installBanner);

            // Opcional: Eliminar el banner después de un tiempo si el usuario no interactúa
            bannerTimeout = setTimeout(() => {
                if(installBanner) {
                    installBanner.remove();
                }
            }, 15000); // 15 segundos
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL BANNER PWA COMPLETAMENTE ELIMINADA ---
    // No hay código aquí que intente detectar el dispositivo o mostrar un banner.

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
            // Primero, remover la clase 'clicked' de todas las secciones
            sections.forEach(s => s.classList.remove('clicked'));
            // Luego, añadirla solo a la sección clickeada
            section.classList.add('clicked');
        });
    });

});
