DROP DATABASE IF EXISTS raspberrypi_dmx;
CREATE DATABASE raspberrypi_dmx CHARACTER SET utf8 COLLATE utf8_general_ci;
USE raspberrypi_dmx;

CREATE TABLE colors
(
    pk_color_id INTEGER AUTO_INCREMENT,
    red         INTEGER,
    green       INTEGER,
    blue        INTEGER,
    alpha       DECIMAL(3, 2),
    CONSTRAINT PRIMARY KEY (pk_color_id)
);
