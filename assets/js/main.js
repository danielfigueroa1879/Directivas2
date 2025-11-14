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

    // --- INICIALIZACIÓN DE CARRUSELES ---
    // Se llama a la función initializeCarousel (definida en carousel.js) para cada sección.
    
    // Carrusel para "Trámites Principales"
    initializeCarousel({
        containerSelector: '#tramites-principales .carousel-container',
        cardSelector: '.carousel-card',
        dotsSelector: '#tramites-principales .pagination-dots',
        autoScroll: 'mobile'
    });

    // Carrusel para "Componentes del Sistema"
    initializeCarousel({
        containerSelector: '#componentes-seguridad .carousel-container',
        cardSelector: '.carousel-card',
        dotsSelector: '#componentes-seguridad .pagination-dots',
        autoScroll: 'mobile'
    });

    // Carrusel para "Capacitación y Formación"
    initializeCarousel({
        containerSelector: '#capacitacion .carousel-container',
        cardSelector: '.carousel-card',
        dotsSelector: '#capacitacion .pagination-dots',
        autoScroll: 'mobile'
    });

    // Carrusel para "Servicios Adicionales"
    initializeCarousel({
        containerSelector: '#servicios-adicionales .carousel-container',
        cardSelector: '.carousel-card',
        dotsSelector: '#servicios-adicionales .pagination-dots',
        autoScroll: 'mobile'
    });

    // --- LÓGICA PARA CAMBIAR COLOR DE FLECHA DE SCROLL ---
    const chevron = document.getElementById('scroll-up-chevron');
    if (chevron) {
        const chevronSvg = chevron.querySelector('svg');
        const greenSections = document.querySelectorAll('#tramites-principales, #componentes-seguridad, #capacitacion, #main-footer');

        const handleScrollColor = () => {
            if (!chevron.classList.contains('visible') || !chevronSvg) return;

            const chevronRect = chevron.getBoundingClientRect();
            const chevronMidY = chevronRect.top + chevronRect.height / 2;

            let isOverGreen = false;
            greenSections.forEach(section => {
                const sectionRect = section.getBoundingClientRect();
                if (chevronMidY > sectionRect.top && chevronMidY < sectionRect.bottom) {
                    isOverGreen = true;
                }
            });

            if (isOverGreen) {
                if (!chevronSvg.classList.contains('text-white')) {
                    chevronSvg.classList.remove('text-green-600');
                    chevronSvg.classList.add('text-white');
                }
            } else {
                if (!chevronSvg.classList.contains('text-green-600')) {
                    chevronSvg.classList.remove('text-white');
                    chevronSvg.classList.add('text-green-600');
                }
            }
        };

        window.addEventListener('scroll', handleScrollColor, { passive: true });
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
