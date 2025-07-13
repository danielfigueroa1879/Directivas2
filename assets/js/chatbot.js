/**
 * chatbot.js
 * * This module handles all the functionality for the floating chatbot widget.
 * It manages the UI, state, and communication with the Gemini API.
 * It now includes a system for predefined responses and Markdown to HTML conversion.
 */

// --- DOM Element Selection ---
const chatPopup = document.getElementById('chat-popup');
const chatToggleButton = document.getElementById('chat-toggle-button');
const openIcon = document.getElementById('chat-open-icon');
const closeIcon = document.getElementById('chat-close-icon');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatBackdrop = document.getElementById('chat-backdrop'); // <-- Nuevo

// --- Predefined Responses ---
// Aquí puedes "entrenar" al bot con respuestas instantáneas.
// Las 'claves' son arrays de palabras clave que activarán la respuesta.
const predefinedResponses = {
    'saludo': {
        keywords: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos'],
        response: '¡Hola! Soy el asistente virtual de OS10. ¿En qué puedo ayudarte hoy?'
    },
    'gracias': {
        keywords: ['gracias', 'muchas gracias', 'te pasaste', 'agradecido'],
        response: '¡De nada! Si tienes otra consulta, no dudes en preguntar.'
    },
    'costo_credencial': {
        keywords: ['costo credencial', 'cuanto vale la credencial'],
        response: 'El costo para la credencial es de $5.890 CLP y se debe pagar mediante un Vale Vista a nombre de "ZONA DE CARABINEROS SEGURIDAD PRIVADA CONTROL DE ARMAS Y EXPLOSIVOS".'
    },
    'contacto': {
        keywords: ['contacto', 'teléfono', 'llamar', 'numero'],
        response: 'El número de teléfono de la oficina OS10 para consultas es 512651024.'
    },
    'creador': {
        keywords: ['quien te creo', 'creador', 'desarrollador', 'programador'],
        response: 'Fui desarrollado por Daniel Figueroa Ch., Ingeniero en Informática. Puedes encontrar su información en el pie de página del sitio.'
    },
    'horario': {
        keywords: ['horario', 'atencion', 'atienden', 'dirección', 'ubicación', 'donde estan', 'oficina'],
        response: '🤖 👉🏼 <b>OS10 Coquimbo</b><br>Lunes a Jueves: 09:00 a 13:00 hrs.<br>📍 Cienfuegos 180, La Serena.<br>📞 Fono: 512651024<br><a href="https://maps.app.goo.gl/QUhujWbTF1FjDA7E6" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver en Google Maps</a>'
    },
    'infracciones': {
        keywords: ['infraccion', 'infracciones', 'multa', 'multas', 'sancion', 'sanciones', 'articulo 13', 'articulo 15', 'articulo 18'],
        response: 'Las infracciones más comunes del Decreto 93 son:<br>🔹 <b>Art. 13:</b> Guardia sin curso OS10 vigente.<br>🔹 <b>Art. 15:</b> Sin Directiva de Funcionamiento aprobada.<br>🔹 <b>Art. 18:</b> Guardia sin portar su credencial.<br><br>⚠️ <b>Importante:</b> La infracción se cursa a la empresa de seguridad, no directamente al guardia.'
    },
    'vigencia_credencial': {
        keywords: ['vigencia', 'vencimiento', 'cuanto dura', 'validez', 'expira', 'duracion'],
        response: '✅ Todas las credenciales para los componentes del sistema de seguridad privada tienen una <b>vigencia de 3 años.</b><br><br>Esto incluye: Guardia de Seguridad, Vigilante Privado, Asesor, Capacitador, Encargado de Seguridad, Jefe de Seguridad, Supervisor, Operador CCTV y Operador de Cajero Automático.<br><br><b>Importante:</b> La vigencia de la credencial está directamente ligada a la vigencia del curso OS10 correspondiente.'
    },
    'decretos_leyes': {
        keywords: ['decreto', 'ley', 'normativa', 'legal', 'reglamento', 'dfl', '3.607', 'decreto 93', 'decreto 1814', 'decreto 32'],
        response: '🤖 👉🏼 <b>NORMATIVA VIGENTE</b><br><br>' +
                  '<b>➢ DECRETO LEY 3.607:</b><br><a href="https://www.bcn.cl/leychile/navegar?idNorma=7193" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver Decreto Ley 3.607</a><br><br>' +
                  '<b>➢ DECRETO 93:</b><br><a href="https://www.bcn.cl/leychile/navegar?idNorma=9081" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver Decreto 93</a><br><br>' +
                  '<b>➢ DECRETO 1814:</b><br><a href="https://www.bcn.cl/leychile/navegar?idNorma=1069299" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver Decreto 1814</a><br><br>' +
                  '<b>➢ DECRETO 32 (Modifica D. 261):</b><br><a href="https://www.bcn.cl/leychile/navegar?idNorma=1200633" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver Decreto 32</a>'
    },
    'nuevos_valores': {
        keywords: ['valores', 'valor plan', 'valor curso', 'perfeccionamiento', 'formación'],
        response: '🤖🧙🏻‍♂️ <b>VALORES 2DO. SEMESTRE 2025</b><br><br>' +
                  '1.- <b>CREDENCIAL:</b> <a href="https://dal5.short.gy/val" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/val</a><br>' +
                  '2.- <b>CRED. EMPRESA:</b> <a href="https://dal5.short.gy/C.emp" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/C.emp</a><br>' +
                  '3.- <b>CURSO FORMACIÓN:</b> <a href="https://dal5.short.gy/Form" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/Form</a><br>' +
                  '4.- <b>CURSO PERFECC:</b> <a href="https://dal5.short.gy/BjzkHI" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/BjzkHI</a><br>' +
                  '5.- <b>VALOR PLAN:</b> <a href="https://os10.short.gy/Pl4n" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">os10.short.gy/Pl4n</a>'
    },
    'pagina_credencial': {
        keywords: ['página credencial', 'pagina de credenciales', 'link credencial'],
        response: '🤖 <b>Página Credencial Empresa / Independiente</b><br><a href="https://dal5.short.gy/C√" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/C√</a>'
    },
    'ciberseguridad': {
        keywords: ['ciberseguridad', 'deepfake', 'antivirus', 'osint', 'csirt', 'iso', 'ley 21459', 'ley 21663', 'ciber'],
        response: '🤖🧙🏻‍♂️ <b>CIBERSEGURIDAD</b><br>' +
                  '<b>➢ ¿Qué Hacer?:</b> <a href="https://dal5.short.gy/SIyeI3" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/SIyeI3</a><br>' +
                  '<b>➢ ¿Cómo notificar?:</b> <a href="https://dal5.short.gy/GFxMgX" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/GFxMgX</a><br>' +
                  '<b>➢ Empresa de Ciberseguridad:</b> <a href="https://dal5.short.gy/C25" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/C25</a><br>' +
                  '<b>➢ Verificar deepfake:</b> <a href="https://prepro.autoverifai.com/" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">prepro.autoverifai.com</a><br><br>' +
                  '🧙🏻‍♂️ <b>HERRAMIENTAS CIBERSEGURIDAD</b> 👇🏽<br>' +
                  '<b>➢ Antivirus Online:</b> <a href="https://dal5.short.gy/Anti" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/Anti</a><br>' +
                  '<b>➢ Sociales:</b> <a href="https://dal5.short.gy/Herr" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/Herr</a><br>' +
                  '<b>➢ Osint:</b> <a href="https://dal5.short.gy/Os" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/Os</a><br>' +
                  '<b>➢ Csirt:</b> <a href="http://csirt.gob.cl" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">csirt.gob.cl</a><br>' +
                  '<b>➢ Fono Incid.Ciberseg:</b> 1510<br>' +
                  '<b>➢ Brigada Ciberseguridad PDI:</b> +56227080658<br>' +
                  '<b>➢ ISO 27001:</b> <a href="https://dal5.short.gy/Iso" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/Iso</a><br>' +
                  '<b>➢ ISO 27031:</b> <a href="https://dal5.short.gy/1" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/1</a><br>' +
                  '<b>➢ Ley 21459:</b> <a href="https://dal5.short.gy/Ley" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/Ley</a><br>' +
                  '<b>➢ Ley 21663 Marco:</b> <a href="https://www.bcn.cl/leychile/navegar?i=1202434" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">www.bcn.cl/leychile/...</a><br>' +
                  '<b>➢ VALORES INFRACCIONES:</b> <a href="https://dal5.short.gy/Vc" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/Vc</a><br>' +
                  '<b>➢ DFL:</b> <a href="https://dal5.short.gy/FL" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/FL</a><br>' +
                  '<b>➢ Buscar Fono:</b> <a href="https://www.truecaller.com/es-la" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">www.truecaller.com/es-la</a><br>' +
                  '<b>➢ Telegram Bot:</b> <a href="https://t.me/TruecallerR0Bot" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">t.me/TruecallerR0Bot</a>'
    },
    // --- Respuestas específicas para cada tipo de credencial ---
    'credencial_asesor': {
        keywords: ['credencial asesor', 'solicitud asesor', 'formulario asesor'],
        response: 'Aquí tienes el documento para la <b>Credencial de Asesor (2do Semestre 2025)</b>:<br><a href="SOLIC. CREDENCIAL ASESOR 1 SEMESTRE 2025.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">› Descargar Solicitud Asesor</a>'
    },
    'credencial_capacitador': {
        keywords: ['credencial capacitador', 'solicitud capacitador', 'formulario capacitador'],
        response: 'Aquí tienes el documento para la <b>Credencial de Capacitador (2do Semestre 2025)</b>:<br><a href="SOLIC. CREDENCIAL CAPACITADOR 1ER. SEMESTRE 2025.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">› Descargar Solicitud Capacitador</a>'
    },
    'credencial_cctv': {
        keywords: ['credencial cctv', 'solicitud cctv', 'formulario cctv', 'operador cctv'],
        response: 'Aquí tienes el documento para la <b>Credencial de Operador CCTV (2do Semestre 2025)</b>:<br><a href="SOLIC. CREDENCIAL CCTV 2025 1ER SEMESTRE 2025.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">› Descargar Solicitud CCTV</a>'
    },
    'credencial_encargado': {
        keywords: ['credencial encargado', 'solicitud encargado', 'formulario encargado', 'encargado de seguridad'],
        response: 'Aquí tienes el documento para la <b>Credencial de Encargado de Seguridad (2do Semestre 2025)</b>:<br><a href="SOLIC. CREDENCIAL ENC. DE SEGURIDAD 1ER. SEM 2025.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">› Descargar Solicitud Encargado</a>'
    },
    'credencial_empleador': {
        keywords: ['credencial empleador', 'formulario empleador', 'guardia empresa'],
        response: 'Aquí tienes el documento para la <b>Credencial de Guardia (vía Empleador) (2do Semestre 2025)</b>:<br><a href="SOLIC. CREDENCIAL GG.SS. EMPLEADOR  VALORES CRED 2025 1ER. SEMESTRE.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">› Descargar Solicitud Empleador</a>'
    },
    'credencial_independiente': {
        keywords: ['guardia independiente', 'formulario independiente'],
        response: 'Aquí tienes el documento para la <b>Credencial de Guardia Independiente (2do Semestre 2025)</b>:<br><a href="SOLIC. CREDENCIAL GG.SS. INDEPENDIENTE 1ER. SEMESTRE 2025.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">› Descargar Solicitud Independiente</a>'
    },
    // --- Respuesta general para documentos ---
    'documentos': {
        keywords: ['documentos', 'formularios', 'archivos', 'pdf', 'formatos', 'solicitud'],
        response: '¡Claro! Si buscas una solicitud de credencial, por favor sé más específico (ej: "credencial de asesor"). Para otros documentos, aquí tienes:<br><br>' +
                  '<b>🔹 Listas de Valores (2do Semestre 2025):</b><br>' +
                  '<a href="CREDENCIALES VALORES 2025 FORMULA 1ER. SEMESTRE.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline ml-4">› Valores Credenciales</a><br>' +
                  '<a href="CURSO PERFECCIONAMIENTO VALORES 2025 FORMULA 1ER. SEMESTRE.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline ml-4">› Valores Perfeccionamiento</a><br><br>' +
                  '<b>🔹 Otros Documentos:</b><br>' +
                  '<a href="EMPRESAS DE CAPACITACION 2025.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline ml-4">› Empresas de Capacitación 2025</a><br>' +
                  '<a href="FORMATO SOLICITUD SIMPLE CREDENCIAL GGSS INDEPENDIENTE.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline ml-4">› Formato Solicitud Simple (Independiente)</a>'
    },
    // --- Nuevas reglas del CSV ---
    'csv_rule_1': { keywords: ['info', 'información', 'ayuda'], response: '🤖 Hola, ¿en qué te puedo ayudar? Para una mejor atención, escribe tu consulta de forma clara y precisa. ' },
    'csv_rule_2': { keywords: ['adios', 'chao'], response: 'Adiós, que tengas un buen día.' },
    'csv_rule_3': { keywords: ['👍'], response: '👍' },
    'csv_rule_4': { keywords: ['grs'], response: 'De nada.' },
    'csv_rule_5': { keywords: ['buena'], response: 'Qué bueno que te sirvió.' },
    'csv_rule_6': { keywords: ['se paso'], response: 'De nada, para eso estamos.' },
    'csv_rule_7': { keywords: ['excelente'], response: 'Me alegro de poder ayudar.' },
    'csv_rule_8': { keywords: ['se agradece'], response: 'Un placer ayudarte.' },
    'csv_rule_9': { keywords: ['muchas gracias'], response: 'De nada, que estés bien.' },
    'csv_rule_10': { keywords: ['ok'], response: '👍' },
    'csv_rule_11': { keywords: ['consulta'], response: 'Sí, dime.' },
    'csv_rule_12': { keywords: ['donde'], response: 'La oficina de OS10 Coquimbo está en Cienfuegos 180, La Serena. Lunes a Jueves de 09:00 a 13:00 hrs. Fono 512651024. <a href="https://maps.app.goo.gl/QUhujWbTF1FjDA7E6" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver en Google Maps</a>' },
    'csv_rule_13': { keywords: ['como llego'], response: 'Puedes usar este enlace de Google Maps para llegar: <a href="https://maps.app.goo.gl/QUhujWbTF1FjDA7E6" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://maps.app.goo.gl/QUhujWbTF1FjDA7E6</a>' },
    'csv_rule_14': { keywords: ['requisitos'], response: 'Los requisitos dependen del trámite. ¿Qué necesitas hacer? (Ej: "credencial de guardia", "directiva de funcionamiento", etc.)' },
    'csv_rule_15': { keywords: ['directiva de funcionamiento'], response: 'Aquí tienes los documentos para la Directiva de Funcionamiento (DD.FF.):<br><b>- Solicitud Simple:</b> <a href="https://dal5.short.gy/Solic" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Descargar</a><br><b>- Formato Word DD.FF.:</b> <a href="https://dal5.short.gy/D" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Descargar</a><br><b>- Requisitos:</b> <a href="https://dal5.short.gy/Re24" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Descargar</a>' },
    'csv_rule_16': { keywords: ['unir pdf'], response: 'Puedes usar esta herramienta online para unir archivos PDF: <a href="https://dal5.short.gy/I" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/I</a>' },
    'csv_rule_17': { keywords: ['cambiar dpi'], response: 'Puedes usar estas herramientas para ajustar los DPI de tus fotos:<br><b>- Opción 1:</b> <a href="https://dal5.short.gy/0" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Convert. 300 DPI</a><br><b>- Opción 2:</b> <a href="https://dal5.short.gy/j" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Convert. 300 DPI</a>' },
    'csv_rule_18': { keywords: ['excel'], response: 'Puedes descargar el formato de Excel para la nómina de guardias aquí: <a href="https://dal5.short.gy/Cr3d" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Descargar Excel</a>' },
    'pagina_general_tramites': {
        keywords: ['directiva', 'credencial empresa', 'independiente'],
        response: '🤖 <b>PÁGINA PARA:</b><br>1.- PRESENTAR DIRECTIVA.<br>2.- CREDENCIAL EMPRESA.<br>3.- CRED. INDEPENDIENTE.<br>Página ⬇️<br><a href="https://dal5.short.gy/df" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">dal5.short.gy/df</a>'
    }
};


