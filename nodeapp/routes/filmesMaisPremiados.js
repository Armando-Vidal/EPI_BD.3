const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT TituloOriginal, COUNT(*) as numPremios
      FROM FILMENOMINADO
      WHERE Premiado = true
      GROUP BY TituloOriginal
      ORDER BY numPremios DESC
      LIMIT 10
    `);

    const filmesMaisPremiados = result.rows.map((filme) => ({
      label: filme.TituloOriginal,
      value: filme.numPremios,
    }));

    res.json({ data: filmesMaisPremiados });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
