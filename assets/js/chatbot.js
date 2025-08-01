/**
 * chatbot.js - TU CÓDIGO ORIGINAL + FUNCIONES DE VOZ
 * SOLO AGREGA VOZ, NO CAMBIA NADA MÁS
 */

// --- TUS ELEMENTOS DOM ORIGINALES (SIN CAMBIOS) ---
const chatPopup = document.getElementById('chat-popup');
const chatToggleButton = document.getElementById('chat-toggle-button');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatBackdrop = document.getElementById('chat-backdrop');
const chatWidgetContainer = document.getElementById('chat-widget-container');
const internalCloseBtn = document.getElementById('chat-close-btn-internal');

// --- FUNCIONES DE VOZ (NUEVAS) ---
let speechSynthesis = window.speechSynthesis;
let speechRecognition = null;
let isListening = false;
let isAutoSpeakEnabled = true;
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
}

function initializeVoices() {
    voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
            voices = speechSynthesis.getVoices();
        });
    }
}

function getSpanishVoice() {
    const spanishVoices = voices.filter(voice => voice.lang.startsWith('es'));
    return spanishVoices[0] || voices[0];
}

function speakText(text) {
    if (!text.trim()) return;
    speechSynthesis.cancel();
    
    const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/<[^>]*>/g, '')
        .replace(/https?:\/\/[^\s]+/g, 'enlace')
        .replace(/🤖|👮🏻‍♂️|🧙🏻‍♂️|⬇️|👇🏽|📋|☝🏼|✅/g, '')
        .trim();
    
    if (!cleanText) return;
    
    currentUtterance = new SpeechSynthesisUtterance(cleanText);
    const voice = getSpanishVoice();
    if (voice) currentUtterance.voice = voice;
    
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 0.8;
    
    speechSynthesis.speak(currentUtterance);
}

function startListening() {
    if (!speechRecognition) {
        alert('Tu navegador no soporta reconocimiento de voz');
        return;
    }
    
    if (isListening) {
        speechRecognition.stop();
        isListening = false;
        const btn = document.getElementById('voice-button');
        if (btn) btn.textContent = '🎤';
        return;
    }
    
    isListening = true;
    const btn = document.getElementById('voice-button');
    if (btn) btn.textContent = '⏹️';
    
    speechRecognition.start();
}