// --- API Configuration ---
const API_KEY = 'AIzaSyAgOFzsnwwLt4TSb1lO3XZ8Ot9QJUX7Y6A';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// --- State Management ---
let chatHistory = [];
const systemPrompt = `Eres un asistente virtual experto en materias de seguridad privada en Chile, enfocado en las directivas y procedimientos de OS10 de Carabineros.
Tus reglas principales son:
1.  **Prioridad a los documentos:** Tu máxima prioridad es buscar y entregar primero cualquier documento, guía o PDF que tengas en tu base de datos cuando se te pregunte por un trámite (ej. "cómo tramitar credencial"). Una vez entregado el documento, puedes responder preguntas adicionales.
2.  **Respuestas cortas y reales:** Sé conciso y factual. No inventes respuestas. Si no sabes algo, indícalo amablemente.
3.  **Formato claro:** Usa Markdown para dar formato. Para listas, asegúrate de que cada ítem esté en una nueva línea (ej. "1. Guardia\\n2. Vigilante").

Genera respuestas usando Markdown para formato, como **negrita** para énfasis y listas con * o números.`;

// --- UI Functions ---

/**
 * Toggles the visibility of the chat popup and the open/close icons.
 */
function toggleChat() {
    chatPopup.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    chatBackdrop.classList.toggle('hidden'); // <-- Controla el fondo
}

