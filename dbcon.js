const db = require('mariadb');

const pool = db.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10
});

module.exports.pool = pool;
