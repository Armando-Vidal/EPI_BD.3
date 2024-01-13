const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('index');
});

router.post('/create', (req, res) => {
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