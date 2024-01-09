const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
    SELECT NomeArt, COUNT(*) as totalPremios
    FROM ENOMINADO
    WHERE Ganhou = true
    GROUP BY NomeArt
    ORDER BY totalPremios DESC
    LIMIT 10;
    `);

    const atoresMaisPremiados = result.rows.map((ator) => ({
      label: ator.NomeArt,
      value: ator.totalPremios,
    }));

    res.json({ data: atoresMaisPremiados });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
