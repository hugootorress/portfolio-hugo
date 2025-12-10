// Netlify Function para procesar envíos del formulario de contacto
// Esta función intercepta POSTs a /.netlify/functions/submit-form
// y los procesa, permitiendo que netlify dev y netlify Forms trabajen juntos

exports.handler = async (event, context) => {
  // Solo aceptar POSTs
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Parsear los datos del formulario
    const body = event.body;
    const params = new URLSearchParams(body);

    // Extraer campos del formulario
    const formName = params.get('form-name') || 'contact';
    const name = params.get('name');
    const email = params.get('email');
    const message = params.get('message');
    const botField = params.get('bot-field');

    // Validar honeypot (si está relleno, es un bot)
    if (botField && botField.trim() !== '') {
      console.log('Honeypot detectado, rechazando');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid submission' }),
      };
    }

    // Validar campos requeridos
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Log del envío (útil para debugging en netlify dev)
    console.log(`Formulario "${formName}" recibido:`);
    console.log(`  Nombre: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Mensaje: ${message.substring(0, 50)}...`);

    // En netlify dev, simplemente logueamos. En producción, Netlify Forms
    // también lo detectará y registrará automáticamente.
    
    // Responder con éxito
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Formulario recibido correctamente',
        formName: formName,
      }),
    };
  } catch (error) {
    console.error('Error procesando formulario:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
