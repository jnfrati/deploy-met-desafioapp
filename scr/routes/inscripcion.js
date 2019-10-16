const express = require('express');
const router = express.Router();

const mySqlConnection = require('../database');

// getAll
router.get('/', (req, res)=>{
    mySqlConnection.query('SELECT * FROM inscripciones', (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//getId
router.get('/:id', (req, res)=>{
    const { id } = req.params;
    mySqlConnection.query('SELECT * FROM inscripciones WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//insert inscripcion
router.post('/', (req , res) =>{
    const { idParticipante, idEvento, fechaInscripcion, asistio, autorizacion } = req.body;
    const query = `
    SET @idParticipante = ?; 
    SET @idEvento = ?; 
    SET @fechaInscripcion = ?; 
    SET @asistio = ?; 
    SET @autorizacion = ?; 
    INSERT INTO inscripciones ( idParticipante, idEvento, fechaInscripcion, asistio, autorizacion) VALUES ( @idParticipante, @idEvento, @fechaInscripcion, @asistio , @autorizacion )`;
    mySqlConnection.query(query, [idParticipante, idEvento, fechaInscripcion, asistio, autorizacion], (err, rows, fields) =>{
        if(!err){ 
            console.log(rows)
            if(rows.length)
                res.status(201).json(rows[0])
        }else{
            res.status(500).json('Error inesperado')
            throw err;
        }
    }); 

});

// Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idParticipante, idEvento, fechaInscripcion, asistio, autorizacion } = req.body;
    const query = `
    SET @id = ?;
    SET @idParticipante = ?; 
    SET @idEvento = ?; 
    SET @fechaInscripcion = ?; 
    SET @asistio = ?; 
    SET @autorizacion = ?; 
    UPDATE inscripciones SET idParticipante = @idParticipante, idEvento = @idEvento, fechaInscripcion = @fechaInscripcion, asistio = @asistio, autorizacion = @autorizacion  WHERE id = @id` 
    mySqlConnection.query(query, [id, idParticipante, idEvento, fechaInscripcion, asistio, autorizacion], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mySqlConnection.query('DELETE FROM inscripciones WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 

});

module.exports = router;