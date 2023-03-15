CREATE DATABASE IF NOT EXISTS nodelogin;

USE nodelogin;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
);

ALTER TABLE users ADD COLUMN description VARCHAR(255) NOT NULL;

ALTER TABLE users ADD COLUMN arrival_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

SELECT * FROM users ORDER BY arrival_time;