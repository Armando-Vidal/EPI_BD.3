const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/:nomeEvento/:ano/:tipo', async (req, res) => {
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
    
    `, [nomeEvento, ano, tipo]);

    const premioDetalhes = result.rows;
    res.json({ premioDetalhes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
