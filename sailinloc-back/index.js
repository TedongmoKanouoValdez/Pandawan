require('dotenv').config();
const express = require('express');
const app = express();

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Importer les routes auth
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
