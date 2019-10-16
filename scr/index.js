const express = require("express");
const app = express();
const cors = require('cors')

//******settings******//
app.set('port', process.env.PORT || 3000);

// USING CORS 
app.use(cors());

//******middlewares******//
app.use(express.json());//si recibimos un json, express lo convierte 

//******Routes - urls******//
//app.use(require('./routes/inscripcion'));
app.use('/inscripcion', require('./routes/inscripcion'));

//app.use(require('./routes/lugares'));
app.use('/lugares', require('./routes/lugares'));

//app.use(require('./routes/edades'));
app.use('/edades', require('./routes/edades'));
 
//app.use(require('./routes/eventos'));
app.use('/tipoEventos', require('./routes/tipoEventos'));

//app.use(require('./routes/participantes'));
app.use('/participantes', require('./routes/participantes'));

//app.use(require('./routes/eventos'));
app.use('/eventos', require('./routes/eventos'));

//******starting the server******/
app.listen(app.get('port'), ()=>{
    //y cuando se inicie el servidor mostrar log
    console.log("Server on port ", app.get('port'));
}); 