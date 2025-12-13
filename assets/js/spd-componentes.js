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
    const modal = document.getElementById('modalRequisitos');
    const titulo = document.getElementById('modalTitulo');
    const contenido = document.getElementById('modalContenido');
    
    // Configurar título según el tipo
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
        'capacitador': 'Capacitador',
        'empresa': 'Empresa de Seguridad'
    };
    
    titulo.textContent = titulos[tipo] || 'Requisitos';
    
    // Generar contenido según el tipo
    let html = '';
    
    switch(tipo) {
        case 'vigilante':
            html = generarContenidoVigilante();
            break;
        case 'guardia':
            html = generarContenidoGuardia();
            break;
        case 'nochero':
        case 'portero':
            html = generarContenidoPortero();
            break;
        case 'encargado-armas':
            html = generarContenidoEncargadoArmas();
            break;
        case 'tecnico':
            html = generarContenidoTecnico();
            break;
        case 'operador':
            html = generarContenidoOperador();
            break;
        case 'instalador':
            html = generarContenidoInstalador();
            break;
        case 'supervisor':
            html = generarContenidoSupervisor();
            break;
        case 'jefe':
            html = generarContenidoJefe();
            break;
        case 'asesor':
            html = generarContenidoAsesor();
            break;
        case 'capacitador':
            html = generarContenidoCapacitador();
            break;
        case 'empresa':
            html = generarContenidoEmpresa();
            break;
        default:
            html = generarContenidoGenerico(tipo);
    }
    
    // Insertar contenido
    contenido.innerHTML = html;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 1 AÑO</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Debe portar arma de fuego durante la jornada de trabajo</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Solo puede portar armas dentro del recinto o área autorizada</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Certificación válida por 2 años</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 2 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 PROHIBICIÓN: NO puede portar armas de fuego (Art. 56 Ley 21.659)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Puede usar elementos defensivos autorizados por SPD (no armas de fuego)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Debe usar uniforme color negro según especificaciones del Decreto 209</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 PROHIBICIÓN: NO pueden usar armas de fuego (Art. 56 Ley 21.659)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Seguro de vida obligatorio: mínimo 132 UF (contratado por empleador)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Los conserjes pueden someterse voluntariamente a este régimen</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Ex-integrantes de FF.AA. o Carabineros pueden eximirse de algunas materias según malla curricular</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Se reconocen cursos previos de seguridad privada para completar las 400 horas</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Puede elaborar estudios de seguridad y planes de seguridad para entidades obligadas</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 IMPORTANTE: Si trabaja en entidad obligada con sistema vigilancia privada, debe cumplir requisitos de vigilante privado</li>
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
                    <li class="requisito-item-componentes" style="text-align: justify;">3. Los requisitos específicos varían según la asignatura a impartir (ver detalle completo en Artículo 105)</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Los exámenes de capacitación finalizan ante Carabineros de Chile</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 La certificación la otorga la Subsecretaría de Prevención del Delito</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Puede ser la misma persona que el encargado de seguridad</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Responsable del registro diario de armas según Art. 104 del DS 83/2007</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Debe guardar armas y municiones en lugar cerrado con garantías de seguridad</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Trabaja con sistemas conectados a centrales receptoras de alarmas</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Autorizado por la Subsecretaría de Prevención del Delito</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Trabaja en centros de control o videovigilancia</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Coordina con autoridad policial para neutralizar amenazas</li>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Instala sistemas de circuito cerrado de televisión y alarmas</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Autorizado por la Subsecretaría de Prevención del Delito</li>
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
                    Persona jurídica que presta servicios de seguridad privada, debiendo cumplir requisitos específicos para su autorización y funcionamiento.
                </p>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
                <span class="badge-componentes badge-ley-componentes">Arts. 63 y siguientes Ley 21.659</span>
                <span class="badge-componentes badge-decreto-componentes">Arts. 113 y siguientes Decreto 209</span>
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

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">ℹ️ INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Debe contar con jefe de seguridad autorizado</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Debe mantener registro actualizado de personal</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">💡 Sujeta a fiscalización permanente de la SPD</li>
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
