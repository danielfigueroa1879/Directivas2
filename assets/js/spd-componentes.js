// ===== NAVEGACIÓN POR CAPAS: SPD → COMPONENTES → MODAL =====
// Versión con FIX ANDROID - Pantalla en blanco corregida
// VERSIÓN OPTIMIZADA PARA MÓVILES + FIX NAVEGACIÓN A INDEX.HTML
// ✨ ACTUALIZADO: Asignaturas de Capacitación + Requisitos Capacitadores Art. 105

// Requisitos generales del Artículo 46
const requisitosGenerales = [
    "Ser mayor de 18 años",
    "Tener condiciones físicas y psíquicas compatibles con las labores a desempeñar (certificado médico y psicológico del Registro Nacional de Prestadores)",
    "Haber cursado educación media completa o su equivalente",
    "No haber sido condenado por crimen o simple delito",
    "No haber sido condenado por actos de violencia intrafamiliar (Ley N° 20.066)",
    "No estar acusado por delitos de: Ley de Control de Armas (17.798), Tráfico de Drogas (20.000), Terrorismo (18.314), Lavado de Activos (19.913), Seguridad del Estado (12.927), VIF (20.066), ni delitos sexuales o de crimen organizado del Código Penal",
    "No haber dejado de pertenecer a FF.AA., Fuerzas de Orden y Seguridad Pública o Gendarmería por sanciones o medidas disciplinarias",
    "No haber sido sancionado en los últimos 5 años por infracciones gravísimas o graves de la Ley 21.659",
    "No haber sido sancionado conforme a la Ley N° 19.327 (Ley del Fútbol)",
    "No haber ejercido funciones de supervisión, control o fiscalización de seguridad privada como integrante de Carabineros en los últimos 2 años",
    "Aprobar los exámenes de capacitación correspondientes",
    "Comprender y comunicarse en idioma castellano",
    "Si es extranjero: contar con residencia definitiva (Ley N° 21.325)"
];

// ✨ NUEVO: Asignaturas de capacitación por cargo
const asignaturasCapacitacion = {
    vigilantes: {
        titulo: "VIGILANTES PRIVADOS",
        referencia: "Artículo 27 - Decreto 209",
        formacion: "100 horas pedagógicas",
        perfeccionamiento: "40 horas cada 2 años",
        observacion: "AUTORIZADOS PARA PORTAR ARMAS DE FUEGO DENTRO DE UN RECINTO O ÁREA DETERMINADA",
        asignaturas: [
            "Legislación aplicada a la seguridad privada",
            "Respeto y promoción de los derechos humanos",
            "Privacidad y uso de datos personales",
            "Instrucción física",
            "Correcto uso de elementos defensivos y de protección",
            "Primeros auxilios",
            "Prevención de riesgos",
            "Seguridad de instalaciones",
            "Probidad, no discriminación y perspectiva de género",
            "Seguridad electrónica",
            "Sistema de telecomunicaciones",
            "Técnicas de reducción",
            "Conocimiento de arma y tiro, de conformidad al reglamento complementario de la ley N° 17.798, sobre Control de Armas y Elementos Similares, aprobado por decreto supremo N° 83, de 2007, del Ministerio de Defensa Nacional"
        ]
    },
    guardias: {
        titulo: "GUARDIAS DE SEGURIDAD",
        referencia: "Artículo 107 N°1 - Decreto 209",
        formacion: "90 horas pedagógicas",
        perfeccionamiento: "36 horas cada 4 años",
        observacion: "SIN AUTORIZACIÓN PARA PORTAR ARMAS DE FUEGO",
        asignaturas: [
            "Legislación aplicada a seguridad privada",
            "Respeto y promoción de los derechos humanos",
            "Privacidad y uso de datos personales",
            "Instrucción física",
            "Correcto uso de elementos defensivos y de protección",
            "Primeros auxilios",
            "Prevención de riesgos",
            "Seguridad de las instalaciones",
            "Probidad, no discriminación y perspectiva de género",
            "Seguridad electrónica",
            "Sistema de telecomunicaciones",
            "Técnicas de reducción"
        ]
    },
    porteros: {
        titulo: "PORTEROS, NOCHEROS, RONDINES U OTROS DE SIMILAR CARÁCTER",
        referencia: "Artículo 107 N°2 - Decreto 209",
        formacion: "60 horas pedagógicas",
        perfeccionamiento: "30 horas cada 4 años",
        observacion: "SIN AUTORIZACIÓN PARA PORTAR ARMAS DE FUEGO",
        asignaturas: [
            "Legislación aplicada a seguridad privada",
            "Respeto y promoción de los derechos humanos",
            "Privacidad y uso de datos personales",
            "Correcto uso de elementos defensivos y de protección",
            "Primeros auxilios",
            "Prevención de riesgos",
            "Seguridad de las instalaciones",
            "Probidad, no discriminación y perspectiva de género"
        ]
    }
};

