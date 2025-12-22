// ===== COMPONENTES DE SEGURIDAD PRIVADA - ACTUALIZADO SEGÚN LEY 21.659 =====
// Información extraída de documentos oficiales SPD
// Última actualización: Diciembre 2024

// ==========================================================================
// FUNCIONES DE NAVEGACIÓN DENTRO DE SPD.HTML
// ==========================================================================

/**
 * Muestra la vista de componentes DENTRO de spd.html
 * Oculta vistaPrincipal y muestra vistaComponentes
 */
function mostrarComponentes() {
    const vistaPrincipal = document.getElementById('vistaPrincipal');
    const vistaComponentes = document.getElementById('vistaComponentes');
    
    if (vistaPrincipal && vistaComponentes) {
        vistaPrincipal.style.display = 'none';
        vistaComponentes.classList.add('active');
        window.scrollTo(0, 0);
    }
}

/**
 * Vuelve a la vista principal de SPD
 * Oculta vistaComponentes y muestra vistaPrincipal
 */
function volverASPD() {
    const vistaPrincipal = document.getElementById('vistaPrincipal');
    const vistaComponentes = document.getElementById('vistaComponentes');
    
    if (vistaPrincipal && vistaComponentes) {
        vistaComponentes.classList.remove('active');
        vistaPrincipal.style.display = 'block';
        window.scrollTo(0, 0);
    }
}

/**
 * Muestra modal con asignaturas de capacitación
 * Abre EN LA MISMA PÁGINA de spd.html
 */
function mostrarAsignaturas() {
    const modal = document.getElementById('modalRequisitos');
    if (!modal) return;
    
    const titulo = document.getElementById('modalTitulo');
    const contenido = document.getElementById('modalContenido');
    
    titulo.textContent = 'ASIGNATURAS DE CAPACITACIÓN';
    
    let html = `
        <div class="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p class="text-sm text-gray-700 font-semibold" style="text-align: justify;">
                📚 Estas son las asignaturas que deben aprobarse según el Decreto 209 para obtener la certificación correspondiente
            </p>
        </div>
    `;
    
    // VIGILANTES PRIVADOS
    html += `
        <div class="requisito-section-componentes mb-6 bg-blue-50 border-l-4 border-blue-500">
            <h3 class="text-xl font-bold text-gray-900 mb-2">VIGILANTES PRIVADOS</h3>
            <div class="mb-3 flex flex-wrap gap-2">
                <span class="badge-componentes badge-decreto-componentes">Artículo 27 - Decreto 209</span>
                <span class="badge-componentes" style="background:#10b981; color:white;">100 horas pedagógicas</span>
                <span class="badge-componentes" style="background:#f59e0b; color:white;">40 horas cada 2 años</span>
            </div>
            <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p class="text-sm font-bold text-gray-800" style="text-align: justify;">AUTORIZADOS PARA PORTAR ARMAS DE FUEGO DENTRO DE UN RECINTO O ÁREA DETERMINADA</p>
            </div>
            <ul class="space-y-2">
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">1. Legislación aplicada a la seguridad privada</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">2. Respeto y promoción de los derechos humanos</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">3. Privacidad y uso de datos personales</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">4. Instrucción física</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">5. Correcto uso de elementos defensivos y de protección</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">6. Primeros auxilios</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">7. Prevención de riesgos</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">8. Seguridad de instalaciones</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">9. Probidad, no discriminación y perspectiva de género</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">10. Seguridad electrónica</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">11. Sistema de telecomunicaciones</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">12. Técnicas de reducción</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">13. Conocimiento de arma y tiro, de conformidad al reglamento complementario de la ley N° 17.798, sobre Control de Armas y Elementos Similares</li>
            </ul>
        </div>
    `;
    
    // GUARDIAS DE SEGURIDAD
    html += `
        <div class="requisito-section-componentes mb-6 bg-green-50 border-l-4 border-green-500">
            <h3 class="text-xl font-bold text-gray-900 mb-2">GUARDIAS DE SEGURIDAD</h3>
            <div class="mb-3 flex flex-wrap gap-2">
                <span class="badge-componentes badge-decreto-componentes">Artículo 107 N°1 - Decreto 209</span>
                <span class="badge-componentes" style="background:#10b981; color:white;">90 horas pedagógicas</span>
                <span class="badge-componentes" style="background:#f59e0b; color:white;">36 horas cada 4 años</span>
            </div>
            <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p class="text-sm font-bold text-gray-800" style="text-align: justify;">SIN AUTORIZACIÓN PARA PORTAR ARMAS DE FUEGO</p>
            </div>
            <ul class="space-y-2">
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">1. Legislación aplicada a seguridad privada</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">2. Respeto y promoción de los derechos humanos</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">3. Privacidad y uso de datos personales</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">4. Instrucción física</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">5. Correcto uso de elementos defensivos y de protección</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">6. Primeros auxilios</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">7. Prevención de riesgos</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">8. Seguridad de las instalaciones</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">9. Probidad, no discriminación y perspectiva de género</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">10. Seguridad electrónica</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">11. Sistema de telecomunicaciones</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">12. Técnicas de reducción</li>
            </ul>
        </div>
    `;
    
    // PORTEROS/NOCHEROS/RONDINES
    html += `
        <div class="requisito-section-componentes mb-6 bg-purple-50 border-l-4 border-purple-500">
            <h3 class="text-xl font-bold text-gray-900 mb-2">PORTEROS, NOCHEROS, RONDINES U OTROS DE SIMILAR CARÁCTER</h3>
            <div class="mb-3 flex flex-wrap gap-2">
                <span class="badge-componentes badge-decreto-componentes">Artículo 107 N°2 - Decreto 209</span>
                <span class="badge-componentes" style="background:#10b981; color:white;">60 horas pedagógicas</span>
                <span class="badge-componentes" style="background:#f59e0b; color:white;">30 horas cada 4 años</span>
            </div>
            <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p class="text-sm font-bold text-gray-800" style="text-align: justify;">SIN AUTORIZACIÓN PARA PORTAR ARMAS DE FUEGO</p>
            </div>
            <ul class="space-y-2">
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">1. Legislación aplicada a seguridad privada</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">2. Respeto y promoción de los derechos humanos</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">3. Privacidad y uso de datos personales</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">4. Correcto uso de elementos defensivos y de protección</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">5. Primeros auxilios</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">6. Prevención de riesgos</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">7. Seguridad de las instalaciones</li>
                <li class="requisito-item-componentes" style="text-align: justify; background:#ffffff;">8. Probidad, no discriminación y perspectiva de género</li>
            </ul>
        </div>
    `;
    
    html += `
        <div class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p class="text-sm text-gray-700" style="text-align: justify;">
                <strong>⚠️ Nota Importante:</strong> Las asignaturas de <strong>arma y tiro, técnicas de reducción y primeros auxilios</strong> deben ser <strong>siempre presenciales</strong>. Las demás pueden ser telemáticas o presenciales.
            </p>
        </div>
        
        <div class="mt-6 p-4 bg-gray-50 border-l-4 border-gray-500 rounded">
            <p class="text-sm text-gray-700">
                <strong>📌 Más información:</strong> 
                <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                    https://segprivada.minsegpublica.gob.cl/
                </a>
            </p>
        </div>
        
        <button onclick="descargarModalPDF('asignaturas')" class="btn-pdf-modal mt-6">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Descargar PDF
        </button>
    `;
    
    contenido.innerHTML = html;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.scrollTop = 0;
    }, 50);
}

