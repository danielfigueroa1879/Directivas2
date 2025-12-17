// UI Enhancements - Scripts inline optimizados y consolidados

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('✅ SW registered'))
            .catch(err => console.error('❌ SW registration failed', err));
    });
}

// Suspension Notice Handler
document.addEventListener('DOMContentLoaded', function() {
    const suspensionNotice = document.getElementById('suspension-notice');
    if (suspensionNotice) {
        setTimeout(() => {
            suspensionNotice.classList.add('show');
        }, 500);
        setTimeout(() => {
            suspensionNotice.classList.remove('show');
            suspensionNotice.classList.add('hide');
            setTimeout(() => {
                suspensionNotice.style.display = 'none';
            }, 500);
        }, 7500);
    }
});

// Accordion Setup
document.addEventListener('DOMContentLoaded', function() {
    function setupAccordion(toggleId, contentId, arrowId) {
        const toggleButton = document.getElementById(toggleId);
        const contentElement = document.getElementById(contentId);
        const arrowElement = document.getElementById(arrowId);

        if (toggleButton && contentElement && arrowElement) {
            toggleButton.addEventListener('click', function() {
                contentElement.classList.toggle('hidden');
                arrowElement.classList.toggle('rotate-90');
            });
        }
    }

    // Configurar secciones
    setupAccordion('leyes-toggle', 'leyes-content', 'leyes-arrow');
    setupAccordion('decretos-toggle', 'decretos-content', 'decretos-arrow');
    setupAccordion('resoluciones-toggle', 'resoluciones-content', 'resoluciones-arrow');
    setupAccordion('docs-editables-toggle', 'docs-editables-content', 'docs-editables-arrow');
    setupAccordion('modelos-solicitud-toggle', 'modelos-solicitud-content', 'modelos-solicitud-arrow');
    setupAccordion('manuales-toggle', 'manuales-content', 'manuales-arrow');
});

// Animación SPD
(function() {
    function animarTextoSPD(elementoId) {
        const textoElement = document.getElementById(elementoId);
        if (!textoElement) return;

        const textos = ['SPD', 'SUBSECRETARÍA PREV. DELITO'];
        let indiceActual = 0;

        function alternarTexto() {
            textoElement.classList.add('fade-out');
            setTimeout(function() {
                indiceActual = (indiceActual + 1) % textos.length;
                textoElement.textContent = textos[indiceActual];
                textoElement.classList.remove('fade-out');
            }, 600);
        }

        setInterval(alternarTexto, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            animarTextoSPD('texto-spd-mobile');
            animarTextoSPD('texto-spd-desktop');
        });
    } else {
        animarTextoSPD('texto-spd-mobile');
        animarTextoSPD('texto-spd-desktop');
    }
})();

// Función para manejar redirección a SPD
function handleSPD() {
    window.location.href = 'spd.html';
}

// Scroll to Top Chevron
document.addEventListener('DOMContentLoaded', function() {
    const chevronButton = document.getElementById('scroll-up-chevron');
    let scrollTimeout;

    if (!chevronButton) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            chevronButton.classList.add('visible');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                chevronButton.classList.remove('visible');
            }, 4000);
        } else {
            chevronButton.classList.remove('visible');
        }
    });

    chevronButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Hacer handleSPD global
window.handleSPD = handleSPD;
