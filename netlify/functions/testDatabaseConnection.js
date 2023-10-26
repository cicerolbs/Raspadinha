

const { Client } = require('pg');

exports.handler = async function(event, context) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database connected successfully', data: res.rows[0] })
    };
  } catch (err) {
    await client.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Database connection failed', error: err.message })
    };
  }
};