// ✨ NUEVO: Requisitos para capacitadores (Artículo 105 Decreto 209)
const requisitosCapacitadores = [
    {
        numero: "1",
        asignatura: "Legislación aplicada a la seguridad privada",
        requisitos: "Deberán ser licenciados en ciencias jurídicas y sociales o contar con el título de abogado. Podrá eximirse de la obligación de contar con diplomado en materias inherentes a seguridad privada o gestión de seguridad empresarial señalado en el artículo precedente, si se acreditan dos o más años de experiencia profesional en la materia."
    },
    {
        numero: "2",
        asignatura: "Respeto y promoción de los derechos humanos",
        requisitos: "Deberán ser licenciados en ciencias jurídicas y sociales o contar con el título de abogado."
    },
    {
        numero: "3",
        asignatura: "Privacidad y uso de datos personales",
        requisitos: "Deberán ser licenciados en ciencias jurídicas y sociales o contar con el título de abogado. Asimismo, podrán impartir esta asignatura todos los profesionales del área informática que posean título profesional de educación superior de una carrera de, a lo menos, ocho semestres de duración."
    },
    {
        numero: "4",
        asignatura: "Correcto uso de elementos defensivos",
        requisitos: "Todos aquellos Oficiales y Suboficiales de las Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o de Gendarmería de Chile que hayan obtenido una certificación oficial equivalente a un título profesional o técnico de nivel superior de conformidad a la normativa correspondiente. Asimismo, deberán acreditar el cumplimiento de los cursos respectivos de defensa personal a través de la presentación de la malla curricular vigente a la época en que los aprobaron."
    },
    {
        numero: "5",
        asignatura: "Primeros auxilios",
        requisitos: "Haber obtenido un título profesional o técnico de nivel superior en alguna carrera del área de la salud, de conformidad a la normativa vigente. Estos profesionales y técnicos estarán exceptuados de cumplir con el diplomado en materias inherentes a seguridad privada o gestión de seguridad empresarial, que señala el artículo anterior."
    },
    {
        numero: "6",
        asignatura: "Prevención de riesgos",
        requisitos: "Para este tipo de cursos se deberá contar con el título profesional o técnico de nivel superior en prevención de riesgos con la correspondiente resolución de la Secretaría Regional Ministerial de Salud."
    },
    {
        numero: "7",
        asignatura: "Probidad, no discriminación y perspectiva de género",
        requisitos: "Todos aquellos profesionales universitarios que cuenten con las respectivas aprobaciones de cursos de postgrado en los grados de magister o diplomados en cursos especiales sobre las materias indicadas."
    },
    {
        numero: "8",
        asignatura: "Seguridad de instalaciones",
        requisitos: "Para este tipo de cursos se deberá contar con el título profesional o técnico de nivel superior en prevención de riesgos con la correspondiente resolución de la Secretaría Regional Ministerial de Salud."
    },
    {
        numero: "9",
        asignatura: "Seguridad electrónica",
        requisitos: "Será necesario contar con el título profesional o técnico de nivel superior en electrónica."
    },
    {
        numero: "10",
        asignatura: "Sistema de telecomunicaciones",
        requisitos: "Poseer el título profesional de ingeniero o técnico nivel superior en telecomunicaciones."
    },
    {
        numero: "11",
        asignatura: "Técnicas de reducción",
        requisitos: "Todos aquellos Oficiales y Suboficiales de las Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o Gendarmería de Chile que hayan obtenido una certificación oficial equivalente a un título profesional o técnico de nivel superior, de conformidad a la normativa correspondiente. Asimismo, deben acreditar los cursos respectivos de defensa personal a través de la presentación de la malla curricular vigente a la época en que los aprobaron. Excepcionalmente, podrá impartir dicho curso el deportista experto en artes defensivas, debidamente acreditadas."
    },
    {
        numero: "12",
        asignatura: "Instrucción física",
        requisitos: "Para este tipo de cursos, se deberá contar con una licenciatura en educación física o título técnico en materias afines otorgado por entidades reconocidas por el Ministerio de Educación. Estos profesionales estarán exceptuados de cumplir con el diplomado en materias inherentes a seguridad privada o gestión de seguridad empresarial, que señala el artículo anterior."
    },
    {
        numero: "13",
        asignatura: "Conocimiento de arma y tiro",
        requisitos: "Instructor o experto en manejo y uso de armas y tiro, con un mínimo de cinco años de experiencia; así como oficiales y suboficiales de las Fuerzas Armadas y de Orden y Seguridad Pública o Gendarmería de Chile egresados de sus respectivas escuelas. En cada proceso de acreditación, todos y sin exclusión, deberán rendir un examen práctico ante la autoridad fiscalizadora competente."
    }
];

