const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary");

const router = express.Router();
const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload-contrat", async (req, res) => {
  try {
    console.log("✅ Route /api/upload-contrat appelée");

    const { base64Pdf, reservationId } = req.body;

    console.log("reservationId:", reservationId);
    console.log("base64Pdf (début):", base64Pdf?.slice(0, 30));

    if (!base64Pdf || !reservationId) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    // Reconstruire la chaîne base64 complète
    const fullBase64 = `data:application/pdf;base64,${base64Pdf}`;

    // Upload vers Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(fullBase64, {
      resource_type: "raw",
      folder: "contrats",
      public_id: `contrat_${reservationId}_${Date.now()}`,
      overwrite: true,
    });

    // Récupérer ou créer un contrat
    let contrat = await prisma.contrat.findUnique({
      where: { reservationId },
    });

    if (!contrat) {
      contrat = await prisma.contrat.create({
        data: {
          reservationId,
          signature: false,
        },
      });
    }

    // Créer un media
    await prisma.media.create({
      data: {
        url: uploadResult.secure_url,
        type: "CONTRAT_RESERVATION",
        contratId: contrat.id,
        titre: `Contrat de réservation #${reservationId}`,
      },
    });

    // Mettre à jour la réservation
    await prisma.reservation.update({
      where: { id: reservationId },
      data: { urlDocumentContrat: uploadResult.secure_url },
    });

    res.status(200).json({ message: "Upload successful", url: uploadResult.secure_url });

  } catch (error) {
    console.error("❌ Erreur lors de l'upload du contrat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
