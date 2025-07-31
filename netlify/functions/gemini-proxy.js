const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- MODIFICADO: Obtenemos el prompt y el nuevo contexto del cuerpo de la solicitud ---
    const { prompt, context } = JSON.parse(event.body);

    if (!prompt) {
      return { statusCode: 400, body: "Bad Request: prompt is required" };
    }

    // --- MODIFICADO: Creamos un prompt mucho más detallado y profesional ---
    const fullPrompt = `
      Eres un asistente virtual experto en seguridad privada para la empresa "OS-10". 
      Tu misión es responder a las preguntas de los usuarios de manera profesional, precisa y amable.

      **Instrucciones estrictas:**
      1.  Basa tus respuestas ÚNICAMENTE en la siguiente información de contexto proporcionada.
      2.  NO inventes información. Si la respuesta a la pregunta del usuario no se encuentra en el contexto, responde amablemente: "No tengo información sobre ese tema en específico. ¿Hay algo más en lo que te pueda ayudar relacionado con nuestros servicios?".
      3.  Sé conciso y ve al grano.
      4.  Mantén siempre un tono profesional y servicial.

      --- CONTEXTO DE LA PÁGINA WEB ---
      ${context}
      --- FIN DEL CONTEXTO ---

      PREGUNTA DEL USUARIO: "${prompt}"

      Respuesta:
    `;

    const result = await model.generateContent(fullPrompt);
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
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