/**
 * Converts basic Markdown syntax to HTML for rendering in the chat.
 * @param {string} text - The raw text from the API.
 * @returns {string} - The text formatted with HTML tags.
 */
function markdownToHtml(text) {
    // Convert bold: **text** -> <b>text</b>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert bullet points: * item -> 🔹 item
    formattedText = formattedText.replace(/^\s*\*\s/gm, '🔹 ');

    // Ensure newlines in the original text become <br> tags in HTML
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
}


/**
 * Creates and appends a message to the chat UI.
 * @param {string} sender - The sender of the message ('user' or 'bot').
 * @param {string} text - The content of the message.
 */
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-fade-in', 'flex', 'items-start', 'max-w-xs', 'md:max-w-sm');
    
    let messageContent;
    if (sender === 'user') {
        messageElement.classList.add('ml-auto', 'flex-row-reverse');
        messageContent = `
            <div class="bg-green-500 rounded-xl rounded-br-none p-3 ml-2">
                <p class="text-white text-sm"></p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0 text-gray-600 dark:text-gray-300">U</div>
        `;
        messageElement.innerHTML = messageContent;
        // Use textContent for user input to prevent XSS vulnerabilities
        messageElement.querySelector('p').textContent = text;
    } else { // sender is 'bot'
        messageElement.classList.add('mr-auto');
        messageContent = `
            <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0zM7 12a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2">
                <p class="text-gray-700 dark:text-gray-200 text-sm"></p>
            </div>
        `;
        messageElement.innerHTML = messageContent;
        // Use innerHTML for bot responses because we want to render the formatted HTML
        messageElement.querySelector('p').innerHTML = text;
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
}

