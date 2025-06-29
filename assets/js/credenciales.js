document.addEventListener('DOMContentLoaded', () => {

    // 1. Animación de rebote para el botón "Credencial Independiente"
    const independentButton = document.querySelector('.indep-btn');
    if (independentButton) {
        // La animación se activa cada 5 segundos y dura 2 segundos.
        // Se hace menos intrusiva que en el código original.
        setInterval(() => {
            independentButton.classList.add('bounce-animation');
            setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);

        // Activación inicial con un retraso
        setTimeout(() => {
            independentButton.classList.add('bounce-animation');
             setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 3000);
    }
    
    // 2. Animación de pulso para el botón de "Volver" al cargar la página
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        // Se activa 1.5s después de cargar la página para llamar la atención
        setTimeout(() => {
            backButton.classList.add('pulse-animation');
            // La animación dura 1s, se remueve la clase después
            setTimeout(() => {
                backButton.classList.remove('pulse-animation');
            }, 1000);
        }, 1500);
    }
    
});
