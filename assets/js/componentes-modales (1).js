// ===== SCRIPT PARA MODALES DE COMPONENTES DE SEGURIDAD =====

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
            "Requisitos varían según materia: abogados para legislación, profesionales de salud para primeros auxilios, etc."
        ],
        adicional: [
            "Periodicidad de acreditación física y psíquica: CADA 4 AÑOS",
            "EXENCIÓN del diplomado: Título de Ingeniero en Seguridad Privada o Magíster en Seguridad Privada",
            "Los exámenes de capacitación finalizan ante Carabineros de Chile",
            "La certificación la otorga la Subsecretaría de Prevención del Delito"
        ]
    },
    portero: {
        titulo: "PORTERO / NOCHERO / RONDÍN",
        definicion: "Personas que cumplen funciones de seguridad privada en recintos. Capacitación especializada y diferenciada de guardias de seguridad.",
        ley: "Arts. 55 y 56 Ley 21.659",
        decreto: "Arts. 97, 98 y 99 Decreto 209",
        especificos: [
            "Curso de FORMACIÓN: 60 horas pedagógicas (se rinde una sola vez)",
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

function mostrarRequisitos(tipo) {
    const modal = document.getElementById('modalRequisitos');
    const titulo = document.getElementById('modalTitulo');
    const contenido = document.getElementById('modalContenido');
    
    const data = requisitosComponentes[tipo];
    
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
        html += `
            <div class="requisito-section-componentes mt-4">
                <h3 class="text-lg font-bold text-gray-800 mb-3">🎯 REQUISITOS ESPECÍFICOS</h3>
        `;
        
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
    
    if (data.adicional && data.adicional.length > 0) {
        html += `
            <div class="requisito-section-componentes mt-4" style="background:#fef3c7; border-left-color:#f59e0b;">
                <h3 class="text-lg font-bold text-gray-800 mb-3">ℹ️ INFORMACIÓN ADICIONAL</h3>
        `;
        
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
    `;
    
    contenido.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    const modal = document.getElementById('modalRequisitos');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalRequisitos');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal();
            }
        });
    }
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
});
