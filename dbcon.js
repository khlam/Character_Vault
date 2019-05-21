const db = require('mariadb');

const pool = db.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
    multipleStatements: true
});

connect = (sql, callback) => {
	  pool.getConnection()
        .then( conn =>{
            conn.query(sql)
                .then(data => callback(data))
                .catch(e => console.error('Query Error: ', e.message, e.stack));
            conn.end();
        })
        .catch(e => console.error('Connection Error: ', e.message, e.stack));
};

module.exports.connect = connect;
