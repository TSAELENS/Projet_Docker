CREATE DATABASE forum_docker;

USE forum_docker;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME NOT NULL
);
