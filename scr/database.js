const mysql = require('mysql');//req el mod p/conectarme

//setear los parametros de conexion
const mySqlConnection = mysql.createConnection({
    host: process.env.DB_URL || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'desafioapp',
    multipleStatements: true
  });

mySqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mySqlConnection;


