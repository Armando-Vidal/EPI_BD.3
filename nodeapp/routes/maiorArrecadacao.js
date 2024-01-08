const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT TituloOriginal, ArrecadacaoPrimAno
      FROM FILMES
      ORDER BY ArrecadacaoPrimAno DESC
      LIMIT 10
    `);

    const maiorArrecadacao = result.rows;
    res.json({ maiorArrecadacao });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
