// src/controllers/contratController.js
const { generateContratPDF } = require("../services/pdfService");
const PDFDocument = require('pdfkit');


exports.signContrat = async (req, res) => {
  try {
    const { bookingId, signature } = req.body;

    // TODO: récupérer les données depuis la BDD (exemple simplifié)
    const user = { nom: "Jean Dupont" };
    const bateau = { nom: "Sea Queen" };
    const dates = { start: "2025-08-01", end: "2025-08-05" };

    const pdfPath = await generateContratPDF({
      contratId: bookingId,
      user,
      bateau,
      dates,
      signatureBase64: signature,
    });

    // Étape suivante → upload cloud
    res.status(200).json({ pdfPath });
  } catch (error) {
    console.error("Erreur PDF:", error.message);
    res.status(500).json({ error: "Erreur génération du contrat PDF" });
  }
};