// ==========================================================================
// FUNCIÓN PARA MOSTRAR REQUISITOS EN MODAL
// ==========================================================================
function mostrarRequisitos(tipo) {
    console.log('🚀 MOSTRAR REQUISITOS LLAMADO:', tipo);
    
    const modal = document.getElementById('modalRequisitos');
    const titulo = document.getElementById('modalTitulo');
    const contenido = document.getElementById('modalContenido');
    
    console.log('✅ Modal encontrado?', !!modal);
    console.log('✅ Título encontrado?', !!titulo);
    console.log('✅ Contenido encontrado?', !!contenido);
    
    if (!modal || !titulo || !contenido) {
        console.error('❌ Elementos del modal no encontrados');
        return;
    }
    
    // PASO 1: LIMPIAR COMPLETAMENTE
    contenido.innerHTML = '';
    titulo.textContent = '';
    
    // PASO 2: Normalizar el tipo (convertir encargadoArmas a encargado-armas)
    let tipoNormalizado = tipo
        .replace('encargadoArmas', 'encargado-armas')
        .replace('Armas', '-armas');
    
    console.log('📋 Tipo recibido:', tipo, 'Normalizado:', tipoNormalizado);
    
    // PASO 3: Configurar títulos
    const titulos = {
        'vigilante': 'Vigilante Privado',
        'guardia': 'Guardia de Seguridad',
        'nochero': 'Portero / Nochero',
        'portero': 'Portero / Nochero',
        'encargado-armas': 'Encargado de Armas y Municiones',
        'tecnico': 'Técnico en Seguridad Privada',
        'operador': 'Operador de Cámaras y Alarmas',
        'instalador': 'Instalador Técnico',
        'supervisor': 'Supervisor de Seguridad',
        'jefe': 'Jefe de Seguridad',
        'asesor': 'Asesor de Seguridad',
        'encargado': 'Encargado de Seguridad',
        'capacitador': 'Capacitador',
        'empresa': 'Empresa de Seguridad'
    };
    
    titulo.textContent = titulos[tipoNormalizado] || titulos[tipo] || 'Requisitos';
    console.log('📋 Título establecido a:', titulo.textContent);
    
    // PASO 4: Generar contenido según el tipo
    let html = '';
    
    try {
        switch(tipoNormalizado) {
            case 'vigilante':
                console.log('🎯 Generando contenido Vigilante...');
                html = generarContenidoVigilante();
                break;
            case 'guardia':
                console.log('🎯 Generando contenido Guardia...');
                html = generarContenidoGuardia();
                break;
            case 'nochero':
            case 'portero':
                console.log('🎯 Generando contenido Portero...');
                html = generarContenidoPortero();
                break;
            case 'encargado':
                console.log('🎯 Generando contenido Encargado...');
                html = generarContenidoEncargado();
                break;
            case 'encargado-armas':
                console.log('🎯 Generando contenido Encargado de Armas...');
                html = generarContenidoEncargadoArmas();
                break;
            case 'tecnico':
                console.log('🎯 Generando contenido Técnico...');
                html = generarContenidoTecnico();
                break;
            case 'operador':
                console.log('🎯 Generando contenido Operador...');
                html = generarContenidoOperador();
                break;
            case 'instalador':
                console.log('🎯 Generando contenido Instalador...');
                html = generarContenidoInstalador();
                break;
            case 'supervisor':
                console.log('🎯 Generando contenido Supervisor...');
                html = generarContenidoSupervisor();
                break;
            case 'jefe':
                console.log('🎯 Generando contenido Jefe...');
                html = generarContenidoJefe();
                break;
            case 'asesor':
                console.log('🎯 Generando contenido Asesor...');
                html = generarContenidoAsesor();
                break;
            case 'capacitador':
                console.log('🎯 Generando contenido Capacitador...');
                html = generarContenidoCapacitador();
                break;
            case 'empresa':
                console.log('🎯 Generando contenido Empresa...');
                html = generarContenidoEmpresa();
                break;
            default:
                console.warn('⚠️ Tipo no reconocido:', tipoNormalizado, 'intentando con:', tipo);
                html = generarContenidoGenerico(tipo);
        }
        console.log('✅ HTML generado, longitud:', html.length);
    } catch(error) {
        console.error('❌ Error generando contenido:', error, 'para tipo:', tipoNormalizado);
        html = '<div class="p-4 bg-red-50 border border-red-200 rounded"><p class="text-red-600">Error al cargar la información: ' + error.message + '</p></div>';
    }
    
    // PASO 5: Insertar contenido
    contenido.innerHTML = html;
    console.log('✅ HTML insertado en el contenedor');
    
    // PASO 6: Mostrar modal (usar solo clases, no estilos inline)
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('✅ Clase active añadida al modal');
    
    // PASO 7: Scroll al inicio
    requestAnimationFrame(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
            console.log('✅ Scroll al inicio');
        }
    });
    
    console.log('✅ Modal abierto:', tipoNormalizado);
}

