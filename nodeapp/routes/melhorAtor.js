const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
    SELECT DISTINCT en.NomeArt
    FROM ENOMINADO en
    WHERE en.Tipo = 'Melhor Ator'
    AND NOT EXISTS (
      SELECT e.Ano
      FROM EDICAO e
      WHERE NOT EXISTS (
        SELECT *
        FROM ENOMINADO en2
        WHERE en2.NomeArt = en.NomeArt AND en2.Ano = e.Ano AND en2.Tipo = 'Melhor Ator'
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
