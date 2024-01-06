const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('premio');
});

router.post('/create', (req, res) => {
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    const columns = Object.keys(body).join(', ');
    const values = Object.values(body);

    let placeholders = '';
    for (let i = 1; i <= values.length; i++) {
        placeholders += `$${i}, `;
    }
    placeholders = placeholders.slice(0, -2);

    const sql = `INSERT INTO premio (${columns}) VALUES (${placeholders})`;

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/premio/form');
    });
});

module.exports = router;