// Base de datos de requisitos por componente
const requisitosComponentes = {
    vigilante: {
        titulo: "VIGILANTE PRIVADO",
        definicion: "Persona que realiza labores de protección a personas y bienes dentro de un recinto o área determinada, autorizado para portar armas, credencial y uniforme.",
        ley: "Arts. 25 y 26 Ley 21.659",
        decreto: "Arts. 26 y 27 Decreto 209",
        especificos: [
            "Haber cumplido con el DS N° 83/2007 del Ministerio de Defensa sobre Control de Armas (certificado de la DGMN)",
            "No haber sido declarado con invalidez de 2ª o 3ª clase por CAPREDENA o DIPRECA",
            "Curso de FORMACIÓN: 100 horas pedagógicas (se rinde una sola vez)",
            "Curso de PERFECCIONAMIENTO: 40 horas cada 2 años"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 1 AÑO",
            "Debe portar arma de fuego durante la jornada de trabajo",
            "Solo puede portar armas dentro del recinto o área autorizada",
            "Certificación válida por 2 años"
        ]
    },
    jefe: {
        titulo: "JEFE DE SEGURIDAD",
        definicion: "Responsable de la organización, dirección, administración, control y gestión de recursos destinados a la protección de personas y bienes. Coordina con autoridad fiscalizadora y SPD.",
        ley: "Art. 23 Ley 21.659",
        decreto: "Arts. 23 y 24 Decreto 209",
        especificos: [
            "Título profesional de mínimo 8 semestres (educación superior estatal o reconocida)",
            "Curso de especialidad en seguridad o materias afines de mínimo 400 horas académicas",
            "No haber sido declarado con invalidez de 2ª o 3ª clase por CAPREDENA o DIPRECA",
            "Si trabaja en entidad obligada con sistema de vigilancia privada: debe cumplir requisitos de vigilante privado"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "Ex-integrantes de FF.AA. o Carabineros pueden eximirse de algunas materias según malla curricular",
            "Se reconocen cursos previos de seguridad privada para completar las 400 horas"
        ]
    },
    encargado: {
        titulo: "ENCARGADO DE SEGURIDAD",
        definicion: "Persona designada para cada recinto, oficina, agencia o sucursal que vela por el cumplimiento de las medidas del estudio de seguridad, coordinando con jefe de seguridad y autoridad fiscalizadora.",
        ley: "Art. 24 Ley 21.659",
        decreto: "Art. 25 Decreto 209",
        especificos: [
            "Cumplir todos los mismos requisitos que los vigilantes privados",
            "Curso relacionado con seguridad o materias afines de mínimo 120 horas académicas"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "Se relaciona con la autoridad fiscalizadora para efectos de la ley"
        ]
    },
    guardia: {
        titulo: "GUARDIA DE SEGURIDAD",
        definicion: "Persona que realiza labores de protección a personas y bienes dentro de recinto o área determinada, SIN autorización para portar armas de fuego. Debe usar uniforme y credencial.",
        ley: "Arts. 50, 51, 52, 53 y 54 Ley 21.659",
        decreto: "Arts. 87, 88 y 89 Decreto 209",
        especificos: [
            "Curso de FORMACIÓN: 90 horas pedagógicas (se rinde una sola vez)",
            "Curso de PERFECCIONAMIENTO: 36 horas cada 4 años (entidades no obligadas)",
            "Curso de ESPECIALIZACIÓN: 36 horas cada 4 años (nivel riesgo medio o alto)"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 2 AÑOS",
            "PROHIBICIÓN: NO puede portar armas de fuego (Art. 56 Ley 21.659)",
            "Puede usar elementos defensivos autorizados por SPD (no armas de fuego)",
            "Debe usar uniforme color negro según especificaciones del Decreto 209"
        ]
    },
    supervisor: {
        titulo: "SUPERVISOR DE SEGURIDAD PRIVADA",
        definicion: "Persona que efectúa labores de supervigilancia y control de recursos humanos, materiales, tecnológicos o procedimientos destinados a la protección de personas y bienes.",
        ley: "No tiene artículo específico en Ley 21.659",
        decreto: "Art. 108 Decreto 209",
        especificos: [
            "OPCIÓN 1: Curso de supervisión y control de 120 horas",
            "OPCIÓN 2: Si tiene curso de guardias (90h), requiere 30 horas adicionales de supervisión",
            "OPCIÓN 3: Si tiene curso de vigilantes (100h), requiere 20 horas adicionales de supervisión",
            "OPCIÓN 4: Si tiene título técnico (4 semestres mín.) o profesional (8 semestres mín.), requiere 20 horas de supervisión",
            "IMPORTANTE: Si trabaja en entidad obligada con sistema vigilancia privada, debe cumplir requisitos de vigilante privado"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "Los cursos deben haberse aprobado dentro de los 4 años anteriores a la postulación"
        ]
    },
    asesor: {
        titulo: "ASESOR DE SEGURIDAD",
        definicion: "Persona natural que asesora sobre seguridad privada, propone medidas para neutralizar vulnerabilidades. Puede elaborar estudios y planes de seguridad.",
        ley: "No tiene artículo específico en Ley 21.659",
        decreto: "Art. 109 Decreto 209",
        especificos: [
            "Título profesional relacionado con el área de seguridad o materias afines",
            "Diplomado en seguridad privada o gestión de seguridad empresarial de mínimo 400 horas académicas (educación superior reconocida)"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada",
            "Puede elaborar estudios de seguridad y planes de seguridad para entidades obligadas"
        ]
    },
    capacitador: {
        titulo: "CAPACITADOR",
        definicion: "Profesionales y técnicos autorizados por SPD dedicados a la instrucción, formación, capacitación y perfeccionamiento de vigilantes privados, guardias, porteros, nocheros, rondines y conserjes.",
        ley: "Art. 59 Ley 21.659",
        decreto: "Arts. 104 y 105 Decreto 209",
        especificos: [
            "Nivel de educación profesional y técnico en materias de seguridad privada según asignatura a impartir",
            "Diplomado en seguridad privada o gestión de seguridad empresarial (salvo excepciones por asignatura específica)",
            "Los requisitos específicos varían según la asignatura a impartir (ver detalle completo en Artículo 105)"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada",
            "Los exámenes de capacitación finalizan ante Carabineros de Chile",
            "La certificación la otorga la Subsecretaría de Prevención del Delito"
        ],
        // ✨ NUEVO: Requisitos especiales por asignatura (Art. 105)
        requisitosEspecialesCapacitador: requisitosCapacitadores
    },
    portero: {
        titulo: "PORTERO / NOCHERO / RONDÍN",
        definicion: "Personas que cumplen funciones de seguridad privada en recintos. Capacitación especializada y diferenciada de guardias de seguridad.",
        ley: "Arts. 55 y 56 Ley 21.659",
        decreto: "Arts. 97, 98 y 99 Decreto 209",
        especificos: [
            "Curso de FORMACIÓN: 60 horas pedagógicas",
            "Curso de PERFECCIONAMIENTO: 30 horas cada 4 años"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "PROHIBICIÓN: NO pueden usar armas de fuego (Art. 56 Ley 21.659)",
            "Seguro de vida obligatorio: mínimo 132 UF (contratado por empleador)",
            "Los conserjes pueden someterse voluntariamente a este régimen"
        ]
    },
    encargadoArmas: {
        titulo: "ENCARGADO DE ARMAS",
        definicion: "Persona que mantiene a resguardo las armas de fuego de la entidad obligada y realiza entrega/recepción a vigilantes privados al inicio/término de jornada.",
        ley: "Art. 26 (inciso 5°) Ley 21.659",
        decreto: "Art. 30 Decreto 209",
        especificos: [
            "Cumplir todos los mismos requisitos establecidos para los vigilantes privados"
        ],
        adicional: [
            "Puede ser la misma persona que el encargado de seguridad",
            "Responsable del registro diario de armas según Art. 104 del DS 83/2007",
            "Debe guardar armas y municiones en lugar cerrado con garantías de seguridad"
        ]
    },
    tecnico: {
        titulo: "TÉCNICO EN SEGURIDAD PRIVADA",
        definicion: "Persona que proporciona, instala, mantiene, repara y/o controla equipos, dispositivos y sistemas de seguridad electrónica conectados a centrales receptoras.",
        ley: "No tiene artículo específico en Ley 21.659",
        decreto: "Art. 110 Decreto 209",
        especificos: [
            "Certificado de título profesional o técnico en la materia de seguridad electrónica"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "Trabaja con sistemas conectados a centrales receptoras de alarmas",
            "Autorizado por la Subsecretaría de Prevención del Delito"
        ]
    },
    operador: {
        titulo: "OPERADOR DE CÁMARAS DE TELEVIGILANCIA Y ALARMAS",
        definicion: "Persona que opera en centros de control o videovigilancia mediante CCTV o alarmas para detectar riesgos y coordinar con autoridades.",
        ley: "No tiene artículo específico en Ley 21.659",
        decreto: "Art. 111 Decreto 209",
        especificos: [
            "Certificado de capacitación en el área de televigilancia y alarmas"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "Trabaja en centros de control o videovigilancia",
            "Coordina con autoridad policial para neutralizar amenazas"
        ]
    },
    instalador: {
        titulo: "INSTALADOR TÉCNICO",
        definicion: "Persona que instala sistemas de CCTV y/o alarmas para el funcionamiento de instalaciones de seguridad.",
        ley: "No tiene artículo específico en Ley 21.659",
        decreto: "Art. 112 Decreto 209",
        especificos: [
            "Certificado de capacitación en el área de instalación de sistemas de seguridad"
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "Instala sistemas de circuito cerrado de televisión y alarmas",
            "Autorizado por la Subsecretaría de Prevención del Delito"
        ]
    }
};

