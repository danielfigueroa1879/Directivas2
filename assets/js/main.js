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