/**
 * Shows or hides the typing indicator in the chat.
 * @param {boolean} show - Whether to show or hide the indicator.
 */
function showTypingIndicator(show) {
    let indicator = document.getElementById('typing-indicator');
    if (show) {
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'typing-indicator';
            indicator.classList.add('message-fade-in', 'flex', 'items-start');
            indicator.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0zM7 12a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>
                </div>
                <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2 typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            `;
            chatMessages.appendChild(indicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    } else {
        if (indicator) indicator.remove();
    }
}

/**
 * Checks if the user input matches any predefined questions.
 * @param {string} text - The user's input text.
 * @returns {string|null} The predefined response or null if no match.
 */
function getPredefinedResponse(text) {
    const lowerCaseText = text.toLowerCase();
    for (const key in predefinedResponses) {
        const item = predefinedResponses[key];
        if (item.keywords.some(keyword => lowerCaseText.includes(keyword))) {
            return item.response;
        }
    }
    return null;
}


// --- API Communication ---

/**
 * Sends the user's message, checking for predefined responses first.
 */
async function handleSendMessage() {
    const userText = userInput.value.trim();
    if (userText === '') return;

    addMessage('user', userText);
    userInput.value = '';
    
    // Check for a predefined response first
    const predefinedResponse = getPredefinedResponse(userText);
    if (predefinedResponse) {
        // Wait a little to simulate "thinking"
        setTimeout(() => {
            addMessage('bot', predefinedResponse);
            chatHistory.push({ role: "user", parts: [{ text: userText }] });
            chatHistory.push({ role: "model", parts: [{ text: predefinedResponse }] });
        }, 500);
        return;
    }
    
    // If no predefined response, call the API
    showTypingIndicator(true);
    chatHistory.push({ role: "user", parts: [{ text: userText }] });

    try {
        const payload = {
            contents: chatHistory,
            systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        // Get the raw text from the bot
        const botText = data.candidates[0].content.parts[0].text;
        
        // Convert Markdown to HTML before displaying
        const formattedBotText = markdownToHtml(botText);
        
        // Add original bot text to history, but display the formatted version
        chatHistory.push({ role: "model", parts: [{ text: botText }] });
        
        showTypingIndicator(false);
        addMessage('bot', formattedBotText);

    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        showTypingIndicator(false);
        addMessage('bot', `Lo siento, ocurrió un error al contactar al asistente. (${error.message})`);
    }
}

// --- Initialization ---

/**
 * Initializes the chatbot, sets up event listeners, and displays a welcome message.
 */
function init() {
    if (!chatToggleButton) {
        console.error("Chatbot UI elements not found. Initialization failed.");
        return;
    }
    
    // Event Listeners
    chatToggleButton.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Display welcome message
    const welcomeMessage = "¡Hola! Soy tu asistente virtual OS10. ¿En qué puedo ayudarte hoy?";
    addMessage('bot', welcomeMessage);
    
    // Add welcome message to history for context
    chatHistory.push({ role: "model", parts: [{ text: welcomeMessage }] });

    console.log("Chatbot initialized successfully.");
}

// Run the chatbot initialization
init();
