const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT TituloOriginal, AnoProducao, ArrecadacaoPrimAno
      FROM FILMES
      ORDER BY ArrecadacaoPrimAno DESC
      LIMIT 10
    `);

    const filmesMaiorArrecadacao = result.rows.map((filme) => ({
      label: `${filme.titulooriginal} (${filme.anoproducao})`,
      value: filme.arrecadacaoprimano,
    }));

    res.json({ data: filmesMaiorArrecadacao });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
