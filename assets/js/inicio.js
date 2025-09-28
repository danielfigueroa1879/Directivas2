// Background rotation for homepage
let backgroundImages = [
    'assets/images/foto (1).jpeg',
    'assets/images/foto (2).jpeg',
    'assets/images/foto (3).jpeg',
    'assets/images/foto (4).jpeg',
    'assets/images/foto (5).jpeg',
    'assets/images/foto (6).jpeg',
    'assets/images/foto (7).jpeg',
    'assets/images/foto (8).jpeg',
    'assets/images/foto (9).jpeg',
    'assets/images/foto (10).jpeg',
    'assets/images/foto (11).jpeg',
    'assets/images/foto (12).jpeg',
    'assets/images/foto (13).jpeg',
    'assets/images/foto (14).jpeg',
    'assets/images/foto (15).jpeg',
    'assets/images/foto (16).jpeg',
    'assets/images/foto (17).jpeg',
    'assets/images/foto (18).jpeg',
    'assets/images/foto (19).jpeg'
];

let currentImageIndex = 0;

function rotateBackground() {
    const homepageSection = document.getElementById('homepage-section');
    if (homepageSection && document.body.classList.contains('homepage')) {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        homepageSection.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    }
}

// Start background rotation every 12 seconds for homepage
setInterval(rotateBackground, 12000);

// Functions to switch between sections
function showHomepage() {
    document.getElementById('homepage-section').style.display = 'flex';
    document.getElementById('homepage-content-wrapper').style.display = 'block';
    document.getElementById('main-footer').style.display = 'block';
    document.getElementById('contenido').style.display = 'none';
    
    document.body.className = 'homepage background-transition';
    
    const homepageSection = document.getElementById('homepage-section');
    homepageSection.style.backgroundImage = `url('${backgroundImages[0]}')`;
    currentImageIndex = 0;
    
    document.getElementById('credenciales-arrow-back-btn').classList.add('hidden');
    
    window.scrollTo(0, 0);
}

function showDirectiva() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('credenciales-section').classList.remove('active');
    
    document.body.className = '';
    
    document.getElementById('credenciales-arrow-back-btn').classList.remove('hidden');
    
    window.scrollTo(0, 0);
}

function showCredenciales() {
    document.getElementById('homepage-section').style.display = 'none';
    document.getElementById('homepage-content-wrapper').style.display = 'none';
    document.getElementById('main-footer').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('credenciales-section').classList.add('active');
    
    document.body.className = '';
    
    document.getElementById('credenciales-arrow-back-btn').classList.remove('hidden');

    window.scrollTo(0, 0);
}

// This function is now smarter
function openLink(url) {
    window.open(url, '_blank');
    closeTramitesMenu();
    hideSubmenu(); // Hide teleported submenu as well
}

// Functions for the new tramites menu
function handleCerofilas() {
    window.open('https://dal5.short.gy/CFil', '_blank');
    closeTramitesMenu();
}

function handleDirectiva() {
    showDirectiva();
    closeTramitesMenu();
}

function handleCredenciales() {
    showCredenciales();
    closeTramitesMenu();
}

function handleCredencialIndependiente() {
    const independienteLink = document.querySelector('.indep-btn');
    if (independienteLink && independienteLink.href) {
        window.open(independienteLink.href, '_blank');
    }
    closeTramitesMenu();
}

function handleValores() {
    const valoresLink = document.getElementById('valoresImageLink');
    if (valoresLink && valoresLink.href) {
        window.open(valoresLink.href, '_blank');
    }
    closeTramitesMenu();
}

function handleValorPlan() {
    window.open('https://os10.short.gy/Pl4n', '_blank');
    closeTramitesMenu();
}

function handleCursoFormacion() {
    window.open('https://dal5.short.gy/Form', '_blank');
    closeTramitesMenu();
}

function showTramitesMenu() {
    const dropdown = document.getElementById('tramites-dropdown');
    const arrow = document.getElementById('tramites-arrow');
    const menuBtn = document.getElementById('tramites-menu-btn');
    
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        arrow.style.transform = 'rotate(180deg)';
        menuBtn.classList.add('panel-active');
    }
}

function closeTramitesMenu() {
    const dropdown = document.getElementById('tramites-dropdown');
    const arrow = document.getElementById('tramites-arrow');
    const menuBtn = document.getElementById('tramites-menu-btn');
    
    if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
        menuBtn.classList.remove('panel-active');
    }
}

// --- NEW TELEPORTING SUBMENU LOGIC ---
let activeSubmenu = null;
let hideSubmenuTimeout = null;

