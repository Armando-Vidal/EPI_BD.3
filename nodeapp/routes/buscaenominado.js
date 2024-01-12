const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/enominado/get', async (req, res) => {
  const { nomeEvento, ano, tipo } = req.params;

  try {
    /* CREATE TABLE FILMENOMINADO(
        TituloOriginal varchar(50),
        AnoProducao int,
        NomeEvento varchar(50),
        Ano int,
        Tipo varchar(20),
        Premiado boolean,
        
        CONSTRAINT CEFilmeNominadoFilmes
            FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        
        CONSTRAINT CEFilmeNominadoPremio
            FOREIGN KEY (NomeEvento, Ano, Tipo)
            REFERENCES PREMIO (NomeEvento, Ano, Tipo)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        
        CONSTRAINT CPFilmeNominado
            PRIMARY KEY (TituloOriginal, AnoProducao, NomeEvento, Ano, Tipo)
    );
    */
    
    const result = await db.query(`
      SELECT
        f.TituloOriginal AS filmeTitulo,
        f.AnoProducao AS filmeAnoProducao,
        p.NomeArt AS pessoaNomeArt,
        fn.Premiado AS foiPremiado
      FROM FILMENOMINADO fn
      INNER JOIN FILMES f ON fn.TituloOriginal = f.TituloOriginal AND fn.AnoProducao = f.AnoProducao
      INNER JOIN PESSOA p ON fn.NomeArt = p.NomeArt
      WHERE fn.NomeEvento = $1 AND fn.Ano = $2 AND fn.Tipo = $3;
    `, [nomeEvento, ano, tipo]);

    const premioDetalhes = result.rows;

    // Formato da resposta
    const response = {
      award: {
        nomeEvento,
        ano,
        tipo,
        details: premioDetalhes,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
