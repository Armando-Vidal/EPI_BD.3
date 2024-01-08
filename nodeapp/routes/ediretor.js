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

    const columns = Object.keys(body).join(', ');
    const values = Object.values(body);

    const columnTypes = {
        nomeart: 'varchar',
        titulooriginal: 'varchar',
        anoproducao: 'int',
        eprincipal: 'boolean'
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

    const sql = `INSERT INTO ediretor (${columns}) VALUES (${placeholders})`;

    db.query(sql, convertedValues, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/ediretor/form');
    });
});

module.exports = router;