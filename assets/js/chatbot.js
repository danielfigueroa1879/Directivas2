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
        keywords: ['valor credencial', 'precio credencial', 'costo credencial', 'cuanto vale la credencial'],
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
        response: '🤖 👉🏼 <b>OS10 Coquimbo</b><br>Lunes a Jueves: 09:00 a 13:00 hrs.<br>📍 Cienfuegos 180, La Serena.<br>📞 Fono: 512651024<br><a href="https://maps.app.goo.gl/QUhujWbTF1FjDA7E6" target="_blank" class="text-blue-400 hover:underline">Ver en Google Maps</a>'
    },
    'infracciones': {
        keywords: ['infraccion', 'infracciones', 'multa', 'multas', 'sancion', 'sanciones', 'articulo 13', 'articulo 15', 'articulo 18'],
        response: 'Las infracciones más comunes del Decreto 93 son:<br>🔹 <b>Art. 13:</b> Guardia sin curso OS10 vigente.<br>🔹 <b>Art. 15:</b> Sin Directiva de Funcionamiento aprobada.<br>🔹 <b>Art. 18:</b> Guardia sin portar su credencial.<br><br>⚠️ <b>Importante:</b> La infracción se cursa a la empresa de seguridad, no directamente al guardia.'
    },
    'documentos': {
        keywords: ['documentos', 'formularios', 'solicitud', 'archivos', 'pdf', 'formatos', 'valores'],
        response: '¡Claro! Aquí tienes los documentos y formularios para el <b>2do Semestre 2025</b>:<br><br>' +
                  '<b>🔹 Solicitudes de Credencial:</b><br>' +
                  '<a href="SOLIC. CREDENCIAL GG.SS. EMPLEADOR  VALORES CRED 2025 1ER. SEMESTRE.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Guardia (Empleador)</a><br>' +
                  '<a href="SOLIC. CREDENCIAL GG.SS. INDEPENDIENTE 1ER. SEMESTRE 2025.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Guardia (Independiente)</a><br>' +
                  '<a href="SOLIC. CREDENCIAL ASESOR 1 SEMESTRE 2025.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Asesor</a><br>' +
                  '<a href="SOLIC. CREDENCIAL CAPACITADOR 1ER. SEMESTRE 2025.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Capacitador</a><br>' +
                  '<a href="SOLIC. CREDENCIAL CCTV 2025 1ER SEMESTRE 2025.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Operador CCTV</a><br>' +
                  '<a href="SOLIC. CREDENCIAL ENC. DE SEGURIDAD 1ER. SEM 2025.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Encargado de Seguridad</a><br><br>' +
                  '<b>🔹 Listas de Valores:</b><br>' +
                  '<a href="CREDENCIALES VALORES 2025 FORMULA 1ER. SEMESTRE.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Valores Credenciales (2do Semestre)</a><br>' +
                  '<a href="CURSO PERFECCIONAMIENTO VALORES 2025 FORMULA 1ER. SEMESTRE.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Valores Perfeccionamiento (2do Semestre)</a><br><br>' +
                  '<b>🔹 Otros Documentos:</b><br>' +
                  '<a href="EMPRESAS DE CAPACITACION 2025.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Empresas de Capacitación 2025</a><br>' +
                  '<a href="FORMATO SOLICITUD SIMPLE CREDENCIAL GGSS INDEPENDIENTE.pdf" target="_blank" class="text-blue-400 hover:underline ml-4">› Formato Solicitud Simple (Independiente)</a>'
    }
};


// --- API Configuration ---
const API_KEY = 'AIzaSyAgOFzsnwwLt4TSb1lO3XZ8Ot9QJUX7Y6A';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// --- State Management ---
let chatHistory = [];
const systemPrompt = `Eres un asistente virtual experto en materias de seguridad privada en Chile, enfocado en las directivas y procedimientos de OS10 de Carabineros. Tu conocimiento incluye: Decreto Ley 3.607, Decretos 93, 261, 32, Resolución 1480, y todo sobre Directivas de Funcionamiento (DD.FF.) y credenciales. Responde de forma clara y precisa, basándote en la normativa chilena. Si no sabes algo, indícalo amablemente. Genera respuestas usando Markdown para formato, como **negrita** para énfasis y listas con *.`;

// --- UI Functions ---

/**
 * Toggles the visibility of the chat popup and the open/close icons.
 */
function toggleChat() {
    chatPopup.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

/**
 * Converts basic Markdown syntax to HTML for rendering in the chat.
 * @param {string} text - The raw text from the API.
 * @returns {string} - The text formatted with HTML tags.
 */
function markdownToHtml(text) {
    // Convert bold: **text** -> <b>text</b>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert list items: * item -> <br>🔹 item
    // This regex handles list items at the beginning of a line, with or without preceding newline.
    formattedText = formattedText.replace(/(?:\n|^)\s*\*\s/g, '<br>🔹 ').trim();
    
    // Clean up any leading <br> that might have been created
    if (formattedText.startsWith('<br>')) {
        formattedText = formattedText.substring(4);
    }

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
            <div class="bg-blue-600 rounded-xl rounded-br-none p-3 ml-2">
                <p class="text-white text-sm"></p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0">U</div>
        `;
        messageElement.innerHTML = messageContent;
        // Use textContent for user input to prevent XSS vulnerabilities
        messageElement.querySelector('p').textContent = text;
    } else { // sender is 'bot'
        messageElement.classList.add('mr-auto');
        messageContent = `
            <div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0zM7 12a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>
            </div>
            <div class="bg-gray-700 rounded-xl rounded-bl-none p-3 ml-2">
                <p class="text-gray-200 text-sm"></p>
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
                <div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0zM7 12a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>
                </div>
                <div class="bg-gray-700 rounded-xl rounded-bl-none p-3 ml-2 typing-indicator">
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
