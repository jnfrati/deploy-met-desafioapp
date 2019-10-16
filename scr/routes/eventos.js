const express = require('express');
const router = express.Router();
 
const mySqlConnection = require('../database');

// getAll
router.get('/', (req, res)=>{
    mySqlConnection.query('SELECT * FROM eventos', (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//getId
router.get('/:idEvento', (req, res)=>{
    const { idEvento } = req.params;
    mySqlConnection.query('SELECT * FROM eventos WHERE idEvento = ?', [idEvento], (err, rows, fields) =>{
        if(!err){ 
            console.log(rows)
            if(rows.length)
                res.status(200).json(rows[0])
            else            
                res.status(404).json('No hay eventos con ese id')
        }else{
            res.status(500).json('Error inesperado')
            throw err;
        }
    }); 
});

// insert eventos
router.post('/', (req , res) =>{
    const { idTipoEvento,idLugar,nombre,fecha,hora,cupo,nombreDisertante, descripcion } = req.body;
    const query = `
    SET @idTipoEvento = ?; 
    SET @idLugar = ?; 
    SET @nombre = ?; 
    SET @fecha = ?; 
    SET @hora = ?; 
    SET @cupo = ?; 
    SET @nombreDisertante = ?; 
    SET @descripcion = ?;
    INSERT INTO eventos (idTipoEvento,idLugar,nombre,fecha,hora,cupo,nombreDisertante, descripcion) VALUES ( @idTipoEvento, @idLugar,@nombre,@fecha,@hora,@cupo,@nombreDisertante, @descripcion)`;
    mySqlConnection.query(query, [idTipoEvento,idLugar,nombre,fecha,hora,cupo,nombreDisertante, descripcion], 
        (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

// update eventos
router.put('/:idEvento', (req, res) =>{
    const { idEvento } = req.params;
    const { idTipoEvento,idLugar,nombre,fecha,hora,cupo,nombreDisertante,descripcion } = req.body;
    const query = `
    SET @idEvento = ?; 
    SET @idTipoEvento = ?; 
    SET @idLugar = ?; 
    SET @nombre = ?; 
    SET @fecha = ?; 
    SET @hora = ?; 
    SET @cupo = ?;
    SET @nombreDisertante = ?;
    SET @descripcion = ?;
    UPDATE eventos SET idTipoEvento = @idTipoEvento, idLugar = @idLugar, nombre = @nombre, fecha = @fecha, hora = @hora, cupo = @cupo, nombreDisertante = @nombreDisertante, descripcion = @descripcion WHERE idEvento = @idEvento` 
    mySqlConnection.query(query, [idEvento,idTipoEvento,idLugar,nombre,fecha,hora,cupo,nombreDisertante, descripcion], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//delete
router.delete('/:idEvento', (req, res) =>{
    const { idEvento } = req.params;
    mySqlConnection.query('DELETE FROM eventos WHERE idEvento = ?', [idEvento], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 

});

module.exports = router;