CREATE DATABASE IF NOT EXISTS inventario_tecnologico
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE inventario_tecnologico;

CREATE TABLE IF NOT EXISTS equipos (
  id INT NOT NULL AUTO_INCREMENT,
  codigoInventario VARCHAR(30) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  tipo VARCHAR(60) NOT NULL,
  marca VARCHAR(60) NOT NULL,
  modelo VARCHAR(80) NOT NULL,
  ubicacion VARCHAR(100) NOT NULL,
  estado ENUM('Disponible', 'En uso', 'Mantención', 'Baja') NOT NULL,
  fechaAdquisicion DATE NOT NULL,
  observaciones TEXT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;