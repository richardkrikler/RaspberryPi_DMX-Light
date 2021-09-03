DROP DATABASE IF EXISTS raspberrypi_dmx;
CREATE DATABASE raspberrypi_dmx CHARACTER SET utf8 COLLATE utf8_general_ci;
USE raspberrypi_dmx;

CREATE TABLE colors
(
    pk_color_id INTEGER AUTO_INCREMENT,
    red         INTEGER,
    green       INTEGER,
    blue        INTEGER,
    alpha       DECIMAL(3, 3),
    CONSTRAINT PRIMARY KEY (pk_color_id)
);

INSERT INTO colors (red, green, blue, alpha) VALUE (255, 255, 255, 0.123);

SELECT pk_color_id
FROM colors
WHERE (red = 255)
  AND (green = 255)
  AND (blue = 255)
  AND (alpha = .123);
