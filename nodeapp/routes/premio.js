const express = require('express');
const router = express.Router();
const db = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/form', (req, res) => {
    res.render('index');
});
//

router.post('/create', (req, res) => {
    /*
    CREATE TABLE PREMIO(
 18     NomeEvento varchar(50),
 17     Ano int,
 16     Tipo varchar(20),
 15     Nome varchar(20),
 14 
 13     CONSTRAINT CEPremio
 12         FOREIGN KEY (NomeEvento, Ano)
 11             REFERENCES EDICAO (NomeEvento, Ano)
 10                 ON DELETE CASCADE
  9                 ON UPDATE CASCADE,
  8 
  7     CONSTRAINT CPPremio
  6         PRIMARY KEY (NomeEvento, Ano, Tipo)
  5 );
*/
    const body = req.body;
    console.log(body);
    console.log("Dados recebidos com sucesso!");

    const columns = Object.keys(body).join(', ');
    const values = Object.values(body).map((value, index) => {
        if (columns.includes('ano') && index === columns.indexOf('ano')) {
            return parseInt(value);
        }
        return value;
    });

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