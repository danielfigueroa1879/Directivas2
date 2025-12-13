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
function generarContenidoVigilante() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de la cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las funciones a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por algunas de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves de la ley N°21.659, sobre seguridad privada.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-red-50 border-l-4 border-red-500">
                <h3 class="font-bold text-red-900 mb-3">⚠️ REQUISITOS ESPECIALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado otorgado por la Caja de Previsión de la Defensa Nacional o por la Dirección de Previsión de Carabineros de Chile, según corresponda, que acredite no haber sido declarado con invalidez de segunda o tercera clase.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de la Dirección General de Movilización Nacional que acredite el cumplimiento de lo establecido en reglamento complementario de la ley sobre control de armas, en cuanto al uso de armas de fuego.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación del examen del curso de capacitación de seguridad privada (curso de formación o perfeccionamiento), emitido por la Subsecretaría de Prevención del Delito.</li>
                </ul>
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
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de la cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, Fuerzas de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves de la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-red-50 border-l-4 border-red-500">
                <h3 class="font-bold text-red-900 mb-3">⚠️ REQUISITOS ESPECIALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación del examen del curso de capacitación de seguridad privada (curso de formación, perfeccionamiento o especialización), emitido por la Subsecretaría de Prevención del Delito.</li>
                </ul>
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
// PORTERO / NOCHERO
// ==========================================================================
function generarContenidoPortero() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
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
// CAPACITADOR - PARTE 1
// ==========================================================================
function generarContenidoCapacitador() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de la cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las funciones a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por algunas de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de la Subsecretaría de Prevención del Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves de la ley N°21.659, sobre seguridad privada.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-red-50 border-l-4 border-red-500">
                <h3 class="font-bold text-red-900 mb-3">⚠️ REQUISITOS ESPECIALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Contar con un título profesional, técnico de nivel superior o licenciatura, exigido según el requisito especial por asignatura a impartir.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Contar con un diplomado en materias inherentes a seguridad privada o gestión de seguridad empresarial, otorgado por una institución de educación superior, reconocida oficialmente por el Estado. Se exceptuará de lo anterior a quienes acrediten estar en posesión del título profesional de ingeniero en seguridad privada o del grado académico de magíster en seguridad privada, lo que deberá ser acreditado por el certificado respectivo.</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-amber-50 border-l-4 border-amber-500">
                <h3 class="font-bold text-amber-900 mb-3">📚 REQUISITOS ESPECIALES POR ASIGNATURA:</h3>
                <div class="space-y-3">
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">1. Legislación aplicada a la seguridad privada</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o certificado que acredite que la persona es licenciada en ciencias jurídicas y sociales o abogado. Podrá eximirse de contar con diplomado en materias inherentes a seguridad privada o gestión de seguridad empresarial si se acreditan dos o más años de experiencia profesional en la materia, con el respectivo certificado.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">2. Respeto y promoción de los derechos humanos</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o certificado que acredite que la persona es licenciada en ciencias jurídicas y sociales o abogada.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">3. Privacidad y uso de datos personales</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o certificado que acredite que la persona es licenciada en ciencias jurídicas y sociales o abogado, o profesional del área informática con un título profesional de educación superior de una carrera de, a lo menos, ocho semestres de duración.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">4. Correcto uso de elementos defensivos</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificación oficial equivalente a un título profesional o técnico de nivel superior, del oficial o suboficial de las Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o Gendarmería de Chile, y certificado que acredite los cursos de defensa personal mediante la malla curricular vigente a la época en que los aprobaron.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">5. Primeros auxilios</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior que acredite que la persona es profesional en el área de la salud.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">6. Prevención de riesgos</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior en prevención de riesgos, junto con la correspondiente resolución de la SEREMI de Salud.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">7. Probidad, no discriminación y perspectiva de género</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificado de magíster o diplomado, que acredite que la persona tiene formación en probidad, no discriminación o perspectiva de género.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">8. Seguridad de instalaciones</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior en prevención de riesgos, junto con la correspondiente resolución de la SEREMI de Salud.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">9. Seguridad electrónica</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional o técnico de nivel superior en electrónica.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">10. Sistema de telecomunicaciones</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Título profesional de ingeniero o técnico de nivel superior en telecomunicaciones.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">11. Técnicas de reducción</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificación oficial equivalente a un título profesional o técnico de nivel superior del oficial y suboficial de las Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o Gendarmería de Chile, y certificado que acredite que la persona tiene formación en defensa personal mediante la malla curricular vigente a la época en que los aprobaron. Certificado emitido por la Dirección General de Movilización Nacional para deportistas expertos en artes defensivas, si procediere.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">12. Instrucción física</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificado de licenciatura en educación física o título técnico en materias afines otorgado por entidades reconocidas por el Ministerio de Educación.</p>
                    </div>
                    <div class="requisitos-asignatura">
                        <h4 class="font-semibold text-gray-900 mb-1">13. Conocimiento de arma y tiro</h4>
                        <p class="text-sm text-gray-700" style="text-align: justify;">Certificado que acredite que la persona ha sido instructor o es experto en manejo de uso de armas y tiro, con un mínimo de cinco años de experiencia. Certificado de egreso como oficial y suboficial de las Fuerzas Armadas y de Orden y Seguridad Pública o Gendarmería, si procede. En todo caso, se deberá acompañar el certificado de aprobación del examen práctico otorgado por la autoridad fiscalizadora competente.</p>
                    </div>
                </div>
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
// ENCARGADO DE ARMAS Y MUNICIONES - PERSONAS NATURALES
// ==========================================================================
function generarContenidoEncargadoArmas() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
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
// TÉCNICO EN SEGURIDAD PRIVADA - PERSONAS NATURALES
// ==========================================================================
function generarContenidoTecnico() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
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
// ASESOR DE SEGURIDAD - CON ENCABEZADOS Y 14 REQUISITOS GENERALES
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
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
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
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Título profesional relacionado con el área de seguridad o materias afines</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Diplomado en seguridad privada o gestión de seguridad empresarial de mínimo 400 horas académicas (educación superior reconocida)</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">💡 INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">• Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">• EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">• Puede elaborar estudios de seguridad y planes de seguridad para entidades obligadas</li>
                </ul>
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
// OPERADOR DE CÁMARAS Y ALARMAS - PERSONAS NATURALES
// ==========================================================================
function generarContenidoOperador() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
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
// INSTALADOR TÉCNICO - PERSONAS NATURALES
// ==========================================================================
function generarContenidoInstalador() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
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
// SUPERVISOR DE SEGURIDAD - PERSONAS NATURALES
// ==========================================================================
function generarContenidoSupervisor() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
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
// JEFE DE OPERACIONES - PERSONAS NATURALES
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
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
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
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Título profesional de mínimo 8 semestres (educación superior estatal o reconocida)</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Curso de especialidad en seguridad o materias afines de mínimo 400 horas académicas</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ No haber sido declarado con invalidez de 2ª o 3ª clase por CAPREDENA o DIPRECA</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Si trabaja en entidad obligada con sistema de vigilancia privada: debe cumplir requisitos de vigilante privado</li>
                </ul>
            </div>

            <div class="requisito-section-componentes bg-gray-50 border-l-4 border-gray-400">
                <h3 class="font-bold text-gray-900 mb-3">💡 INFORMACIÓN ADICIONAL:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">• Periodicidad de acreditación física y psíquica: CADA 4 AÑOS</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">• Ex-integrantes de FF.AA. o Carabineros pueden eximirse de algunas materias según malla curricular</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">• Se reconocen cursos previos de seguridad privada para completar las 400 horas</li>
                </ul>
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
// EMPRESA DE SEGURIDAD - PERSONAS NATURALES  
// ==========================================================================
function generarContenidoEmpresa() {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <ul class="space-y-2">
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Copia de cédula de identidad por ambos lados, que acredite que la persona es mayor de edad.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico cirujano inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones físicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por un médico psiquiatra o psicólogo inscrito en el Registro Nacional de Prestadores Individuales de Salud, que acredite que la persona tiene condiciones psíquicas compatibles con las labores a desempeñar. El certificado debe consignar el nombre completo y número de cédula de identidad del profesional.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de licencia de enseñanza media o su equivalente, emitido por el Ministerio de Educación. Los certificados de estudios de personas extranjeras deberán presentarse debidamente legalizados o apostillados, según corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de antecedentes expedido en los términos del inciso final del artículo 38 de la Ley N°18.216, que acredite no haber sido condenado por crimen, simple delito o actos de violencia intrafamiliar de competencia de los jueces de familia, de acuerdo con la ley N°20.066, de una antigüedad no superior a 30 días contados desde su emisión.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido acusado por alguna de las conductas punibles establecidas en las leyes y disposiciones que se indican en el artículo 46 N°6 de la Ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado que acredite que la persona no dejó de pertenecer a las Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de una sanción o medida disciplinaria, salvo que los hechos que hayan originado la medida hayan sido desestimados por sentencia judicial, emitido por la institución respectiva. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la Subsecretaría de Prevención de Delito que acredite no haber sido sancionado en los últimos cinco años por alguna de las infracciones gravísimas o graves establecidas en la ley N°21.659.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Declaración jurada simple de no haber sido sancionado conforme a la ley N°19.327, de derechos y deberes en los espectáculos de fútbol profesional, y su reglamento.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado emitido por la institución a la que perteneció, Carabineros de Chile, autoridades marítima o aeronáutica o por el Ministerio de Seguridad Pública, que acredite que la persona no ha ejercido funciones de supervisión, control o fiscalización en seguridad privada durante los últimos dos años anteriores a la solicitud de autorización, si procediere. En caso de no haber pertenecido a las referidas instituciones, deberá adjuntar una declaración jurada que señale lo anterior.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de aprobación de los exámenes de los cursos de capacitación requeridos en la ley N°21.659, emitido por la Subsecretaría de Prevención del Delito, cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Comprender y comunicarse en idioma castellano.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ Certificado de situación militar al día, emitido por la Dirección General de Movilización Nacional (DGMN), cuando corresponda.</li>
                    <li class="requisito-item-componentes" style="text-align: justify;">✓ En caso de ser extranjero, contar con certificado o comprobante de residencia definitiva en Chile emitido por el Servicio Nacional de Migraciones.</li>
                </ul>
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
// OTROS COMPONENTES GENÉRICOS (FALLBACK)
// ==========================================================================
function generarContenidoGenerico(tipo) {
    return `
        <div class="space-y-4">
            <div class="requisito-section-componentes bg-blue-50 border-l-4 border-blue-500">
                <h3 class="font-bold text-blue-900 mb-3">📋 REQUISITOS GENERALES:</h3>
                <p class="text-sm text-gray-700 mb-3">Los requisitos específicos para este componente están en proceso de actualización según la Ley 21.659.</p>
                <p class="text-sm text-gray-700">Por favor, consulte la información oficial en:</p>
                <a href="https://segprivada.minsegpublica.gob.cl/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                    https://segprivada.minsegpublica.gob.cl/
                </a>
            </div>
        </div>
    `;
}

// ==========================================================================
// FUNCIÓN PARA CERRAR MODAL
// ==========================================================================
function cerrarModal() {
    const modal = document.getElementById('modalRequisitos');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================================
// FUNCIÓN PARA DESCARGAR PDF
// ==========================================================================
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
        console.log('PDF descargado:', nombreArchivo);
    });
}


// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalRequisitos');
    
    if (modal) {
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal();
            }
        });
    }
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-requisitos-componentes.active');
            if (activeModal) {
                cerrarModal();
            }
        }
    });
});
