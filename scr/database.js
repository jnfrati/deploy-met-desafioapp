const mysql = require('mysql');//req el mod p/conectarme

//setear los parametros de conexion
const mySqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'desafioapp',
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


