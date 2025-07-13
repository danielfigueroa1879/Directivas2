/**
 * chatbot.js
 * * This module handles all the functionality for the floating chatbot widget.
 * It manages the UI, state, and communication with the Gemini API.
 */

// --- DOM Element Selection ---
const chatPopup = document.getElementById('chat-popup');
const chatToggleButton = document.getElementById('chat-toggle-button');
const openIcon = document.getElementById('chat-open-icon');
const closeIcon = document.getElementById('chat-close-icon');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// --- API Configuration ---
const API_KEY = 'AIzaSyAgOFzsnwwLt4TSb1lO3XZ8Ot9QJUX7Y6A';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// --- State Management ---
let chatHistory = [];
const systemPrompt = `Eres un asistente virtual experto en materias de seguridad privada en Chile, enfocado en las directivas y procedimientos de OS10 de Carabineros. Tu conocimiento incluye: Decreto Ley 3.607, Decretos 93, 261, 32, Resolución 1480, y todo sobre Directivas de Funcionamiento (DD.FF.) y credenciales. Responde de forma clara y precisa, basándote en la normativa chilena. Si no sabes algo, indícalo amablemente.`;

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
                <p class="text-white text-sm">${text}</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0">U</div>
        `;
    } else {
        messageElement.classList.add('mr-auto');
        messageContent = `
            <div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0zM7 12a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>
            </div>
            <div class="bg-gray-700 rounded-xl rounded-bl-none p-3 ml-2">
                <p class="text-gray-200 text-sm">${text}</p>
            </div>
        `;
    }
    
    messageElement.innerHTML = messageContent;
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

// --- API Communication ---

/**
 * Sends the user's message to the Gemini API and displays the response.
 */
async function handleSendMessage() {
    const userText = userInput.value.trim();
    if (userText === '') return;

    addMessage('user', userText);
    userInput.value = '';
    showTypingIndicator(true);
    
    // Add user message to history
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
        const botText = data.candidates[0].content.parts[0].text;
        
        // Add bot response to history
        chatHistory.push({ role: "model", parts: [{ text: botText }] });
        
        showTypingIndicator(false);
        addMessage('bot', botText);

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
