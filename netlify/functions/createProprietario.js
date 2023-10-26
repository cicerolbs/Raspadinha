const { Client } = require('pg'); // Importando o cliente PostgreSQL

exports.handler = async function(event, context) {
  // Configurações do banco de dados
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Conectar ao banco de dados
  await client.connect();

  // Dados do novo proprietário (normalmente vindos do corpo da requisição HTTP)
  const { nome, email, senha } = JSON.parse(event.body);

  // Query para inserir o novo proprietário no banco de dados
  const query = `INSERT INTO proprietarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`;

  try {
    // Executar a query
    const res = await client.query(query, [nome, email, senha]);

    // Fechar a conexão com o banco de dados
    await client.end();

    // Retornar a resposta
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Proprietário criado com sucesso!', data: res.rows[0] })
    };
  } catch (err) {
    // Fechar a conexão com o banco de dados em caso de erro
    await client.end();

    // Retornar o erro
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao criar o proprietário', error: err.message })
    };
  }
};