function showSubmenu(triggerBtn) {
    const submenuTemplate = triggerBtn.parentElement.querySelector('.submenu');
    if (!submenuTemplate) return;

    clearTimeout(hideSubmenuTimeout);

    // Use a unique ID on the trigger to check if submenu is already open for it
    const triggerId = triggerBtn.id || (triggerBtn.id = `trigger-${Math.random()}`);
    if (activeSubmenu && activeSubmenu.dataset.triggerId === triggerId) {
        return;
    }

    hideSubmenu(); // Hide any other open submenu

    const rect = triggerBtn.getBoundingClientRect();
    activeSubmenu = submenuTemplate.cloneNode(true);
    activeSubmenu.dataset.triggerId = triggerId;

    // This class will make it visible and apply base styles
    activeSubmenu.classList.add('submenu-teleported'); 
    // We remove the original submenu class to avoid conflicting styles
    activeSubmenu.classList.remove('submenu'); 

    document.body.appendChild(activeSubmenu);

    // Position the teleported submenu
    activeSubmenu.style.top = `${rect.top - 5}px`;
    activeSubmenu.style.left = `${rect.right + 5}px`;

    // Add listeners to the new submenu to keep it open
    activeSubmenu.addEventListener('mouseenter', () => clearTimeout(hideSubmenuTimeout));
    activeSubmenu.addEventListener('mouseleave', () => {
        hideSubmenuTimeout = setTimeout(hideSubmenu, 300);
    });
}

function hideSubmenu() {
    if (activeSubmenu) {
        document.body.removeChild(activeSubmenu);
        activeSubmenu = null;
    }
    clearTimeout(hideSubmenuTimeout);
}

// --- REWRITTEN DOMCONTENTLOADED ---
document.addEventListener('DOMContentLoaded', () => {
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn.parentElement;
    let tramitesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Main Menu Logic ---
    if (!isTouchDevice) {
        const mainDropdownElements = [tramitesContainer, tramitesDropdown];
        mainDropdownElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                clearTimeout(tramitesTimeout);
                hideSubmenu();
                showTramitesMenu();
            });
            el.addEventListener('mouseleave', () => {
                tramitesTimeout = setTimeout(closeTramitesMenu, 300);
            });
        });
    } else {
        // Click logic for touch devices
        tramitesMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = tramitesDropdown.classList.contains('hidden');
            if (isHidden) showTramitesMenu();
            else closeTramitesMenu();
        });
    }

    // --- Submenu Trigger Logic ---
    const submenuTriggers = document.querySelectorAll('.has-submenu > button');
    submenuTriggers.forEach(trigger => {
        // On touch, a click on the parent should just open the submenu
        if (isTouchDevice) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent closing the main menu
                showSubmenu(e.currentTarget);
            });
        } else {
            // On desktop, use hover
            trigger.addEventListener('mouseenter', (e) => {
                clearTimeout(tramitesTimeout); // Keep main menu open
                showSubmenu(e.currentTarget);
            });
            trigger.addEventListener('mouseleave', () => {
                hideSubmenuTimeout = setTimeout(hideSubmenu, 300);
            });
        }
    });

    // --- Global Click Listener ---
    window.addEventListener('click', (e) => {
        // Close main menu if click is outside
        if (!tramitesContainer.contains(e.target) && !tramitesDropdown.contains(e.target)) {
            closeTramitesMenu();
        }
        // Close submenu if click is outside
        if (activeSubmenu && !activeSubmenu.contains(e.target)) {
            const trigger = document.getElementById(activeSubmenu.dataset.triggerId);
            if (trigger && !trigger.parentElement.contains(e.target)) {
                hideSubmenu();
            }
        }
    });

    // --- All other original listeners from the old file ---
    const independentButton = document.querySelector('.indep-btn');
    if (independentButton) {
        setInterval(() => {
            independentButton.classList.add('bounce-animation');
            setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);

        setTimeout(() => {
            independentButton.classList.add('bounce-animation');
            setTimeout(() => {
                independentButton.classList.remove('bounce-animation');
            }, 2000);
        }, 3000);
    }

    const valoresImageLink = document.getElementById('valoresImageLink');
    if (valoresImageLink) {
        valoresImageLink.addEventListener('click', (event) => {
            event.preventDefault();
            const pdfUrl = valoresImageLink.href;
            const fileName = valoresImageLink.download || 'documento.pdf';
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log(`Attempting to download: ${fileName} from ${pdfUrl}`);
        });
    }

    document.getElementById('os10-home-btn').addEventListener('click', showHomepage);

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        };
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    const chatToggleButton = document.getElementById('chat-toggle-button');
    if (chatToggleButton) {
        chatToggleButton.addEventListener('mouseenter', () => {
            const popup = document.getElementById('chat-popup');
            if (popup.classList.contains('hidden')) {
                const backdrop = document.getElementById('chat-backdrop');
                const button = document.getElementById('chat-toggle-button');
                popup.classList.remove('hidden');
                backdrop.classList.remove('hidden');
                button.classList.add('hidden');
            }
        });
    }

    showHomepage();
});