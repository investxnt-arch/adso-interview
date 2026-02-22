const { Client } = require('pg');

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  console.log('Intentando conectar con:', connectionString.replace(/:[^:]*@/, ':****@'));

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✅ Conexión exitosa a la base de datos');
    const res = await client.query('SELECT version()');
    console.log('Versión de PostgreSQL:', res.rows[0].version);
    await client.end();
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    console.error('Código de error:', err.code);
  }
}

testConnection();
