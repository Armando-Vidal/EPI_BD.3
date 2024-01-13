CREATE TABLE EVENTOS(
    Nome varchar(50),
    AnoInicio int,
    Tipo varchar(8),
    Nacionalidade varchar(20),
    
    CONSTRAINT CPEvento
        PRIMARY KEY (Nome)
);

CREATE TABLE PESSOA(
    NomeArt varchar(50),
    NomeVerdadeiro varchar(50),
    Sexo varchar(2),
    AnoNasc int,
    Site varchar(30),
    AnoInic int,
    NroTotalAnos int,
    Situacao varchar(10),
    ProfDiretor boolean DEFAULT FALSE,
    ProfAtor boolean DEFAULT FALSE,
    ProfProdutor boolean DEFAULT FALSE,
    ProfRoteirista boolean DEFAULT FALSE,
    
    CONSTRAINT CPPessoa
        PRIMARY KEY (NomeArt)
);

CREATE TABLE FILMES(
    TituloOriginal varchar(50),
    AnoProducao int,
    TituloNoBrasil varchar(50),
    IdiomaOriginal varchar(20),
    Classe varchar(20),
    DataEstreio date,
    ArrecadacaoPrimAno int,
    
    CONSTRAINT CPFilmes
        PRIMARY KEY (TituloOriginal, AnoProducao)
);

CREATE TABLE EDICAO(
    NomeEvento varchar(50),
    Ano int,
    Data_ date,
    Localizacao varchar(100),
    
    CONSTRAINT CEEdicao
        FOREIGN KEY (NomeEvento)
            REFERENCES EVENTOS (Nome)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPEdicao
        PRIMARY KEY (NomeEvento, Ano)
);

CREATE TABLE PREMIO(
    NomeEvento varchar(50),
    Ano int,
    Tipo varchar(20),
    Nome varchar(20),
    
    CONSTRAINT CEPremio
        FOREIGN KEY (NomeEvento, Ano)
            REFERENCES EDICAO (NomeEvento, Ano)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPPremio
        PRIMARY KEY (NomeEvento, Ano, Tipo)
);

CREATE TABLE LOCALESTREIO(
    TituloOriginal varchar(50),
    AnoProducao int,
    Local_ varchar(50),
    
    CONSTRAINT CELocalEstreio
        FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPLocalEstreio
        PRIMARY KEY (TituloOriginal, AnoProducao, Local_)
);

CREATE TABLE EJURI(
    NomeArt varchar(50),
    NomeEvento varchar(50),
    Ano int,
    
    CONSTRAINT CEEJuriPessoa
        FOREIGN KEY (NomeArt)
            REFERENCES PESSOA (NomeArt)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEEJuriEdicao
        FOREIGN KEY (NomeEvento, Ano)
            REFERENCES EDICAO (NomeEvento, Ano)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPEJuri
        PRIMARY KEY (NomeArt, NomeEvento, Ano)
);

CREATE TABLE FILMENOMINADO(
    TituloOriginal varchar(50),
    AnoProducao int,
    NomeEvento varchar(50),
    Ano int,
    Tipo varchar(20),
    Premiado boolean DEFAULT FALSE,
    
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

CREATE TABLE EDIRETOR(
    NomeArt varchar(50),
    TituloOriginal varchar(50),
    AnoProducao int,
    EPrincipal boolean DEFAULT FALSE,
    
    CONSTRAINT CEEDiretorPessoa
        FOREIGN KEY (NomeArt)
            REFERENCES PESSOA (NomeArt)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEEDiretorFilmes
        FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPEDiretor
        PRIMARY KEY (NomeArt, TituloOriginal, AnoProducao)
);

CREATE TABLE EPRODUTOR(
    NomeArt varchar(50),
    TituloOriginal varchar(50),
    AnoProducao int,
    
    CONSTRAINT CEEProdutorPessoa
        FOREIGN KEY (NomeArt)
            REFERENCES PESSOA (NomeArt)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEEProdutorFilmes
        FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPEProdutor
        PRIMARY KEY (NomeArt, TituloOriginal, AnoProducao)
);

CREATE TABLE EROTEIRISTA(
    NomeArt varchar(50),
    TituloOriginal varchar(50),
    AnoProducao int,
    
    CONSTRAINT CEERoteiristaPessoa
        FOREIGN KEY (NomeArt)
            REFERENCES PESSOA (NomeArt)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEERoteiristaFilmes
        FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPERoteirista
        PRIMARY KEY (NomeArt, TituloOriginal, AnoProducao)
);

CREATE TABLE ATORPRINCIPAL(
    NomeArt varchar(50),
    TituloOriginal varchar(50),
    AnoProducao int,
    
    CONSTRAINT CEAtorPrincipalPessoa
        FOREIGN KEY (NomeArt)
            REFERENCES PESSOA (NomeArt)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEEAtorPrincipalFilmes
        FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPAtorPrincipal
        PRIMARY KEY (NomeArt, TituloOriginal, AnoProducao)
);

CREATE TABLE ATORELENCO(
    NomeArt varchar(50),
    TituloOriginal varchar(50),
    AnoProducao int,
    
    CONSTRAINT CEAtorElencoPessoa
        FOREIGN KEY (NomeArt)
            REFERENCES PESSOA (NomeArt)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEEAtorElencoFilmes
        FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPAtorElenco
        PRIMARY KEY (NomeArt, TituloOriginal, AnoProducao)
);

CREATE TABLE ENOMINADO(
    NomeEvento varchar(50),
    Ano int,
    Tipo varchar(20),
    NomeArt varchar(50),
    TituloOriginal varchar(50) NOT NULL,
    AnoProducao int NOT NULL,
    Ganhou boolean DEFAULT FALSE,
    
    CONSTRAINT CEENominadoPremio
        FOREIGN KEY (NomeEvento, Ano, Tipo)
            REFERENCES PREMIO (NomeEvento, Ano, Tipo)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEENominadoPessoa
        FOREIGN KEY (NomeArt)
            REFERENCES PESSOA (NomeArt)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CEENominadoFilmes
        FOREIGN KEY (TituloOriginal, AnoProducao)
            REFERENCES FILMES (TituloOriginal, AnoProducao)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
    
    CONSTRAINT CPENominado
        PRIMARY KEY (NomeEvento, Tipo, Ano, NomeArt)
);