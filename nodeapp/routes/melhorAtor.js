const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT en.NomeArt
      FROM ENOMINADO en
      WHERE en.Tipo = 'Melhor Ator'
      GROUP BY en.NomeArt
      HAVING COUNT(DISTINCT en.NomeEvento) = (
        SELECT COUNT(DISTINCT NomeEvento)
        FROM ENOMINADO
        WHERE Tipo = 'Melhor Ator'
      );
    `);

    const melhorAtor = result.rows;
    res.json({ melhorAtor });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
