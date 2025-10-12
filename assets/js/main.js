/**
 * assets/js/main.js
 * CORREGIDO: Lógica simplificada para la interfaz, animaciones y PWA.
 * 1. Se ha hecho el menú más compacto (vía CSS).
 * 2. Se ha corregido y simplificado la lógica del botón de cierre del megamenú "Asesor" para garantizar su funcionamiento.
 */

// Variables globales para PWA
let deferredPrompt = null;
let bannerShown = false;

// Registrar el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
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
    bannerShown = true;
    pwaBanner.classList.add('show');
    setTimeout(() => {
        if (pwaBanner.classList.contains('show')) {
            pwaBanner.classList.remove('show');
        }
    }, 10000);
}

async function installPWA() {
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (pwaBanner) pwaBanner.classList.remove('show');
    if (deferredPrompt) {
        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('✅ PWA: Instalación aceptada');
            }
            deferredPrompt = null;
        } catch (error) {
            console.error('💥 PWA: Error durante la instalación:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const asesorItem = document.querySelector('.asesor-item');
    const asesorMegamenu = document.getElementById('asesor-megamenu');
    const asesorTriggerBtn = document.getElementById('asesor-trigger-btn');
    const asesorCloseBtn = document.getElementById('asesor-close-btn');
    const installButton = document.getElementById('install-button');
    const closeBannerButton = document.getElementById('close-install-banner');

    // --- MANEJO DEL MENÚ PRINCIPAL (MÓVIL Y ESCRITORIO) ---
    const toggleMenu = () => {
        const isHidden = mobileDropdown.classList.contains('hidden');
        mobileDropdown.classList.toggle('hidden');
        mobileMenuOverlay.classList.toggle('hidden', isHidden);
        setTimeout(() => mobileDropdown.classList.toggle('show', isHidden), 10);
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMenu);
    }

    // --- LÓGICA DE SUBMENÚS ---
    const submenuContainers = document.querySelectorAll('#mobile-dropdown .has-submenu');
    submenuContainers.forEach(parent => {
        const btn = parent.querySelector('.submenu-parent-btn');
        if (btn && !parent.classList.contains('asesor-item')) { // Excluir el trigger de asesor de esta lógica
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Cerrar otros submenús
                submenuContainers.forEach(other => {
                    if (other !== parent) other.classList.remove('submenu-open');
                });
                // Abrir/cerrar el actual
                parent.classList.toggle('submenu-open');
            });
        }
    });

    // --- LÓGICA CORREGIDA PARA EL MEGAMENÚ DE ASESOR ---
    const openAsesorMegamenu = () => {
        if (!asesorMegamenu) return;
        asesorMegamenu.classList.add('show');
        // Cerrar menú principal en móvil para que no se solapen
        if (window.innerWidth < 1024 && mobileDropdown.classList.contains('show')) {
            toggleMenu();
        }
    };

    const closeAsesorMegamenu = () => {
        if (!asesorMegamenu) return;
        asesorMegamenu.classList.remove('show');
    };

    if (asesorTriggerBtn) {
        asesorTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se cierre el menú principal
            const isOpen = asesorMegamenu.classList.contains('show');
            if (isOpen) {
                closeAsesorMegamenu();
            } else {
                openAsesorMegamenu();
            }
        });
    }

    // ***** LA CORRECCIÓN PRINCIPAL ESTÁ AQUÍ *****
    // Se asegura que el botón de cierre tenga su propio evento de clic
    // que llama directamente a la función de cierre, sin condiciones complejas.
    if (asesorCloseBtn) {
        asesorCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Detener el evento para no afectar otros menús
            console.log("Botón de cerrar 'Asesor' clickeado.");
            closeAsesorMegamenu();
        });
    }

    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', () => {
        if (mobileDropdown.classList.contains('show')) {
            toggleMenu();
        }
        if (asesorMegamenu.classList.contains('show')) {
            closeAsesorMegamenu();
        }
    });

    // Evitar que clics dentro de los menús los cierren
    mobileDropdown.addEventListener('click', e => e.stopPropagation());
    asesorMegamenu.addEventListener('click', e => e.stopPropagation());

    // --- LÓGICA PWA ---
    if (installButton) installButton.addEventListener('click', installPWA);
    if (closeBannerButton) {
        closeBannerButton.addEventListener('click', () => {
            const pwaBanner = document.getElementById('pwa-install-banner');
            if (pwaBanner) pwaBanner.classList.remove('show');
        });
    }

    console.log('✅ Componentes inicializados correctamente');
});

window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA: App instalada');
    deferredPrompt = null;
    bannerShown = false;
});

// --- FUNCIONES GLOBALES PARA ENLACES ---

// Función para cerrar cualquier menú activo
function closeActiveMenus() {
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const asesorMegamenu = document.getElementById('asesor-megamenu');

    if (mobileDropdown && mobileDropdown.classList.contains('show')) {
        mobileDropdown.classList.remove('show');
        setTimeout(() => mobileDropdown.classList.add('hidden'), 300);
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
    }
    if (asesorMegamenu && asesorMegamenu.classList.contains('show')) {
        asesorMegamenu.classList.remove('show');
    }
}

window.openNewLink = function(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
    closeActiveMenus();
};

window.handleDirectiva = function() {
    showDirectiva();
    closeActiveMenus();
}
window.handleCredenciales = function() {
    showCredenciales();
    closeActiveMenus();
}
window.handleCredencialIndependiente = function() {
    openNewLink('https://drive.google.com/uc?export=download&id=1nTEa4dzI1K-v0xf_nCjzUFEaRWnWnXYS');
}
window.handleCerofilas = function() { openNewLink('https://dal5.short.gy/CFil'); }
window.handleValores = function() { openNewLink('https://dal5.short.gy/val'); }
window.handleValorPlan = function() { openNewLink('https://os10.short.gy/Pl4n'); }
window.handleBuscarCurso = function(url) { openNewLink(url); }
