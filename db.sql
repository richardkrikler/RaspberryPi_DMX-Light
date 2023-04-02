CREATE TABLE
    IF NOT EXISTS colors (
        color_id INTEGER PRIMARY KEY AUTOINCREMENT,
        red INTEGER,
        green INTEGER,
        blue INTEGER,
        alpha DECIMAL(3, 2)
    );

INSERT INTO
    colors (red, green, blue, alpha)
VALUES (255, 255, 255, 0.123), (255, 0, 0, 1), (0, 255, 0, 1), (0, 0, 255, 1);