/**
 * ui-core.js
 * Maneja la navegación, menús móviles, acordeones y elementos visuales básicos.
 */

export function initUICore() {
    // --- BLOQUE 1: Submenús barra verde (Desktop) ---
    const navItems = document.querySelectorAll('.desktop-nav-item');
    let closeTimeout;
    let currentOpenSubmenu = null;

    function closeAllSubmenus() {
        navItems.forEach(item => {
            const submenu = item.querySelector('.desktop-submenu');
            if (submenu) {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                submenu.style.pointerEvents = 'none';
            }
        });
        currentOpenSubmenu = null;
    }

    navItems.forEach(item => {
        const submenu = item.querySelector('.desktop-submenu');
        if (!submenu) return;
        
        function positionSubmenu() {
            const rect = item.getBoundingClientRect();
            const submenuWidth = submenu.offsetWidth;
            const left = rect.left + (rect.width / 2) - (submenuWidth / 2);
            submenu.style.left = left + 'px';
            submenu.style.top = '93px';
        }

        item.addEventListener('mouseenter', () => {
            clearTimeout(closeTimeout);
            if (currentOpenSubmenu && currentOpenSubmenu !== submenu) {
                currentOpenSubmenu.style.opacity = '0';
                currentOpenSubmenu.style.visibility = 'hidden';
            }
            positionSubmenu();
            submenu.style.opacity = '1';
            submenu.style.visibility = 'visible';
            submenu.style.pointerEvents = 'auto';
            currentOpenSubmenu = submenu;
        });

        item.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(closeAllSubmenus, 300);
        });
    });

    // --- BLOQUE 4: Menú Móvil Drill-down ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const drilldownContainer = document.getElementById('drilldown-container');
    const backBtn = document.getElementById('back-btn');
    const drilldownTitle = document.getElementById('drilldown-title');
    const drilldownContent = document.getElementById('drilldown-content');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            drilldownContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    document.querySelectorAll('.mobile-nav-item[data-submenu]').forEach(item => {
        item.addEventListener('click', () => {
            const submenuId = item.getAttribute('data-submenu');
            const submenuTemplate = document.getElementById(submenuId);
            if (submenuTemplate) {
                drilldownTitle.textContent = item.querySelector('span').textContent;
                drilldownContent.innerHTML = submenuTemplate.innerHTML;
                drilldownContainer.classList.add('active');
            }
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            drilldownContainer.classList.remove('active');
        });
    }

    // --- BLOQUE 5: Acordeón ---
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // --- BLOQUE 11: Botón Scroll-Up ---
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    if (scrollUpBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollUpBtn.classList.add('show');
            } else {
                scrollUpBtn.classList.remove('show');
            }
        });
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}