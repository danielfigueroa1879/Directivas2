// netlify/functions/gemini-proxy.js

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Detector para confirmar que la función se está ejecutando.
  console.log("--- DETECTOR: La función gemini-proxy se ha iniciado. ---");

  // 1. Validar que la petición sea un POST.
  if (event.httpMethod !== 'POST') {
    console.error("ERROR: Se recibió un método no permitido:", event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido. Solo se aceptan peticiones POST.' }),
    };
  }

  // 2. Obtener la API Key desde las variables de entorno seguras de Netlify.
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error("ERROR CRÍTICO: La variable de entorno GEMINI_API_KEY no está configurada en Netlify.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'La API key no está configurada en el servidor.' }),
    };
  }

  // 3. Construir la URL final de la API de Google.
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  try {
    const requestBody = JSON.parse(event.body);

    // 4. Realizar la petición a la API de Gemini.
    const geminiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const responseData = await geminiResponse.json();
    
    // 5. Manejar la respuesta de Gemini.
    if (!geminiResponse.ok) {
      console.error('Error recibido de la API de Gemini:', responseData);
      return {
        statusCode: geminiResponse.status,
        body: JSON.stringify(responseData),
      };
    }

    // 6. Si todo sale bien, devolver la respuesta de Gemini al frontend.
    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
    };

  } catch (error) {
    console.error('ERROR INESPERADO EN EL BLOQUE TRY/CATCH:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ocurrió un error interno en el servidor.', details: error.message }),
    };
  }
};
