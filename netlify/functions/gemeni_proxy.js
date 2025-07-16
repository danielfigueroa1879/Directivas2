// netlify/functions/gemini-proxy.js

// Importamos la librería para hacer peticiones HTTP.
const fetch = require('node-fetch');

// Esta es la función principal que se ejecutará.
exports.handler = async function(event, context) {
  // ===================================================================
  // PASO DE DEPURACIÓN: Imprimimos un mensaje en los logs de Netlify
  // para saber si la función se está ejecutando.
  console.log("--- DETECTOR: La función gemini-proxy se ha iniciado. ---");
  console.log("Método de la petición recibida:", event.httpMethod);
  // ===================================================================

  // 1. Validar que la petición sea un POST.
  if (event.httpMethod !== 'POST') {
    console.error("ERROR: Se recibió un método no permitido:", event.httpMethod);
    return {
      statusCode: 405, // Method Not Allowed
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
    // 4. Imprimimos el cuerpo de la petición para asegurarnos de que llega correctamente.
    console.log("Cuerpo de la petición recibido:", event.body);
    const requestBody = JSON.parse(event.body);

    // 5. Realizar la petición a la API de Gemini.
    console.log("Enviando petición a la API de Gemini...");
    const geminiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // 6. Manejar la respuesta de Gemini.
    const responseData = await geminiResponse.json();
    if (!geminiResponse.ok) {
      console.error('Error recibido de la API de Gemini:', responseData);
      return {
        statusCode: geminiResponse.status,
        body: JSON.stringify(responseData),
      };
    }

    // 7. Si todo sale bien, devolvemos la respuesta de Gemini al frontend.
    console.log("Petición exitosa. Enviando respuesta al frontend.");
    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
    };

  } catch (error) {
    // Manejar errores de red o de parseo del JSON.
    console.error('ERROR INESPERADO EN EL BLOQUE TRY/CATCH:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ocurrió un error interno en el servidor.', details: error.message }),
    };
  }
};
