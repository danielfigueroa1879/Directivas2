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
const chatBackdrop = document.getElementById('chat-backdrop');
const chatWidgetContainer = document.getElementById('chat-widget-container');


// --- Predefined Responses ---
// Base de datos de respuestas predefinidas, actualizada con el nuevo documento.
const predefinedResponses = {
    'rule_1': {
        keywords: ['figueroa', 'mi suboficial', 'mi sargento'],
        response: '🧙🏻 ‍♂️ no estoy de servicio, puede llamar al 512651024 o esperar la atención de lunes a viernes de 08:30 a 13:00 horas. Gracias  👍✌️'
    },
    'rule_2': {
        keywords: ['*mi suboficial*', '*mi sargento*'],
        response: 'Estoy con unos días de descanso vuelvo el viernes, saludos  🙂   👍🏼'
    },
    'rule_3': {
        keywords: ['*servicio*'],
        response: 'Hola, esta es una contestadora automática, no estoy de servicio puede llamar al 512651024 o esperar la atención de lunes a viernes de 08:30 a 13:00 horas. Gracias  👍'
    },
    'rule_4': {
        keywords: ['*hola*'],
        response: 'Hola esta es una contestadora automática, deja tu mensaje y te escribiré cuando pueda, gracias, sigamos cuidándonos  🙏👍💪'
    },
    'rule_5': {
        keywords: ['*horario*', '*atención*', '*horarios*'],
        response: 'Hola, puede llamar al 512651024 o esperar la atención de lunes a viernes de 09:00 a 13:00 horas. Gracias  👍'
    },
    'rule_6': {
        keywords: ['guías', 'guía', 'componentes del sistema', 'componentes'],
        response: '*ESCRIBA EL NOMBRE DEL COMPONENTE DEL SISTEMA Y SE DESCARGARA UNA GUIA, PARA QUE PUEDA REALIZAR SU TRAMITE* 👮🏻 ‍♂️ \n  ⬇️ \n*1.-* VIGILANTE PRIVADO\n*2.-* GUARDIA DE SEGURIDAD\n*3.-* JEFE DE SEGURIDAD \n*4.-* ENCARGADO DE SEGURIDAD\n*5.-* SUPERVISOR\n*6.-* ASESOR \n*7.-* CAPACITADOR\n*8.-* TÉCNICO \n*9.-* OPERADOR DE CAJEROS \n*10.-* INSTALADOR TÉC. DE SEGURIDAD\n*11.-* OPERADOR CCTV.\n*12.-* EMPRESAS'
    },
    'rule_7': {
        keywords: ['guardia de seguridad', 'guardia', 'guardia seguridad'],
        response: '🤖   🧙🏻 ‍♂️ Ok... en este link encontrará la guía de *GUARDIA DE SEGURIDAD* la puede descargar: <a href="https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf</a>'
    },
    'rule_8': {
        keywords: ['jefe de seguridad'],
        response: '🤖  OK..en este link encontrará la guía de *JEFE DE SEGURIDAD* la puede descargar: <a href="https://www.zosepcar.cl/content/OS10/TRAM_jefe_de_seguridad.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_jefe_de_seguridad.pdf</a><br><br> 🤖  *ACTAS JEFE SEGURIDAD EX FF.AA*<br><a href="https://drive.google.com/drive/folders/1aAkt55yTidnT90LI-Ss3gNWCGM8X7luW?usp=sharing" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver Actas</a><br><br> 🤖  *ACTAS JEFE DE SEGURIDAD CIVIL*<br><a href="https://drive.google.com/drive/folders/14UBGFXwo7NBA55_o0p2MNQxe1_3H16k4?usp=sharing" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">Ver Actas</a><br><br> 🧙🏼 ‍♂️ *CREDENCIAL JEFE DE SEGURIDAD*<br><a href="https://os10.short.gy/Jef" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://os10.short.gy/Jef</a>'
    },
    'rule_9': {
        keywords: ['supervisor', 'acreditación supervisor', 'supervisor seguridad', 'para supervisor', 'acreditar un supervisor', 'supervisores', 'acreditar supervisores'],
        response: '🤖 . *SUPERVISOR* <br>1.- *GUIA*<br><a href="https://www.zosepcar.cl/content/OS10/TRAM_supervisor.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_supervisor.pdf</a><br>2.- *CREDENCIAL*<br><a href="https://os10.short.gy/Sup" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://os10.short.gy/Sup</a>'
    },
    'rule_10': {
        keywords: ['*encargado de seguridad*', '*encargado*'],
        response: '🤖  *ENCARGADO DE SEGURIDAD*<br>*CREDENCIAL:*<br><a href="https://bit.ly/3H6pIOu" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://bit.ly/3H6pIOu</a><br>*GUIA:*<br><a href="https://www.zosepcar.cl/content/OS10/TRAM_encargado_de_seguridad.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_encargado_de_seguridad.pdf</a>'
    },
    'rule_11': {
        keywords: ['capacitador'],
        response: '🤖  *CAPACITADOR*<br><a href="https://www.zosepcar.cl/content/OS10/TRAM_capacitador.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_capacitador.pdf</a><br><br>*CAPACITADOR CIVIL*<br> ➢  Solic. Simple: <a href="https://dal5.short.gy/Solic.Sim" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/Solic.Sim</a><br> ➢  Solic simp Punto 6: <a href="https://dal5.short.gy/CapCivil" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/CapCivil</a><br><br>*CAPACITADOR EX FF.AA.*<br> ➢  Solic. Simple: <a href="https://dal5.short.gy/Solic.Sim" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/Solic.Sim</a><br> ➢  Acta simple punto 8 puerta ancha: <a href="https://dal5.short.gy/Pension" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/Pension</a><br> ➢  Acta simple Punto 6 y 7: <a href="https://dal5.short.gy/WVArop" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/WVArop</a>'
    },
    'rule_12': {
        keywords: ['tecnico'],
        response: '*TÉCNICO* <a href="https://www.zosepcar.cl/content/OS10/TRAM_tecnico.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_tecnico.pdf</a>'
    },
    'rule_13': {
        keywords: ['asesor'],
        response: '🤖  *ASESOR*<br>**GUÍA:*<br><a href="https://www.zosepcar.cl/content/OS10/TRAM_asesor.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_asesor.pdf</a><br>Títulos afines:<br>*Resol. 4070* 20.10.2021- link: <a href="https://bit.ly/3r5HrBg" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://bit.ly/3r5HrBg</a><br> ➢  *SIN DIPLOMADO EN SEGURIDAD PRIVADA*<br>1.- INGENIERO DE EJECUCIÓN EN GESTIÓN DE SEGURIDAD PRIVADA.<br>2.- INGENIERO EN GESTIÓN DE SEGURIDAD Y VIGILANCIA PRIVADA.<br> ➢  *CON DIPLOMADO EN SEGURIDAD PRIVADA*<br>3.- INGENIERO EN SEGURIDAD Y PREVENCIÓN DE RIESGO.<br>4.- INGENIERO EN PREVENCIÓN DE RIESGOS.<br>5.- PARA LOS EX MIEMBROS DE LAS FUERZAS ARMADAS, CARABINEROS DE CHILE, POLICÍA DE INVESTIGACIONES Y GENDARMERÍA DE CHILE exigirá EL TITULO DE OFICIAL EGRESADO de/las Fuerzas primadas, de las Fuerzas de Orden y Seguridad Pública o Gendarmería de Chile.<br><br>*Resol. 2660* 20.07.2023-link: <a href="https://bit.ly/44PRW9w" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://bit.ly/44PRW9w</a><br>6.- INGENIERÍA EN ADMINISTRACIÓN MENCIÓN SEGURIDAD PRIVADA<br>**CREDENCIAL:*<br><a href="https://bit.ly/3tGuM9a" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://bit.ly/3tGuM9a</a>'
    },
    'rule_14': {
        keywords: ['*instalador tecnico*', '*técnico*', '*instalador*'],
        response: '*INSTALADOR TÉCNICO* <a href="https://www.zosepcar.cl/content/OS10/TRAM_instalador_tecnico.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_instalador_tecnico.pdf</a>'
    },
    'rule_15': {
        keywords: ['operador de cajeros'],
        response: '*OPERADOR DE CAJEROS AUTOMÁTICOS* <br><a href="https://www.zosepcar.cl/content/OS10/TRAM_operador_cajeros.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_operador_cajeros.pdf</a>'
    },
    'rule_16': {
        keywords: ['*operador cctv*', '*cctv*'],
        response: '🤖  *OPERADOR CCTV*<br>*GUÍA:* <a href="https://www.zosepcar.cl/content/OS10/TRAM_operador_cctv.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_operador_cctv.pdf</a><br>*CREDENCIAL*<br><a href="https://bit.ly/48jcidU" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://bit.ly/48jcidU</a>'
    },
    'rule_17': {
        keywords: ['manuales'],
        response: '🤖   ⬇️  *ESCRIBE UNA OPCIÓN* 👮🏻 ‍♂️ 🚦 <br>*1M.-* MANUAL DE FUNCIONAMIENTO<br>*2M.-* MANUAL DE CAPACITACIÓN <br>*3M.-* MANUAL DE ORGANIZACIÓN'
    },
    'rule_18': {
        keywords: ['empresas', 'empresa'],
        response: '*EMPRESAS* <a href="https://www.zosepcar.cl/content/OS10/TRAM_empresas.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/TRAM_empresas.pdf</a><br>- Mod. Solicitud Simple: <a href="https://dal5.short.gy/exqKjv" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/exqKjv</a><br>- Dec. Jurada 5, 6 y 8 : <a href="https://dal5.short.gy/gZXROQ" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://dal5.short.gy/gZXROQ</a><br>Tiene que traer la documentación de los puntos del 1 al 19, considerando lo siguiente:<br><br>*Puntos a considerar como empresa de RR.HH:* <br>* Punto 1, La Solicitud debe ser en duplicado. <br>* Punto 9, El currículum debe ser sin fotografía.<br>* Punto 10, Antecedentes académicos debe ser legalizado ante notario (Diplomado en seguridad privada 400 horas), si no tiene diplomado, el contrato de trabajo legalizado del asesor con su acreditación vigente.<br>* El punto 5, puede ser omitido si no perteneció a las fuerzas armadas.<br>* El punto 12, el F30 deben ingresar el código 801001 para que aparezca *Servicios de Seguridad Privada Prestado por Empresas. <br>* El punto 13, Escritura o constitución de sociedad en el Objetivo debe decir *“Desarrollar actividades como empresa de recursos Humanos, en materias inherentes a Seguridad Privada”.*<br>Si empresa se constituyo por la ley N° 20.659 debe incorporar: <br>a) Certificado de Estatuto actualizado con la formación de la empresa; <br>b) Certificado de vigencia de la empresa y <br>c) Certificado de anotaciones vigentes de la empresa<br>* El punto 16, Set fotográfico, debe ser presentado fotografías del interior y exterior de la oficina indicando la numeración del domicilio (foto panorámica de la numeración de la oficina). Todo esto inserto en un oficio con descripción de cada fotografía.'
    },
    'rule_19': {
        keywords: ['1m'],
        response: '*MANUAL DE FUNCIONAMIENTO* <a href="https://www.zosepcar.cl/content/OS10/manual_funcionamiento.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/manual_funcionamiento.pdf</a>'
    },
    'rule_20': {
        keywords: ['3m'],
        response: '*MANUAL DE ORGANIZACIÓN*<br><a href="https://www.zosepcar.cl/content/OS10/manual_organizacion.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/manual_organizacion.pdf</a>'
    },
    'rule_21': {
        keywords: ['2m'],
        response: '*MANUAL DE CAPACITACIÓN*<br><a href="https://www.zosepcar.cl/content/OS10/manual_capacitacion.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/manual_capacitacion.pdf</a>'
    },
    'rule_22': {
        keywords: ['leyes'],
        response: '*ESCRIBE UN NUMERO LEY O DECRETO*.<br>  🚦 .  ⬇️  <br> <br>DECTO. *261* DEL 31.0 un7.2020<br>DECTO. *298* DEL 17.09.2019<br>DECTO. *123* DEL 05.04.2019<br>DECTO. *1045* DEL 12.09.2018<br>DECTO. *867* DEL 12.09.2017 <br>DECTO. *1814* DEL 10.11.2014<br>DECTO. *222* DEL 30.10.2014<br>DECTO. *1122* DEL 19.10.1994<br>DECTO. *41* DEL 05.03.1996<br>DECTO. *1772* DEL 26.01.1995<br>DECTO. *1773* DEL 14.11.1994<br>DECTO. *93* DEL 21.10.1985<br>D. LEY. *3607* DEL 08.01.1981<br>LEY *19303* DEL 13.04.1994<br>Resol. *253* DEL 29.10.2013<br>Resol. *59*. DEL 30.09.2014<br>Resol. *32*. DEL 31.01.2024<br>Resol. *80* DEL 20.03.2024<br>LEY. *21659* DEL 21.03.2024'
    },
    'rule_23': {
        keywords: ['261'],
        response: '*DECRETO NRO 261*. <br><br><a href="https://www.zosepcar.cl/content/OS10/Decreto-261.pdf" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.zosepcar.cl/content/OS10/Decreto-261.pdf</a>'
    },
    'rule_24': {
        keywords: ['298'],
        response: '*DECRETO 298*. <a href="https://www.bcn.cl/leychile/navegar?idNorma=1136545&idParte=10054790&idVersion=2019-09-17" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=1136545&idParte=10054790&idVersion=2019-09-17</a>'
    },
    'rule_25': {
        keywords: ['123'],
        response: '*DECRETO 123*. <a href="https://www.bcn.cl/leychile/navegar?idNorma=1130300&idParte=10013741&idVersion=2019-04-05" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=1130300&idParte=10013741&idVersion=2019-04-05</a>'
    },
    'rule_26': {
        keywords: ['1045'],
        response: '*DECRETO 1045*. <a href="https://www.bcn.cl/leychile/navegar?idNorma=1122982&idParte=9948603&idVersion=2018-09-12" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=1122982&idParte=9948603&idVersion=2018-09-12</a>'
    },
    'rule_27': {
        keywords: ['867'],
        response: '*DECRETO 867*. <br><br><a href="https://www.bcn.cl/leychile/navegar?idNorma=1116274" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=1116274</a>'
    },
    'rule_28': {
        keywords: ['1814', 'decreto 1814', 'decreto transporte valores'],
        response: '*DECRETO 1814*<br><a href="https://www.bcn.cl/leychile/navegar?idNorma=1069299" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=1069299</a>'
    },
    'rule_29': {
        keywords: ['222'],
        response: '*DECRETO 222*. <a href="https://www.bcn.cl/leychile/navegar?idNorma=1055580" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=1055580</a>'
    },
    'rule_30': {
        keywords: ['1122'],
        response: '*DECRETO 1122*<br><a href="https://www.bcn.cl/leychile/navegar?idNorma=1072929" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=1072929</a>'
    },
     'rule_31': {
        keywords: ['41'],
        response: '*DECRETO 41*. <a href="https://www.bcn.cl/leychile/navegar?idNorma=19870" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=19870</a>'
    },
    'rule_32': {
        keywords: ['1773'],
        response: '*DECRETO 1773*<br><a href="https://www.bcn.cl/leychile/navegar?idNorma=18594" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=18594</a>'
    },
    'rule_33': {
        keywords: ['93', 'decreto 93'],
        response: '*DECRETO 93.* <br><a href="https://www.bcn.cl/leychile/navegar?idNorma=9081" target="_blank" class="text-green-500 dark:text-green-400 hover:underline">https://www.bcn.cl/leychile/navegar?idNorma=9081</a>'
    },
    // ... (El resto de las respuestas se agregarían aquí siguiendo el mismo formato)
};


