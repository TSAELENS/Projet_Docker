const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

// Créez une connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost', // Remplacez par l'adresse du serveur MySQL
  user: 'root',
  password: '',
  database: 'forum_docker',
});

// Connectez-vous à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Middleware pour parser le JSON
app.use(express.json());

// Configuration pour servir des fichiers statiques depuis le répertoire "public"
app.use(express.static('public'));

// Base de données de messages
const messages = [];

// Route pour poster un message
app.post('/messages', (req, res) => {
  const { pseudo, content } = req.body;
  if (!pseudo || !content) {
    return res.status(400).json({ error: 'Le pseudo et le contenu du message sont requis' });
  }
  const newMessage = {
    pseudo,
    content,
    timestamp: new Date().toISOString(),
  };

  // Insérer le message dans la base de données
  db.query('INSERT INTO messages SET ?', newMessage, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion du message :', err);
      return res.status(500).json({ error: 'Erreur lors de l\'insertion du message' });
    }
    messages.push(newMessage);
    res.status(201).json(newMessage);
  });
});

// Route pour afficher les messages
app.get('/messages', (req, res) => {
  // Récupérer tous les messages depuis la base de données
  db.query('SELECT pseudo, content, timestamp FROM messages', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages :', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    }
    res.json(rows);
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur non gérée :', err);
  res.status(500).json({ error: 'Une erreur interne est survenue' });
});

// Route pour servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
