const { Client } = require('pg');

exports.handler = async function(event, context) {
  console.log('Starting function');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Trying to connect to database');
    await client.connect();
    console.log('Successfully connected to database');

    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log('Query executed:', res.rows[0].message);

    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database connection successful' })
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Database connection failed' })
    };
  }
};