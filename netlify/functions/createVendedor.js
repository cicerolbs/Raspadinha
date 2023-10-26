const { Client } = require('pg');

exports.handler = async function(event, context) {
  // Parse the incoming request body
  const body = JSON.parse(event.body);
  const { nome, email, senha } = body;

  // Connect to the database
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();

  try {
    // Insert the new vendedor into the database
    const query = 'INSERT INTO vendedores(nome, email, senha) VALUES($1, $2, $3) RETURNING *';
    const values = [nome, email, senha];
    const result = await client.query(query, values);

    // Close the database connection
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Vendedor created successfully', vendedor: result.rows[0] })
    };
  } catch (error) {
    console.error('Database error:', error);
    await client.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};