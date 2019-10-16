const express = require('express');
const router = express.Router();

const mySqlConnection = require('../database');

// getAll
router.get('/', (req, res)=>{
    mySqlConnection.query('SELECT * FROM tipoEventos', (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//getId
router.get('/:idTipoEvento', (req, res)=>{
    const { idTipoEvento } = req.params;
    mySqlConnection.query('SELECT * FROM tipoEventos WHERE idTipoEvento = ?', [idTipoEvento], (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

// insert tipoEventos
router.post('/', (req , res) =>{
    const { nombre } = req.body;
    const query = `
    SET @nombre = ?; 
    INSERT INTO tipoEventos (nombre)  VALUES ( @nombre )`;
    mySqlConnection.query(query, [nombre], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

// update tipoEventos
router.put('/:idTipoEvento', (req, res) =>{
    const { idTipoEvento } = req.params;
    const { nombre } = req.body;
    const query = `
    SET @idTipoEvento = ?; 
    SET @nombre = ?; 
    UPDATE tipoEventos SET nombre = @nombre  WHERE idTipoEvento = @idTipoEvento` 
    mySqlConnection.query(query, [idTipoEvento, nombre], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//delete
router.delete('/:idTipoEvento', (req, res) =>{
    const { idTipoEvento } = req.params;
    mySqlConnection.query('DELETE FROM tipoEventos WHERE idTipoEvento = ?', [idTipoEvento], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 

});

module.exports = router;