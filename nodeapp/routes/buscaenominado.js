const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', async (req, res) => {
  try {
    const { tipo, nomeevento, ano } = req.body;

    // Consulta ao banco de dados
    const result = await db.query(
      'SELECT * FROM ENOMINADO WHERE tipo = $1 AND nomeevento = $2 AND ano = $3',
      [tipo, nomeevento, ano]
    );

    const pessoasEncontradas = result.rows;

    res.json({data: pessoasEncontradas});
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    res.status(500).send('Erro ao buscar pessoas');
  }
});

module.exports = router;
