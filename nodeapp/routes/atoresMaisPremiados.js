const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT NomeArt, COUNT(*) as numPremios
      FROM EJURI
      WHERE Tipo = 'Melhor Ator'
      GROUP BY NomeArt
      ORDER BY numPremios DESC
      LIMIT 10
    `);

    const atoresMaisPremiados = result.rows;
    res.json({ atoresMaisPremiados });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
