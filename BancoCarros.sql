-- CRIANDO BANCO --
DROP DATABASE IF EXISTS vendacarros;

CREATE DATABASE IF NOT EXISTS vendacarros;

USE vendacarros;

-- CRIANDO AS TABELAS --
CREATE TABLE vendacarros.carro (
    ID_carro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Marca VARCHAR(255) NOT NULL,
    Modelo VARCHAR(255) NOT NULL,
    Ano YEAR NOT NULL,
    Preco DECIMAL(10,2) NOT NULL
);

CREATE TABLE vendacarros.loja (
    ID_loja INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(255) NOT NULL,
    CNPJ VARCHAR(18) NOT NULL,
    Telefone VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE vendacarros.cliente (
	ID_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,   
	Nome VARCHAR(100) NOT NULL,   
	Data_Nasc DATE NOT NULL,   
	Email VARCHAR(100) NOT NULL,   
	Senha VARCHAR(45) NOT NULL
);

CREATE TABLE vendacarros.pagamento (
    ID_pagamento INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    NomeProprietario VARCHAR(255) NOT NULL,
    NumeroCartao VARCHAR(16) NOT NULL,
    ValidadeCartao DATE NOT NULL,
    CVV INT NOT NULL,
    TipoCartao ENUM('credito', 'debito') NOT NULL,
    data_compra DATETIME DEFAULT NOW() NOT NULL
);
    
CREATE TABLE vendacarros.compra_cliente (
    ID_compra INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    ID_user INT NOT NULL,
    ID_carro INT NOT NULL,
    Quant INT NOT NULL,
    CHECK (Quant >= 1 AND Quant <= 10),
    FOREIGN KEY (ID_user) REFERENCES cliente(ID_user),
    FOREIGN KEY (ID_carro) REFERENCES carro(ID_carro)
);

CREATE TABLE vendacarros.venda_loja (
    ID_venda INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    ID_loja INT NOT NULL,
    ID_carro INT NOT NULL,
    Valor DECIMAL(20,2),
    FOREIGN KEY (ID_loja) REFERENCES loja(ID_loja),
    FOREIGN KEY (ID_carro) REFERENCES carro(ID_carro)
);

-- Inserção de Dados --
INSERT INTO vendacarros.carro (Marca, Modelo, Ano, Preco)
VALUES
    ('Ford', 'Mustang', 1967, '2300000.00'),
    ('Lamborghini', 'Urus', 2023, '1347356.00'),
    ('McLaren', 'P1', 2023, '7565201.00'),
	('Lamborghini', 'Aventador Convertible', 2022, '3200000.00'),
    ('Porsche', '911', 2023, '1769000.00'),
    ('Pagani', 'Huayra Tricolore', 2010, '30032247.00'),
    ('SSC', 'Tuatara', 2020, '10198200.00'),
    ('Bugatti', 'Divo', 2020, '29574780.00'),
    ('Koenigsegg', 'Agera RS', 2015, '12876500.00'),
    ('Maserati', 'MC12 Stradale', 2000, '13968281.00'),
    ('Lamborghini', 'Veneno', 2013, '22945950.00'),
    ('Ferrari', 'LaFerrari', 2018, '13850000.00');
    
INSERT INTO vendacarros.loja (Nome, CNPJ, Telefone, email)
VALUES
    ('TurboHub', '30.189.559/0001-72', '(07)3883 1325', 'Turbohub@gmail.com');
    
INSERT INTO vendacarros.cliente (Nome, Data_Nasc, Email, Senha)
VALUES
    ('Mohamad', '2004-09-14', 'mohamadkd10@gmail.com', '1234')


