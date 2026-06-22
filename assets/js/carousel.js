/**
 * assets/js/carousel.js
 * Contiene la lógica reutilizable para inicializar carruseles horizontales.
 *
 * OPTIMIZACIÓN ANTI-REFLOW:
 * Las propiedades geométricas (offsetWidth, offsetLeft, scrollWidth, clientWidth)
 * se leen una sola vez en refreshCache() y se actualizan solo en resize.
 * Esto evita "forced synchronous layouts" en el scroll handler y otras funciones.
 */
function initializeCarousel({
    containerSelector,
    cardSelector,
    dotsSelector,
    autoScroll = 'mobile', // 'none', 'mobile', 'always'
    scrollSpeed = 4000
}) {
    const scrollContainer = document.querySelector(containerSelector);
    const dotsContainer = document.querySelector(dotsSelector);

    if (!scrollContainer) {
        return;
    }

    const cards = scrollContainer.querySelectorAll(cardSelector);
    const cardCount = cards.length;
    let autoScrollInterval;
    let currentIndex = 0;

    if (cardCount <= 1) {
        if (dotsContainer) dotsContainer.style.display = 'none';
        return;
    }

    // --- CACHÉ DE VALORES GEOMÉTRICOS ---
    // Se leen en bloque una sola vez y se actualizan solo en resize,
    // evitando reflows forzados en cada evento de scroll.
    let cachedContainerWidth = 0;
    let cachedCardRects = [];  // { offsetLeft, offsetWidth } de cada tarjeta
    let cachedIsActive = false;

    const refreshCache = () => {
        // Todas las lecturas geométricas agrupadas aquí → un solo reflow
        cachedContainerWidth = scrollContainer.offsetWidth;
        cachedIsActive = scrollContainer.scrollWidth > scrollContainer.clientWidth;
        cachedCardRects = Array.from(cards).map(card => ({
            offsetLeft: card.offsetLeft,
            offsetWidth: card.offsetWidth
        }));
    };

    // Sin reflow: usa valor cacheado
    const isCarouselActive = () => cachedIsActive;

    // Carga inicial del caché — se lee ANTES de modificar el DOM (evita reflow forzado)
    refreshCache();

    // Cantidad de "páginas" del carrusel = tarjetas totales - visibles + 1.
    // En móvil suele ser 1 visible → dotCount = cardCount.
    // En PC entran varias → dotCount es menor (1 punto por posición de scroll única).
    const computeDotCount = () => {
        if (!cachedCardRects.length) return cardCount;
        const firstLeft = cachedCardRects[0].offsetLeft;
        let visible = 0;
        // Visible = tarjetas cuyo borde izquierdo cae dentro del viewport
        // (incluye la última que se ve parcialmente como "peek").
        for (const r of cachedCardRects) {
            if (r.offsetLeft - firstLeft < cachedContainerWidth) visible++;
            else break;
        }
        return Math.max(1, cardCount - Math.max(1, visible) + 1);
    };

    // 1. Crear los puntos de paginación (DOM modification DESPUÉS de leer geometría)
    let dotCount = computeDotCount();
    console.log('[carousel]', containerSelector, 'cardCount=', cardCount, 'dotCount=', dotCount, 'containerW=', cachedContainerWidth, 'isActive=', cachedIsActive);
    const renderDots = () => {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoScroll();
            });
            dotsContainer.appendChild(dot);
        }
    };
    renderDots();

    let dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }

    // 2. Función para ir a una "página" (índice de punto, no índice de tarjeta)
    function goToSlide(pageIndex) {
        if (!isCarouselActive()) return;
        if (pageIndex < 0 || pageIndex >= dotCount) return;
        const cached = cachedCardRects[pageIndex];
        if (!cached) return;
        // Alinea la tarjeta de la página al borde izquierdo del viewport del carrusel
        const firstLeft = cachedCardRects[0].offsetLeft;
        const scrollLeft = cached.offsetLeft - firstLeft;
        scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        currentIndex = pageIndex;
        updateDots();
    }

    // 3. Actualizar el punto activo
    function updateDots() {
        if (!dotsContainer || !isCarouselActive()) return;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // 4. Detectar la página actual mientras se hace scroll
    const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;

        if (!isCarouselActive()) {
            if (dotsContainer) dotsContainer.style.display = 'none';
            return;
        }
        if (dotsContainer) dotsContainer.style.display = 'flex';

        // Página activa = tarjeta cuyo borde izquierdo está más cerca del scroll actual,
        // recortada al rango de páginas válidas [0, dotCount-1].
        const firstLeft = cachedCardRects[0].offsetLeft;
        let closestIndex = 0;
        let minDistance = Infinity;
        cachedCardRects.forEach(({ offsetLeft }, i) => {
            const cardScrollPos = offsetLeft - firstLeft;
            const distance = Math.abs(cardScrollPos - scrollLeft);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        });
        const pageIndex = Math.min(closestIndex, dotCount - 1);

        if (currentIndex !== pageIndex) {
            currentIndex = pageIndex;
            updateDots();
        }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    // 5. Auto-scroll
    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);

        autoScrollInterval = setInterval(() => {
            if (!isCarouselActive()) return;
            let nextIndex = (currentIndex + 1) % dotCount;
            goToSlide(nextIndex);
        }, scrollSpeed);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function resetAutoScroll() {
        stopAutoScroll();
        manageAutoScroll();
    }

    const manageAutoScroll = () => {
        // matchMedia no fuerza reflow (usa caché interna del browser)
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (autoScroll === 'always' || (autoScroll === 'mobile' && isMobile)) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    };

    // Listeners de interacción del usuario
    scrollContainer.addEventListener('touchstart', stopAutoScroll, { passive: true });
    scrollContainer.addEventListener('touchend', resetAutoScroll);
    scrollContainer.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', resetAutoScroll);

    // Listener para cambios de tamaño de ventana
    window.addEventListener('resize', () => {
        refreshCache();
        // Recalcular cantidad de páginas (cambia con el viewport)
        const newDotCount = computeDotCount();
        if (newDotCount !== dotCount) {
            dotCount = newDotCount;
            renderDots();
            dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
            if (currentIndex >= dotCount) currentIndex = dotCount - 1;
        }
        handleScroll();
        manageAutoScroll();
    });

    // Iniciar por primera vez.
    // rAF garantiza que las lecturas (scrollLeft, etc.) ocurren DESPUÉS de que el
    // navegador procesa las escrituras DOM anteriores (creación de dots), evitando
    // el "forced synchronous layout" reportado por Lighthouse.
    requestAnimationFrame(() => {
        handleScroll();
        manageAutoScroll();
    });
}
