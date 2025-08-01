// Agrega más reglas al mismo objeto 'responses'
Object.assign(responses, {
    "documentacion_directiva": {
        "keywords": ["documentacion", "papeles", "dd.ff."],
        "response": "Para la Directiva de Funcionamiento necesitas: 2 Solicitudes Simples, 1 copia de la Directiva completa, y los requisitos específicos según el tipo de instalación. Puedes descargar todo desde la sección 'Documentación'."
    },
    "plazo_presentacion": {
        "keywords": ["plazo", "cuando presentar", "anticipacion"],
        "response": "La Directiva de Funcionamiento se debe presentar con 15 días hábiles de anticipación."
    },
    "credenciales": {
        "keywords": ["credencial", "tarjeta de identificacion", "tramitar credencial"],
        "response": "Puedes iniciar el trámite de credenciales usando el botón 'Tramitar' en la sección 4. Asegúrate de revisar la Resolución 1480."
    },
    // --- EJEMPLO DE CÓMO AGREGAR UNA LEY ---
    "ley_uso_fuerza": {
        // Palabras clave que un usuario podría usar para preguntar sobre esto.
        "keywords": ["uso de la fuerza", "fuerza", "articulo 15", "cuando puede un guardia usar la fuerza", "ley de seguridad"],
        
        // Respuesta: Es un resumen del artículo, no el texto legal completo.
        // Usa '\n' para saltos de línea y '*' para listas, así es más fácil de leer.
        "response": "Según el Artículo 15 de la Ley de Seguridad Privada, un guardia puede usar la fuerza solo como último recurso y de forma proporcional a la amenaza.\n\nSe permite únicamente para:\n* Proteger la vida o integridad de personas en riesgo inminente.\n* Impedir un delito que se está cometiendo en el momento.\n\nTodo uso de la fuerza debe ser informado inmediatamente a Carabineros."
    },
    // --- NUEVA REGLA AGREGADA PARA EL DECRETO 32 ---
    "decreto_32_info": {
        "keywords": ["decreto 32", "decreto exento 32", "modificacion manual operativo", "decreto 261", "nuevos estandares"],
        "response": "El Decreto Exento 32 (31-ENE-2024) modifica el Manual Operativo de Seguridad Privada. Los cambios principales son:\n* **Requisitos para Guardias:** Se exige educación media completa para nuevos acreditados.\n* **Idoneidad:** Se ajustan los requisitos de idoneidad cívica y moral (antecedentes comerciales).\n* **Uniformes:** Se especifican detalles como el modelo de la gorra.\n* **Vigencia de Directivas:** Las Directivas de Funcionamiento ahora tienen una vigencia de 3 años.\n* **Otros:** Se oficializa el correo electrónico para notificaciones y el pago mediante vale vista."
    }
});
