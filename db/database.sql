DROP DATABASE IF EXISTS desafioapp;

CREATE DATABASE IF NOT EXISTS desafioapp;

USE desafioapp;

CREATE TABLE edades(
 idEdad INT(1) NOT NULL AUTO_INCREMENT,
 edad VARCHAR(30) NOT NULL,
 PRIMARY KEY (idEdad)
) engine = InnoDB;

CREATE TABLE lugares(
 idLugar INT(2) NOT NULL AUTO_INCREMENT,
 nombre VARCHAR(30) NOT NULL,
 calle VARCHAR(30),
 nro INT(4),
 barrio VARCHAR(20),
 PRIMARY KEY (idLugar)
) engine = InnoDB;

CREATE TABLE tipoEventos(
 idTipoEvento INT(2) NOT NULL AUTO_INCREMENT,
 nombre VARCHAR(30) NOT NULL,
 PRIMARY KEY (idTipoEvento)
) engine = InnoDB;


CREATE TABLE participantes(
 idParticipante INT(7) NOT NULL AUTO_INCREMENT ,
 nombre VARCHAR(30),
 apellido VARCHAR(30),
 idEdad INT(2),
 nroDoc INT(9),
 fechaNac DATE,
 nroCel INT(15),
 mail VARCHAR(30),
 nroCelEmergencia INT(15),
 nombreTutor VARCHAR(15),
 PRIMARY KEY (idParticipante),
 FOREIGN KEY (idEdad) REFERENCES edades(idEdad)
) engine = InnoDB;

CREATE TABLE eventos(
 idEvento INT(2) NOT NULL AUTO_INCREMENT,
 idTipoEvento INT(2),
 idLugar INT(2),
 nombre VARCHAR(30) NOT NULL,
 fecha DATE,
 hora VARCHAR(5),
 cupo INT (3),
 nombreDisertante VARCHAR(30),
 descripcion VARCHAR(65535),
 FOREIGN KEY (idTipoEvento) REFERENCES tipoEventos(idTipoEvento),
 FOREIGN KEY (idLugar) REFERENCES lugares(idLugar),
 PRIMARY KEY (idEvento)
) engine = InnoDB;

CREATE TABLE inscripciones(
  id INT(11) NOT NULL AUTO_INCREMENT,
  idParticipante INT(7),
  idEvento INT(2),
  fechaInscripcion DATE,
  asistio VARCHAR(2),
  autorizacion VARCHAR(2),
  FOREIGN KEY (idParticipante) REFERENCES participantes(idParticipante),
  FOREIGN KEY (idEvento) REFERENCES eventos(idEvento),
  PRIMARY KEY(id)
) engine = InnoDB;

INSERT INTO lugares values 
  (1, 'Plaza de la mùsica', 'Avenida', 255, 'Barrio 1'),
  (2, 'Colegio', 'Calle', 1255, 'Barrio 2'),
  (3, 'Auditorio', 'Boulevard', 255, 'Barrio 3');

INSERT INTO tipoEventos values 
  (1, 'Taller'),
  (2, 'Charla'),
  (3, 'Capacitaciòn');
  
INSERT INTO edades values 
  (1, '15'),
  (2, '16'),
  (3, '17'),
  (4, '18'),
  (5, '+');
  
   INSERT INTO participantes values 
  (1,'Valeria', 'Fritelli', 1, 45985331, '2002/06/12', 155123123,'correo@dominio.com',154123123,'Fritelli, Juan'),
  (2,'Margarita', 'Pèrez',2, 46598532, '2002/01/09', 155583561, 'correo@dominio.com', 152541524,'Pèrez, Josè'),
  (3,'Oriana', 'Fritelli',4, 47985333, '2002/02/25', 152583561,'correo@dominio.com', 158541524,'Gonzalez Marìa');
  
   INSERT INTO eventos values 
  (1, 1, 2, 'Taller XY', '2019/10/25','18:00',15, 'Juan Pèrez', 'Esta es una descripcion de prueba'),
  (2, 3, 1, 'Taller II', '2019/10/25','18:00',15, 'Juan Pèrez', 'Esta es una descripcion de prueba'),
  (3, 1, 1, 'Taller Y', '2019/11/02','18:00',15, 'Juan Pèrez', 'Esta es una descripcion de prueba');
  
  
 INSERT INTO inscripciones values 
  (1, 1, 1, '2019/09/19','SI','SI'),
  (2, 2, 2, '2019/09/19','SI','SI'),
  (3, 3, 2, '2019/09/19','SI','SI');
  
 
select * from inscripciones; 
select * from lugares; 
select * from participantes;
select * from edades;
/*drop database desafioapp;*/