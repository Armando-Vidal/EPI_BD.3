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
    CREATE TABLE FILMENOMINADO(
        TituloOriginal varchar(50),
        AnoProducao int,
        NomeEvento varchar(50),
        Ano int,
        Tipo varchar(20),
        Premiado boolean,
        
        CONSTRAINT CEFilmeNominadoFilmes
            FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        
        CONSTRAINT CEFilmeNominadoPremio
            FOREIGN KEY (NomeEvento, Ano, Tipo)
            REFERENCES PREMIO (NomeEvento, Ano, Tipo)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        
        CONSTRAINT CPFilmeNominado
            PRIMARY KEY (TituloOriginal, AnoProducao, NomeEvento, Ano, Tipo)
    );
    */
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    const columns = Object.keys(body).join(', ');
    const values = Object.values(body);

    const columnTypes = {
        titulooriginal: 'varchar',
        anoproducao: 'int',
        nomeevento: 'varchar',
        ano: 'int',
        tipo: 'varchar',
        premiado: 'boolean'
    };

    const convertedValues = values.map((value, index) => {
        const key = Object.keys(body)[index];
        const type = columnTypes[key];
        if (type === 'int') {
            return parseInt(value);
        } else if (type === 'boolean') {
            return value === 'true';
        } else {
            return value;
        }
    });

    const placeholders = convertedValues.map((_, index) => `$${index + 1}`).join(', ');

    const sql = `INSERT INTO filmenominado (${columns}) VALUES (${placeholders})`;

    db.query(sql, convertedValues, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/filmenominado/form');
    });
});

module.exports = router;