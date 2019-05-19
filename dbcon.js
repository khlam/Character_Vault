const db = require('mariadb');

const pool = db.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10
});

connect = async (sql, callback) => {
    let conn;
    try {
	      conn = await pool.getConnection();
	      callback(await conn.query(sql));
    } catch (err) {
	      throw err;
    } finally {
	      if (conn) conn.end();
    }
};

module.exports.connect = connect;
