const express = require('express');
const router = express.Router();

const mySqlConnection = require('../database');

//getAll
router.get('/', (req, res)=>{
    mySqlConnection.query('SELECT * FROM lugares', (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//getId
router.get('/:idLugar', (req, res)=>{
    const { idLugar } = req.params;
    mySqlConnection.query('SELECT * FROM lugares WHERE idLugar = ?', [idLugar], (err, rows, fields) =>{
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

// insert lugares
router.post('/', (req , res) =>{
    const { nombre, calle, nro, barrio } = req.body;
    const query = ` 
    SET @nombre = ?;
    SET @calle = ?;
    SET @nro = ?;
    SET @barrio = ?; 
    INSERT INTO lugares ( nombre, calle, nro, barrio )  VALUES ( @nombre, @calle, @nro, @barrio )`;
    mySqlConnection.query(query, [nombre,calle,nro,barrio], (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

// update lugares
router.put('/:idLugar', (req, res) =>{
    const { idLugar } = req.params;
    const { nombre, calle, nro, barrio } = req.body;
    const query = `
    SET @idLugar = ?;  
    SET @nombre = ?;
    SET @calle = ?;
    SET @nro = ?;
    SET @barrio = ?; 
    UPDATE lugares SET nombre = @nombre, calle = @calle, nro = @nro, barrio = @barrio WHERE idLugar = @idLugar` 
    mySqlConnection.query(query, [idLugar,nombre,calle,nro,barrio], (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//delete
router.delete('/:idLugar', (req, res) =>{
    const { idLugar } = req.params;
    mySqlConnection.query('DELETE FROM lugares WHERE idLugar = ?', [idLugar], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

module.exports = router;