const mysql = require('mysql');

const dbConnection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })

dbConnection.connect((err) => {
    if (err) {
        console.error('Error al conectarse a la base de datos', err);
        return;
    }
    console.log("Conexión exitosa a la base de datos MYSQL");
})

module.exports = {
    dbConnection
}