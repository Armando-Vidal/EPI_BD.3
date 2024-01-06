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
    CREATE TABLE ENOMINADO(
        NomeEvento varchar(50),
        Ano int,
        Tipo varchar(20),
        NomeArt varchar(50),
        TituloOriginal varchar(50) NOT NULL,
        AnoProducao int NOT NULL,
        Ganhou boolean,
    */
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    // Convert values to the desired data types
    body.ano = parseInt(body.ano);
    body.anoproducao = parseInt(body.anoproducao);
    body.ganhou = body.ganhou === 'true';

    const values = Object.values(body);

    const columnPlaceholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const sql = `INSERT INTO enominado (${Object.keys(body).join(', ')}) VALUES (${columnPlaceholders})`;

    db.query(sql, values, (err) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/enominado/form');
    });
});

module.exports = router;