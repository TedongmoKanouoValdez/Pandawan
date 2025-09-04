require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Activer CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const bateauRoutes = require("./routes/bateauRoute");
app.use("/api/bateaux", bateauRoutes);

const uploadRoute = require("./routes/uploadRoute");
app.use("/upload-documents", uploadRoute);

const commentaireRoutes = require("./routes/commentaireRoutes");
app.use("/api/commentaires", commentaireRoutes);

const reservationRoutes = require("./routes/reservation.routes");
app.use("/api/reservations", reservationRoutes);

const messageRoutes = require("./routes/message.routes");
app.use("/messages", messageRoutes);

const paiementRoutes = require("./routes/paiement.routes");
app.use("/api/paiements", paiementRoutes);

const contratRoutes = require("./routes/contrat");
app.use("/api/upload-contrat", contratRoutes);

const recuRoutes = require("./routes/recuRoutes");
app.use("/api", recuRoutes);

const userRoutes = require('./routes/utilisateurRoute');
app.use('/api/utilisateur', userRoutes);

const demandeRoutes = require('./routes/demandeProprietaireRoutes');
app.use('/api', demandeRoutes);

const captchaRoutes = require('./routes/captcha');
app.use('/api', captchaRoutes);

// Démarrer le serveur une seule fois
const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app; // Utile pour les tests ou pour un autre usage