// ==========================================================================
// VIGILANTE PRIVADO
// ==========================================================================

// ==========================================================================
// VIGILANTE PRIVADO
// ==========================================================================
function generarContenidoVigilante() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona que realiza labores de protección a personas y bienes dentro de un recinto o área determinada, autorizado para portar armas, credencial y uniforme.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Arts. 25 y 26 Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Arts. 26 y 27 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Haber cumplido con el DS N° 83/2007 del Ministerio de Defensa sobre Control de Armas (certificado de la DGMN)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. No haber sido declarado con invalidez de 2ª o 3ª clase por CAPREDENA o DIPRECA</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">3. Curso de FORMACIÓN: 100 horas pedagógicas (se rinde una sola vez)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">4. Curso de PERFECCIONAMIENTO: 40 horas cada 2 años</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 1 AÑO</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Debe portar arma de fuego durante la jornada de trabajo</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Solo puede portar armas dentro del recinto o área autorizada</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Certificación válida por 2 años</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('vigilante')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// GUARDIA DE SEGURIDAD
// ==========================================================================
function generarContenidoGuardia() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona que realiza labores de protección a personas y bienes dentro de recinto o área determinada, SIN autorización para portar armas de fuego. Debe usar uniforme y credencial.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Arts. 50, 51, 52, 53 y 54 Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Arts. 87, 88 y 89 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Curso de FORMACIÓN: 90 horas pedagógicas (se rinde una sola vez)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. Curso de PERFECCIONAMIENTO: 36 horas cada 4 años (entidades no obligadas)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">3. Curso de ESPECIALIZACIÓN: 36 horas cada 4 años (nivel riesgo medio o alto)</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 2 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 PROHIBICIÓN: NO puede portar armas de fuego (Art. 56 Ley 21.659)</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Puede usar elementos defensivos autorizados por SPD (no armas de fuego)</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Debe usar uniforme color negro según especificaciones del Decreto 209</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('guardia')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// PORTERO / NOCHERO / RONDÍN
// ==========================================================================
function generarContenidoPortero() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Personas que cumplen funciones de seguridad privada en recintos. Capacitación especializada y diferenciada de guardias de seguridad.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Arts. 55 y 56 Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Arts. 97, 98 y 99 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Curso de FORMACIÓN: 60 horas pedagógicas</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. Curso de PERFECCIONAMIENTO: 30 horas cada 4 años</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 PROHIBICIÓN: NO pueden usar armas de fuego (Art. 56 Ley 21.659)</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Seguro de vida obligatorio: mínimo 132 UF (contratado por empleador)</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Los conserjes pueden someterse voluntariamente a este régimen</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('portero')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// JEFE DE SEGURIDAD
// ==========================================================================
function generarContenidoJefe() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Responsable de la organización, dirección, administración, control y gestión de recursos destinados a la protección de personas y bienes. Coordina con autoridad fiscalizadora y SPD.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Art. 23 Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Arts. 23 y 24 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Título profesional de mínimo 8 semestres (educación superior estatal o reconocida)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. Curso de especialidad en seguridad o materias afines de mínimo 400 horas académicas</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">3. No haber sido declarado con invalidez de 2ª o 3ª clase por CAPREDENA o DIPRECA</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">4. Si trabaja en entidad obligada con sistema de vigilancia privada: debe cumplir requisitos de vigilante privado</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Ex-integrantes de FF.AA. o Carabineros pueden eximirse de algunas materias según malla curricular</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Se reconocen cursos previos de seguridad privada para completar las 400 horas</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('jefe')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// ASESOR DE SEGURIDAD
// ==========================================================================
function generarContenidoAsesor() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona natural que asesora sobre seguridad privada, propone medidas para neutralizar vulnerabilidades. Puede elaborar estudios y planes de seguridad.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">No tiene artículo específico en Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Art. 109 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Título profesional relacionado con el área de seguridad o materias afines</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. Diplomado en seguridad privada o gestión de seguridad empresarial de mínimo 400 horas académicas (educación superior reconocida)</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Puede elaborar estudios de seguridad y planes de seguridad para entidades obligadas</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('asesor')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// SUPERVISOR DE SEGURIDAD PRIVADA
// ==========================================================================
function generarContenidoSupervisor() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona que efectúa labores de supervigilancia y control de recursos humanos, materiales, tecnológicos o procedimientos destinados a la protección de personas y bienes.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">No tiene artículo específico en Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Art. 108 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. OPCIÓN 1: Curso de supervisión y control de 120 horas</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. OPCIÓN 2: Si tiene curso de guardias (90h), requiere 30 horas adicionales de supervisión</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">3. OPCIÓN 3: Si tiene curso de vigilantes (100h), requiere 20 horas adicionales de supervisión</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">4. OPCIÓN 4: Si tiene título técnico (4 semestres mín.) o profesional (8 semestres mín.), requiere 20 horas de supervisión</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 IMPORTANTE: Si trabaja en entidad obligada con sistema vigilancia privada, debe cumplir requisitos de vigilante privado</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('supervisor')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// CAPACITADOR
// ==========================================================================
function generarContenidoCapacitador() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Profesionales y técnicos autorizados por SPD dedicados a la instrucción, formación, capacitación y perfeccionamiento de vigilantes privados, guardias, porteros, nocheros, rondines y conserjes.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Art. 59 Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Arts. 104 y 105 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Nivel de educación profesional y técnico en materias de seguridad privada según asignatura a impartir</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. Diplomado en seguridad privada o gestión de seguridad empresarial (salvo excepciones por asignatura específica)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">3. EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#eff6ff; border-left-color:#0071e3;">
                <h3 class="font-bold text-gray-900 mb-3">📚 REQUISITOS ESPECIALES POR ASIGNATURA (Artículo 105 Decreto 209):</h3>
                <p class="text-sm text-gray-600 mb-3 italic" style="text-align: justify;">Los capacitadores deben cumplir requisitos adicionales según la asignatura que impartan:</p>
                
                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">1</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Legislación aplicada a la seguridad privada</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o certificado que acredite que la persona es licenciada en ciencias jurídicas y sociales o abogado. Podrá eximirse de contar con diplomado en materias inherentes a seguridad privada o gestión de seguridad empresarial si se acreditan dos o más años de experiencia profesional en la materia, con el respectivo certificado.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">2</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Respeto y promoción de los derechos humanos</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o certificado que acredite que la persona es licenciada en ciencias jurídicas y sociales o abogada.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">3</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Privacidad y uso de datos personales</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o certificado que acredite que la persona es licenciada en ciencias jurídicas y sociales o abogado, o profesional del área informática con un título profesional de educación superior de una carrera de, a lo menos, ocho semestres de duración.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">4</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Correcto uso de elementos defensivos</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificación oficial equivalente a un título profesional o técnico de nivel superior, del oficial o suboficial de las Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o Gendarmería de Chile, y certificado que acredite los cursos de defensa personal mediante la malla curricular vigente a la época en que los aprobaron.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">5</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Primeros auxilios</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior que acredite que la persona es profesional en el área de la salud.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">6</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Prevención de riesgos</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior en prevención de riesgos, junto con la correspondiente resolución de la SEREMI de Salud.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">7</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Probidad, no discriminación y perspectiva de género</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificado de magíster o diplomado, que acredite que la persona tiene formación en probidad, no discriminación o perspectiva de género.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">8</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Seguridad de instalaciones</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior en prevención de riesgos, junto con la correspondiente resolución de la SEREMI de Salud.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">9</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Seguridad electrónica</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior en electrónica</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">10</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Sistema de telecomunicaciones</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional de ingeniero o técnico de nivel superior en telecomunicaciones.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">11</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Técnicas de reducción</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificación oficial equivalente a un título profesional o técnico de nivel superior del oficial y suboficial de las Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o Gendarmería de Chile, y certificado que acredite que la persona tiene formación en defensa personal mediante la malla curricular vigente a la época en que los aprobaron. Certificado emitido por la Dirección General de Movilización Nacional para deportistas expertos en artes defensivas, si procediere</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">12</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Instrucción física</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificado de licenciatura en educación física o título técnico en  materias afines otorgado por entidades reconocidas por el Ministerio de Educación.</p>
                    </div>
                </div>

                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0; margin-bottom: 8px;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">13</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">Conocimiento de arma y tiro</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificado que acredite que la persona ha sido instructor o es experto en manejo de uso de armas y tiro, con un mínimo de cinco años de experiencia. Certificado de egreso como oficial y suboficial de las Fuerzas Armadas y de Orden y Seguridad Pública o Gendarmería, si procede. En todo caso, se deberá acompañar el certificado de aprobación del examen práctico otorgado por la autoridad fiscalizadora competente.</p>
                    </div>
                </div>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Los exámenes de capacitación finalizan ante Carabineros de Chile</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 La certificación la otorga la Subsecretaría de Prevención del Delito</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 El capacitador debe acreditar conocimientos y experiencia en la asignatura específica que imparte</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('capacitador')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// ENCARGADO DE SEGURIDAD
