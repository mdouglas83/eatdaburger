CREATE DATABASE IF NOT EXISTS burger_db;

USE burger_db;

CREATE TABLE IF NOT EXISTS burgers (
	id int NOT NULL AUTO_INCREMENT,
	burger varchar(255) NOT NULL,
	eaten BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);