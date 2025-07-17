require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware CORS AVANT les routes
app.use(cors({
  origin: 'http://localhost:3000', //
  credentials: true,
}));

// Middleware pour parser le JSON
app.use(express.json());

// Importer les routes auth
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

const bateauRoutes = require('./src/routes/bateauRoute');
app.use('/api', bateauRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
