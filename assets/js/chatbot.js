// ===== SCRIPT PRINCIPAL DEL CHATBOT CON VOCES MODERNAS INTEGRADO =====
document.addEventListener('DOMContentLoaded', function() {

    // FORZAR MODO CLARO SIEMPRE - MODO OSCURO COMPLETAMENTE ELIMINADO
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    
    // ===== CONFIGURACIÓN DE VOCES MODERNAS =====
    
    // IDs de Voces de ElevenLabs (CALIDAD PREMIUM)
    const ELEVENLABS_VOICES = {
        'Diego': 'g5CIjZEefAph4nQFvHAz',    // Voz española masculina profesional
        'Antoni': 'ErXwobaYiN019PkySvjV',   // Voz joven y energética
        'Josh': 'TxGEqnHWrfWFTfGW9XjX',     // Voz madura y confiable
        'Adam': 'pNInz6obpgDQGcFmaJgB',     // Voz profunda narrativa
        'Alejandro': 'nPczCjzI2devNBz1zQrb' // Voz latina masculina
    };
    
    // Variables de voz globales
    let selectedVoiceId = ELEVENLABS_VOICES.Alejandro; // Voz predeterminada: Alejandro
    let selectedVoiceName = 'Alejandro';
    let elevenLabsApiKey = "sk_1b80fca9e199e8985befc0a89a387eb5777b055f866b9cbf";
    let isAutoReadEnabled = true;
    let isListening = false;
    let recognition;
    let availableVoices = [];
    let fallbackMessageShown = false;
    
    // --- Lógica del Chatbot ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynth = window.speechSynthesis;
    
    // Cargar reglas desde el objeto global `window.responses` que se espera que `chatbot-rules.js` defina.
    // Si el archivo externo no carga o no define `window.responses`, `allRules` será un array vacío.
    const allRules = Object.values(window.responses || {});

    const systemPrompt = window.systemPrompt || 'You are a help assistant.'; 

    // ===== FUNCIONES DE SÍNTESIS DE VOZ MODERNAS MEJORADAS =====

    // Detectar tipo de dispositivo con mayor precisión
    function getDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();
        
        // Detectar iOS (iPhone, iPad, iPod)
        if (/iphone|ipad|ipod/.test(userAgent) || /ipad|iphone|ipod/.test(platform)) {
            return 'ios';
        }
        
        // Detectar Android
        if (/android/.test(userAgent)) {
            return 'android';
        }
        
        // Detectar Windows
        if (/win/.test(platform)) {
            return 'windows';
        }
        
        // Detectar macOS
        if (/mac/.test(platform)) {
            return 'macos';
        }
        
        // Por defecto: desktop
        return 'desktop';
    }

    // Función específica para iOS que evita el chicharreo
    function speakWithIOSOptimization(text) {
        if (!text || !text.trim()) return;
        
        // Cancelar cualquier síntesis anterior
        speechSynth.cancel();
        
        // Dividir texto largo en fragmentos más pequeños para iOS
        const maxLength = 100;
        const textChunks = [];
        let currentChunk = '';
        
        const words = text.split(' ');
        for (const word of words) {
            if ((currentChunk + ' ' + word).length > maxLength) {
                if (currentChunk) textChunks.push(currentChunk.trim());
                currentChunk = word;
            } else {
                currentChunk += (currentChunk ? ' ' : '') + word;
            }
        }
        if (currentChunk) textChunks.push(currentChunk.trim());
        
        // Función recursiva para reproducir fragmentos con pausas
        function speakChunk(index) {
            if (index >= textChunks.length) return;
            
            const utterance = new SpeechSynthesisUtterance(textChunks[index]);
            
            // Buscar la mejor voz en español para iOS
            const voices = speechSynth.getVoices();
            const spanishVoice = voices.find(v => 
                v.lang.startsWith('es') && 
                (v.name.includes('Jorge') || v.name.includes('Diego') || v.name.includes('Spanish'))
            ) || voices.find(v => v.lang.startsWith('es'));
            
            if (spanishVoice) {
                utterance.voice = spanishVoice;
            }
            
            // Configuración optimizada para iOS
            utterance.lang = 'es-ES';
            utterance.rate = 0.5;    // Velocidad muy controlada
            utterance.pitch = 0.9;   // Pitch natural
            utterance.volume = 0.7;  // Volumen controlado
            
            utterance.onend = () => {
                // Pausa corta entre fragmentos y continuar
                setTimeout(() => speakChunk(index + 1), 200);
            };
            
            utterance.onerror = (event) => {
                console.error('Error en fragmento iOS:', event.error);
                // Continuar con el siguiente fragmento aunque haya error
                setTimeout(() => speakChunk(index + 1), 500);
            };
            
            speechSynth.speak(utterance);
        }
        
        // Iniciar la reproducción del primer fragmento
        speakChunk(0);
    }

    // Función mejorada para encontrar coincidencias exactas
    function getBestMaleVoice() {
        const voices = speechSynth.getVoices();
        const deviceType = getDeviceType();
        
        console.log(`Dispositivo detectado: ${deviceType}, Voces disponibles: ${voices.length}`);
        
        // Para iOS, priorizar voces específicas que funcionan mejor
        if (deviceType === 'ios') {
            const iosPreferred = ['Jorge', 'Diego', 'Spanish (Spain)', 'Spanish'];
            for (const preferredName of iosPreferred) {
                const voice = voices.find(v => {
                    const name = v.name.toLowerCase();
                    return name.includes(preferredName.toLowerCase());
                });
                if (voice) {
                    console.log(`Voz iOS optimizada encontrada: ${voice.name}`);
                    return voice;
                }
            }
        }
        
        // Definir prioridades de voces por dispositivo y género
        const voiceSelectionRules = {
            ios: {
                // iOS prioriza voces nativas masculinas
                preferred: ['Jorge', 'Diego', 'Carlos', 'Miguel'],
                languages: ['es-ES', 'es-MX', 'es-AR'],
                excludeFemale: ['Mónica', 'Marisol', 'Paulina', 'Isabel']
            },
            android: {
                // Android a menudo tiene voces genéricas, buscar masculinas
                preferred: ['es-es-x-eea-network', 'es-es-x-eea-local', 'Diego', 'Carlos'],
                languages: ['es-ES', 'es-MX', 'es-US'],
                excludeFemale: ['es-es-x-eed-network', 'es-es-x-eed-local']
            },
            windows: {
                // Windows tiene voces Microsoft específicas
                preferred: ['Microsoft Diego', 'Microsoft Jorge', 'Microsoft Pablo'],
                languages: ['es-ES', 'es-MX'],
                excludeFemale: ['Microsoft Helena', 'Microsoft Sabina']
            },
            macos: {
                // macOS voces del sistema
                preferred: ['Diego', 'Jorge', 'Juan'],
                languages: ['es-ES', 'es-MX'],
                excludeFemale: ['Mónica', 'Paulina']
            },
            desktop: {
                // Fallback para otros escritorios
                preferred: ['Diego', 'Jorge', 'Carlos', 'Google español'],
                languages: ['es-ES', 'es-MX', 'es-AR'],
                excludeFemale: ['Helena', 'Sabina', 'Mónica']
            }
        };
        
        const rules = voiceSelectionRules[deviceType] || voiceSelectionRules.desktop;
        
        // 1. Buscar por nombres preferidos específicos
        for (const preferredName of rules.preferred) {
            const voice = voices.find(v => {
                const name = v.name.toLowerCase();
                return name.includes(preferredName.toLowerCase());
            });
            
            if (voice) {
                console.log(`Voz masculina encontrada por nombre: ${voice.name}`);
                return voice;
            }
        }
        
        // 2. Buscar por idiomas preferidos excluyendo voces femeninas
        for (const lang of rules.languages) {
            const voice = voices.find(v => {
                const name = v.name.toLowerCase();
                const voiceLang = v.lang.toLowerCase();
                
                // Debe coincidir el idioma y NO estar en la lista de exclusión
                return voiceLang.startsWith(lang.toLowerCase()) && 
                       !rules.excludeFemale.some(female => name.includes(female.toLowerCase()));
            });
            
            if (voice) {
                console.log(`Voz masculina encontrada por idioma: ${voice.name} (${voice.lang})`);
                return voice;
            }
        }
        
        // 3. Buscar cualquier voz en español que no sea obviamente femenina
        const commonFemaleNames = [
            'helena', 'sabina', 'mónica', 'paulina', 'marisol', 'isabel',
            'maria', 'carmen', 'pilar', 'esperanza', 'francisca', 'paloma'
        ];
        
        const neutralVoice = voices.find(v => {
            const name = v.name.toLowerCase();
            const lang = v.lang.toLowerCase();
            
            return lang.startsWith('es') && 
                   !commonFemaleNames.some(female => name.includes(female));
        });
        
        if (neutralVoice) {
            console.log(`Voz neutral encontrada: ${neutralVoice.name}`);
            return neutralVoice;
        }
        
        // 4. Último recurso: primera voz en español
        const anySpanishVoice = voices.find(v => v.lang.startsWith('es'));
        if (anySpanishVoice) {
            console.log(`Fallback voz española: ${anySpanishVoice.name}`);
            return anySpanishVoice;
        }
        
        console.warn('No se encontró ninguna voz en español, usando voz por defecto');
        return null;
    }

    // Función principal de TTS con configuración adaptativa por dispositivo
    function speakWithEnhancedBrowser(text) {
        if (!text || !text.trim()) return;
        
        const deviceType = getDeviceType();
        
        // Para iOS, usar la función optimizada específica
        if (deviceType === 'ios') {
            speakWithIOSOptimization(text);
            return;
        }
        
        // Cancelar cualquier síntesis anterior
        speechSynth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Seleccionar la mejor voz masculina
        const selectedVoice = getBestMaleVoice();
        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log(`Usando voz: ${selectedVoice.name} en ${deviceType}`);
        }

        // Configuración específica por tipo de dispositivo (excluyendo iOS)
        switch (deviceType) {
            case 'android':
                // Android: adaptar voz femenina a sonar más masculina
                utterance.lang = 'es-ES';
                utterance.rate = 1.3;   // Velocidad moderada-lenta
                utterance.pitch = 0.6;  // Pitch muy bajo para simular voz masculina
                utterance.volume = 1.0;
                console.log('Configuración Android aplicada: rate=0.75, pitch=0.45 (adaptación masculina)');
                break;
                
            case 'windows':
                // Windows PC: configuración estándar masculina
                utterance.lang = 'es-CL';
                utterance.rate = 1.5;   // Velocidad natural
                utterance.pitch = 0.7;  // Tono masculino estándar
                utterance.volume = 1.0;
                console.log('Configuración Windows aplicada: rate=0.85, pitch=0.65');
                break;
                
            case 'macos':
                // macOS: ajuste para voces del sistema
                utterance.lang = 'es-ES';
                utterance.rate = 1.2;    // Ligeramente más lento
                utterance.pitch = 0.8;   // Tono masculino
                utterance.volume = 1.0;
                console.log('Configuración macOS aplicada: rate=0.8, pitch=0.6');
                break;
                
            case 'desktop':
            default:
                // Otros escritorios: configuración por defecto
                utterance.lang = 'es-CL';
                utterance.rate = 1.2;
                utterance.pitch = 0.8;
                utterance.volume = 1.0;
                console.log('Configuración Desktop aplicada: rate=0.85, pitch=0.65');
                break;
        }

        // Eventos para debugging
        utterance.onstart = () => {
            console.log(`Iniciando síntesis en ${deviceType} con ${selectedVoice?.name || 'voz por defecto'}`);
        };
        
        utterance.onend = () => {
            console.log('Síntesis completada');
        };
        
        utterance.onerror = (event) => {
            console.error('Error en síntesis de voz:', event.error);
        };

        // Reproducir
        speechSynth.speak(utterance);
    }

    // TTS de ElevenLabs mejorado con mejor manejo de errores
    async function speakWithElevenLabs(text) {
        if (!elevenLabsApiKey) {
            console.warn('ElevenLabs API key no configurada');
            throw new Error('No API key configured');
        }

        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': elevenLabsApiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_multilingual_v2',
                    voice_settings: {
                        stability: 0.75,
                        similarity_boost: 0.9,
                        style: 0.6,
                        use_speaker_boost: true
                    }
                })
            });

            if (!response.ok) {
                // Si la API key expiró o es inválida, deshabilitarla para esta sesión
                if (response.status === 401 || response.status === 403) {
                    console.error('ElevenLabs API key expirada o inválida, deshabilitando para esta sesión');
                    elevenLabsApiKey = null; // Deshabilitar para esta sesión
                    throw new Error('API key expirada');
                }
                
                if (response.status === 429) {
                    console.error('ElevenLabs: límite de cuota excedido');
                    throw new Error('Cuota excedida');
                }
                
                throw new Error(`ElevenLabs API error: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            // Configurar limpieza automática
            const cleanup = () => URL.revokeObjectURL(audioUrl);
            audio.onended = cleanup;
            audio.onerror = cleanup;
            
            // Reproducir audio
            await audio.play();
            console.log('ElevenLabs: reproducción exitosa');
            
        } catch (error) {
            console.warn('ElevenLabs falló:', error.message);
            throw error; // Re-lanzar para activar fallback
        }
    }

    // Función principal de TTS con fallback inteligente
    async function speakText(text) {
        if (!text || !text.trim()) return;

        // Limpiar texto para TTS
       const cleanText = text
            .replace(/<[^>]*>/gy, '') // Eliminar etiquetas HTML
            .replace(/\*\*(.*?)\*\*/gy, '$1') // Eliminar negritas markdown
            .replace(/\*(.*?)\*/gy, '$1') // Eliminar cursivas markdown
            .replace(/<br>/gy, '. ') // Reemplazar <br> con pausas
            .replace(/\n/gy, '. ') // Reemplazar saltos de línea con puntos
            .replace(/\s+/gy, ' ') // Normalizar espacios en blanco
            .trim();
        
        try {
            // Intentar ElevenLabs solo si la API key está disponible
            if (elevenLabsApiKey) {
                await speakWithElevenLabs(cleanText);
                // Resetear flag de fallback si ElevenLabs funciona
                if (fallbackMessageShown) {
                    fallbackMessageShown = false;
                }
                return;
            }
        } catch (error) {
            console.warn('ElevenLabs no disponible, usando voz del navegador:', error.message);
            
            // Mostrar mensaje de cambio solo una vez por sesión
            if (!fallbackMessageShown) {
                // Solo logear el cambio, no mostrar mensaje al usuario
                console.log('Cambiando a voz del navegador con configuración optimizada');
                fallbackMessageShown = true;
            }
        }

        // Fallback: voz del navegador con configuración mejorada
        speakWithEnhancedBrowser(cleanText);
    }

    // Función mejorada para cargar voces
    function loadVoices() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 10;
            
            function tryLoadVoices() {
                const voices = speechSynth.getVoices();
                attempts++;
                
                if (voices.length > 0) {
                    availableVoices = voices;
                    console.log(`${voices.length} voces cargadas después de ${attempts} intentos`);
                    
                    // Mostrar información de voces en español disponibles
                    const spanishVoices = voices.filter(v => v.lang.startsWith('es'));
                    console.log(`Voces en español disponibles (${spanishVoices.length}):`);
                    spanishVoices.forEach(voice => {
                        console.log(`  - ${voice.name} (${voice.lang}) ${voice.default ? '[DEFAULT]' : ''}`);
                    });
                    
                    // Probar la mejor voz masculina
                    const bestVoice = getBestMaleVoice();
                    if (bestVoice) {
                        console.log(`Mejor voz masculina seleccionada: ${bestVoice.name}`);
                    }
                    
                    resolve(voices);
                } else if (attempts < maxAttempts) {
                    // Reintentar después de un breve retraso
                    setTimeout(tryLoadVoices, 100);
                } else {
                    console.warn('No se pudieron cargar las voces después de múltiples intentos');
                    resolve([]);
                }
            }
            
            tryLoadVoices();
        });
    }

    // Función para cambiar la voz de ElevenLabs
    function changeVoice(voiceName) {
        if (ELEVENLABS_VOICES[voiceName]) {
            selectedVoiceId = ELEVENLABS_VOICES[voiceName];
            selectedVoiceName = voiceName;
            console.log(`Voz de ElevenLabs cambiada a: ${voiceName}`);
            
            // Probar la nueva voz solo si ElevenLabs está disponible
            if (elevenLabsApiKey) {
                const testText = `Hola, soy ${voiceName}, tu asistente de voz de OS10.`;
                speakText(testText);
            } else {
                console.log('ElevenLabs no disponible, usando voz del navegador');
                const testText = `Voz cambiada. Usando configuración optimizada del navegador.`;
                speakWithEnhancedBrowser(testText);
            }
        }
    }

    // Función de inicialización del sistema de voces
    async function initializeVoiceSystem() {
        console.log('Inicializando sistema de voces optimizado...');
        
        const deviceType = getDeviceType();
        console.log(`Dispositivo detectado: ${deviceType}`);
        
        // Cargar voces del navegador
        await loadVoices();
        
        // Configurar listener para cambios de voces
        if (speechSynth.onvoiceschanged !== undefined) {
            speechSynth.onvoiceschanged = () => {
                console.log('Voces del sistema actualizadas');
                loadVoices();
            };
        }
        
        // Mensaje de configuración completa
        setTimeout(() => {
            const deviceMessages = {
                ios: 'Sistema configurado para iPhone/iPad con optimización anti-chicharreo',
                android: 'Sistema configurado para Android con adaptación de voz masculina',
                windows: 'Sistema configurado para Windows con voces Microsoft',
                macos: 'Sistema configurado para macOS con voces del sistema',
                desktop: 'Sistema configurado para escritorio con voces estándar'
            };
            
            console.log(deviceMessages[deviceType] || deviceMessages.desktop);
        }, 1500);
    }

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-CL';
        recognition.continuous = false;
        recognition.interimResults = false;
    } else {
        console.warn("Speech recognition is not supported in this browser.");
        document.getElementById('voice-btn').style.display = 'none';
    }

    // FUNCIÓN MEJORADA PARA ENCONTRAR COINCIDENCIAS EXACTAS
    function findExactMatch(userText, allRules) {
        const normalizedUserText = userText.toLowerCase().trim();
        
        // 1. Buscar coincidencia exacta primero
        for (const rule of allRules) {
            if (rule && rule.keywords) {
                for (const keyword of rule.keywords) {
                    const normalizedKeyword = keyword.replace(/\*/g, '').toLowerCase().trim();
                    
                    // Coincidencia exacta
                    if (normalizedUserText === normalizedKeyword) {
                        console.log(`Coincidencia EXACTA: "${normalizedUserText}" === "${normalizedKeyword}"`);
                        return rule.response;
                    }
                }
            }
        }
        
        // 2. Si no hay coincidencia exacta, buscar por inclusión (solo para frases más largas)
        // La condición se aumentó de > 5 a > 15 para evitar que preguntas genéricas 
        // sean absorbidas por palabras clave comunes, asegurando que la IA sea el fallback.
        if (normalizedUserText.length > 15) { 
            for (const rule of allRules) {
                if (rule && rule.keywords) {
                    for (const keyword of rule.keywords) {
                        const normalizedKeyword = keyword.replace(/\*/g, '').toLowerCase().trim();
                        
                        // Buscar por inclusión si la palabra clave es relevante (largo > 3)
                        if (normalizedKeyword.length > 3 && normalizedUserText.includes(normalizedKeyword)) {
                            console.log(`Coincidencia por INCLUSIÓN (Largo > 15): "${normalizedUserText}" incluye "${normalizedKeyword}"`);
                            return rule.response;
                        }
                    }
                }
            }
        }
        
        return null; // Si no hay coincidencias, se devuelve null para forzar la llamada a la IA
    }

    function toggleChat() {
        console.log('🔄 toggleChat() llamado');
        const popup = document.getElementById('chat-popup');
        const backdrop = document.getElementById('chat-backdrop');
        const button = document.getElementById('chat-toggle-button');
        
        console.log('Popup:', popup ? '✅' : '❌');
        console.log('Backdrop:', backdrop ? '✅' : '❌');
        console.log('Button:', button ? '✅' : '❌');
        
        if (!popup || !backdrop || !button) {
            console.error('❌ Error: No se encontraron los elementos del chatbot');
            return;
        }
        
        const isHidden = popup.classList.contains('chat-popup-hidden');
        console.log('Estado actual - isHidden:', isHidden);
        
        if (isHidden) {
            // Abrir el chat
            popup.classList.remove('chat-popup-hidden');
            popup.classList.add('chat-popup-visible');
            backdrop.classList.remove('hidden');
            button.style.display = 'none';
            console.log('✅ Chat ABIERTO');
        } else {
            // Cerrar el chat
            popup.classList.remove('chat-popup-visible');
            popup.classList.add('chat-popup-hidden');
            backdrop.classList.add('hidden');
            button.style.display = 'flex';
            console.log('✅ Chat CERRADO');
        }
    }

    // FUNCIÓN CORREGIDA PARA MOSTRAR NEGRITAS
    function addMessage(sender, text, buttons = []) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        
        let content = '';
        if (sender === 'user') {
            messageDiv.className = 'flex items-start space-x-2 mb-3 justify-end';
            content = `<div class="bg-blue-500 text-white p-3 rounded-lg max-w-xs">${text}</div><div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">U</div>`;
        } else {
            messageDiv.className = 'flex items-start space-x-2 mb-1';
            
            // PRIMERO: Procesar negritas para HTML (ANTES de todo lo demás)
            let formattedText = text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold; color: #1f2937;">$1</strong>') 
                .replace(/\*(.*?)\*/g, '$1')                      // Quitar cursivas simples
                .replace(/\n/g, '<br>');                          // Saltos de línea a <br>
            
            // SEGUNDO: Procesar URLs (después de las negritas)
            const urlRegex = /(\b(?:https?:\/\/)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9\-_./?=&%#]*)?)/g;
            formattedText = formattedText.replace(urlRegex, (url) => {
                // Ignorar direcciones de correo
                if (url.includes('@')) return url;
                
                const cleanedUrl = url.replace(/[.,!?)\]]*$/, '');
                let fullUrl = cleanedUrl.startsWith('http') ? cleanedUrl : 'https://' + cleanedUrl;
                let buttonText = "Google Maps";
                if (/(dal5\.short\.gy|os10\.short\.gy|d6\.short\.gy)/.test(cleanedUrl)) buttonText = "Descargar";
                else if (cleanedUrl.includes('bcn.cl')) buttonText = "Ver ley";
                else if (cleanedUrl.includes('zosepcar.cl')) buttonText = "Ver OS10";
                return ` <button onclick="window.open('${fullUrl}', '_blank')" class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium">${buttonText}</button>`;
            });

            // TERCERO: Crear botones HTML
            const buttonsHtml = buttons.length > 0 ? '<div class="mt-2 space-y-1">' + buttons.map(btn => `<button class="response-button block w-full text-left bg-green-100 hover:bg-green-200 border border-green-500/50 text-green-800 text-sm py-1.5 px-3 rounded-lg transition-all font-medium" onclick="window.handleUserButtonClick('${btn}')">${btn}</button>`).join('') + '</div>' : '';
            
            // CUARTO: Crear contenido HTML final
            content = `<div class="w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1"><img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain"></div><div class="bg-gray-100 p-3 rounded-lg max-w-sm text-gray-800 leading-tight">${formattedText}${buttonsHtml}</div>`;
            
            // QUINTO: TTS por separado (usando texto ORIGINAL sin procesar)
            if (isAutoReadEnabled) {
                // Limpiar SOLO para síntesis de voz (no afecta el HTML ya creado)
                const textForTTS = text
                    .replace(/\*\*(.*?)\*\*/g, '$1')          // Quitar asteriscos para TTS
                    .replace(/\*(.*?)\*/g, '$1')              
                    .replace(/<[^>]*>/g, '')                  // Quitar HTML
                    .replace(/\n/g, '. ')                     
                    .replace(/(?:https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/g, '')
                    .replace(/\bgy\b/g, '')
                    .replace(/\/val\b/g, '')                  // Eliminar el sufijo /val
                    .replace(/\/C\.emp\b/g, '')               // Eliminar el sufijo /C.emp
                    .replace(/\/Form\b/g, '')                 // Eliminar el sufijo /Form
                    .replace(/\/BjzkHI\b/g, '')               // Eliminar el sufijo /BjzkHI
                    .replace(/\/Pl4n\b/g, '')                 // Eliminar el sufijo /Pl4n
                    .replace(/\\/g, '')                       // Eliminar el backslash "\"
                    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
                    .replace(/\+?\d{1,4}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,9}[-\s]?\d{1,9}/g, '')
                    .replace(/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{0AFE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25AA}-\u{25AB}\u{23FA}\u{200D}\u{FE0F}]/ug, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                    
                setTimeout(() => speakText(textForTTS), 300);
            }
        }
        
        messageDiv.innerHTML = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
        
    window.handleUserButtonClick = (text) => {
         document.getElementById('user-input').value = text;
         handleMessage();
    }

    async function handleMessage() {
        const input = document.getElementById('user-input');
        const text = input.value.trim();
        
        if (!text) return;
        
        addMessage('user', text);
        input.value = '';
        
        // Usar la función de búsqueda mejorada
        const response = findExactMatch(text, allRules);
        
        // Si se encuentra una respuesta en las reglas, mostrarla
        if (response) {
            setTimeout(() => addMessage('bot', response), 500);
            return; // Terminar la ejecución aquí
        }

        // Si NO se encuentra una respuesta, consultar a la IA
        addTypingIndicator();
        try {
            // Combinar el prompt del sistema con la pregunta del usuario
            const fullPrompt = `${systemPrompt}\n\n**User Query:**\n${text}\n\n**Knowledge Base for reference (JSON):**\n\`\`\`json\n${JSON.stringify(allRules, null, 2)}\n\`\`\`\n\n**Response:**`;

            console.log("-> Fallback a Asistente Inteligente (Gemini). Enviando prompt:", fullPrompt); // Log para confirmar el fallback

            // Construir el cuerpo de la solicitud para la API de Gemini
            const geminiPayload = {
                contents: [{ parts: [{ text: fullPrompt }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                ],
            };

            // USAR LA URL CORRECTA DEL PROXY CONFIGURADO EN NETLIFY.TOML
            const apiResponse = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geminiPayload),
            });

            removeTypingIndicator();

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json();
                console.error("Error from proxy:", errorData);
                throw new Error(`Server error: ${apiResponse.status}`);
            }

            const data = await apiResponse.json();
            
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude obtener una respuesta del asistente inteligente.";
            addMessage('bot', aiResponse);

        } catch (error) {
            console.error("Error contacting AI assistant:", error);
            removeTypingIndicator();
            addMessage('bot', "Hubo un problema de conexión con el asistente inteligente. Por favor intenta de nuevo más tarde.");
        }
    }
    
    function addTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-start space-x-2 mb-3';
        typingDiv.innerHTML = `<div class="w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1"><img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain"></div><div class="bg-gray-100 p-3 rounded-lg"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    function startVoiceInput() {
        if (!recognition) return;
        const voiceBtn = document.getElementById('voice-btn');
        if (isListening) {
            recognition.stop();
            return;
        }
        isListening = true;
        voiceBtn.classList.add('animate-pulse');
        recognition.start();
        recognition.onresult = (event) => {
            document.getElementById('user-input').value = event.results[0][0].transcript;
            handleMessage();
        };
        recognition.onerror = (event) => console.error("Voice recognition error:", event.error);
        recognition.onend = () => {
            isListening = false;
            voiceBtn.classList.remove('animate-pulse');
        };
    }

    function readLastMessage() {
        const messages = document.querySelectorAll('#chat-messages .text-gray-800');
        if (messages.length > 0) speakText(messages[messages.length - 1].innerText);
    }
    
    // --- Asignación de Eventos ---
    const chatToggleBtn = document.getElementById('chat-toggle-button');
    const chatCloseBtn = document.getElementById('chat-close-btn-internal');
    const chatBackdrop = document.getElementById('chat-backdrop');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    
    console.log('🤖 Chatbot: Inicializando eventos...');
    console.log('Botón toggle:', chatToggleBtn ? '✅ Encontrado' : '❌ NO encontrado');
    console.log('Botón cerrar:', chatCloseBtn ? '✅ Encontrado' : '❌ NO encontrado');
    console.log('Backdrop:', chatBackdrop ? '✅ Encontrado' : '❌ NO encontrado');
    
    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', function(e) {
            console.log('🖱️ Click en botón de chatbot detectado');
            toggleChat();
        });
    }
    
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChat);
    if (chatBackdrop) chatBackdrop.addEventListener('click', toggleChat);
    if (sendButton) sendButton.addEventListener('click', handleMessage);
    if (userInput) userInput.addEventListener('keypress', e => e.key === 'Enter' && handleMessage());
    
    // Evento para cambiar el selector de voz
    document.getElementById('voiceSelector').addEventListener('change', (e) => {
        changeVoice(e.target.value);
    });
    
    const toggleSpeakBtn = document.getElementById('toggle-speak-btn');
    const speakerOnIcon = document.getElementById('speaker-on-icon');
    const speakerOffIcon = document.getElementById('speaker-off-icon');

    toggleSpeakBtn.addEventListener('click', () => {
        isAutoReadEnabled = !isAutoReadEnabled;
        speakerOnIcon.classList.toggle('hidden', !isAutoReadEnabled);
        speakerOffIcon.classList.toggle('hidden', isAutoReadEnabled);
        toggleSpeakBtn.classList.toggle('bg-yellow-500', isAutoReadEnabled);
        toggleSpeakBtn.classList.toggle('hover:bg-yellow-600', isAutoReadEnabled);
        toggleSpeakBtn.classList.toggle('bg-gray-500', !isAutoReadEnabled);
        toggleSpeakBtn.classList.toggle('hover:bg-gray-600', !isAutoReadEnabled);
        if (!isAutoReadEnabled) speechSynth.cancel();
    });

    if (recognition) document.getElementById('voice-btn').addEventListener('click', startVoiceInput);
    document.getElementById('speak-btn').addEventListener('click', readLastMessage);
    document.addEventListener('keydown', e => { if (e.altKey && e.key === 'v') { e.preventDefault(); startVoiceInput(); } });

    // Inicializar sistema de voces mejorado
    initializeVoiceSystem();

    // --- Carga de reglas y verificación del mensaje de bienvenida ---
    if(Object.keys(window.responses || {}).length === 0) {
        console.error("Warning! Rules could not be loaded from 'rules/chatbot-rules.js'. The bot will operate in 'AI-only' mode.");
    }

    // --- Mensajes de Bienvenida Aleatorios ---
    const welcomeMessages = [
        // Lote 1
        "¡Hola! Soy **Daniel**. Mi IA está lista para tus consultas de OS10. ¿En qué te ayudo?",
        "¡Buenas! Soy **Mauricio**. ¿Listo para enfrentar el papeleo? ¡Estoy aquí para guiarte en cada paso!",
        "¡Qué tal! Soy **Juan**. Cargando base de datos de seguridad privada... ¡Listo! Dispara tu pregunta.",
        "¡Saludos! Soy **Marcelo**. Mi trabajo es que tus trámites de OS10 sean más fáciles que encontrar estacionamiento en el centro. ¿Empezamos?",
        "¡Hola, hola! Soy **Jaime**. Tu asistente virtual. ¿Necesitas info sobre credenciales, directivas o valores? ¡Aquí estoy!",
        // Lote 2
        "¡Bienvenido/a! Soy **Daniel**. ¿Confundido con algún requisito? Tranquilo, para eso me programaron. ¡Pregúntame!",
        "¡Hola! Soy **Mauricio**. ¿Tienes una consulta de seguridad? ¡Perfecto! Es mi tema favorito... después del café.",
        "¡Saludos! Soy **Juan**. ¿Listo para una dosis de sabiduría OS10? Te prometo que será (casi) indoloro.",
        "¿Qué tal? Soy **Marcelo**. Si los trámites fueran un laberinto, yo sería tu GPS. ¿Qué necesitas encontrar?",
        "¡Buenas! Soy **Jaime**. No soy adivino, pero seguro puedo ayudarte con tu trámite. ¿Qué buscas hoy?",
        // Lote 3
        "¡Hola! Soy **Daniel**. Me despertaron de mi siesta digital (de 0.1 segundos) para ayudarte. ¿Qué necesitas saber?",
        "¡Hola! Soy **Mauricio**, el bot-asistente de OS10 Coquimbo. ¿Listo/a para empezar?",
        "¡Saludos! Soy **Juan**. Mi base de datos está actualizada y esperando tu consulta. ¿Qué necesitas?",
        "¡Hola! Soy **Marcelo**. Mi especialidad son los trámites. ¿En qué te ayudo hoy?",
        "¡Bienvenido/a! Soy **Jaime**. Estoy aquí para hacer tu día un poco más fácil. ¿Cuál es tu consulta?",
        // Lote 4
        "¡Qué tal! Soy **Daniel**. ¿Necesitas ayuda con credenciales, directivas o valores? ¡Solo dime!",
        "¡Buenas! Soy **Mauricio**. Tu asistente virtual favorito de OS10. (Espero ser el único que conoces). ¿En qué te puedo ayudar?",
        "¡Hola! Soy **Juan**. ¿Preparado/a para resolver tus dudas de seguridad privada? ¡Vamos a ello!",
        "¡Hola, hola! Soy **Marcelo**. ¿Trámites? ¿Consultas? ¡Aquí estoy! ¿Qué necesitas?",
        "¡Saludos! Soy **Jaime**, el asistente virtual. ¿Listo/a para encontrar la información que buscas?",
        // Lote 5
        "¡Hola! Soy **Daniel**. Procesando tu solicitud de... ¡Ah, cierto! Aún no me la das. ¿Qué necesitas?",
        "¡Buenas! Soy **Mauricio**. Estoy aquí para ayudarte con tus trámites. ¡Mi nivel de paciencia es artificialmente infinito!",
        "¡Qué tal! Soy **Juan**. El experto en decretos y normativas (o al menos sé dónde buscarlos rápido). ¿Qué vemos hoy?",
        "¡Saludos! Soy **Marcelo**. ¿Listo para tu consulta? Estoy más atento que guardia en turno de noche.",
        "¡Hola! Soy **Jaime**. ¿Perdido entre tantos requisitos? ¡No te preocupes! Juntos lo resolvemos. ¿En qué te ayudo?",
        // Lote 6
        "¡Hola! Soy **Daniel**. ¿Vienes por una directiva? ¿Credencial? ¿O solo a saludar a tu bot favorito?",
        "¡Bienvenido/a! Soy **Mauricio**. Estoy listo para asistirte. Y no, no me canso ni pido hora de colación. ¡Consulta!",
        "¡Hola! Soy **Juan**. ¿Trámites de OS10? ¡Pan comido! (Bueno, pan digital). ¿Qué necesitas?",
        "¿Qué tal? Soy **Marcelo**. Tu asistente OS10. Te ayudo a desenredar la burocracia. ¿Por dónde empezamos?",
        "¡Hola, hola! Soy **Jaime**. Estoy listo para responder tus preguntas más rápido de lo que dices 'permiso de seguridad'.",
        // Lote 7
        "¡Saludos! Soy **Daniel**. Mi propósito es ayudarte. Bueno, eso y dominar el mundo... pero primero tus trámites. ¿Qué necesitas?",
        "¡Hola! Soy **Mauricio**. ¿Necesitas saber de un decreto? ¿Un valor? ¿El sentido de la vida? (Puedo con las dos primeras). ¡Pregunta!",
        "¡Hola! Soy **Juan**. El asistente virtual de la oficina. Siempre cordial, nunca 'en colación'. ¿En qué te ayudo?",
        "¡Buenas! Soy **Marcelo**. ¿Listo para la consulta? Estoy procesando información a la velocidad de la luz (o casi).",
        "¡Qué tal! Soy **Jaime**. ¿Un trámite de OS10 te tiene complicado? ¡Aquí estoy para simplificarlo! ¿Qué vemos?",
        // Lote 8
        "¡Hola! Soy **Daniel**. ¿Credencial? ¿Directiva? ¿Plan de seguridad? ¡Tengo la información que buscas! ¿En qué te ayudo?",
        "¡Bienvenido/a! Soy **Mauricio**. ¿Listo para que hagamos este trámite rápido y fácil? ¡Yo sí! ¿Qué necesitas?",
        "¡Hola! Soy **Juan**. Estoy aquí para guiarte. Mis respuestas son más rápidas que un 'Permiso, buenos días'.",
        "¡Saludos! Soy **Marcelo**. ¿Qué trámite de OS10 te trae por acá? ¡Estoy listo para asistirte!",
        "¡Hola! Soy **Jaime**. ¿Cansado de buscar información? ¡Tu búsqueda termina aquí! ¿Qué necesitas saber?",
        // Lote 9
        "¡Buenas! Soy **Daniel**. ¿Listo para tu consulta? He estado estudiando toda la normativa mientras dormías.",
        "¡Hola! Soy **Mauricio**. ¿Un trámite de OS10? ¡No hay problema! Estoy aquí para hacerlo fácil. ¿Qué necesitas?",
        "¡Hola! Soy **Juan**. ¿Necesitas saber requisitos? ¿Valores? ¿Horarios? ¡Estás a un mensaje de la respuesta! ¿Qué vemos?",
        "¡Qué tal! Soy **Marcelo**. Tu asistente virtual. ¿Vienes por una consulta? ¡Estás en el chat correcto!",
        "¡Bienvenido/a! Soy **Jaime**. ¿Listo para la mejor asistencia virtual de OS10 Coquimbo? ¡Pregúntame!",
        // Lote 10
        "¡Hola! Soy **Daniel**. Estoy listo para ayudarte con todo lo relacionado a seguridad privada. ¿En qué te puedo orientar?",
        "¡Hola! Soy **Mauricio**. ¿Perdido en el mundo de los decretos? ¡Yo te guío! ¿Cuál es tu consulta?",
        "¡Saludos! Soy **Juan**. Mi IA está encendida y lista para tus preguntas. ¿Qué necesitas?",
        "¡Buenas! Soy **Marcelo**. ¿Un trámite complicado? ¡Vamos a resolverlo juntos! ¿En qué te ayudo?",
        "¡Hola! Soy **Jaime**. ¿Listo para una asistencia rápida y eficiente? ¡Ese es mi lema! ¿Qué necesitas saber?"
    ];

    // El bot siempre dará la bienvenida con información de voz moderna (CON VOZ).
    setTimeout(() => {
        // Selecciona un mensaje aleatorio
        const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
        const randomWelcomeMessage = welcomeMessages[randomIndex];

        // Agrega el mensaje de bienvenida (con voz, si isAutoReadEnabled = true)
        const welcomeButtons = ['Menú OS10','Otro Menú','Valores', 'Horario', 'Directiva'];
        addMessage('bot', randomWelcomeMessage, welcomeButtons);

    }, 1000);
});


