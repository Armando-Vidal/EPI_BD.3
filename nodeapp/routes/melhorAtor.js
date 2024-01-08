const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT NomeArt
      FROM PESSOA
      WHERE NomeArt NOT IN (
        SELECT DISTINCT NomeArt
        FROM EJURI
        WHERE Tipo = 'Melhor Ator'
      )
    `);

    const melhorAtor = result.rows;
    res.json({ melhorAtor });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
