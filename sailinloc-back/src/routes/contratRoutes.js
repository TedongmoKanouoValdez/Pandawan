const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { uploadToCloud } = require("../services/cloudinaryUploadService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/sign", async (req, res) => {
  const { bookingId, signature } = req.body;

  if (!bookingId || !signature) {
    return res.status(400).json({ error: "BookingId ou signature manquant." });
  }

  try {
    // 1. Récupérer la réservation
    const booking = await prisma.booking.findUnique({ where: { id: parseInt(bookingId) } });
    if (!booking) return res.status(404).json({ error: "Réservation non trouvée." });

    // 2. Créer le PDF
    const doc = new PDFDocument();
    const filename = `contrat-${bookingId}-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, "..", "..", "contrats", filename);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text("Contrat de location", { align: "center" });
    doc.moveDown();
    doc.text(`Nom du client : ${booking.nomClient}`);
    doc.text(`Bateau : ${booking.bateau}`);
    doc.text(`Date début : ${booking.dateDebut}`);
    doc.text(`Date fin : ${booking.dateFin}`);
    doc.text(`Montant : ${booking.montant} €`);
    doc.moveDown();
    doc.text("Signature du client :");
    doc.image(signature, { width: 150, height: 70 });
    doc.end();

    writeStream.on("finish", async () => {
      const cloudUrl = await uploadToCloud(filePath, filename);

      // 3. Mise à jour dans la BDD
      await prisma.booking.update({
        where: { id: parseInt(bookingId) },
        data: {
          signature: signature,
          contratPdfUrl: cloudUrl,
        },
      });

      res.json({ message: "Contrat généré et uploadé", contratUrl: cloudUrl });
    });

  } catch (error) {
    console.error("Erreur /sign:", error);
    res.status(500).json({ error: "Erreur serveur lors de la signature" });
  }
});

module.exports = router;
