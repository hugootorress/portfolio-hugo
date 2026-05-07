exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = event.body;
    const params = new URLSearchParams(body);

    const formName = params.get('form-name') || 'contact';
    const name = params.get('name');
    const email = params.get('email');
    const message = params.get('message');
    const botField = params.get('bot-field');

    if (botField && botField.trim() !== '') {
      console.log('Honeypot detectado, rechazando');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid submission' }),
      };
    }

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    console.log(`Formulario "${formName}" recibido:`);
    console.log(`  Nombre: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Mensaje: ${message.substring(0, 50)}...`);

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