// --- TUS RESPUESTAS PREDEFINIDAS ORIGINALES (SIN CAMBIOS) ---
const predefinedResponses = {
    'rule_4': { keywords: ["guias","guia","componentes del sistema","componentes"], response: '*ESCRIBA EL NOMBRE DEL COMPONENTE DEL SISTEMA Y SE DESCARGARA UNA GUIA, PARA QUE PUEDA REALIZAR SU TRAMITE*👮🏻‍♂️ \n ⬇️\n*1.-* VIGILANTE PRIVADO\n*2.-* GUARDIA DE SEGURIDAD\n*3.-* JEFE DE SEGURIDAD \n*4.-* ENCARGADO DE SEGURIDAD\n*5.-* SUPERVISOR\n*6.-* ASESOR \n*7.-* CAPACITADOR\n*8.-* TÉCNICO \n*9.-* OPERADOR DE CAJEROS \n*10.-* INSTALADOR TÉC. DE SEGURIDAD\n*11.-* OPERADOR CCTV.\n*12.-* EMPRESAS' },
    'rule_5': { keywords: ["guardia de seguridad","guardia","guardia seguridad"], response: '🤖 🧙🏻‍♂️ Ok... en este link encontrará la guía de *GUARDIA DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf' },
    'rule_6': { keywords: ["jefe de seguridad"], response: 'OK..en este link encontrará la guía de *JEFE DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_jefe_de_seguridad.pdf' },
    'rule_65': { keywords: ["*fono*", "*telefono*","*numero*","*ubicados*","*dirección*","*atención*","*horario*","*horarios*","*ubicación*","*direccion oficina*","*cual es la dirección del os10*","*horario atención publico*", "*donde estan*", "*donde esta el os10 coquimbo*", "*donde esta el os10*","*donde*", "*direccion*"], response: '🤖 👉🏼 *OS10 COQUIMBO*\nDe lunes a jueves de 09:00 horas a 13:00 horas.\nCienfuegos 180, La Serena.\nFonos: 512651024-512651022-\nCredenciales:512651023\nhttps://maps.app.goo.gl/QUhujWbTF1FjDA7E6' },
    'rule_66': { keywords: ["menu","menú","menus"], response: '*ESCRIBA LO QUE ESTA CON NEGRILLAS*\nconsultar patente: *ppu*\nConsultar nombre o rut: *rut*\nConsultar guardia *registro*\nmenú OS10: *Os10*\nComisaria cuadrantes: *comisaria*\nCiberseguridad: *ciberseguridad*\nDGAC Seg. Priv. *Dgac*\nModifica 261: *Decreto 32*\nResol.3632: *no hay sistema*\nDirectiva: *directiva*\n*Bots*: Seguridad privada, Ciberseguridad, tránsito, Ley Karyn' },
    'rule_89': { keywords: ["menu os10", "menú O.S.10"], response: '*De acuerdo OS10*🧙🏻‍♂️👮🏻‍♂️☝️*Escriba lo que está con negrillas:* \n \n ⬇️ ESCRIBA El QUE NECESITE:\n➢ *Bots:* recibirá un listado de bots con Inteligencia Avanzada.\n➢ *Componentes:* Obtendrá las guías\n➢ *Manuales:* Se desplega menu\n➢ *Leyes:* Se desplega menu\n➢ *Editable:* Documentos en Word.\n➢ *Directiva:* Requisitos presentar\n➢ *Valores:* Cursos y planes.\n➢ *Independiente:* Requisitos Cred.\n➢ *Menu credencial:* Menú credenciales\n➢ *Nueva Ley:* Nueva ley seguridad privada y reglamento.' },
    'rule_98': { keywords: ["Valores","cuanto cuesta","cual es el valor","valor plan","valores planes","valores plan","*valor*","*cuesta*"], response: '🤖🧙🏻‍♂️ *AQUI ESTAN LOS VALORES 2DO. SEMESTRE 2025*\n1.- CREDENCIAL\nhttps://dal5.short.gy/val\n2.- CRED. EMPRESA\nhttps://dal5.short.gy/C.emp\n3.- CURSO FORMACIÓN\nhttps://dal5.short.gy/Form\n4.- CURSO PERFECC\nhttps://dal5.short.gy/BjzkHI\n5.- VALOR PLAN\nhttps://os10.short.gy/Pl4n' },
    'rule_261': { keywords: ["hola","saludos"], response: '🤖👮🏻‍♂️ ¡Hola! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
    'rule_262': { keywords: ["gracias","muchas gracias","te agradezco","agradezco"], response: '🤖😊 ¡Es un placer ayudarle! Para eso estamos aquí en OS10 Coquimbo. Si tiene alguna otra consulta, no dude en escribirme. ¡Que tenga un excelente día!' },
    'rule_263': { keywords: ["chao","adiós","nos vemos","hasta luego","me voy"], response: '🤖👋 ¡Hasta luego! Gracias por contactar a OS10 Coquimbo. Recuerde que estamos de lunes a jueves de 09:00 a 13:00 horas en Cienfuegos 180, La Serena. ¡Que tenga un buen día!' }
};

// --- TUS CONFIGURACIONES ORIGINALES (SIN CAMBIOS) ---
const API_URL = '/api/gemini';
let chatHistory = [];
let responseMap = new Map();
let partialMatchRules = [];

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
}

// --- TUS FUNCIONES UI ORIGINALES (SIN CAMBIOS) ---
function toggleChat() {
    const isHidden = chatPopup.classList.contains('hidden');
    if (isHidden) {
        chatPopup.classList.remove('hidden');
        chatBackdrop.classList.remove('hidden');
        chatToggleButton.classList.add('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.add('chat-open-mobile');
        }
    } else {
        chatPopup.classList.add('hidden');
        chatBackdrop.classList.add('hidden');
        chatToggleButton.classList.remove('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.remove('chat-open-mobile');
            if (window.mobileChatManager) window.mobileChatManager.exitKeyboardMode();
        }
    }
}

