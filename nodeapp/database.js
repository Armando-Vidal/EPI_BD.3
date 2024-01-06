const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'sistema_filmes',
    port: 5432, // default PostgreSQL port
});

pool.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
});

module.exports = pool;