// ==========================================================================
function generarContenidoEncargado() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona designada para cada recinto, oficina, agencia o sucursal que vela por el cumplimiento de las medidas del estudio de seguridad, coordinando con jefe de seguridad y autoridad fiscalizadora.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Art. 24 Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Art. 25 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Cumplir todos los mismos requisitos que los vigilantes privados</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">2. Curso relacionado con seguridad o materias afines de mínimo 120 horas académicas</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Se relaciona con la autoridad fiscalizadora para efectos de la ley</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('encargado')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// ENCARGADO DE ARMAS Y MUNICIONES
// ==========================================================================
function generarContenidoEncargadoArmas() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona que mantiene a resguardo las armas de fuego de la entidad obligada y realiza entrega/recepción a vigilantes privados al inicio/término de jornada.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Art. 26 (inciso 5°) Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Art. 30 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Cumplir todos los mismos requisitos establecidos para los vigilantes privados</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Puede ser la misma persona que el encargado de seguridad</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Responsable del registro diario de armas según Art. 104 del DS 83/2007</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Debe guardar armas y municiones en lugar cerrado con garantías de seguridad</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('encargado-armas')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// TÉCNICO EN SEGURIDAD PRIVADA
// ==========================================================================
function generarContenidoTecnico() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona que proporciona, instala, mantiene, repara y/o controla equipos, dispositivos y sistemas de seguridad electrónica conectados a centrales receptoras.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">No tiene artículo específico en Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Art. 110 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Certificado de título profesional o técnico en la materia de seguridad electrónica</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Trabaja con sistemas conectados a centrales receptoras de alarmas</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Autorizado por la Subsecretaría de Prevención del Delito</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('tecnico')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// OPERADOR DE CÁMARAS DE TELEVIGILANCIA Y ALARMAS
// ==========================================================================
function generarContenidoOperador() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona que opera en centros de control o videovigilancia mediante CCTV o alarmas para detectar riesgos y coordinar con autoridades.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">No tiene artículo específico en Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Art. 111 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Certificado de capacitación en el área de televigilancia y alarmas</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Trabaja en centros de control o videovigilancia</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Coordina con autoridad policial para neutralizar amenazas</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('operador')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// INSTALADOR TÉCNICO
// ==========================================================================
function generarContenidoInstalador() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Persona que instala sistemas de CCTV y/o alarmas para el funcionamiento de instalaciones de seguridad.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">No tiene artículo específico en Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Art. 112 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">🎯 REQUISITOS ESPECÍFICOS:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">1. Certificado de capacitación en el área de instalación de sistemas de seguridad</li>
                </ul>
            </div>

            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Instala sistemas de circuito cerrado de televisión y alarmas</li>
                    <li class="requisito-item-componentes" style="background:#fefce8; text-align: justify;">💡 Autorizado por la Subsecretaría de Prevención del Delito</li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('instalador')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// EMPRESA DE SEGURIDAD PRIVADA
