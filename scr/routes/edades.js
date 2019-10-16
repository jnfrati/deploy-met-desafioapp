const express = require('express');
const router = express.Router();

const mySqlConnection = require('../database');

//getAll
router.get('/', (req, res)=>{
    mySqlConnection.query('SELECT * FROM edades', (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//getId
router.get('/:idEdad', (req, res)=>{
    const { idEdad } = req.params;
    mySqlConnection.query('SELECT * FROM edades WHERE idEdad = ?', [idEdad], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

// insert edades
router.post('/', (req , res) =>{
    const { edad } = req.body;
    const query = `
    SET @edad = ?; 
    INSERT INTO edades (edad)  VALUES ( @edad )`;
    mySqlConnection.query(query, [edad], (err, rows, fields) =>{
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

// update edades
router.put('/:idEdad', (req, res) =>{
    const { idEdad } = req.params;
    const { edad } = req.body;
    const query = `
    SET @idEdad = ?; 
    SET @edad = ?; 
    UPDATE edades SET edad = @edad  WHERE idEdad = @idEdad` 
    mySqlConnection.query(query, [idEdad, edad], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

//delete
router.delete('/:idEdad', (req, res) =>{
    const { idEdad } = req.params;
    mySqlConnection.query('DELETE FROM edades WHERE idEdad = ?', [idEdad], (err, rows, fields) => {
        if(!err){ 
            res.json(rows);
        }else{
            console.log(err);
        }
    }); 
});

module.exports = router;