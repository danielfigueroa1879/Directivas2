// PDF Generator - Optimizado
// Requiere html2pdf.js cargado previamente

function descargarModalPDF(tipo) {
    const titulo = document.getElementById('modalTitulo').textContent;
    const contenido = document.getElementById('modalContenido');

    // Mostrar animación
    const animacion = document.getElementById('pdfDownloadAnimation');
    if (animacion) {
        animacion.classList.add('active');
        setTimeout(() => {
            animacion.classList.remove('active');
        }, 5500);
    }

    // Esperar antes de generar PDF
    setTimeout(() => {
        const contenedorTemp = document.createElement('div');
        contenedorTemp.style.cssText = 'padding: 5px; background-color: white; margin: 0; width: 100%;';

        // Agregar título
        const tituloElement = document.createElement('h1');
        tituloElement.textContent = titulo;
        tituloElement.style.cssText = 'font-size: 20px; font-weight: bold; margin: 0 0 10px 0; padding: 0; color: #1f2937;';
        contenedorTemp.appendChild(tituloElement);

        // Clonar contenido
        const contenidoClone = contenido.cloneNode(true);

        // Ocultar botón de descarga
        const botonPDF = contenidoClone.querySelector('.btn-pdf-modal');
        if (botonPDF) botonPDF.remove();

        // Optimizar estilos para PDF
        contenidoClone.style.cssText = 'margin: 0; padding: 0;';

        const todosLosElementos = contenidoClone.querySelectorAll('*');
        todosLosElementos.forEach(elemento => {
            if (elemento.style.marginTop) elemento.style.marginTop = '0';
            if (elemento.style.marginBottom) elemento.style.marginBottom = '0';
            if (elemento.style.paddingTop) elemento.style.paddingTop = '0';
            if (elemento.style.paddingBottom) elemento.style.paddingBottom = '0';

            if (elemento.classList.contains('requisito-section-componentes')) {
                elemento.style.cssText += 'margin: 5px 0 !important; padding: 8px !important; page-break-inside: avoid;';
            }

            if (elemento.classList.contains('requisito-item-componentes')) {
                elemento.style.cssText += 'margin: 3px 0 !important; padding: 6px !important; page-break-inside: avoid;';
            }

            if (elemento.className && typeof elemento.className === 'string') {
                if (elemento.className.includes('mt-')) elemento.style.marginTop = '5px';
                if (elemento.className.includes('mb-')) elemento.style.marginBottom = '5px';
                if (elemento.className.includes('space-y-')) elemento.style.cssText += 'gap: 5px;';
            }
        });

        contenedorTemp.appendChild(contenidoClone);

        const nombreArchivo = `OS10-Requisitos-${titulo.replace(/\s+/g, '-')}.pdf`;

        const opciones = {
            margin: [8, 8, 8, 8],
            filename: nombreArchivo,
            image: { type: 'jpeg', quality: 0.96 },
            html2canvas: {
                scale: 1.5,
                useCORS: true,
                logging: false,
                letterRendering: true,
                backgroundColor: '#ffffff',
                scrollY: 0,
                scrollX: 0,
                windowHeight: document.documentElement.scrollHeight,
                onclone: function(clonedDoc) {
                    const clonedContent = clonedDoc.body.querySelector('div');
                    if (clonedContent) {
                        const allElements = clonedContent.querySelectorAll('*');
                        allElements.forEach(el => {
                            el.style.pageBreakInside = 'auto';
                            el.style.pageBreakBefore = 'auto';
                            el.style.pageBreakAfter = 'auto';
                        });
                    }
                }
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: [], before: [], after: [], avoid: [] }
        };

        html2pdf().set(opciones).from(contenedorTemp).save()
            .then(() => console.log('✅ PDF descargado:', nombreArchivo))
            .catch(error => {
                console.error('❌ Error al generar PDF:', error);
                alert('Error al generar el PDF. Por favor, intenta nuevamente.');
            });

    }, 3000);
}

// Hacer la función global
window.descargarModalPDF = descargarModalPDF;
