// netlify/functions/gemini-proxy.js

// Usamos 'node-fetch' para hacer peticiones HTTP en el entorno de Node.js de Netlify.
// Para que esto funcione, necesitas crear un archivo 'package.json' en la raíz de tu proyecto
// y añadir "node-fetch": "^2.6.1" a las dependencias.
// Luego ejecuta 'npm install'.
const fetch = require('node-fetch');

// El 'handler' es la función principal que se ejecutará cuando se llame a este endpoint.
exports.handler = async function(event, context) {
  // 1. Validar que la petición sea un POST.
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ error: 'Solo se permiten peticiones POST.' }),
    };
  }

  // 2. Obtener la API Key desde las variables de entorno de Netlify (forma segura).
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'La API key no está configurada en el servidor.' }),
    };
  }

  // 3. Construir la URL final de la API de Google.
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  try {
    // 4. Parsear el cuerpo de la petición que viene del frontend.
    const requestBody = JSON.parse(event.body);

    // 5. Realizar la petición a la API de Gemini.
    const geminiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // Enviamos el historial y la configuración del chat
    });

    // 6. Manejar la respuesta de Gemini.
    if (!geminiResponse.ok) {
      // Si Gemini devuelve un error, lo pasamos al frontend.
      const errorData = await geminiResponse.json();
      console.error('Error de la API de Gemini:', errorData);
      return {
        statusCode: geminiResponse.status,
        body: JSON.stringify(errorData),
      };
    }

    // 7. Si todo sale bien, devolvemos la respuesta de Gemini al frontend.
    const responseData = await geminiResponse.json();
    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
    };

  } catch (error) {
    // Manejar errores de red o de parseo.
    console.error('Error en la función proxy:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ocurrió un error interno en el servidor.' }),
    };
  }
};
