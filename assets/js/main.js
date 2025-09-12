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
    
    // Si es móvil y no está instalado, mostrar banner después de que cargue el DOM
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    
    if (isMobile && !isStandalone && !bannerShown) {
        showPWABanner();
    }
});

// Función para mostrar el banner PWA
function showPWABanner() {
    const pwaBanner = document.getElementById('pwa-install-banner');
    if (!pwaBanner || bannerShown) return;
    
    console.log('📱 PWA: Showing install banner');
    bannerShown = true;
    pwaBanner.classList.add('show');
    
    // Auto-hide después de 10 segundos
    setTimeout(() => {
        if (pwaBanner.classList.contains('show')) {
            pwaBanner.classList.remove('show');
        }
    }, 10000);
}

// Función para instalar PWA
async function installPWA() {
    console.log('🔽 PWA: Install button clicked');
    const pwaBanner = document.getElementById('pwa-install-banner');
    const pwaModal = document.getElementById('pwa-install-modal');
    
    // Ocultar banner
    if (pwaBanner) {
        pwaBanner.classList.remove('show');
    }
    
    if (deferredPrompt) {
        console.log('✅ PWA: Triggering installation prompt');
        try {
            await deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            
            console.log(`🎯 PWA: User choice: ${choiceResult.outcome}`);
            
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ PWA: Installation accepted');
            } else {
                console.log('❌ PWA: Installation dismissed');
            }
            
            deferredPrompt = null;
        } catch (error) {
            console.error('💥 PWA: Error during installation:', error);
            // Mostrar modal como fallback solo si hay error
            if (pwaModal) {
                pwaModal.classList.add('show');
            }
        }
    } else {
        console.log('⚠️ PWA: No deferred prompt available, showing manual instructions');
        // Mostrar modal con instrucciones manuales
        if (pwaModal) {
            pwaModal.classList.add('show');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing PWA and UI components');
    
    // --- ELEMENTOS PWA ---
    const pwaBanner = document.getElementById('pwa-install-banner');
    const installButton = document.getElementById('install-button');
    const closeButton = document.getElementById('close-install-banner');
    const pwaModal = document.getElementById('pwa-install-modal');
    const closeInstallModalButton = document.getElementById('close-install-modal');

    // Detectar tipo de dispositivo
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    console.log(`📱 Device: Mobile=${isMobile()}, Standalone=${isStandalone()}, DeferredPrompt=${!!deferredPrompt}`);

    // Si es móvil, no está instalado y no se ha mostrado banner, mostrarlo
    if (isMobile() && !isStandalone() && !bannerShown) {
        if (deferredPrompt) {
            // Si ya tenemos el prompt, mostrar banner inmediatamente
            showPWABanner();
        } else {
            // Si no tenemos el prompt, esperamos un poco y luego mostramos el banner
            setTimeout(() => {
                if (!bannerShown) {
                    showPWABanner();
                }
            }, 2000);
        }
    }

    // Event listeners para PWA
    if (installButton) {
        installButton.addEventListener('click', installPWA);
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('❌ PWA: Banner closed by user');
            if (pwaBanner) {
                pwaBanner.classList.remove('show');
            }
        });
    }

    if (closeInstallModalButton) {
        closeInstallModalButton.addEventListener('click', () => {
            console.log('❌ PWA: Modal closed by user');
            if (pwaModal) {
                pwaModal.classList.remove('show');
            }
        });
    }

    // --- ANIMACIONES Y EFECTOS DE LA INTERFAZ ---

    // 1. Animación de rebote para el botón de "Tramitar Credenciales"
    const tramitarBtn = document.getElementById('tramitarCredencialesBtn');
    if (tramitarBtn) {
        setInterval(() => {
            tramitarBtn.classList.add('bounce-animation');
            setTimeout(() => {
                tramitarBtn.classList.remove('bounce-animation');
            }, 2000);
        }, 5000);
    }
    
    // 2. Efecto de "clic" para resaltar la sección activa
    const sections = document.querySelectorAll('.section-card');
    sections.forEach(section => {
        section.addEventListener('click', () => {
            sections.forEach(s => s.classList.remove('clicked'));
            section.classList.add('clicked');
        });
    });

    console.log('✅ All components initialized successfully');
});

// Event listener adicional para detectar cuando la app se instala
window.addEventListener('appinstalled', (e) => {
    console.log('🎉 PWA: App was installed successfully');
    deferredPrompt = null;
    bannerShown = false; // Reset para futuras instalaciones
});

// Debug: Mostrar información del entorno
console.log('🔧 PWA Environment:', {
    userAgent: navigator.userAgent,
    standalone: window.matchMedia('(display-mode: standalone)').matches,
    navigatorStandalone: navigator.standalone,
    serviceWorker: 'serviceWorker' in navigator
});

/**
 * CÓDIGO DE DIAGNÓSTICO PWA
 * Agregar temporalmente al final de main.js para identificar problemas
 */

