/**
 * Muestra indicador de síntesis de voz con texto
 */
function showSpeechIndicator(text) {
    let indicator = document.getElementById('speech-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'speech-indicator';
        indicator.className = 'voice-status-indicator speaking show';
        document.body.appendChild(indicator);
    }
    
    // Actualizar contenido
    indicator.innerHTML = `
        <div class="flex items-center space-x-2">
            <div class="audio-visualizer">
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
            </div>
            <span>Reproduciendo mensaje...</span>
        </div>
    `;
    indicator.className = 'voice-status-indicator speaking show';
}

/**
 * Muestra indicador de escucha mejorado
 */
function showListeningIndicator() {
    let indicator = document.getElementById('listening-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'listening-indicator';
        indicator.className = 'message-fade-in flex items-start';
        indicator.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-white border-2 border-red-400 flex items-center justify-center flex-shrink-0 p-1 listening-pulse">
                <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="23"/>
                    <line x1="8" x2="16" y1="23" y2="23"/>
                </svg>
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2">
                <p class="text-gray-700 dark:text-gray-200 text-sm">
                    🎤 Escuchando... <span class="text-red-500 font-medium">Habla ahora</span>
                    <br><span id="interim-text" class="interim-text"></span>
                </p>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Mostrar indicador superior
    showListeningStatusIndicator();
}

/**
 * Muestra indicador de estado superior para escucha
 */
function showListeningStatusIndicator() {
    let indicator = document.getElementById('voice-status-top');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'voice-status-top';
        indicator.className = 'voice-status-indicator listening';
        document.body.appendChild(indicator);
    }
    
    indicator.innerHTML = `
        <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="23"/>
                <line x1="8" x2="16" y1="23" y2="23"/>
            </svg>
            <span>Escuchando...</span>
        </div>
    `;
    indicator.classList.add('show');
}

/**
 * Oculta todos los indicadores de voz
 */
