const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('evento');
});

router.post('/create', (req, res) => {
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");
    const sql = 'INSERT INTO evento SET ?';
    db.query(sql, body, (err, results) => {
        if (err) throw err;
        console.log("Dados inseridos com sucesso!");
        res.redirect('/evento/form');
    });
});

module.exports = router;