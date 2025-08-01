const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  // Solo permitir peticiones POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // --- CÓDIGO MODIFICADO: Se extrae el historial, el contexto y las instrucciones del sistema ---
    const { contents, context, systemInstruction } = JSON.parse(event.body);

    if (!contents || contents.length === 0) {
      return { statusCode: 400, body: "Bad Request: 'contents' (chat history) is required" };
    }
    
    // Extraemos la última pregunta del usuario y el resto del historial
    const userPrompt = contents[contents.length - 1].parts[0].text;
    const history = contents.slice(0, -1);
    
    // --- CÓDIGO NUEVO: Combinamos las instrucciones originales con las nuevas para usar el contexto ---
    const fullSystemInstruction = `
      ${systemInstruction.parts[0].text}

      **Instrucciones adicionales estrictas:**
      1.  Basa tus respuestas ÚNICAMENTE en la siguiente información de contexto proporcionada.
      2.  NO inventes información. Si la respuesta a la pregunta del usuario no se encuentra en el contexto, responde amablemente: "No tengo información sobre ese tema en específico. ¿Hay algo más en lo que te pueda ayudar relacionado con nuestros servicios?".
      
      --- CONTEXTO DE LA PÁGINA WEB ---
      ${context || "No se proporcionó contexto."}
      --- FIN DEL CONTEXTO ---
    `;

    // Configuramos el modelo con las nuevas instrucciones del sistema
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: {
            parts: [{ text: fullSystemInstruction }]
        }
    });

    // Iniciamos un chat con el historial previo
    const chat = model.startChat({ history: history });
    // Enviamos solo la última pregunta del usuario para obtener la nueva respuesta
    const result = await chat.sendMessage(userPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};

