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

function openLink(url) {
    window.open(url, '_blank');
    closeTramitesMenu();
    closeEditablesMenu();
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
    
    dropdown.classList.remove('hidden');
    arrow.style.transform = 'rotate(180deg)';
    menuBtn.classList.add('panel-active');
}

function closeTramitesMenu() {
    const dropdown = document.getElementById('tramites-dropdown');
    const arrow = document.getElementById('tramites-arrow');
    const menuBtn = document.getElementById('tramites-menu-btn');
    
    dropdown.classList.add('hidden');
    arrow.style.transform = 'rotate(0deg)';
    menuBtn.classList.remove('panel-active');
}

function showEditablesMenu() {
    const dropdown = document.getElementById('editables-dropdown');
    const arrow = document.getElementById('editables-arrow');
    const menuBtn = document.getElementById('editables-menu-btn');
    
    dropdown.classList.remove('hidden');
    arrow.style.transform = 'rotate(180deg)';
    menuBtn.classList.add('panel-active');
}

function closeEditablesMenu() {
    const dropdown = document.getElementById('editables-dropdown');
    const arrow = document.getElementById('editables-arrow');
    const menuBtn = document.getElementById('editables-menu-btn');
    
    dropdown.classList.add('hidden');
    arrow.style.transform = 'rotate(0deg)';
    menuBtn.classList.remove('panel-active');
}

// Event listeners for menu and other elements
document.addEventListener('DOMContentLoaded', () => {
    const tramitesMenuBtn = document.getElementById('tramites-menu-btn');
    const tramitesDropdown = document.getElementById('tramites-dropdown');
    const tramitesContainer = tramitesMenuBtn.parentElement;
    let tramitesTimeout;

    const editablesMenuBtn = document.getElementById('editables-menu-btn');
    const editablesDropdown = document.getElementById('editables-dropdown');
    const editablesContainer = editablesMenuBtn.parentElement;
    let editablesTimeout;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // Click logic for touch devices
        if (tramitesMenuBtn) {
            tramitesMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = tramitesDropdown.classList.contains('hidden');
                closeEditablesMenu(); // Close other menu
                if (isHidden) showTramitesMenu();
                else closeTramitesMenu();
            });
        }
        if (editablesMenuBtn) {
            editablesMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = editablesDropdown.classList.contains('hidden');
                closeTramitesMenu(); // Close other menu
                if (isHidden) showEditablesMenu();
                else closeEditablesMenu();
            });
        }
    } else {
        // Hover logic for non-touch devices
        if (tramitesContainer) {
            tramitesContainer.addEventListener('mouseenter', () => {
                clearTimeout(tramitesTimeout);
                closeEditablesMenu();
                showTramitesMenu();
            });
            tramitesContainer.addEventListener('mouseleave', () => {
                tramitesTimeout = setTimeout(closeTramitesMenu, 200);
            });
        }
        if (editablesContainer) {
            editablesContainer.addEventListener('mouseenter', () => {
                clearTimeout(editablesTimeout);
                closeTramitesMenu();
                showEditablesMenu();
            });
            editablesContainer.addEventListener('mouseleave', () => {
                editablesTimeout = setTimeout(closeEditablesMenu, 200);
            });
        }
    }

    // Close menus when clicking outside
    window.addEventListener('click', () => {
        closeTramitesMenu();
        closeEditablesMenu();
    });


    // Original independent button logic
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

    // Automatic PDF download when clicking "valores.png" image
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

    // Event listener for OS10 Home Button (in banner)
    document.getElementById('os10-home-btn').addEventListener('click', showHomepage);
    
    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

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

    // --- Open chatbot on hover ---
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

    // Initialize homepage view
    showHomepage();
});