// ==========================================================================
function generarContenidoEmpresa() {
    return `
        <div class="space-y-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
                <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500" style="text-align: justify;">
                    Empresa de Seguridad Privada es aquella persona jurídica de derecho privado que tiene por objeto suministrar bienes o prestar servicios destinados a la protección de personas, bienes y procesos productivos, disponiendo de medios materiales, técnicos y humanos para ello.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Arts. 33, 34 y 35 Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Arts. 47, 49, 50, 51 y 53 Decreto 209</span>
            </div>

            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">✅ REQUISITOS PARA SER AUTORIZADA (Art. 34 Ley 21.659 y Art. 49 Decreto 209):</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        <span class="requisito-numero-componentes">1</span>
                        Estar legalmente constituida como persona jurídica de derecho privado y tener por objeto social alguna o algunas de las actividades de seguridad privada establecidas en el artículo 2° del Decreto 209. Las OTEC quedan exceptuadas del requisito de objeto social único.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        <span class="requisito-numero-componentes">2</span>
                        Contar con los medios humanos, de formación, financieros, materiales y técnicos en función de la naturaleza de las actividades para las que soliciten autorización y las características de los servicios que se prestan.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        <span class="requisito-numero-componentes">3</span>
                        Suscribir los contratos de seguro en favor del personal que corresponda, de acuerdo a lo establecido en la ley N° 21.659 y el Decreto 209.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        <span class="requisito-numero-componentes">4</span>
                        Que los socios, administradores y representantes legales no hayan sido condenados por crimen o simple delito.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        <span class="requisito-numero-componentes">5</span>
                        Que los socios, administradores y representantes legales no se encuentren acusados por alguna de las conductas punibles establecidas en las leyes: N° 17.798 (Control de Armas), N° 20.000 (Tráfico Ilícito de Estupefacientes), N° 18.314 (Conductas Terroristas), N° 19.913 (Lavado y Blanqueo de Activos), N° 12.927 (Seguridad del Estado), N° 20.066 (Violencia Intrafamiliar), artículos 141, 142, 150 A, 150 B, 361, 362, 363, 365 bis, 366, 366 bis, 372 bis, 390, 390 bis, 390 ter, 391 y 411 quáter del Código Penal, u otras asociadas al crimen organizado.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        <span class="requisito-numero-componentes">6</span>
                        Que los socios, administradores y representantes legales no hubiesen dejado de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública o a Gendarmería de Chile, como consecuencia de la aplicación de una medida disciplinaria en los últimos cinco años, salvo que los hechos sean posteriormente desestimados mediante sentencia judicial firme o ejecutoriada.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        <span class="requisito-numero-componentes">7</span>
                        No haber sido condenada la persona jurídica por delitos contemplados en la ley N° 20.393, que establece la responsabilidad penal de las personas jurídicas.
                    </li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-purple-50 border-l-4 border-purple-500">
                <h3 class="font-bold text-purple-900 mb-3">🎯 PROHIBICIÓN DE NOMBRE O RAZÓN SOCIAL (Art. 34 Ley 21.659):</h3>
                <p class="text-gray-700 p-2 text-sm" style="text-align: justify;">
                    Se prohíbe a las empresas de seguridad privada utilizar un nombre o razón social igual o similar al de los órganos públicos, especialmente el del Ministerio encargado de la Seguridad Pública, el de las Fuerzas Armadas y Fuerzas de Orden y Seguridad Pública, el del Ministerio Público o cualquier otro que induzca a error respecto de su naturaleza privada.
                </p>
            </div>

            <div class="requisito-section-componentes bg-orange-50 border-l-4 border-orange-500">
                <h3 class="font-bold text-orange-900 mb-3">📝 SOLICITUD SIMPLE (Normativa de Transición):</h3>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    <strong>Referencia:</strong> Art. Duodécimo del Reglamento D/S 867 y Decreto Exento N° 32 del 2024.
                </p>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    El interesado debe presentar una solicitud simple indicando:
                </p>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Si se trata de <strong>iniciación, renovación o ampliación</strong>
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Razón social de la empresa según escritura (Natural; Jurídica; EIRL; etc.)
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Nombre de fantasía (solo jurídicas)
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • RUT, domicilio comercial, comuna, ciudad
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Correo electrónico y teléfono comercial
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Representante legal y sus datos personales
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • <strong>Para Empresas de Recursos Técnicos:</strong> Indicar si es con o sin monitoreo de alarmas y vigilancia remota
                    </li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-green-50 border-l-4 border-green-500">
                <h3 class="font-bold text-green-900 mb-3">📋 DOCUMENTOS PARA ACREDITAR REQUISITOS (Art. 53 Decreto 209):</h3>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    Para acreditar el cumplimiento de los requisitos, las empresas deberán adjuntar en el informe bianual los siguientes documentos:
                </p>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        1. Copia de la cédula de identidad por ambos lados, de los socios, administradores y representantes legales.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        2. Certificado de antecedentes para fines especiales de los socios, administradores y representantes legales con una vigencia no superior a treinta días.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        3. Declaración jurada simple de no encontrarse acusado por algunos de los delitos establecidos en el numeral 5 del artículo 34 de la ley N° 21.659.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        4. Certificado de no haber dejado de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de la aplicación de una medida disciplinaria.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        5. Declaración jurada simple del representante legal de la empresa, de no haber sido condenada la persona jurídica mediante sentencia firme por delitos contemplados en la ley N° 20.393.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        6. Póliza de seguros contratados en favor del personal que corresponda, de acuerdo con lo establecido en la ley N° 21.659 y el Decreto 209.
                    </li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-cyan-50 border-l-4 border-cyan-500">
                <h3 class="font-bold text-cyan-900 mb-3">🔧 EMPRESAS DE RECURSOS TÉCNICOS (Normativa de Transición):</h3>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    <strong>Referencia:</strong> Art. 3° inciso 1° D/S 93 y Decreto Exento N° 32 del 2024.
                </p>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    <strong>a) Al momento de Iniciación, Renovación o Ampliación:</strong>
                </p>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Remitir una relación detallada de los equipos, materiales y elementos que pretenda proporcionar: mantención, instalación o venta de insumos.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • <strong>Para empresas que administran servicios de CCTV y Alarmas:</strong> Deberán adjuntar los protocolos de monitoreo del referido sistema, verificación en terreno y sistema de comunicaciones de alarmas, ante activación de las mismas.
                    </li>
                </ul>
                <p class="text-gray-700 mb-2 mt-3 text-sm" style="text-align: justify;">
                    <strong>b) Una vez autorizada la empresa:</strong>
                </p>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Debe presentar un listado de los Técnicos.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Sus respectivas fotocopias de autorizaciones vigentes.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        • Contratos de Trabajo legalizados ante Notario, posterior a su autorización.
                    </li>
                </ul>
                <p class="text-gray-700 mt-2 text-sm" style="text-align: justify;">
                    <strong>Nota:</strong> Al momento de tramitar renovación y/o ampliación deberá presentar los mismos antecedentes indicados anteriormente.
                </p>
            </div>

            <div class="requisito-section-componentes bg-yellow-50 border-l-4 border-yellow-500">
                <h3 class="font-bold text-yellow-900 mb-3">📝 PROCEDIMIENTO DE AUTORIZACIÓN (Art. 51 Decreto 209):</h3>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    <strong>Vigencia:</strong> 4 años contados desde la notificación de la resolución que autoriza.
                </p>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    <strong>La solicitud debe contener:</strong>
                </p>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        1. Razón social, RUT, actividad de seguridad privada acreditada en el giro, domicilio de la entidad, nombre completo del representante legal y su cédula de identidad, correo electrónico y teléfono de contacto.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        2. Número de trabajadores, sus perfiles, formación y plan de capacitación continua.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        3. Ubicación exacta de los recintos, plantas, instalaciones, equipos y bienes que dispone para el servicio que presta.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        4. Todos los antecedentes que permitan acreditar el cumplimiento de los requisitos para funcionar como empresa de seguridad privada.
                    </li>
                </ul>
                <p class="text-gray-700 mt-2 text-sm" style="text-align: justify;">
                    <strong>Renovación:</strong> Debe solicitarse con a lo menos 30 días de anticipación a la fecha de vencimiento, acreditando nuevamente el cumplimiento de los requisitos señalados en los numerales 2 a 7 del artículo 49 del Decreto 209.
                </p>
            </div>

            <div class="requisito-section-componentes bg-red-50 border-l-4 border-red-500">
                <h3 class="font-bold text-red-900 mb-3">📊 INFORME BIANUAL (Art. 52 Decreto 209):</h3>
                <p class="text-gray-700 mb-2 text-sm" style="text-align: justify;">
                    Las empresas deben elaborar y remitir un informe cada dos años a la SPD, que dé cuenta de:
                </p>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        1. El cumplimiento de todos los requisitos de la ley N° 21.659 para actuar como empresa de seguridad privada.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        2. La nómina del personal durante el período y el cumplimiento de los requisitos para desempeñar actividades de seguridad privada.
                    </li>
                    <li class="requisito-item-componentes" style="text-align: justify;">
                        3. Informe sobre eventuales eventos graves que hayan tenido lugar en el respectivo período, alertando de posibles transgresiones al orden público, seguridad o salud de las personas.
                    </li>
                </ul>
                <p class="text-gray-700 mt-2 text-sm" style="text-align: justify;">
                    <strong>Importante:</strong> Si la SPD verifica la pérdida de algún requisito, podrá revocar la autorización. Si se trata de requisitos subsanables, fijará un plazo no inferior a 30 días para acreditar su cumplimiento.
                </p>
            </div>

            <div class="requisito-section-componentes" style="background:#e0f2fe; border-left-color:#0284c7;">
                <h3 class="font-bold text-gray-900 mb-3">🏢 TIPOS DE EMPRESAS DE SEGURIDAD PRIVADA:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="background:#f0f9ff; text-align: justify;">
                        <strong>1. Recursos Humanos:</strong> Empresas especializadas que proveen personal de seguridad (Art. 50 N°1 Decreto 209).
                    </li>
                    <li class="requisito-item-componentes" style="background:#f0f9ff; text-align: justify;">
                        <strong>2. Instituciones de Capacitación:</strong> Empresas que imparten formación y perfeccionamiento en seguridad privada (Art. 50 N°2 Decreto 209).
                    </li>
                    <li class="requisito-item-componentes" style="background:#f0f9ff; text-align: justify;">
                        <strong>3. Seguridad Electrónica:</strong> Empresas que instalan, mantienen y operan sistemas tecnológicos de seguridad (Art. 50 N°3 Decreto 209).
                    </li>
                    <li class="requisito-item-componentes" style="background:#f0f9ff; text-align: justify;">
                        <strong>4. Asesoría:</strong> Empresas que otorgan servicios de asesoría en materias de seguridad privada (Art. 50 N°4 Decreto 209).
                    </li>
                </ul>
            </div>

            <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p class="text-sm text-gray-700" style="text-align: justify;">
                    <strong>✓ Autorización:</strong> Todas las empresas requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> y están sujetas a fiscalización permanente.
                </p>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-500">
                <p class="text-sm text-gray-700">
                    <strong>📌 Más información:</strong> 
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>

            <button onclick="descargarModalPDF('empresa')" class="btn-pdf-modal">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Descargar PDF
            </button>
        </div>
    `;
}

