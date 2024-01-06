const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('enominado');
});

router.post('/create', (req, res) => {
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    const columns = Object.keys(body);
    const values = Object.values(body);

    const columnPlaceholders = columns.map((column, index) => `$${index + 1}`).join(', ');
    const sql = `INSERT INTO enominado (${columns.join(', ')}) VALUES (${columnPlaceholders})`;

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/enominado/form');
    });
});

module.exports = router;