// ===== FUNCIONES DE NAVEGACIÓN =====

// Función para volver al index.html sin pantalla en blanco (FIX MÓVILES)
function volverAlIndex(event) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        event.preventDefault();
        cerrarModalVisualmente();
        ocultarComponentes();
        setTimeout(() => {
            window.location.replace('index.html');
        }, 50);
    }
}

// Función para mostrar la vista de componentes (desde SPD)
function mostrarComponentes() {
    const vistaPrincipal = document.getElementById('vistaPrincipal');
    const vistaComponentes = document.getElementById('vistaComponentes');
    
    if (!vistaComponentes) return;
    
    if (vistaPrincipal) vistaPrincipal.style.display = 'none';
    vistaComponentes.classList.add('active');
    window.scrollTo(0, 0);
    
    if (!history.state || history.state.vista !== 'componentes') {
        history.pushState({ vista: 'componentes' }, "", "#componentes");
    }
}

// Función para volver a la vista SPD (desde componentes)
function volverASPD() {
    if (history.state && history.state.vista === 'componentes') {
        history.back();
    } else {
        ocultarComponentes();
    }
}

// Función para ocultar vista de componentes (visual)
function ocultarComponentes() {
    const vistaPrincipal = document.getElementById('vistaPrincipal');
    const vistaComponentes = document.getElementById('vistaComponentes');
    
    if (vistaComponentes) {
        vistaComponentes.classList.remove('active');
    }
    
    if (vistaPrincipal) {
        vistaPrincipal.style.display = '';
    }
    
    window.scrollTo(0, 0);
    
    if (window.location.hash === '#componentes') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
}