// ==========================================================================
// FUNCIÓN GENÉRICA PARA COMPONENTES NO ESPECIFICADOS
// ==========================================================================
function generarContenidoGenerico(tipo) {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <p class="text-sm text-gray-600 mb-3">
                    Los requisitos específicos para este componente están en proceso de actualización según la Ley 21.659.
                </p>
                <p class="text-sm text-gray-700">
                    Por favor, consulte la información oficial en:
                    <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                        https://segprivada.minsegpublica.gob.cl/
                    </a>
                </p>
            </div>
        </div>
    `;
}

// ==========================================================================
// FUNCIÓN DE DESCARGA DE PDF
// ==========================================================================

/**
 * Descarga el contenido del modal como PDF
 * @param {string} tipo - Tipo de componente (vigilante, guardia, etc.)
 */
function descargarModalPDF(tipo) {
    // Obtener el título del modal
    const titulo = document.getElementById('modalTitulo').textContent;
    const contenido = document.getElementById('modalContenido');
    
    // Crear un contenedor temporal con el contenido
    const contenedorTemp = document.createElement('div');
    contenedorTemp.style.cssText = 'padding: 5px; background-color: white; margin: 0; width: 100%;';
    
    // Agregar título
    const tituloElement = document.createElement('h1');
    tituloElement.textContent = titulo;
    tituloElement.style.cssText = 'font-size: 20px; font-weight: bold; margin: 0 0 10px 0; padding: 0; color: #1f2937;';
    contenedorTemp.appendChild(tituloElement);
    
    // Clonar el contenido del modal
    const contenidoClone = contenido.cloneNode(true);
    
    // Ocultar botón de descarga en el clon
    const botonPDF = contenidoClone.querySelector('.btn-pdf-modal');
    if (botonPDF) {
        botonPDF.remove();
    }
    
    // CRÍTICO: Eliminar TODOS los espacios y márgenes grandes
    contenidoClone.style.cssText = 'margin: 0; padding: 0;';
    
    // Aplicar estilos a TODOS los elementos para flujo continuo
    const todosLosElementos = contenidoClone.querySelectorAll('*');
    todosLosElementos.forEach(elemento => {
        // Eliminar márgenes verticales grandes
        if (elemento.style.marginTop) elemento.style.marginTop = '0';
        if (elemento.style.marginBottom) elemento.style.marginBottom = '0';
        if (elemento.style.paddingTop) elemento.style.paddingTop = '0';
        if (elemento.style.paddingBottom) elemento.style.paddingBottom = '0';
        
        // Aplicar márgenes pequeños a secciones
        if (elemento.classList.contains('requisito-section-componentes')) {
            elemento.style.cssText += 'margin: 5px 0 !important; padding: 8px !important; page-break-inside: avoid; page-break-after: auto; page-break-before: auto;';
        }
        
        // Aplicar estilos a items
        if (elemento.classList.contains('requisito-item-componentes')) {
            elemento.style.cssText += 'margin: 3px 0 !important; padding: 6px !important; page-break-inside: avoid;';
        }
        
        // Reducir espacios en divs con clases de Tailwind
        if (elemento.className && typeof elemento.className === 'string') {
            if (elemento.className.includes('mt-')) {
                elemento.style.marginTop = '5px';
            }
            if (elemento.className.includes('mb-')) {
                elemento.style.marginBottom = '5px';
            }
            if (elemento.className.includes('space-y-')) {
                elemento.style.cssText += 'gap: 5px;';
            }
        }
    });
    
    contenedorTemp.appendChild(contenidoClone);
    
    // Generar nombre de archivo
    const nombreArchivo = `OS10-Requisitos-${titulo.replace(/\s+/g, '-')}.pdf`;
    
    // Configuración del PDF optimizada para flujo continuo
    const opciones = {
        margin: [8, 8, 8, 8],
        filename: nombreArchivo,
        image: { 
            type: 'jpeg', 
            quality: 0.96 
        },
        html2canvas: { 
            scale: 1.5,
            useCORS: true,
            logging: false,
            letterRendering: true,
            backgroundColor: '#ffffff',
            scrollY: 0,
            scrollX: 0,
            windowHeight: document.documentElement.scrollHeight,
            onclone: function(clonedDoc) {
                const clonedContent = clonedDoc.body.querySelector('div');
                if (clonedContent) {
                    const allElements = clonedContent.querySelectorAll('*');
                    allElements.forEach(el => {
                        el.style.pageBreakInside = 'auto';
                        el.style.pageBreakBefore = 'auto';
                        el.style.pageBreakAfter = 'auto';
                    });
                }
            }
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { 
            mode: [],
            before: [],
            after: [],
            avoid: []
        }
    };
    
    // Mostrar animación de descarga
    const animacion = document.getElementById('pdfDownloadAnimation');
    if (animacion) {
        animacion.classList.add('active');
        setTimeout(() => {
            animacion.classList.remove('active');
        }, 1200);
    }
    
    // Generar y descargar PDF
    html2pdf().set(opciones).from(contenedorTemp).save().then(() => {
        console.log('✅ PDF descargado:', nombreArchivo);
    }).catch(error => {
        console.error('❌ Error al generar PDF:', error);
        alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    });
}

// ==========================================================================
// FUNCIONES DE CIERRE DEL MODAL
// ==========================================================================

/**
 * Cierra el modal de forma simple y eficiente
 */
function cerrarModal() {
    const modal = document.getElementById('modalRequisitos');
    const contenido = document.getElementById('modalContenido');
    
    if (!modal) {
        console.error('❌ Modal no encontrado');
        return;
    }
    
    // PASO 1: Remover clase active
    modal.classList.remove('active');
    
    // PASO 2: Restaurar scroll del body INMEDIATAMENTE
    document.body.style.overflow = '';
    
    // PASO 3: Limpiar contenido
    if (contenido) {
        contenido.innerHTML = '';
    }
    
    console.log('✅ Modal cerrado');
}

/**
 * Cierra el modal visualmente (alias para compatibilidad)
 */
function cerrarModalVisualmente() {
    cerrarModal();
}

// ==========================================================================
// INICIALIZACIÓN Y EVENT LISTENERS
// ==========================================================================

/**
 * Inicializa todos los event listeners del sistema de modales
 * SOLO se ejecuta una vez para evitar duplicación
 */
let modalListenersInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    // Evitar duplicación de listeners
    if (modalListenersInitialized) return;
    modalListenersInitialized = true;
    
    const modal = document.getElementById('modalRequisitos');
    if (!modal) {
        console.warn('⚠️ Modal modalRequisitos no encontrado');
        return;
    }
    
    // Cerrar modal al hacer click fuera (en el fondo gris)
    modal.addEventListener('click', function(e) {
        // Solo cerrar si el click es en el fondo, no en el contenido
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const activeModal = document.querySelector('#modalRequisitos.active');
            if (activeModal) {
                cerrarModal();
            }
        }
    });
    
    console.log('✅ Event listeners inicializados correctamente');
});

// Event listener para cambios de visibilidad de la página
document.addEventListener('visibilitychange', function() {
    // Si el documento se vuelve visible nuevamente, no hacer nada especial
    // El modal se maneja con sus propios listeners
});
