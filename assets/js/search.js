/**
 * Sistema de Búsqueda Global - OS10 Coquimbo
 * Versión 1.0
 * 
 * Funcionalidad completa de búsqueda con indexación de contenido
 */

class GlobalSearch {
    constructor() {
        this.searchIndex = [];
        this.isOpen = false;
        this.currentResults = [];
        this.currentResultIndex = -1;
        this.init();
    }

    init() {
        // Crear elementos de búsqueda
        this.createSearchElements();
        // Indexar contenido
        this.buildSearchIndex();
        // Configurar eventos
        this.setupEventListeners();
        // Log de inicialización
        console.log('🔍 Sistema de búsqueda global inicializado');
    }

    createSearchElements() {
        // Botón de búsqueda en el banner
        const searchButton = document.createElement('button');
        searchButton.id = 'global-search-button';
        searchButton.className = 'banner-search-button';
        searchButton.setAttribute('aria-label', 'Buscar en el sitio');
        searchButton.setAttribute('title', 'Buscar (Ctrl+K)');
        searchButton.innerHTML = `
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
        `;

                // Insertar el botón en el banner existente
            // Insertar el botón en el contenedor central para PC o en el banner para móvil
        const banner = document.getElementById('banner');
        const searchCenterContainer = document.getElementById('search-center-container');

      if (banner) {
                if (banner) {
                // SIEMPRE insertar DENTRO del grupo del contador de visitas (móvil y PC)
                const bannerContent = banner.querySelector('.flex.items-center.justify-between');
                if (bannerContent) {
                    const visitCounterContainer = bannerContent.querySelector('.flex.items-center.space-x-2.banner-text-small');
                    if (visitCounterContainer) {
                        // Usamos prepend() para que sea el primer hijo de ese div
                        visitCounterContainer.prepend(searchButton); 
                    } else {
                        // Fallback por si no encuentra el div del contador
                        bannerContent.appendChild(searchButton);
                        }
                 }
              }
           }
        // Modal de búsqueda
        const searchModal = document.createElement('div');
        searchModal.id = 'global-search-modal';
        searchModal.className = 'search-modal-hidden';
        searchModal.innerHTML = `
            <div class="search-modal-overlay"></div>
            <div class="search-modal-content">
                <div class="search-header">
                    <div class="search-input-wrapper">
                        <svg class="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input type="text" id="global-search-input" placeholder="Buscar en OS10 Coquimbo..." autocomplete="off">
                        <div class="search-shortcuts">
                            <span class="shortcut-badge">ESC para cerrar</span>
                            <span class="shortcut-badge">↑↓ para navegar</span>
                            <span class="shortcut-badge">Enter para ir</span>
                        </div>
                    </div>
                </div>
                <div class="search-results-container">
                    <div id="search-results"></div>
                    <div id="search-no-results" class="hidden">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                            <path d="M8 11h6"></path>
                        </svg>
                        <p>No se encontraron resultados</p>
                        <small>Intenta con otros términos de búsqueda</small>
                    </div>
                    <div id="search-help" class="search-help">
                        <h4>Sugerencias de búsqueda:</h4>
                        <div class="search-suggestions">
                            <button class="suggestion-pill" data-search="directiva">Directivas</button>
                            <button class="suggestion-pill" data-search="credencial">Credenciales</button>
                            <button class="suggestion-pill" data-search="decreto">Decretos</button>
                            <button class="suggestion-pill" data-search="ley">Leyes</button>
                            <button class="suggestion-pill" data-search="guardia">Guardias</button>
                            <button class="suggestion-pill" data-search="seguridad">Seguridad</button>
                            <button class="suggestion-pill" data-search="capacitación">Capacitación</button>
                            <button class="suggestion-pill" data-search="formulario">Formularios</button>
                            <button class="suggestion-pill" data-search="manual">Manuales</button>
                            <button class="suggestion-pill" data-search="valores">Valores</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);
        // Listener para reposicionar el botón en cambio de tamaño de ventana
        window.addEventListener('resize', () => {
        this.repositionSearchButton();
        });     
    }
    
        repositionSearchButton() {
            const searchButton = document.getElementById('global-search-button');
            const searchCenterContainer = document.getElementById('search-center-container');
    
            if (!searchButton) return;
    
            if (window.innerWidth >= 1024 && searchCenterContainer) {
                // SIEMPRE mover DENTRO del grupo del contador (móvil y PC)
        const banner = document.getElementById('banner');
        if (banner) {
            const bannerContent = banner.querySelector('.flex.items-center.justify-between');
            const visitCounterContainer = bannerContent?.querySelector('.flex.items-center.space-x-2.banner-text-small');

            // Solo mover si no está ya ahí
            if (visitCounterContainer && searchButton.parentElement !== visitCounterContainer) {
                 visitCounterContainer.prepend(searchButton);
                    }
                }
            }
        }
    buildSearchIndex() {
    this.searchIndex = [
        // SECCIÓN: Trámites Principales
        {
            title: 'Certificados O.S.10 Online - Cerofila',
            content: 'Certificado para Guardias de Seguridad, Conserjes y Vigilantes Privados. Trámite online sistema cerofila',
            section: 'Trámites Principales',
            action: () => window.open('https://dal5.short.gy/CFil', '_blank'),
            keywords: ['certificado', 'os10', 'online', 'cerofila', 'cerofilas', 'guardia', 'seguridad', 'conserje', 'vigilante']
        },
        {
            title: 'Directivas de Funcionamiento',
            content: 'Accede y gestiona los requerimientos para instalaciones, eventos y más. Vigencia 03 años en instalación.',
            section: 'Trámites Principales',
            action: () => window.showDirectiva && window.showDirectiva(),
            keywords: ['directiva', 'funcionamiento', 'instalación', 'evento', 'partido', 'fútbol']
        },
        {
            title: 'Credenciales',
            content: 'Encuentra todos los formularios y requisitos para la acreditación de personal. Credencial empresa e independiente.',
            section: 'Trámites Principales',
            action: () => window.showCredenciales && window.showCredenciales(),
            keywords: ['credencial', 'acreditación', 'empresa', 'independiente', 'personal', 'requisitos']
        },
        {
            title: 'Reclamos de Seguridad Privada',
            content: 'Requerimiento de fiscalización (Reclamos de seguridad privada)',
            section: 'Trámites Principales',
            action: () => window.open('https://dal5.short.gy/R3', '_blank'),
            keywords: ['reclamo', 'fiscalización', 'denuncia', 'seguridad privada']
        },

        // SECCIÓN: Leyes (CON AMBAS VERSIONES DE NÚMEROS)
        {
            title: 'Constitución Política',
            content: 'Fundamento constitucional de la seguridad privada',
            section: 'Leyes y Normativa',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=242302', '_blank'),
            keywords: ['constitución', 'política', 'fundamento', 'ley']
        },
        {
            title: 'Ley 18.961',
            content: 'Ley Orgánica Constitucional de Carabineros',
            section: 'Leyes y Normativa',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=30329', '_blank'),
            keywords: ['ley', '18961', '18.961', 'orgánica', 'constitucional', 'carabineros']
        },
        {
            title: 'Ley 19.303',
            content: 'Normativa complementaria de seguridad privada',
            section: 'Leyes y Normativa',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=30670', '_blank'),
            keywords: ['ley', '19303', '19.303', 'normativa', 'complementaria']
        },
        {
            title: 'D.L. 3.607 (1981)',
            content: 'Decreto Ley 3607 del año 1981 histórico sobre seguridad privada',
            section: 'Leyes y Normativa',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=7193', '_blank'),
            keywords: ['decreto', 'ley', '3607', '3.607', 'dl', '1981', 'histórico']
        },
        {
            title: 'Ley 21.659',
            content: 'Ley de Seguridad Privada actualizada',
            section: 'Leyes y Normativa',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1202067', '_blank'),
            keywords: ['ley', '21659', '21.659', 'seguridad', 'privada', 'actualizada']
        },
        {
            title: 'Reglamento 209',
            content: 'Reglamentación vigente de seguridad privada',
            section: 'Leyes y Normativa',
            action: () => window.open('https://www.leychile.cl/leychile/navegar?i=1213672', '_blank'),
            keywords: ['reglamento', '209', 'vigente']
        },

        // SECCIÓN: Decretos (CORREGIDOS CON AMBAS VERSIONES)
        {
            title: 'D.E. 261 (2020)',
            content: 'Decreto Exento 261 del año 2020',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.zosepcar.cl/content/OS10/Decreto-261.pdf', '_blank'),
            keywords: ['decreto', 'exento', '261', 'de', 'd.e.', 'de261', '2020']
        },
        {
            title: 'D.E. 32 (2024)',
            content: 'Decreto Exento 32 del año 2024 - Uniformes',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1200633', '_blank'),
            keywords: ['decreto', 'exento', '32', 'de', 'd.e.', 'de32', '2024', 'uniforme', 'uniformes']
        },
        {
            title: 'D. 298 (2019)',
            content: 'Decreto 298 del año 2019',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1136545', '_blank'),
            keywords: ['decreto', '298', 'd.298', 'd298', '2019']
        },
        {
            title: 'D. 123 (2019)',
            content: 'Decreto 123 del año 2019',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1130300', '_blank'),
            keywords: ['decreto', '123', 'd.123', 'd123', '2019']
        },
        {
            title: 'D. 1045 (2018)',
            content: 'Decreto 1045 del año 2018',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1122982', '_blank'),
            keywords: ['decreto', '1045', 'd.1045', 'd1045', '2018']
        },
        {
            title: 'D. 867 (2017)',
            content: 'Decreto 867 del año 2017',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1116274', '_blank'),
            keywords: ['decreto', '867', 'd.867', 'd867', '2017']
        },
        {
            title: 'D. 1814 (2014)',
            content: 'Decreto 1814 del año 2014',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1069299', '_blank'),
            keywords: ['decreto', '1814', 'd.1814', 'd1814', '2014']
        },
        {
            title: 'D.S. 222 (2014)',
            content: 'Decreto Supremo 222 del año 2014',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1055580', '_blank'),
            keywords: ['decreto', 'supremo', '222', 'ds', 'd.s.', 'ds222', 'd.s.222', '2014']
        },
        {
            title: 'D.E. 1122 (1994)',
            content: 'Decreto Exento 1122 del año 1994',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1072929', '_blank'),
            keywords: ['decreto', 'exento', '1122', 'de', 'd.e.', 'de1122', 'd.e.1122', '1994']
        },
        {
            title: 'D.S. 41 (1996)',
            content: 'Decreto Supremo 41 del año 1996',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=19870', '_blank'),
            keywords: ['decreto', 'supremo', '41', 'ds', 'd.s.', 'ds41', 'd.s.41', '1996']
        },
        {
            title: 'D.S. 1772 (1995)',
            content: 'Decreto Supremo 1772 del año 1995',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=18592', '_blank'),
            keywords: ['decreto', 'supremo', '1772', 'ds', 'd.s.', 'ds1772', 'd.s.1772', '1995']
        },
        {
            title: 'D.S. 1773 (1994)',
            content: 'Decreto Supremo 1773 del año 1994',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=18594', '_blank'),
            keywords: ['decreto', 'supremo', '1773', 'ds', 'd.s.', 'ds1773', 'd.s.1773', '1994']
        },
        {
            title: 'D.S. 93 (1985)',
            content: 'Decreto Supremo 93 del año 1985',
            section: 'Decretos Supremos',
            action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=9081', '_blank'),
            keywords: ['decreto', 'supremo', '93', 'ds', 'd.s.', 'ds93', 'd.s.93', '1985']
        },

        console.log(`📚 Índice de búsqueda construido con ${this.searchIndex.length} elementos`);
    }

    setupEventListeners() {
        const searchButton = document.getElementById('global-search-button');
        const searchModal = document.getElementById('global-search-modal');
        const searchInput = document.getElementById('global-search-input');
        const overlay = document.querySelector('.search-modal-overlay');

        // Abrir búsqueda con botón
        searchButton?.addEventListener('click', () => this.openSearch());

        // Abrir búsqueda con atajo de teclado (Ctrl+K o Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            // Cerrar con ESC
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSearch();
            }
            // Navegar resultados con flechas
            if (this.isOpen && this.currentResults.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateResults(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateResults(-1);
                } else if (e.key === 'Enter' && this.currentResultIndex >= 0) {
                    e.preventDefault();
                    this.selectResult(this.currentResultIndex);
                }
            }
        });

        // Cerrar con overlay
        overlay?.addEventListener('click', () => this.closeSearch());

        // Búsqueda en tiempo real
        searchInput?.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Sugerencias de búsqueda
        document.querySelectorAll('.suggestion-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                const searchTerm = e.target.dataset.search;
                searchInput.value = searchTerm;
                this.performSearch(searchTerm);
            });
        });
    }

    openSearch() {
        const modal = document.getElementById('global-search-modal');
        const input = document.getElementById('global-search-input');
        
        if (modal) {
            modal.classList.remove('search-modal-hidden');
            modal.classList.add('search-modal-visible');
            this.isOpen = true;
            
            // Focus en el input
            setTimeout(() => {
                input?.focus();
            }, 100);
        }
    }

    closeSearch() {
        const modal = document.getElementById('global-search-modal');
        const input = document.getElementById('global-search-input');
        
        if (modal) {
            modal.classList.remove('search-modal-visible');
            modal.classList.add('search-modal-hidden');
            this.isOpen = false;
            
            // Limpiar búsqueda
            if (input) {
                input.value = '';
            }
            this.clearResults();
        }
    }

    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
            .replace(/[^a-z0-9\s]/g, ' ') // Eliminar caracteres especiales
            .trim();
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.clearResults();
            return;
        }

        const normalizedQuery = this.normalizeText(query);
        const queryWords = normalizedQuery.split(/\s+/);
        
        // Buscar coincidencias
        const results = this.searchIndex.map(item => {
            const normalizedTitle = this.normalizeText(item.title);
            const normalizedContent = this.normalizeText(item.content);
            const normalizedKeywords = item.keywords.map(k => this.normalizeText(k)).join(' ');
            const searchableText = `${normalizedTitle} ${normalizedContent} ${normalizedKeywords}`;
            
            let score = 0;
            let matches = [];
            
            queryWords.forEach(word => {
                // Coincidencia exacta en título
                if (normalizedTitle.includes(word)) {
                    score += 10;
                    matches.push('title');
                }
                // Coincidencia exacta en keywords
                if (normalizedKeywords.includes(word)) {
                    score += 8;
                    matches.push('keyword');
                }
                // Coincidencia exacta en contenido
                if (normalizedContent.includes(word)) {
                    score += 5;
                    matches.push('content');
                }
                // Coincidencia parcial
                if (searchableText.includes(word)) {
                    score += 2;
                }
            });
            
            return {
                ...item,
                score,
                matches: [...new Set(matches)]
            };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Máximo 10 resultados
        
        this.displayResults(results, query);
    }

    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        const noResultsContainer = document.getElementById('search-no-results');
        const helpContainer = document.getElementById('search-help');
        
        if (!resultsContainer) return;
        
        this.currentResults = results;
        this.currentResultIndex = -1;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
            noResultsContainer?.classList.remove('hidden');
            helpContainer?.classList.add('hidden');
        } else {
            noResultsContainer?.classList.add('hidden');
            helpContainer?.classList.add('hidden');
            resultsContainer.classList.remove('hidden');
            
            resultsContainer.innerHTML = results.map((item, index) => {
                const highlightedTitle = this.highlightText(item.title, query);
                const highlightedContent = this.highlightText(item.content, query);
                
                return `
                    <div class="search-result-item" data-index="${index}">
                        <div class="result-section-badge">${item.section}</div>
                        <div class="result-content">
                            <h4 class="result-title">${highlightedTitle}</h4>
                            <p class="result-description">${highlightedContent}</p>
                        </div>
                        <svg class="result-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M7 7h10v10"></path>
                            <path d="M7 17L17 7"></path>
                        </svg>
                    </div>
                `;
            }).join('');
            
            // Agregar event listeners a los resultados
            document.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', () => this.selectResult(index));
                item.addEventListener('mouseenter', () => {
                    this.currentResultIndex = index;
                    this.updateResultSelection();
                });
            });
        }
    }

    highlightText(text, query) {
        if (!query) return text;
        
        const words = query.split(/\s+/).filter(w => w.length > 1);
        let highlightedText = text;
        
        words.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }

    navigateResults(direction) {
        if (this.currentResults.length === 0) return;
        
        this.currentResultIndex += direction;
        
        if (this.currentResultIndex < 0) {
            this.currentResultIndex = this.currentResults.length - 1;
        } else if (this.currentResultIndex >= this.currentResults.length) {
            this.currentResultIndex = 0;
        }
        
        this.updateResultSelection();
    }

    updateResultSelection() {
        document.querySelectorAll('.search-result-item').forEach((item, index) => {
            if (index === this.currentResultIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    selectResult(index) {
        const result = this.currentResults[index];
        if (result && result.action) {
            this.closeSearch();
            setTimeout(() => {
                result.action();
            }, 200);
        }
    }

    clearResults() {
        const resultsContainer = document.getElementById('search-results');
        const noResultsContainer = document.getElementById('search-no-results');
        const helpContainer = document.getElementById('search-help');
        
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
        }
        
        noResultsContainer?.classList.add('hidden');
        helpContainer?.classList.remove('hidden');
        
        this.currentResults = [];
        this.currentResultIndex = -1;
    }
}

// Inicializar el sistema de búsqueda cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.globalSearch = new GlobalSearch();
    });
} else {
    window.globalSearch = new GlobalSearch();
}
