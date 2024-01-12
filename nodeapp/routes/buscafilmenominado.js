const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', async (req, res) => {
  try {
    const { tipo, nomeevento, ano } = req.body;

    // Consulta ao banco de dados
    const result = await db.query(
      'SELECT titulooriginal, anoproducao, premiado FROM FILMENOMINADO WHERE tipo = $1 AND nomeevento = $2 AND ano = $3',
      [tipo, nomeevento, ano]
    );

    const filmesEncontrados = result.rows;

    res.json({data: filmesEncontrados});
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).send('Erro ao buscar filmes');
  }
});

module.exports = router;
