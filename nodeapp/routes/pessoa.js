const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('index');
});

router.post('/create', (req, res) => {
    /*CREATE TABLE PESSOA(
        NomeArt varchar(50),
        NomeVerdadeiro varchar(50),
        Sexo varchar(2),
        AnoNasc int,
        Site varchar(30),
        AnoInic int,
        NroTotalAnos int,
        Situacao varchar(10),
        ProfDiretor boolean NOT NULL DEFAULT FALSE,
        ProfAtor boolean NOT NULL DEFAULT FALSE,
        ProfProdutor boolean NOT NULL DEFAULT FALSE,
        ProfRoteirista boolean NOT NULL DEFAULT FALSE,
        
        CONSTRAINT VerificaProfissao
            CHECK (ProfDiretor = TRUE OR ProfAtor = TRUE OR ProfProdutor = TRUE OR ProfRoteirista = TRUE),
        
        CONSTRAINT CPPessoa
            PRIMARY KEY (NomeArt)
    );
    */
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    const columns = Object.keys(body);
    const values = Object.values(body);

    const columnTypes = {
        nomeart: 'string',
        nomeverdadeiro: 'string',
        sexo: 'string',
        anonasc: 'int',
        site: 'string',
        anoinic: 'int',
        nrototalanos: 'int',
        situacao: 'string',
        profdiretor: 'boolean',
        profator: 'boolean',
        profprodutor: 'boolean',
        profroteirista: 'boolean'
    };

    const convertedValues = values.map((value, index) => {
        const columnName = columns[index];
        const columnType = columnTypes[columnName];

        if (columnType === 'int') {
            return parseInt(value);
        } else if (columnType === 'boolean') {
            return value === 'true';
        } else {
            return value;
        }
    });

    let placeholders = '';
    for (let i = 1; i <= columns.length; i++) {
        placeholders += `$${i}, `;
    }
    placeholders = placeholders.slice(0, -2);

    const sql = `INSERT INTO pessoa (${columns.join(', ')}) VALUES (${placeholders})`;
    db.query(sql, convertedValues, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/pessoa/form');
    });
});

module.exports = router;