// Función de diagnóstico completo
function diagnosticoPWA() {
    console.log('🔍 ===== DIAGNÓSTICO PWA =====');
    
    // 1. Verificar protocolo
    const esHTTPS = location.protocol === 'https:' || location.hostname === 'localhost';
    console.log(`🔒 HTTPS/Localhost: ${esHTTPS ? '✅' : '❌'} (${location.protocol}//${location.hostname})`);
    
    // 2. Verificar Service Worker
    const tieneServiceWorker = 'serviceWorker' in navigator;
    console.log(`🔧 Service Worker Support: ${tieneServiceWorker ? '✅' : '❌'}`);
    
    if (tieneServiceWorker) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            console.log(`📋 Service Workers Registrados: ${registrations.length}`);
            registrations.forEach((reg, index) => {
                console.log(`   ${index + 1}. Estado: ${reg.active ? '✅ Activo' : '⚠️ Inactivo'}`);
            });
        });
    }
    
    // 3. Verificar Manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    console.log(`📄 Manifest Link: ${manifestLink ? '✅' : '❌'}`);
    if (manifestLink) {
        console.log(`   Href: ${manifestLink.href}`);
        
        // Intentar cargar manifest
        fetch(manifestLink.href)
            .then(response => response.json())
            .then(manifest => {
                console.log('📄 Manifest Content:', manifest);
                
                // Verificar campos requeridos
                const camposRequeridos = ['name', 'short_name', 'start_url', 'display', 'icons'];
                camposRequeridos.forEach(campo => {
                    const tieneCampo = manifest[campo] !== undefined;
                    console.log(`   ${campo}: ${tieneCampo ? '✅' : '❌'}`);
                });
                
                // Verificar iconos
                if (manifest.icons && manifest.icons.length > 0) {
                    console.log(`   Iconos: ${manifest.icons.length} encontrados`);
                    manifest.icons.forEach((icon, index) => {
                        console.log(`     ${index + 1}. ${icon.sizes} - ${icon.src}`);
                    });
                } else {
                    console.log('   Iconos: ❌ No encontrados');
                }
            })
            .catch(error => {
                console.error('❌ Error cargando manifest:', error);
            });
    }
    
    // 4. Verificar dispositivo
    const userAgent = navigator.userAgent;
    const esMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const esStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    
    console.log(`📱 Dispositivo Móvil: ${esMobile ? '✅' : '❌'}`);
    console.log(`🖥️ Modo Standalone: ${esStandalone ? '✅' : '❌'}`);
    console.log(`🌐 User Agent: ${userAgent}`);
    
    // 5. Verificar navegador específico
    const esChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const esEdge = /Edg/.test(userAgent);
    const esSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);
    const esFirefox = /Firefox/.test(userAgent);
    
    console.log(`🔍 Navegador Detectado:`);
    console.log(`   Chrome: ${esChrome ? '✅' : '❌'}`);
    console.log(`   Edge: ${esEdge ? '✅' : '❌'}`);
    console.log(`   Safari: ${esSafari ? '✅' : '❌'}`);
    console.log(`   Firefox: ${esFirefox ? '✅' : '❌'}`);
    
    // 6. Verificar evento beforeinstallprompt
    console.log(`🎯 Deferred Prompt: ${deferredPrompt ? '✅ Disponible' : '❌ No disponible'}`);
    
    // 7. Verificar si ya está instalado
    if (esStandalone) {
        console.log('📱 LA APP YA ESTÁ INSTALADA - Por eso no aparece el banner');
    }
    
    // 8. Criterios de instalabilidad
    console.log('📋 CRITERIOS DE INSTALABILIDAD:');
    console.log(`   1. HTTPS/Localhost: ${esHTTPS ? '✅' : '❌'}`);
    console.log(`   2. Service Worker: ${tieneServiceWorker ? '✅' : '❌'}`);
    console.log(`   3. Manifest válido: ${manifestLink ? '✅' : '❌'}`);
    console.log(`   4. No instalado: ${!esStandalone ? '✅' : '❌'}`);
    console.log(`   5. Navegador compatible: ${(esChrome || esEdge) ? '✅' : '❌'}`);
    
    // 9. Recomendaciones
    console.log('💡 RECOMENDACIONES:');
    if (!esHTTPS) {
        console.log('   - Usar HTTPS o localhost para testing');
    }
    if (!esMobile) {
        console.log('   - Probar en dispositivo móvil real o simular en DevTools');
    }
    if (esStandalone) {
        console.log('   - La app ya está instalada, por eso no aparece el banner');
    }
    if (!esChrome && !esEdge) {
        console.log('   - Probar en Chrome o Edge para mejor soporte PWA');
    }
    
    console.log('🔍 ===== FIN DIAGNÓSTICO =====');
}

// Ejecutar diagnóstico después de 2 segundos
setTimeout(diagnosticoPWA, 2000);

// También ejecutar cuando se detecte beforeinstallprompt
window.addEventListener('beforeinstallprompt', () => {
    console.log('🎯 beforeinstallprompt detectado - ejecutando diagnóstico');
    setTimeout(diagnosticoPWA, 500);
});
