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
    CREATE TABLE FILMES(
        TituloOriginal varchar(50),
        AnoProducao int,
        TituloNoBrasil varchar(50),
        IdiomaOriginal varchar(20),
        Classe varchar(20) NOT NULL,
        DataEstreio date,
        ArrecadacaoPrimAno int,
        CONSTRAINT CPFilmes
            PRIMARY KEY (TituloOriginal, AnoProducao)
    );
    */
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    const columns = Object.keys(body);
    const values = Object.values(body).map((value, index) => {
        const column = columns[index];
        if (column === 'anoproducao' || column === 'arrecadacaoprimano') {
            return parseInt(value);
        } else {
            return value;
        }
    });
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const sql = `INSERT INTO filme (${columns.join(', ')}) VALUES (${placeholders})`;
    db.query(sql, values, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/filme/form');
    });
});

module.exports = router;