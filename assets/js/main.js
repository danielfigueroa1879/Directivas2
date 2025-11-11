/**
 * assets/js/main.js
 * Este archivo contiene la lógica para la interfaz de usuario,
 * animaciones y el banner para instalar la PWA.
 */

// Variables globales para PWA
let deferredPrompt = null;
let bannerShown = false;

// Registrar el evento beforeinstallprompt INMEDIATAMENTE
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('🎯 PWA: beforeinstallprompt event captured');
    e.preventDefault();
    deferredPrompt = e;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    
    if (isMobile && !isStandalone && !bannerShown) {
        showPWABanner();
    }
});

function showPWABanner() {
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (!pwaBanner || bannerShown) return;
    
    console.log('📱 PWA: Showing install banner');
    bannerShown = true;
    pwaBanner.classList.add('show');
    
    setTimeout(() => {
        if (pwaBanner.classList.contains('show')) {
            pwaBanner.classList.remove('show');
        }
    }, 10000);
}

async function installPWA() {
    console.log('🔽 PWA: Install button clicked');
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (pwaBanner) pwaBanner.classList.remove('show');
    
    if (deferredPrompt) {
        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`🎯 PWA: User choice: ${outcome}`);
            if (outcome === 'accepted') {
                console.log('✅ PWA: Installation accepted');
            } else {
                console.log('❌ PWA: Installation dismissed');
            }
            deferredPrompt = null;
        } catch (error) {
            console.error('💥 PWA: Error during installation:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- MANEJO DEL MENÚ (MÓVIL Y ESCRITORIO) ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    let menuTimeout;

    const openMenu = () => {
        clearTimeout(menuTimeout);
        if (mobileDropdown.classList.contains('hidden')) {
            mobileDropdown.classList.remove('hidden');
            setTimeout(() => mobileDropdown.classList.add('show'), 10);
            if (window.innerWidth < 1024) { // Solo mostrar overlay en móvil
                mobileMenuOverlay.classList.remove('hidden');
            }
        }
    };

    const closeMenu = (immediate = false) => {
        const delay = immediate ? 0 : 200;
        menuTimeout = setTimeout(() => {
            if (mobileDropdown.classList.contains('show')) {
                mobileDropdown.classList.remove('show');
                setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
                 if (window.innerWidth < 1024) {
                    mobileMenuOverlay.classList.add('hidden');
                }
            }
        }, delay);
    };

    const toggleMenu = () => {
        if (mobileDropdown.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu(true);
        }
    };

    if (mobileMenuBtn && mobileDropdown) {
        mobileDropdown.addEventListener('click', (e) => e.stopPropagation());
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        if (window.innerWidth >= 1024) {
            mobileMenuBtn.addEventListener('mouseenter', openMenu);
            mobileMenuBtn.addEventListener('mouseleave', () => closeMenu());
            mobileDropdown.addEventListener('mouseenter', () => clearTimeout(menuTimeout));
            mobileDropdown.addEventListener('mouseleave', () => closeMenu());
        }
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => closeMenu(true));
    }
    
    // --- LÓGICA DE SUBMENÚS ---
    const submenuContainers = document.querySelectorAll('#mobile-dropdown .has-submenu');
    submenuContainers.forEach(parent => {
        const btn = parent.querySelector('.submenu-parent-btn');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            if (!e.currentTarget.closest('.asesor-item') && !e.currentTarget.closest('.jefe-item')) {
                e.stopPropagation();
            }
            document.querySelectorAll('#mobile-dropdown .has-submenu.submenu-open').forEach(other => {
                if (other !== parent && !other.classList.contains('asesor-item') && !other.classList.contains('jefe-item')) {
                    other.classList.remove('submenu-open');
                }
            });
            if (!parent.classList.contains('asesor-item') && !parent.classList.contains('jefe-item')) {
                parent.classList.toggle('submenu-open');
            }
        });
    });

    // --- LÓGICA PARA MEGAMENÚS ---
    const setupMegamenu = (config) => {
        const item = document.querySelector(config.itemSelector);
        const megamenu = document.getElementById(config.megamenuId);
        const closeBtn = document.getElementById(config.closeBtnId);
        const triggerBtn = document.getElementById(config.triggerBtnId);
        let timeout;

        const openMegamenu = () => {
            if (!item || !megamenu) return;
            clearTimeout(timeout);
            closeAllMegamenus(config.megamenuId);
            if (window.innerWidth < 1024) closeMenu(true);
            item.classList.add('megamenu-open');
            megamenu.classList.add('show');
        };

        const closeMegamenu = (immediate = false) => {
            if (!item || !megamenu) return;
            const delay = immediate ? 0 : 300;
            timeout = setTimeout(() => {
                item.classList.remove('megamenu-open');
                megamenu.classList.remove('show');
            }, delay);
        };

        if (item && megamenu && triggerBtn) {
            triggerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = item.classList.contains('megamenu-open');
                if (isOpen) {
                    closeMegamenu(true);
                } else {
                    openMegamenu();
                }
            });
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeMegamenu(true);
                });
            }
            // The hover logic for desktop has been removed.
        }
    };

    const closeAllMegamenus = (excludeId = null) => {
        document.querySelectorAll('.asesor-megamenu').forEach(menu => {
            if (menu.id !== excludeId) {
                menu.classList.remove('show');
                const itemClass = menu.id.replace('-megamenu', '-item');
                document.querySelector(`.${itemClass}`)?.classList.remove('megamenu-open');
            }
        });
    };

    setupMegamenu({
        itemSelector: '.asesor-item',
        megamenuId: 'asesor-megamenu',
        closeBtnId: 'asesor-close-btn',
        triggerBtnId: 'asesor-trigger-btn'
    });

    setupMegamenu({
        itemSelector: '.jefe-item',
        megamenuId: 'jefe-megamenu',
        closeBtnId: 'jefe-close-btn',
        triggerBtnId: 'jefe-trigger-btn'
    });
    
    // Cerrar todo con clic afuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-submenu') && !e.target.closest('.asesor-megamenu')) {
            closeAllMegamenus();
        }
    });
    
    // Cerrar todo con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMegamenus();
        }
    });

    // --- LÓGICA PWA ---
    const installButton = document.getElementById('install-button');
    if (installButton) installButton.addEventListener('click', installPWA);
    const closeButton = document.getElementById('close-install-banner');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const pwaBanner = document.getElementById('pwa-install-banner');
            if (pwaBanner) pwaBanner.classList.remove('show');
        });
    }

    console.log('✅ All components initialized successfully');

    // --- LÓGICA PARA EL SCROLL HORIZONTAL CON PAGINACIÓN ---
    const scrollContainer = document.querySelector('.componentes-scroll-container');
    const dotsContainer = document.querySelector('.pagination-dots');
    
    if (scrollContainer && dotsContainer) {
        const cards = scrollContainer.querySelectorAll('.componente-card');
        const cardCount = cards.length;
        let autoScrollInterval;
        let currentIndex = 0;

        // 1. Crear los puntos de paginación
        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoScroll();
            });
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('.dot');
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }

        // 2. Función para ir a un slide específico
        function goToSlide(index) {
            if (index >= 0 && index < cardCount) {
                const card = cards[index];
                const scrollLeft = card.offsetLeft - (scrollContainer.offsetWidth - card.offsetWidth) / 2;
                scrollContainer.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
                currentIndex = index;
                updateDots();
            }
        }

        // 3. Actualizar el punto activo
        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        // 4. Detectar el slide actual mientras se hace scroll
        scrollContainer.addEventListener('scroll', () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const containerWidth = scrollContainer.offsetWidth;
            
            let closestCardIndex = 0;
            let minDistance = Infinity;

            cards.forEach((card, i) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const scrollCenter = scrollLeft + containerWidth / 2;
                const distance = Math.abs(cardCenter - scrollCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestCardIndex = i;
                }
            });

            if (currentIndex !== closestCardIndex) {
                currentIndex = closestCardIndex;
                updateDots();
            }
        });

        // 5. Auto-scroll
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % cardCount;
                goToSlide(nextIndex);
            }, 4000); // Cambiado a 4 segundos según solicitud
        }

        function resetAutoScroll() {
            // Solo reiniciar si estamos en móvil
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }
        }

        // Iniciar el auto-scroll y la interacción solo en móviles
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            // 6. Pausar en interacción del usuario
            scrollContainer.addEventListener('touchstart', () => clearInterval(autoScrollInterval), { passive: true });
            
            // Reanudar después de un tiempo si no hay más interacción
            scrollContainer.addEventListener('touchend', resetAutoScroll);

            // Iniciar el auto-scroll
            startAutoScroll();
        }
    }
});

