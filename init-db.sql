CREATE DATABASE IF NOT EXISTS forum_docker;

USE forum_docker;

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME NOT NULL
);


INSERT INTO messages (pseudo, content) VALUES ('TestUser', 'Ceci est un message test.');