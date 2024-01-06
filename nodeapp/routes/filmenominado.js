const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('filmenominado');
});

    router.post('/create', (req, res) => {
        const body = req.body;
        console.log(body);
        console.log("Dados recebidos com sucesso!");

        const columns = Object.keys(body).join(', ');
        const values = Object.values(body);

        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

        const sql = `INSERT INTO filmenominado (${columns}) VALUES (${placeholders})`;

        db.query(sql, values, (err, results) => {
            if (err) throw err;
            console.log("Dados inseridos com sucesso!");
            res.redirect('/filmenominado/form');
        });
    });

module.exports = router;