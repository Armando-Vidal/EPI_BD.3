const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/:nomeEvento/:ano/:tipo', async (req, res) => {
  const { nomeEvento, ano, tipo } = req.params;

  try {
    const result = await db.query(`
      SELECT *
      FROM FILMENOMINADO
      WHERE NomeEvento = $1 AND Ano = $2 AND Tipo = $3
    `, [nomeEvento, ano, tipo]);

    const premioDetalhes = result.rows;
    res.json({ premioDetalhes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