window.addEventListener('appinstalled', (e) => {
    console.log('🎉 PWA: App was installed successfully');
    deferredPrompt = null;
    bannerShown = false;
});

// Función global para cerrar el menú desde los enlaces
function closeActiveMenu() {
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileDropdown && mobileDropdown.classList.contains('show')) {
        mobileDropdown.classList.remove('show');
        setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
    }
    // Cerrar todos los megamenús también
    document.querySelectorAll('.asesor-megamenu').forEach(menu => menu.classList.remove('show'));
    document.querySelectorAll('.has-submenu').forEach(item => item.classList.remove('megamenu-open'));
}

// Handlers de navegación (globales)
window.openNewLink = function(url) {
    window.open(url, '_blank');
    closeActiveMenu();
};
window.handleCerofilas = function() { openNewLink('https://dal5.short.gy/CFil'); }
window.handleDirectiva = function() { showDirectiva(); closeActiveMenu(); }
window.handleCredenciales = function() { showCredenciales(); closeActiveMenu(); }
window.handleCredencialIndependiente = function() { openNewLink('https://drive.google.com/uc?export=download&id=1cP51FJEqrndm3RDNLuDUFCR8zlGIBrwb'); }
window.handleValores = function() { openNewLink('https://dal5.short.gy/val'); }
window.handleValorPlan = function() { openNewLink('https://os10.short.gy/Pl4n'); }
window.handleBuscarCurso = function(url) { openNewLink(url); }