function hideAllVoiceIndicators() {
    const indicators = ['speech-indicator', 'voice-status-top', 'listening-indicator'];
    indicators.forEach(id => {
        const indicator = document.getElementById(id);
        if (indicator) {
            if (id === 'listening-indicator') {
                indicator.remove();
            } else {
                indicator.classList.remove('show');
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.remove();/**
 * chatbot.js - Versión con funcionalidades de voz
 * Se comunica con la API de Gemini a través de un proxy seguro en /api/gemini.
 * Incluye síntesis de voz (TTS) y reconocimiento de voz (STT)
 */

// --- DOM Element Selection ---
const chatPopup = document.getElementById('chat-popup');
const chatToggleButton = document.getElementById('chat-toggle-button');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatBackdrop = document.getElementById('chat-backdrop');
const chatWidgetContainer = document.getElementById('chat-widget-container');
const internalCloseBtn = document.getElementById('chat-close-btn-internal');

// --- Voice Elements ---
const voiceButton = document.getElementById('voice-button');
const speakButton = document.getElementById('speak-button');

// --- Voice Configuration ---
let speechSynthesis = window.speechSynthesis;
let speechRecognition = null;
let isListening = false;
let isAutoSpeakEnabled = true; // Auto-hablar respuestas del bot
let currentUtterance = null;
let voices = [];

// Configurar reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    speechRecognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    speechRecognition = new SpeechRecognition();
}

if (speechRecognition) {
    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'es-ES';
    speechRecognition.maxAlternatives = 1;
}

// --- Voice Functions ---

/**
 * Inicializa las voces disponibles
 */
function initializeVoices() {
    voices = speechSynthesis.getVoices();
    
    // Si no hay voces aún, esperar al evento
    if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
            voices = speechSynthesis.getVoices();
            console.log('Voces cargadas:', voices.length);
        });
    }
}

/**
 * Obtiene la mejor voz en español disponible
 */
function getSpanishVoice() {
    const spanishVoices = voices.filter(voice => 
        voice.lang.startsWith('es') || voice.lang.includes('ES')
    );
    
    // Preferir voces específicas de España o México
    const preferredVoice = spanishVoices.find(voice => 
        voice.lang === 'es-ES' || voice.lang === 'es-MX'
    );
    
    return preferredVoice || spanishVoices[0] || voices[0];
}

/**
 * Convierte texto a voz
 */
function speakText(text, isAutoSpeak = false) {
    if (!text.trim()) return;
    
    // Cancelar cualquier habla anterior
    speechSynthesis.cancel();
    
    // Limpiar texto de markdown y HTML
    const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Quitar negritas
        .replace(/\*(.*?)\*/g, '$1')     // Quitar cursivas
        .replace(/<[^>]*>/g, '')         // Quitar HTML
        .replace(/https?:\/\/[^\s]+/g, 'enlace') // Reemplazar URLs
        .replace(/🤖|👮🏻‍♂️|🧙🏻‍♂️|⬇️|👇🏽|📋|☝🏼|✅/g, '') // Quitar emojis comunes
        .trim();
    
    if (!cleanText) return;
    
    currentUtterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configurar la voz
    const voice = getSpanishVoice();
    if (voice) {
        currentUtterance.voice = voice;
    }
    
    // Configuraciones de voz
    currentUtterance.rate = 0.9;    // Velocidad
    currentUtterance.pitch = 1.0;   // Tono
    currentUtterance.volume = 0.8;  // Volumen
    
    // Eventos de la síntesis de voz
    currentUtterance.onstart = () => {
        updateSpeakButton(true);
        console.log('Iniciando síntesis de voz');
    };
    
    currentUtterance.onend = () => {
        updateSpeakButton(false);
        currentUtterance = null;
        console.log('Síntesis de voz completada');
    };
    
    currentUtterance.onerror = (event) => {
        console.error('Error en síntesis de voz:', event.error);
        updateSpeakButton(false);
        currentUtterance = null;
    };
    
    // Hablar
    speechSynthesis.speak(currentUtterance);
    
    // Si es auto-speak, mostrar indicador visual
    if (isAutoSpeak) {
        showSpeechIndicator(cleanText);
    }
}

/**
 * Detiene la síntesis de voz
 */
function stopSpeaking() {
    speechSynthesis.cancel();
    updateSpeakButton(false);
    currentUtterance = null;
    hideSpeechIndicator();
}

/**
 * Alterna la síntesis de voz
 */
function toggleSpeech() {
    if (speechSynthesis.speaking) {
        stopSpeaking();
    } else {
        // Obtener el último mensaje del bot
        const botMessages = document.querySelectorAll('.bot-message');
        if (botMessages.length > 0) {
            const lastBotMessage = botMessages[botMessages.length - 1];
            const text = lastBotMessage.textContent;
            speakText(text);
        }
    }
}

/**
 * Inicia el reconocimiento de voz
 */
function startListening() {
    if (!speechRecognition) {
        addMessage('bot', 'Lo siento, tu navegador no soporta reconocimiento de voz. Intenta con Chrome o Edge.');
        return;
    }
    
    if (isListening) {
        stopListening();
        return;
    }
    
    // Detener cualquier síntesis de voz activa
    stopSpeaking();
    
    isListening = true;
    updateVoiceButton(true);
    
    // Mostrar indicador de escucha
    showListeningIndicator();
    
    try {
        speechRecognition.start();
        console.log('Iniciando reconocimiento de voz');
    } catch (error) {
        console.error('Error al iniciar reconocimiento de voz:', error);
        stopListening();
    }
}

/**
 * Detiene el reconocimiento de voz
 */
function stopListening() {
    if (!isListening) return;
    
    isListening = false;
    updateVoiceButton(false);
    hideListeningIndicator();
    
    if (speechRecognition) {
        speechRecognition.stop();
    }
}

/**
 * Actualiza el botón de voz
 */
function updateVoiceButton(listening) {
    if (!voiceButton) return;
    
    const icon = voiceButton.querySelector('svg');
    if (listening) {
        voiceButton.classList.add('bg-red-500', 'animate-pulse');
        voiceButton.classList.remove('bg-blue-500');
        voiceButton.title = 'Detener grabación';
        // Cambiar icono a stop
        if (icon) {
            icon.innerHTML = '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>';
        }
    } else {
        voiceButton.classList.remove('bg-red-500', 'animate-pulse');
        voiceButton.classList.add('bg-blue-500');
        voiceButton.title = 'Usar micrófono';
        // Cambiar icono a micrófono
        if (icon) {
            icon.innerHTML = '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="23"/><line x1="8" x2="16" y1="23" y2="23"/>';
        }
    }
}

/**
 * Actualiza el botón de hablar
 */
function updateSpeakButton(speaking) {
    if (!speakButton) return;
    
    const icon = speakButton.querySelector('svg');
    if (speaking) {
        speakButton.classList.add('bg-red-500', 'animate-pulse');
        speakButton.classList.remove('bg-green-500');
        speakButton.title = 'Detener lectura';
        // Cambiar icono a stop
        if (icon) {
            icon.innerHTML = '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>';
        }
    } else {
        speakButton.classList.remove('bg-red-500', 'animate-pulse');
        speakButton.classList.add('bg-green-500');
        speakButton.title = 'Leer último mensaje';
        // Cambiar icono a speaker
        if (icon) {
            icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
        }
    }
}

/**
 * Muestra indicador de escucha
 */
function showListeningIndicator() {
    let indicator = document.getElementById('listening-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'listening-indicator';
        indicator.className = 'message-fade-in flex items-start';
        indicator.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-white border-2 border-red-400 flex items-center justify-center flex-shrink-0 p-1">
                <svg class="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="23"/>
                    <line x1="8" x2="16" y1="23" y2="23"/>
                </svg>
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2">
                <p class="text-gray-700 dark:text-gray-200 text-sm">
                    🎤 Escuchando... <span class="text-red-500">Habla ahora</span>
                    <br><span id="interim-text" class="text-blue-600 font-medium"></span>
                </p>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

/**
 * Oculta indicador de escucha
 */
function hideListeningIndicator() {
    const indicator = document.getElementById('listening-indicator');
    if (indicator) {
        indicator.remove();
    }
}

/**
 * Muestra indicador de síntesis de voz
 */
function showSpeechIndicator(text) {
    let indicator = document.getElementById('speech-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'speech-indicator';
        indicator.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2';
        indicator.innerHTML = `
            <svg class="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
            <span class="text-sm font-medium">Reproduciendo...</span>
        `;
        document.body.appendChild(indicator);
    }
}

/**
 * Oculta indicador de síntesis de voz
 */
function hideSpeechIndicator() {
    const indicator = document.getElementById('speech-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// --- Predefined Responses (Todas las reglas completas) ---
const predefinedResponses = {
    'rule_4': { keywords: ["guias","guia","componentes del sistema","componentes"], response: '*ESCRIBA EL NOMBRE DEL COMPONENTE DEL SISTEMA Y SE DESCARGARA UNA GUIA, PARA QUE PUEDA REALIZAR SU TRAMITE*👮🏻‍♂️ \n ⬇️\n*1.-* VIGILANTE PRIVADO\n*2.-* GUARDIA DE SEGURIDAD\n*3.-* JEFE DE SEGURIDAD \n*4.-* ENCARGADO DE SEGURIDAD\n*5.-* SUPERVISOR\n*6.-* ASESOR \n*7.-* CAPACITADOR\n*8.-* TÉCNICO \n*9.-* OPERADOR DE CAJEROS \n*10.-* INSTALADOR TÉC. DE SEGURIDAD\n*11.-* OPERADOR CCTV.\n*12.-* EMPRESAS' },
    'rule_5': { keywords: ["guardia de seguridad","guardia","guardia seguridad"], response: '🤖 🧙🏻‍♂️ Ok... en este link encontrará la guía de *GUARDIA DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf' },
    'rule_66': { keywords: ["menu","menú","menus"], response: '*ESCRIBA LO QUE ESTA CON NEGRILLAS*\nconsultar patente: *ppu*\nConsultar nombre o rut: *rut*\nConsultar guardia *registro*\nmenú OS10: *Os10*\nComisaria cuadrantes: *comisaria*\nCiberseguridad: *ciberseguridad*\nDGAC Seg. Priv. *Dgac*\nModifica 261: *Decreto 32*\nResol.3632: *no hay sistema*\nDirectiva: *directiva*\n*Bots*: Seguridad privada, Ciberseguridad, tránsito, Ley Karyn' },
    'rule_89': { keywords: ["menu os10", "menú O.S.10"], response: '*De acuerdo OS10*🧙🏻‍♂️👮🏻‍♂️☝️*Escriba lo que está con negrillas:* \n \n ⬇️ ESCRIBA El QUE NECESITE:\n➢ *Bots:* recibirá un listado de bots con Inteligencia Avanzada.\n➢ *Componentes:* Obtendrá las guías\n➢ *Manuales:* Se desplega menu\n➢ *Leyes:* Se desplega menu\n➢ *Editable:* Documentos en Word.\n➢ *Directiva:* Requisitos presentar\n➢ *Valores:* Cursos y planes.\n➢ *Independiente:* Requisitos Cred.\n➢ *Menu credencial:* Menú credenciales\n➢ *Nueva Ley:* Nueva ley seguridad privada y reglamento.' },
    'rule_98': { keywords: ["Valores","cuanto cuesta","cual es el valor","valor plan","valores planes","valores plan","*valor*","*cuesta*"], response: '🤖🧙🏻‍♂️ *AQUI ESTAN LOS VALORES 2DO. SEMESTRE 2025*\n1.- CREDENCIAL\nhttps://dal5.short.gy/val\n2.- CRED. EMPRESA\nhttps://dal5.short.gy/C.emp\n3.- CURSO FORMACIÓN\nhttps://dal5.short.gy/Form\n4.- CURSO PERFECC\nhttps://dal5.short.gy/BjzkHI\n5.- VALOR PLAN\nhttps://os10.short.gy/Pl4n' },
    'rule_65': { keywords: ["*fono*", "*telefono*","*numero*","*ubicados*","*dirección*","*atención*","*horario*","*horarios*","*ubicación*","*direccion oficina*","*cual es la dirección del os10*","*horario atención publico*", "*donde estan*", "*donde esta el os10 coquimbo*", "*donde esta el os10*","*donde*", "*direccion*"], response: '🤖 👉🏼 *OS10 COQUIMBO*\nDe lunes a jueves de 09:00 horas a 13:00 horas.\nCienfuegos 180, La Serena.\nFonos: 512651024-512651022-\nCredenciales:512651023\nhttps://maps.app.goo.gl/QUhujWbTF1FjDA7E6' },
    'rule_261': { keywords: ["hola","saludos"], response: '🤖👮🏻‍♂️ ¡Hola! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_261a': { keywords: ["buenos días","buen día"], response: '🤖👮🏻‍♂️ ¡Buenos días! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_261b': { keywords: ["buenas tardes","buena tarde"], response: '🤖👮🏻‍♂️ ¡Buenas tardes! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_261c': { keywords: ["buenas noches","buena noche"], response: '🤖👮🏻‍♂️ ¡Buenas noches! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_262': { keywords: ["gracias","muchas gracias","te agradezco","agradezco"], response: '🤖😊 ¡Es un placer ayudarle! Para eso estamos aquí en OS10 Coquimbo. Si tiene alguna otra consulta, no dude en escribirme. ¡Que tenga un excelente día!' },
    'rule_263': { keywords: ["chao","adiós","nos vemos","hasta luego","me voy"], response: '🤖👋 ¡Hasta luego! Gracias por contactar a OS10 Coquimbo. Recuerde que estamos de lunes a jueves de 09:00 a 13:00 horas en Cienfuegos 180, La Serena. ¡Que tenga un buen día!' },
    'rule_286': { keywords: ["guardia sin curso","vigilante sin capacitación","sin formación","no tengo curso","no tiene curso","falta curso","sin curso","no hice curso","no ha hecho curso","capacitación pendiente","curso vencido","certificado vencido"], response: '🤖⚠️ Un guardia sin curso de capacitación NO puede ejercer funciones. Según Decreto 93 art. 13° y DL 3607, es OBLIGATORIO contar con curso básico de formación vigente (3 años). Sin curso = INFRACCIÓN GRAVE. Multa: 25 a 125 ingresos mínimos mensuales (primera vez), hasta 250 en reincidencia.' },
    'rule_287': { keywords: ["guardia sin credencial","vigilante sin autorización","sin credencial","no tengo credencial","no tiene credencial","falta credencial","credencial vencida","sin licencia","no tengo licencia","no tiene licencia","autorización vencida","permiso vencido"], response: '🤖❌ Un guardia sin credencial vigente NO puede trabajar. Según Decreto 93 art. 93° la credencial es requisito ESENCIAL para ejercer. Sin credencial = EJERCICIO ILEGAL. Multa: 25 a 125 ingresos mínimos mensuales, duplicándose en reincidencia + posible clausura.' },
    'rule_350': { keywords: ["*donde puedo hacer el curso*","*empresa capacitadora*","*empresa de capacitacion*","punto 7"], response: '🤖🧙🏼‍♂️✅ 🧙🏻‍♂️ Estas son algunas empresas de aqui de la region:\n*EMPRESAS DE CAPACITACIÓN 2025* https://d6.short.gy/Cap'}
};

// --- API Configuration ---
const API_URL = '/api/gemini';

// --- State Management ---
let chatHistory = [];

// --- OPTIMIZATION: Pre-build a map for faster predefined response lookups ---
let responseMap = new Map();
let partialMatchRules = [];

/**
 * Processes the predefinedResponses object into faster lookup structures.
 */
function buildResponseMap() {
    const newResponseMap = new Map();
    const newPartialMatchRules = [];

    for (const key in predefinedResponses) {
        const item = predefinedResponses[key];
        for (const keyword of item.keywords) {
            const normalizedKeyword = keyword.toLowerCase().trim();
            
            if (normalizedKeyword.startsWith('*') && normalizedKeyword.endsWith('*')) {
                const cleanKeyword = normalizedKeyword.substring(1, normalizedKeyword.length - 1);
                if(cleanKeyword) {
                    newPartialMatchRules.push({ keyword: cleanKeyword, response: item.response });
                }
            } else {
                newResponseMap.set(normalizedKeyword, item.response);
            }
        }
    }
    responseMap = newResponseMap;
    partialMatchRules = newPartialMatchRules;
    console.log("Response map built successfully.", {exactMatches: responseMap.size, partialMatches: partialMatchRules.length});
}

// --- UI Functions ---

/**
 * Toggles the visibility of the chat popup and the open/close icons.
 */
function toggleChat() {
    const isHidden = chatPopup.classList.contains('hidden');
    if (isHidden) {
        // Opening the chat
        chatPopup.classList.remove('hidden');
        chatBackdrop.classList.remove('hidden');
        chatToggleButton.classList.add('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.add('chat-open-mobile');
        }
    } else {
        // Closing the chat
        chatPopup.classList.add('hidden');
        chatBackdrop.classList.add('hidden');
        chatToggleButton.classList.remove('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.remove('chat-open-mobile');
            if (window.mobileChatManager) window.mobileChatManager.exitKeyboardMode();
        }
        // Detener funciones de voz al cerrar
        stopListening();
        stopSpeaking();
    }
}

/**
 * Converts basic Markdown syntax (and URLs) to HTML for rendering in the chat.
 */
function markdownToHtml(text) {
    if (!text) return '';
    let formattedText = text.replace(/(https?:\/\/[^\s"'<>`]+)/g, '<a href="$1" target="_blank" class="text-blue-700 dark:text-blue-500 hover:underline">$1</a>');
    formattedText = formattedText.replace(/\*(\*?)(.*?)\1\*/g, '<b>$2</b>');
    formattedText = formattedText.replace(/^\s*-\s/gm, '🔹 ');
    return formattedText.replace(/\n/g, '<br>');
}

/**
 * Creates and appends a message to the chat UI.
 */
function addMessage(sender, text, buttons = []) {
    const messageElement = document.createElement('div');
    const isUser = sender === 'user';
    
    messageElement.className = `message-fade-in flex items-start max-w-full`;
    if (isUser) {
        messageElement.classList.add('ml-auto', 'flex-row-reverse');
    }

    const bubble = document.createElement('div');
    bubble.className = isUser 
        ? 'bg-green-500 rounded-xl rounded-br-none p-3 ml-2 max-w-xs md:max-w-sm' 
        : 'bot-bubble rounded-xl rounded-bl-none p-3 ml-2 max-w-[95%] md:max-w-sm bot-message';

    const p = document.createElement('p');
    p.className = isUser ? 'text-white chatbot-message-text' : 'text-gray-700 dark:text-gray-200 chatbot-message-text';
    
    if (isUser) {
        p.textContent = text;
    } else {
        p.innerHTML = markdownToHtml(text);
    }
    
    bubble.appendChild(p);
    
    if (!isUser && buttons.length > 0) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-2 flex flex-col space-y-2';
        buttons.forEach(buttonText => {
            const button = document.createElement('button');
            button.textContent = buttonText;
            button.className = 'bg-green-100 dark:bg-gray-700 border border-green-500/50 text-green-800 dark:text-green-300 text-sm py-1.5 px-3 rounded-lg hover:bg-green-200 dark:hover:bg-gray-600 transition-colors w-full text-left font-medium';
            button.onclick = () => {
                userInput.value = buttonText;
                handleSendMessage();
            };
            buttonContainer.appendChild(button);
        });
        bubble.appendChild(buttonContainer);
    }

    const avatar = document.createElement('div');
    if (isUser) {
        avatar.className = 'w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0 text-gray-600 dark:text-gray-300';
        avatar.textContent = 'U';
    } else {
        avatar.className = 'w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1';
        avatar.innerHTML = `<img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain">`;
    }

    messageElement.appendChild(avatar);
    messageElement.appendChild(bubble);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Auto-hablar respuestas del bot si está habilitado
    if (!isUser && isAutoSpeakEnabled && text.trim()) {
        setTimeout(() => {
            speakText(text, true);
        }, 500);
    }
}

/**
 * Shows or hides the typing indicator in the chat.
 */
function showTypingIndicator(show) {
    let indicator = document.getElementById('typing-indicator');
    if (show && !indicator) {
        indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'message-fade-in flex items-start';
        indicator.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1">
                 <img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain">
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2 typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (!show && indicator) {
        indicator.remove();
    }
}

/**
 * Finds a predefined response using the optimized maps.
 */
function getPredefinedResponse(text) {
    const lowerCaseText = text.toLowerCase().trim();
    
    if (responseMap.has(lowerCaseText)) {
        return responseMap.get(lowerCaseText);
    }

    for (const rule of partialMatchRules) {
        if (lowerCaseText.includes(rule.keyword)) {
            return rule.response;
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
    if (!userText) return;

    addMessage('user', userText);
    userInput.value = '';
    
    const predefinedResponse = getPredefinedResponse(userText);
    if (predefinedResponse) {
        setTimeout(() => {
            addMessage('bot', predefinedResponse);
            chatHistory.push({ role: "user", parts: [{ text: userText }] });
            chatHistory.push({ role: "model", parts: [{ text: predefinedResponse }] });
        }, 500);
        return;
    }
    
    showTypingIndicator(true);
    chatHistory.push({ role: "user", parts: [{ text: userText }] });

    try {
        const systemPrompt = `Eres un asistente virtual especializado en seguridad privada para la oficina OS10 Coquimbo, Chile. Tu función es ayudar con consultas sobre trámites, credenciales, cursos, leyes y normativas de seguridad privada. Responde de manera profesional, clara y concisa en español chileno.`;

        const payload = {
            contents: chatHistory,
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            generationConfig: { 
                temperature: 0.7, 
                maxOutputTokens: 1024 
            },
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No obtuve una respuesta.";
        
        chatHistory.push({ role: "model", parts: [{ text: botText }] });
        addMessage('bot', botText);

    } catch (error) {
        console.error('Error al contactar el proxy de la API:', error);
        addMessage('bot', `Lo siento, ocurrió un error al contactar al asistente. (${error.message})`);
    } finally {
        showTypingIndicator(false);
    }
}

// --- Speech Recognition Event Handlers ---

if (speechRecognition) {
    speechRecognition.onstart = () => {
        console.log('Reconocimiento de voz iniciado');
    };

    speechRecognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        // Mostrar texto intermedio
        const interimElement = document.getElementById('interim-text');
        if (interimElement) {
            interimElement.textContent = interimTranscript;
        }

        // Si hay resultado final, procesarlo
        if (finalTranscript.trim()) {
            stopListening();
            userInput.value = finalTranscript.trim();
            handleSendMessage();
        }
    };

    speechRecognition.onerror = (event) => {
        console.error('Error en reconocimiento de voz:', event.error);
        stopListening();
        
        let errorMessage = 'Error en el reconocimiento de voz: ';
        switch (event.error) {
            case 'no-speech':
                errorMessage += 'No se detectó voz. Inténtalo de nuevo.';
                break;
            case 'audio-capture':
                errorMessage += 'No se pudo acceder al micrófono.';
                break;
            case 'not-allowed':
                errorMessage += 'Permisos de micrófono denegados.';
                break;
            default:
                errorMessage += event.error;
        }
        
        addMessage('bot', errorMessage);
    };

    speechRecognition.onend = () => {
        console.log('Reconocimiento de voz terminado');
        stopListening();
    };
}

// --- Initialization ---

/**
 * Initializes the chatbot, sets up event handlers, and displays a welcome message.
 */
function init() {
    if (!chatToggleButton) {
        console.error("Chatbot UI elements not found. Initialization failed.");
        return;
    }
    
    buildResponseMap();
    initializeVoices();

    // --- Event Listeners ---
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Voice button event listeners
    if (voiceButton) {
        voiceButton.addEventListener('click', startListening);
    }

    if (speakButton) {
        speakButton.addEventListener('click', toggleSpeech);
    }
    
    // --- Mobile-Specific Keyboard Logic ---
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        let isKeyboardMode = false;

        const enterKeyboardMode = () => {
            if (isKeyboardMode) return;
            isKeyboardMode = true;
            document.body.classList.add('chat-open-mobile');
            chatWidgetContainer.classList.add('fullscreen');
            adjustSizeForKeyboard();
        };

        const exitKeyboardMode = () => {
            if (!isKeyboardMode) return;
            isKeyboardMode = false;
            document.body.classList.remove('chat-open-mobile');
            chatWidgetContainer.classList.remove('fullscreen');
            chatWidgetContainer.style.height = '';
            chatWidgetContainer.style.bottom = '';
        };

        const adjustSizeForKeyboard = () => {
            if (!isKeyboardMode) return;
            setTimeout(() => {
                if (window.visualViewport) {
                    const viewportHeight = window.visualViewport.height;
                    chatWidgetContainer.style.height = `${viewportHeight}px`;
                    chatWidgetContainer.style.bottom = '0';
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }, 100);
        };

        const openChat = () => {
            chatPopup.classList.remove('hidden');
            chatBackdrop.classList.remove('hidden');
            chatToggleButton.classList.add('hidden');
        };

        const closeChat = () => {
            chatPopup.classList.add('hidden');
            chatBackdrop.classList.add('hidden');
            chatToggleButton.classList.remove('hidden');
            exitKeyboardMode();
            // Detener funciones de voz al cerrar en móvil
            stopListening();
            stopSpeaking();
        };

        chatToggleButton.addEventListener('click', openChat);
        internalCloseBtn.addEventListener('click', closeChat);
        chatBackdrop.addEventListener('click', closeChat);
        userInput.addEventListener('focus', enterKeyboardMode);

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', adjustSizeForKeyboard);
        }
        window.mobileChatManager = { exitKeyboardMode };
    } else {
        // Desktop-only listeners
        chatToggleButton.addEventListener('click', toggleChat);
        internalCloseBtn.addEventListener('click', toggleChat);
        chatBackdrop.addEventListener('click', toggleChat);
    }

    // --- Auto-speak toggle (Alt + S) ---
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            isAutoSpeakEnabled = !isAutoSpeakEnabled;
            addMessage('bot', `Auto-lectura ${isAutoSpeakEnabled ? 'activada' : 'desactivada'}.`);
        }
    });

    // --- Initial State ---
    chatHistory = [];
    
    const welcomeMessageText = "¡Hola! Soy tu asistente virtual de la oficina OS10 Coquimbo. ¿En qué puedo ayudarte hoy?";
    const welcomeButtons = ["Menú", "Menú O.S.10", "Valores"];
    addMessage('bot', welcomeMessageText, welcomeButtons);
    
    chatHistory.push({ role: "model", parts: [{ text: welcomeMessageText }] });

    console.log("Chatbot with voice capabilities initialized successfully.");
}

// --- Auto-initialize when DOM is ready ---
document.addEventListener('DOMContentLoaded', init);
