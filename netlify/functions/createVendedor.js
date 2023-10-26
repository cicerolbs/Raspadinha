const { Client } = require('pg');

exports.handler = async (event, context) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON format' }),
    };
  }

  if (!body || !body.name || !body.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' }),
    };
  }

  const { name, email } = body;

  try {
    const res = await client.query('INSERT INTO vendedores(name, email) VALUES($1, $2) RETURNING *', [name, email]);
    client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Vendedor created successfully', vendedor: res.rows[0] }),
    };
  } catch (err) {
    client.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Database Error', error: err }),
    };
  }
};
