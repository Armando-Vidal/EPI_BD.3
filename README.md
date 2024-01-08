# EPI_BD.3
Terceira parte do trabalho semestral de Banco de Dados I (aplicação integrada ao BD)

## Gerar banco de dados no Ubuntu
sudo apt install postgresql postgresql-contrib

sudo su - postgres

psql

create database sistema_filmes;

create user admin with encrypted password 'admin';

grant all privileges on database sistema_filmes to admin;

\q

psql -U admin -d sistema_filmes -f bd.sql

## Como rodar no Ubuntu
sudo apt install npm

cd nodeapp

npm install

npm start

