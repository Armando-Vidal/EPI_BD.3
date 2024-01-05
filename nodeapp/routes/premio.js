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
    const sql = 'INSERT INTO premio SET ?';
    db.query(sql, body, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/premio/form');
    });
});

module.exports = router;