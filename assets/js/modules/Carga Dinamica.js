/**
 * dynamic-loaders.js
 * Librerías pesadas que se cargan solo cuando el usuario las necesita.
 */

export function initDynamicLoaders() {
    // --- BLOQUE 9: PDF (html2pdf) ---
    window.descargarContenidoPDF = async function(id, name) {
        if (!window.html2pdf) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            await new Promise(r => { script.onload = r; document.head.appendChild(script); });
        }
        const opt = { margin: 1, filename: name || 'doc.pdf', html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'in', format: 'letter' }};
        html2pdf().set(opt).from(document.getElementById(id)).save();
    };

    // --- BLOQUE 14: YouTube Facade ---
    document.querySelectorAll('.youtube-facade').forEach(f => {
        f.addEventListener('click', () => {
            const id = f.getAttribute('data-id');
            f.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="w-full h-full absolute inset-0"></iframe>`;
        });
    });

    // --- BLOQUE 15: Traductor ---
    window.cargarTraductor = function() {
        if (document.getElementById('gt-script')) return;
        const s = document.createElement('script');
        s.id = 'gt-script';
        s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(s);
        window.googleTranslateElementInit = () => { new google.translate.TranslateElement({ pageLanguage: 'es' }, 'google_translate_element'); };
    };

    const lBtn = document.getElementById('lang-selector-btn');
    if (lBtn) lBtn.addEventListener('click', () => {
        document.getElementById('lang-selector').classList.toggle('open');
        window.cargarTraductor();
    });
}