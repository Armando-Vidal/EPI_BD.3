const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
    SELECT DISTINCT p.NomeArt
    FROM PESSOA p
    WHERE NOT EXISTS (
      SELECT e.NomeEvento
      FROM EVENTOS e
      WHERE NOT EXISTS (
        SELECT *
        FROM EJURI ej
        WHERE ej.NomeArt = p.NomeArt AND ej.NomeEvento = e.Nome
      )
    ) AND p.ProfAtor = TRUE;
    `);

    const melhorAtor = result.rows;
    res.json({ melhorAtor });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