// ===== ✨ NUEVA FUNCIÓN: MOSTRAR ASIGNATURAS DE CAPACITACIÓN =====
function mostrarAsignaturas() {
    const modal = document.getElementById('modalRequisitos');
    if (!modal) return;
    
    const titulo = document.getElementById('modalTitulo');
    const contenido = document.getElementById('modalContenido');
    
    titulo.textContent = "ASIGNATURAS DE CAPACITACIÓN";
    
    let html = `
        <div class="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p class="text-sm text-gray-700 font-semibold">
                📚 Estas son las asignaturas que deben aprobarse según el Decreto 209 para obtener la certificación correspondiente
            </p>
        </div>
    `;
    
    // Vigilantes
    html += generarSeccionAsignaturas('vigilantes');
    
    // Guardias
    html += generarSeccionAsignaturas('guardias');
    
    // Porteros
    html += generarSeccionAsignaturas('porteros');
    
    html += `
        <div class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p class="text-sm text-gray-700">
                <strong>⚠️ Nota Importante:</strong> Las asignaturas de <strong>arma y tiro, técnicas de reducción y primeros auxilios</strong> deben ser <strong>siempre presenciales</strong>. Las demás pueden ser telemáticas o presenciales.
            </p>
        </div>
    `;
    
    contenido.innerHTML = html;
    
    modal.style.display = 'flex';
    modal.style.zIndex = '9999';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.scrollTop = 0;
    }, 50);
}

