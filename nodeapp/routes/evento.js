const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('index');
});

router.post('/create', (req, res) => {
    /*
    CREATE TABLE EVENTOS(
    Nome varchar(50),
    AnoInicio int,
    Tipo varchar(8),
    Nacionalidade varchar(20),
    
    CONSTRAINT CPEvento
        PRIMARY KEY (Nome)
    );
    */

    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    const columns = Object.keys(body).join(', ');
    const values = Object.values(body);

    // Find the index of the "anoinicio" key
    const anoinicioIndex = Object.keys(body).indexOf("anoinicio");

    // Convert the value of "anoinicio" to an integer
    values[anoinicioIndex] = parseInt(values[anoinicioIndex]);

    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const sql = `INSERT INTO eventos (${columns}) VALUES (${placeholders})`;
    console.log(sql);
    console.log(values);

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/evento/form');
    });
});

module.exports = router;