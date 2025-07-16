require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Activer CORS
app.use(cors());

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

const bateauRoutes = require('./src/routes/bateauRoute');
app.use('/api/bateaux', bateauRoutes);

const uploadRoute = require("./src/routes/uploadRoute");
app.use("/upload-documents", uploadRoute);

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
