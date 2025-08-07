require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes classiques
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const bateauRoutes = require("./routes/bateauRoute");
app.use("/api/bateaux", bateauRoutes);

const uploadRoute = require("./routes/uploadRoute");
app.use("/upload-documents", uploadRoute);

const userRoutes = require("./routes/utilisateurRoute");
app.use("/api/utilisateur", userRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const emailRoutes = require("./routes/contactRoutes");
app.use("/emails", emailRoutes);

// const receiptRoute = require("./routes/receiptRoute.js");
// app.use("/api/receipt", receiptRoute);

// const contractRoute = require("./routes/contractRoute.js");
// app.use("/api/contract", contractRoute);

// ✅ Route correcte pour upload-contrat
const uploadContractRoute = require('./routes/uploadContractRoute');
app.use('/api', uploadContractRoute); // <-- expose bien /api/upload-contrat

// const reservationsRouter = require('./routes/reservations');
// app.use('/api/reservations', reservationsRouter);





// Lancer le serveur
const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app;
