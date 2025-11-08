/**
 * Sistema de Búsqueda Global - OS10 Coquimbo
 * Versión 1.2 - CORREGIDA
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
        this.createSearchElements();
        this.buildSearchIndex();
        this.setupEventListeners();
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
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
        `;

        // CORRECCIÓN: Insertar en el contenedor correcto
        const searchCenterContainer = document.getElementById('search-center-container');
        
        if (searchCenterContainer) {
            searchCenterContainer.innerHTML = '';
            searchCenterContainer.appendChild(searchButton);
            console.log('✅ Botón de búsqueda agregado correctamente');
        } else {
            console.error('❌ No se encontró #search-center-container');
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
                            <button class="suggestion-pill" data-search="18961">Ley 18.961</button>
                            <button class="suggestion-pill" data-search="21659">Ley 21.659</button>
                            <button class="suggestion-pill" data-search="guardia">Guardias</button>
                            <button class="suggestion-pill" data-search="seguridad">Seguridad</button>
                            <button class="suggestion-pill" data-search="capacitación">Capacitación</button>
                            <button class="suggestion-pill" data-search="formulario">Formularios</button>
                            <button class="suggestion-pill" data-search="valores">Valores</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);
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
                content: 'Decreto Ley histórico sobre seguridad privada',
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

            // SECCIÓN: Decretos (TODOS CON AMBAS VERSIONES)
            {
                title: 'D.E. 261 (2020)',
                content: 'Decreto Exento 261 del año 2020',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/Decreto-261.pdf', '_blank'),
                keywords: ['decreto', 'exento', '261', 'de', '2020']
            },
            {
                title: 'D.E. 32 (2024)',
                content: 'Decreto Exento 32 del año 2024 - Uniformes',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1200633', '_blank'),
                keywords: ['decreto', 'exento', '32', 'de', '2024', 'uniforme', 'uniformes']
            },
            {
                title: 'D. 298 (2019)',
                content: 'Decreto 298 del año 2019',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1136545', '_blank'),
                keywords: ['decreto', '298', '2019']
            },
            {
                title: 'D. 123 (2019)',
                content: 'Decreto 123 del año 2019',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1130300', '_blank'),
                keywords: ['decreto', '123', '2019']
            },
            {
                title: 'D. 1045 (2018)',
                content: 'Decreto 1045 del año 2018',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1122982', '_blank'),
                keywords: ['decreto', '1045', '2018']
            },
            {
                title: 'D. 867 (2017)',
                content: 'Decreto 867 del año 2017',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1116274', '_blank'),
                keywords: ['decreto', '867', '2017']
            },
            {
                title: 'D. 1814 (2014)',
                content: 'Decreto 1814 del año 2014',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1069299', '_blank'),
                keywords: ['decreto', '1814', '2014']
            },
            {
                title: 'D.S. 222 (2014)',
                content: 'Decreto Supremo 222 del año 2014',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1055580', '_blank'),
                keywords: ['decreto', 'supremo', '222', 'ds', '2014']
            },
            {
                title: 'D.E. 1122 (1994)',
                content: 'Decreto Exento 1122 del año 1994',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=1072929', '_blank'),
                keywords: ['decreto', 'exento', '1122', 'de', '1994']
            },
            {
                title: 'D.S. 41 (1996)',
                content: 'Decreto Supremo 41 del año 1996',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=19870', '_blank'),
                keywords: ['decreto', 'supremo', '41', 'ds', '1996']
            },
            {
                title: 'D.S. 1772 (1995)',
                content: 'Decreto Supremo 1772 del año 1995',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=18592', '_blank'),
                keywords: ['decreto', 'supremo', '1772', 'ds', '1995']
            },
            {
                title: 'D.S. 1773 (1994)',
                content: 'Decreto Supremo 1773 del año 1994',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=18594', '_blank'),
                keywords: ['decreto', 'supremo', '1773', 'ds', '1994']
            },
            {
                title: 'D. 93 (1985)',
                content: 'Decreto Supremo 93 del año 1985',
                section: 'Decretos Supremos',
                action: () => window.open('https://www.bcn.cl/leychile/navegar?idNorma=9081', '_blank'),
                keywords: ['decreto', '93', '1985']
            },

            // SECCIÓN: Resoluciones (CON AMBAS VERSIONES)
            {
                title: 'Resolución 4070 - Requisitos Asesores',
                content: 'Resolución N° 4070 del 20-10-2021 sobre requisitos para asesores',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_4070.pdf', '_blank'),
                keywords: ['resolución', '4070', '4.070', 'asesor', 'requisitos', '2021']
            },
            {
                title: 'Resolución 2660 - Amplía Asesores',
                content: 'Resolución N° 2660 del 20-07-2022 que amplía Res. 4070 sobre asesores',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2660.pdf', '_blank'),
                keywords: ['resolución', '2660', '2.660', 'asesor', 'amplía', '2022']
            },
            {
                title: 'Resolución 2522 - Regulariza Credenciales',
                content: 'Resolución N° 2522 del 26-08-2024 que regulariza tramitación de credenciales',
                section: 'Resoluciones',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/resolucion_2522.pdf', '_blank'),
                keywords: ['resolución', '2522', '2.522', 'credencial', 'regulariza', 'tramitación', '2024']
            },

            // SECCIÓN: Componentes del Sistema
            {
                title: 'Vigilante Privado',
                content: 'Documentación y requisitos para la acreditación de vigilantes privados',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_vigilante_privado_PDF.pdf', '_blank'),
                keywords: ['vigilante', 'privado', 'acreditación', 'requisitos']
            },
            {
                title: 'Guardia de Seguridad',
                content: 'Guía completa del trámite y requisitos para guardias de seguridad',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf', '_blank'),
                keywords: ['guardia', 'seguridad', 'trámite', 'requisitos']
            },
            {
                title: 'Jefe de Seguridad',
                content: 'Actas, credenciales y requisitos para jefes de seguridad civil y ex fuerzas armadas',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_jefe_de_seguridad.pdf', '_blank'),
                keywords: ['jefe', 'seguridad', 'actas', 'credenciales', 'ffaa', 'civil']
            },
            {
                title: 'Encargado de Seguridad',
                content: 'Requisitos y documentación necesaria para encargados de seguridad',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_encargado_de_seguridad.pdf', '_blank'),
                keywords: ['encargado', 'seguridad', 'documentación']
            },
            {
                title: 'Supervisor de Seguridad',
                content: 'Documentación necesaria para supervisores de seguridad',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_supervisor.pdf', '_blank'),
                keywords: ['supervisor', 'seguridad']
            },
            {
                title: 'Asesor',
                content: 'Títulos afines y requisitos para asesores de seguridad. Resol. 4070 y 2660',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_asesor.pdf', '_blank'),
                keywords: ['asesor', 'títulos', 'requisitos', 'resolución', '4070', '2660']
            },
            {
                title: 'Capacitador de Seguridad',
                content: 'Acreditación y requisitos para capacitadores',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_capacitador.pdf', '_blank'),
                keywords: ['capacitador', 'acreditación', 'formación']
            },
            {
                title: 'Técnico en Seguridad',
                content: 'Requisitos técnicos para técnicos de seguridad',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_tecnico.pdf', '_blank'),
                keywords: ['técnico', 'seguridad', 'requisitos']
            },
            {
                title: 'Operador de Cajeros (ATM)',
                content: 'Documentación específica para operadores de cajeros automáticos',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_operador_cajeros.pdf', '_blank'),
                keywords: ['operador', 'cajero', 'atm', 'automático']
            },
            {
                title: 'Instalador Técnico',
                content: 'Certificación de instaladores técnicos',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_instalador_tecnico.pdf', '_blank'),
                keywords: ['instalador', 'técnico', 'certificación']
            },
            {
                title: 'Operador de CC.TV.',
                content: 'Control y monitoreo de sistemas CCTV',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_operador_cctv.pdf', '_blank'),
                keywords: ['operador', 'cctv', 'cámaras', 'monitoreo', 'vigilancia']
            },
            {
                title: 'Empresas Prestadoras',
                content: 'Requisitos y documentación para empresas prestadoras de seguridad',
                section: 'Componentes del Sistema',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/TRAM_empresas.pdf', '_blank'),
                keywords: ['empresa', 'prestadora', 'seguridad', 'documentación']
            },

            // SECCIÓN: Documentos Editables
            {
                title: 'Estudio de Seguridad',
                content: 'Plantilla editable para estudios de seguridad',
                section: 'Documentos Editables',
                action: () => window.open('https://dal5.short.gy/3st', '_blank'),
                keywords: ['estudio', 'seguridad', 'plantilla', 'editable']
            },
            {
                title: 'Planes de Seguridad',
                content: 'Plantillas editables para planes de seguridad',
                section: 'Documentos Editables',
                action: () => window.open('https://d6.short.gy/Pl4n', '_blank'),
                keywords: ['plan', 'seguridad', 'plantilla', 'editable']
            },
            {
                title: 'Medidas de Seguridad',
                content: 'Documentos para medidas de seguridad',
                section: 'Documentos Editables',
                action: () => window.open('https://dal5.short.gy/M3', '_blank'),
                keywords: ['medidas', 'seguridad', 'documento']
            },
            {
                title: 'Solicitud Simple',
                content: 'Formato de solicitud simple editable',
                section: 'Documentos Editables',
                action: () => window.open('https://dal5.short.gy/H23wIF', '_blank'),
                keywords: ['solicitud', 'simple', 'formato', 'carta']
            },

            // SECCIÓN: Modelos de Solicitud
            {
                title: 'Declaración Jurada Persona Natural',
                content: 'Modelo de declaración jurada para personas naturales',
                section: 'Modelos de Solicitud',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/MOD_dec_jurada_pers_naturales.pdf', '_blank'),
                keywords: ['declaración', 'jurada', 'persona', 'natural']
            },
            {
                title: 'Declaración Jurada Empresas',
                content: 'Modelo de declaración jurada para empresas',
                section: 'Modelos de Solicitud',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/MOD_dec_jurada_empresas.pdf', '_blank'),
                keywords: ['declaración', 'jurada', 'empresa']
            },
            {
                title: 'Acreditación de Empresa',
                content: 'Solicitud simple de acreditación de empresa',
                section: 'Modelos de Solicitud',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/MOD_solicitud_simple_acreditacion_empresa.pdf', '_blank'),
                keywords: ['acreditación', 'empresa', 'solicitud']
            },
            {
                title: 'Acreditación Asesor',
                content: 'Modelo de solicitud de acreditación para asesor',
                section: 'Modelos de Solicitud',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/MOD_sol_acreditacion_asesor.pdf', '_blank'),
                keywords: ['acreditación', 'asesor', 'modelo']
            },

            // SECCIÓN: Manuales
            {
                title: 'Manual de Funcionamiento',
                content: 'Manual completo de funcionamiento del sistema',
                section: 'Manuales',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/manual_funcionamiento.pdf', '_blank'),
                keywords: ['manual', 'funcionamiento', 'sistema']
            },
            {
                title: 'Manual de Capacitación',
                content: 'Manual de capacitación para personal de seguridad',
                section: 'Manuales',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/manual_capacitacion.pdf', '_blank'),
                keywords: ['manual', 'capacitación', 'formación', 'personal']
            },
            {
                title: 'Manual de Organización',
                content: 'Manual de organización empresarial',
                section: 'Manuales',
                action: () => window.open('https://www.zosepcar.cl/content/OS10/manual_organizacion.pdf', '_blank'),
                keywords: ['manual', 'organización', 'empresarial']
            },

            // SECCIÓN: Capacitación
            {
                title: 'Empresas de Capacitación',
                content: 'Listado actualizado de empresas autorizadas para capacitación',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1RsYHWNpeNAmhTIO1kXOscZbia7Yepktp/view', '_blank'),
                keywords: ['empresa', 'capacitación', 'listado', 'autorizada']
            },
            {
                title: 'Capacitadores',
                content: 'Personal autorizado para capacitación',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1hpZrzhXCnGyLkFLRhj0FOY_zDwTEUIaN/view', '_blank'),
                keywords: ['capacitador', 'personal', 'autorizado']
            },
            {
                title: 'Valor Curso Formación',
                content: 'Valores vigentes para cursos de formación',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1swqlfBX5-7Ko-3u_H95pnGzbLkhUnrwy/view', '_blank'),
                keywords: ['valor', 'curso', 'formación', 'precio', 'costo']
            },
            {
                title: 'Valor Curso Perfeccionamiento',
                content: 'Valores actualizados para cursos de perfeccionamiento',
                section: 'Capacitación y Formación',
                action: () => window.open('https://drive.google.com/file/d/1q2qS2AQUgoma8TmOppO9IOV1LX4PJS9Z/view', '_blank'),
                keywords: ['valor', 'curso', 'perfeccionamiento', 'precio', 'costo']
            },

            // SECCIÓN: Servicios Adicionales
            {
                title: 'Consultar Curso',
                content: 'Verificar estado de certificaciones y cursos',
                section: 'Servicios Adicionales',
                action: () => window.open('https://www.zosepcar.cl/OS10.php#buscador', '_blank'),
                keywords: ['consultar', 'curso', 'certificación', 'verificar', 'estado', 'buscador']
            },
            {
                title: 'Valores y Aranceles',
                content: 'Tabla de valores y aranceles vigentes. Vale vista $5.890',
                section: 'Servicios Adicionales',
                action: () => window.handleValores && window.handleValores(),
                keywords: ['valores', 'aranceles', 'tabla', 'precio', 'vale', 'vista', '5890']
            },
            {
                title: 'Ubicación OS10',
                content: 'Calle Cienfuegos 180, La Serena, Región de Coquimbo',
                section: 'Servicios Adicionales',
                action: () => window.open('https://maps.app.goo.gl/QUhujWbTF1FjDA7E6', '_blank'),
                keywords: ['ubicación', 'dirección', 'cienfuegos', '180', 'serena', 'mapa']
            },

            // SECCIÓN: Información de contacto
            {
                title: 'Teléfono OS10',
                content: 'Teléfono de contacto: +56 51 265 1024',
                section: 'Contacto',
                action: () => window.open('tel:+56512651024', '_self'),
                keywords: ['teléfono', 'contacto', '512651024', 'llamar']
            },
            {
                title: 'Correo Electrónico',
                content: 'Email: os10.coquimbo@carabineros.cl',
                section: 'Contacto',
                action: () => window.open('mailto:os10.coquimbo@carabineros.cl', '_self'),
                keywords: ['correo', 'email', 'contacto', 'os10.coquimbo']
            }
        ];

        console.log(`📚 Índice de búsqueda construido con ${this.searchIndex.length} elementos`);
    }

    setupEventListeners() {
        const searchButton = document.getElementById('global-search-button');
        const searchModal = document.getElementById('global-search-modal');
        const searchInput = document.getElementById('global-search-input');
        const overlay = document.querySelector('.search-modal-overlay');

        if (searchButton) {
            searchButton.addEventListener('click', () => this.openSearch());
        }

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSearch();
            }
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

        if (overlay) {
            overlay.addEventListener('click', () => this.closeSearch());
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }

        document.querySelectorAll('.suggestion-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                const searchTerm = e.target.dataset.search;
                if (searchInput) {
                    searchInput.value = searchTerm;
                    this.performSearch(searchTerm);
                }
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
            
            setTimeout(() => {
                if (input) input.focus();
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
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\./g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .trim();
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.clearResults();
            return;
        }

        const normalizedQuery = this.normalizeText(query);
        const queryWords = normalizedQuery.split(/\s+/);
        
        const results = this.searchIndex.map(item => {
            const normalizedTitle = this.normalizeText(item.title);
            const normalizedContent = this.normalizeText(item.content);
            const normalizedKeywords = item.keywords.map(k => this.normalizeText(k)).join(' ');
            const searchableText = `${normalizedTitle} ${normalizedContent} ${normalizedKeywords}`;
            
            let score = 0;
            let matches = [];
            
            queryWords.forEach(word => {
                if (normalizedTitle.includes(word)) {
                    score += 10;
                    matches.push('title');
                }
                if (normalizedKeywords.includes(word)) {
                    score += 8;
                    matches.push('keyword');
                }
                if (normalizedContent.includes(word)) {
                    score += 5;
                    matches.push('content');
                }
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
        .slice(0, 10);
        
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
            if (noResultsContainer) noResultsContainer.classList.remove('hidden');
            if (helpContainer) helpContainer.classList.add('hidden');
        } else {
            if (noResultsContainer) noResultsContainer.classList.add('hidden');
            if (helpContainer) helpContainer.classList.add('hidden');
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
        
        if (noResultsContainer) noResultsContainer.classList.add('hidden');
        if (helpContainer) helpContainer.classList.remove('hidden');
        
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