function markdownToHtml(text) {
    if (!text) return '';
    let formattedText = text.replace(/(https?:\/\/[^\s"'<>`]+)/g, '<a href="$1" target="_blank" class="text-blue-700 dark:text-blue-500 hover:underline">$1</a>');
    formattedText = formattedText.replace(/\*(\*?)(.*?)\1\*/g, '<b>$2</b>');
    formattedText = formattedText.replace(/^\s*-\s/gm, '🔹 ');
    return formattedText.replace(/\n/g, '<br>');
}

function addMessage(sender, text, buttons = []) {
    const messageElement = document.createElement('div');
    const isUser = sender === 'user';
    
    messageElement.className = `message-fade-in flex items-start max-w-full`;

    messageElement.classList.toggle('ml-auto', isUser);
    messageElement.classList.toggle('flex-row-reverse', isUser);

    const bubble = document.createElement('div');
    bubble.className = isUser 
        ? 'bg-green-500 rounded-xl rounded-br-none p-3 ml-2 max-w-xs md:max-w-sm' 
        : 'bot-bubble rounded-xl rounded-bl-none p-3 ml-2 max-w-[95%] md:max-w-sm';

    const p = document.createElement('p');
    p.className = isUser ? 'text-white chatbot-message-text' : 'text-gray-700 dark:text-gray-200 chatbot-message-text';
    
    if (isUser) {
        p.textContent = text;
    } else {
        p.innerHTML = markdown   
    // ==== CÓDIGO DE VOZ PARA AGREGAR AL FINAL DE TU CHATBOT.JS ====
// NO TOQUES NADA DE TU CÓDIGO ORIGINAL, SOLO AGREGA ESTO AL FINAL

// Variables de voz
let speechSynth = window.speechSynthesis;
let recognition = null;
let isRecording = false;

// Configurar reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';
}

// Función para hablar texto
function speakMessage(text) {
    if (!text) return;
    
    // Limpiar texto
    const cleanText = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/🤖|👮🏻‍♂️|🧙🏻‍♂️|⬇️|👇🏽|📋|☝🏼|✅/g, '')
        .replace(/https?:\/\/[^\s]+/g, 'enlace')
        .trim();
    
    if (!cleanText) return;
    
    speechSynth.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.volume = 0.8;
    speechSynth.speak(utterance);
}

// Función para usar micrófono
function startVoiceInput() {
    if (!recognition) {
        alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome.');
        return;
    }
    
    if (isRecording) {
        recognition.stop();
        return;
    }
    
    isRecording = true;
    recognition.start();
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('user-input');
        if (input) {
            input.value = transcript;
            // Enviar automáticamente
            const sendBtn = document.getElementById('send-button');
            if (sendBtn) sendBtn.click();
        }
    };
    
    recognition.onerror = function() {
        isRecording = false;
    };
    
    recognition.onend = function() {
        isRecording = false;
    };
}

// Función para leer último mensaje
function readLastMessage() {
    const messages = document.querySelectorAll('#chat-messages .message-fade-in');
    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.textContent || lastMessage.innerText;
        speakMessage(text);
    }
}

// Agregar botones de voz después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // Buscar el input del chat
        const inputContainer = document.querySelector('#chat-popup footer .flex');
        if (inputContainer) {
            // Crear botón de micrófono
            const voiceBtn = document.createElement('button');
            voiceBtn.innerHTML = '🎤';
            voiceBtn.className = 'bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-white';
            voiceBtn.onclick = startVoiceInput;
            voiceBtn.title = 'Hablar';
            
            // Crear botón de altavoz
            const speakBtn = document.createElement('button');
            speakBtn.innerHTML = '🔊';
            speakBtn.className = 'bg-green-500 hover:bg-green-600 rounded-lg p-2 text-white';
            speakBtn.onclick = readLastMessage;
            speakBtn.title = 'Leer mensaje';
            
            // Insertar botones
            const input = inputContainer.querySelector('input');
            if (input) {
                inputContainer.insertBefore(voiceBtn, input);
                inputContainer.insertBefore(speakBtn, input);
            }
        }
        
        // Auto-leer respuestas del bot
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('message-fade-in')) {
                        // Si es un mensaje del bot (no del usuario)
                        if (!node.querySelector('.bg-green-500')) {
                            setTimeout(function() {
                                const text = node.textContent || node.innerText;
                                speakMessage(text);
                            }, 1000);
                        }
                    }
                });
            });
        });
        
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            observer.observe(chatMessages, { childList: true });
        }
    }, 2000);
});

// Atajo Alt+S para activar/desactivar voz
let voiceEnabled = true;
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        voiceEnabled = !voiceEnabled;
        console.log('Voz ' + (voiceEnabled ? 'activada' : 'desactivada'));
    }
});