function generarSeccionAsignaturas(tipo) {
    const data = asignaturasCapacitacion[tipo];
    
    let html = `
        <div class="requisito-section-componentes mb-6" style="background:#f8fafc; border-left:4px solid #0071e3;">
            <h3 class="text-xl font-bold text-gray-900 mb-2">${data.titulo}</h3>
            <div class="mb-3 flex flex-wrap gap-2">
                <span class="badge-componentes badge-decreto-componentes">${data.referencia}</span>
                <span class="badge-componentes" style="background:#10b981; color:white;">${data.formacion}</span>
                <span class="badge-componentes" style="background:#f59e0b; color:white;">${data.perfeccionamiento}</span>
            </div>
            <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p class="text-sm font-bold text-gray-800">${data.observacion}</p>
            </div>
    `;
    
    data.asignaturas.forEach((asignatura, index) => {
        html += `
            <div class="requisito-item-componentes" style="background:#ffffff;">
                <div class="requisito-numero-componentes" style="background:#0071e3;">${index + 1}</div>
                <div class="flex-1 text-sm text-gray-700">${asignatura}</div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    return html;
}

// ===== FUNCIONES DEL MODAL =====

function getMainContainer() {
    const byId = document.getElementById('main-content');
    if (byId) return byId;
    
    const bodyChildren = Array.from(document.body.children).filter(el => 
        !el.classList.contains('modal-requisitos') && 
        !el.classList.contains('modal-requisitos-componentes') &&
        el.id !== 'modalRequisitos' &&
        el.tagName !== 'SCRIPT' && 
        el.tagName !== 'STYLE' &&
        el.tagName !== 'FOOTER' &&
        !el.classList.contains('fixed')
    );
    
    if (bodyChildren.length > 0) {
        return bodyChildren.reduce((prev, current) => 
            (current.offsetHeight > prev.offsetHeight) ? current : prev
        );
    }
    
    return null;
}

// Función de renderizado del modal
function renderizarContenidoModal(tipo) {
    const modal = document.getElementById('modalRequisitos');
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    
    const titulo = document.getElementById('modalTitulo');
    const contenido = document.getElementById('modalContenido');
    const data = requisitosComponentes[tipo];
    
    if (!data) {
        console.error('Datos no encontrados para:', tipo);
        return;
    }
    
    titulo.textContent = data.titulo;
    
    let html = `
        <div class="mb-4">
            <h3 class="text-lg font-bold text-gray-800 mb-2">📖 Definición</h3>
            <p class="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">${data.definicion}</p>
        </div>
        
        <div class="mb-4 flex flex-wrap gap-2">
            <span class="badge-componentes badge-ley-componentes">${data.ley}</span>
            <span class="badge-componentes badge-decreto-componentes">${data.decreto}</span>
        </div>
        
        <div class="requisito-section-componentes">
            <h3 class="text-lg font-bold text-gray-800 mb-3">✅ REQUISITOS GENERALES (Artículo 46 Ley 21.659)</h3>
            <p class="text-sm text-gray-600 mb-3 italic">Estos requisitos aplican a TODAS las personas naturales que ejercen funciones de seguridad privada:</p>
    `;
    
    requisitosGenerales.forEach((req, index) => {
        html += `
            <div class="requisito-item-componentes">
                <div class="requisito-numero-componentes">${index + 1}</div>
                <div class="flex-1 text-sm text-gray-700">${req}</div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    if (data.especificos && data.especificos.length > 0) {
        html += `<div class="requisito-section-componentes mt-4">
            <h3 class="text-lg font-bold text-gray-800 mb-3">🎯 REQUISITOS ESPECÍFICOS</h3>`;
        
        data.especificos.forEach((req, index) => {
            html += `
                <div class="requisito-item-componentes">
                    <div class="requisito-numero-componentes" style="background:#f59e0b;">${index + 1}</div>
                    <div class="flex-1 text-sm text-gray-700"><strong>${req}</strong></div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    // ✨ NUEVO: Requisitos especiales para capacitadores (Art. 105)
    if (tipo === 'capacitador' && data.requisitosEspecialesCapacitador) {
        html += `
            <div class="requisito-section-componentes mt-4" style="background:#eff6ff; border-left-color:#0071e3;">
                <h3 class="text-lg font-bold text-gray-800 mb-3">📋 REQUISITOS ESPECIALES POR ASIGNATURA (Artículo 105 Decreto 209)</h3>
                <p class="text-sm text-gray-600 mb-3 italic">Los capacitadores deben cumplir requisitos adicionales según la asignatura que impartan:</p>
        `;
        
        data.requisitosEspecialesCapacitador.forEach((item) => {
            html += `
                <div class="requisito-item-componentes" style="background:#ffffff; border:1px solid #e2e8f0;">
                    <div class="requisito-numero-componentes" style="background:#0071e3; min-width:3rem;">${item.numero}</div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-gray-900 mb-1">${item.asignatura}</p>
                        <p class="text-sm text-gray-700" style="text-align: justify;">${item.requisitos}</p>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    if (data.adicional && data.adicional.length > 0) {
        html += `<div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
            <h3 class="text-lg font-bold text-gray-800 mb-3">ℹ️ INFORMACIÓN ADICIONAL</h3>`;
        
        data.adicional.forEach((info) => {
            html += `
                <div class="requisito-item-componentes" style="background:#fefce8;">
                    <div class="text-2xl">💡</div>
                    <div class="flex-1 text-sm text-gray-700">${info}</div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    html += `
        <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p class="text-sm text-gray-700">
                <strong>✓ Autorización:</strong> Todos los componentes requieren autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> según Art. 85 Decreto 209.
            </p>
        </div>
        
        <!-- Botón de descarga PDF -->
        <div class="mt-6 text-center">
            <button onclick="descargarModalPDF('${tipo}')" class="btn-pdf-modal" style="display: inline-flex; align-items: center; gap: 0.5rem; background-color: #dc2626; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.3s; border: none; box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1.25rem; height: 1.25rem;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Descargar Requisitos en PDF</span>
            </button>
        </div>
    `;
    
    contenido.innerHTML = html;
    
    modal.style.display = 'flex';
    modal.style.zIndex = '9999';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.scrollTop = 0;
    }, 50);
    
    console.log('Modal abierto:', tipo);
}

// Función de apertura del modal
function mostrarRequisitos(tipo) {
    if (!history.state || history.state.tipo !== tipo) {
        history.pushState({ modalOpen: true, tipo: tipo, vista: 'componentes' }, "", `#${tipo}`);
    }
    renderizarContenidoModal(tipo);
}

// Función de cierre visual del modal
function cerrarModalVisualmente() {
    const modal = document.getElementById('modalRequisitos');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
    document.body.style.overflow = '';
    console.log('Modal cerrado');
}

// Función de cierre interactiva
function cerrarModal() {
    if (history.state && history.state.modalOpen) {
        history.back();
    } else {
        cerrarModalVisualmente();
    }
}

// ===== MANEJADOR DEL HISTORIAL (POPSTATE) =====
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.modalOpen) {
        renderizarContenidoModal(event.state.tipo);
    } else if (event.state && event.state.vista === 'componentes') {
        cerrarModalVisualmente();
        const vistaComponentes = document.getElementById('vistaComponentes');
        const vistaPrincipal = document.getElementById('vistaPrincipal');
        if (vistaComponentes) {
            vistaComponentes.classList.add('active');
        }
        if (vistaPrincipal) {
            vistaPrincipal.style.display = 'none';
        }
    } else {
        cerrarModalVisualmente();
        ocultarComponentes();
    }
});

// Manejador PAGESHOW (para caché de navegación)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        cerrarModalVisualmente();
        ocultarComponentes();
        
        const modal = document.getElementById('modalRequisitos');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
        
        window.scrollTo(0, 0);
    }
});

// Función para descargar el modal en PDF
function descargarModalPDF(tipo) {
    // Obtener el título del modal
    const titulo = document.getElementById('modalTitulo').textContent;
    const contenido = document.getElementById('modalContenido');
    
    // Crear un contenedor temporal con el contenido
    const contenedorTemp = document.createElement('div');
    contenedorTemp.style.padding = '10px';
    contenedorTemp.style.backgroundColor = 'white';
    contenedorTemp.style.margin = '0';
    contenedorTemp.style.width = '100%';
    
    // Agregar título
    const tituloElement = document.createElement('h1');
    tituloElement.textContent = titulo;
    tituloElement.style.fontSize = '22px';
    tituloElement.style.fontWeight = 'bold';
    tituloElement.style.marginTop = '0';
    tituloElement.style.marginBottom = '15px';
    tituloElement.style.color = '#1f2937';
    tituloElement.style.paddingTop = '0';
    contenedorTemp.appendChild(tituloElement);
    
    // Clonar el contenido del modal
    const contenidoClone = contenido.cloneNode(true);
    
    // Ocultar botón de descarga en el clon
    const botonPDF = contenidoClone.querySelector('.btn-pdf-modal');
    if (botonPDF) {
        botonPDF.style.display = 'none';
    }
    
    // Eliminar márgenes superiores innecesarios del contenido clonado
    contenidoClone.style.marginTop = '0';
    contenidoClone.style.paddingTop = '0';
    
    // Ajustar el primer elemento hijo para eliminar margen superior
    if (contenidoClone.firstElementChild) {
        contenidoClone.firstElementChild.style.marginTop = '0';
        contenidoClone.firstElementChild.style.paddingTop = '0';
    }
    
    contenedorTemp.appendChild(contenidoClone);
    
    // Generar nombre de archivo
    const nombreArchivo = `OS10-Requisitos-${titulo.replace(/\s+/g, '-')}.pdf`;
    
    // Configuración del PDF - Márgenes reducidos
    const opciones = {
        margin: [10, 10, 10, 10],
        filename: nombreArchivo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true,
            backgroundColor: '#ffffff',
            scrollY: 0,
            scrollX: 0,
            windowHeight: contenidoClone.scrollHeight
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Generar y descargar PDF
    html2pdf().set(opciones).from(contenedorTemp).save().then(() => {
        console.log('PDF descargado:', nombreArchivo);
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalRequisitos');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('#modalRequisitos.active, .modal-requisitos.active, .modal-requisitos-componentes.active');
            if (activeModal) {
                cerrarModal();
            }
        }
    });

    if (history.state && history.state.modalOpen && history.state.tipo) {
        mostrarComponentes();
        renderizarContenidoModal(history.state.tipo);
    } else if (history.state && history.state.vista === 'componentes') {
        mostrarComponentes();
    } else if (window.location.hash === '#componentes') {
        mostrarComponentes();
    } else {
        cerrarModalVisualmente();
        ocultarComponentes();
    }
    
    setTimeout(() => {
        if (!history.state || (!history.state.modalOpen && history.state.vista !== 'componentes')) {
            cerrarModalVisualmente();
            ocultarComponentes();
        }
    }, 500);
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const modal = document.getElementById('modalRequisitos');
        if (!modal || (!modal.classList.contains('active') && window.getComputedStyle(modal).display === 'none')) {
            cerrarModalVisualmente();
        }
    }
});
