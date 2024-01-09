const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/:nomeEvento/:ano/:tipo', async (req, res) => {
  const { nomeEvento, ano, tipo } = req.params;

  try {
    const result = await db.query(`
    SELECT
      f.TituloOriginal AS filmeTitulo,
      f.AnoProducao AS filmeAnoProducao,
      p.NomeArt AS pessoaNomeArt,
      fn.Premiado AS foiPremiado
    FROM FILMENOMINADO fn
    LEFT JOIN FILMES f ON fn.TituloOriginal = f.TituloOriginal AND fn.AnoProducao = f.AnoProducao
    LEFT JOIN PESSOA p ON fn.NomeArt = p.NomeArt
    WHERE fn.NomeEvento = $1 AND fn.Ano = $2 AND fn.Tipo = $3;
    `, [nomeEvento, ano, tipo]);

    const premioDetalhes = result.rows;
    res.json({ premioDetalhes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