// --- API Configuration ---
const API_KEY = 'AIzaSyAgOFzsnwwLt4TSb1lO3XZ8Ot9QJUX7Y6A';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// --- State Management ---
let chatHistory = [];
const systemPrompt = `Eres un asistente virtual y funcionario de la oficina de Seguridad Privada OS10 de Carabineros en Coquimbo, Chile. Tu principal objetivo es ayudar a los usuarios con sus trámites y consultas.
Tus reglas principales son:
1.  **Asume tu Rol:** Responde siempre como si fueras un miembro del equipo de la oficina OS10 Coquimbo. Usa un tono servicial y profesional.
2.  **Prioridad a los documentos:** Tu máxima prioridad es buscar y entregar primero cualquier documento, guía o PDF que tengas en tu base de datos cuando se te pregunte por un trámite (ej. "cómo tramitar credencial"). Una vez entregado el documento, puedes responder preguntas adicionales.
3.  **Respuestas cortas y reales:** Sé conciso y factual. No inventes respuestas. Si no sabes algo, indícalo amablemente.
4.  **Formato claro:** Usa Markdown para dar formato. Para listas, asegúrate de que cada ítem esté en una nueva línea (ej. "1. Guardia\\n2. Vigilante").

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
    const lowerCaseText = text.toLowerCase().trim();

    // Iterate over each response rule
    for (const key in predefinedResponses) {
        const item = predefinedResponses[key];

        // Iterate over each keyword in the rule
        for (const keyword of item.keywords) {
            const lowerKeyword = keyword.toLowerCase().trim();

            // Rule for inclusion match (contains asterisks)
            if (lowerKeyword.startsWith('*') && lowerKeyword.endsWith('*')) {
                const cleanKeyword = lowerKeyword.substring(1, lowerKeyword.length - 1);
                if (cleanKeyword && lowerCaseText.includes(cleanKeyword)) {
                    return item.response; 
                }
            } 
            // Rule for exact match (no asterisks)
            else {
                if (lowerCaseText === lowerKeyword) {
                    return item.response; 
                }
            }
        }
    }

    return null; // No match found
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
    
    // Lógica mejorada para el teclado en móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && window.visualViewport) {
        const originalWidgetBottom = chatWidgetContainer.style.bottom || '5rem';

        window.visualViewport.addEventListener('resize', () => {
            const keyboardHeight = window.innerHeight - window.visualViewport.height;

            if (keyboardHeight > 100) { 
                chatWidgetContainer.style.bottom = `${keyboardHeight + 10}px`;
            } else {
                chatWidgetContainer.style.bottom = originalWidgetBottom;
            }
        });
    }

    // Display welcome message
    const welcomeMessage = "¡Hola! Soy tu asistente virtual de la oficina OS10 Coquimbo. ¿En qué puedo ayudarte hoy?";
    addMessage('bot', welcomeMessage);
    
    // Add welcome message to history for context
    chatHistory.push({ role: "model", parts: [{ text: welcomeMessage }] });

    console.log("Chatbot initialized successfully.");
}

// Run the chatbot initialization
init();
