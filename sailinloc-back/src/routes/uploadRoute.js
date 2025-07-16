// routes/uploadRoute.js
const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const upload = require("../middleware/upload");
const cloudinary = require("../utils/cloudinaryConfig");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "section1", maxCount: 4 },
    { name: "section2", maxCount: 5 },
    { name: "attestation1", maxCount: 1 },
    { name: "certificat", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const uploadedUrls = [];

      const files = [
        ...(req.files.section1 || []),
        ...(req.files.section2 || []),
        ...(req.files.attestation1 || []),
        ...(req.files.certificat || []),
      ];

      const { nomBateau, description, capaciteMax, bateauId, utilisateurId } = req.body;

      for (const file of files) {
        const filePath = file.path;
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "mon-projet-bateau",
        });

        const media = await prisma.media.create({
          data: {
            url: result.secure_url,
            type: "IMAGE", // à adapter selon ton enum TypeMedia
            titre: file.originalname,
            description: null,
            bateau: bateauId ? { connect: { id: parseInt(bateauId) } } : undefined,
            utilisateur: utilisateurId ? { connect: { id: parseInt(utilisateurId) } } : undefined,
          },
        });

        uploadedUrls.push(media);

        await fs.remove(filePath);
      }

      res.json({
        success: true,
        message: "Upload réussi",
        medias: uploadedUrls,
        infos: { nomBateau, description, capaciteMax },
      });
    } catch (error) {
      console.error("Erreur upload Cloudinary ou enregistrement DB :", error);
      res.status(500).json({ success: false, message: "Erreur lors de l'upload ou de l'enregistrement" });
    }
  }
);


module.exports = router;
