const express = require("express");
const { creerBateau } = require("../controllers/bateauController");
const { bateauValidationRules } = require("../Validation/bateauValidation");
const handleValidation = require("../middlewares/handleValidation");
const upload = require("../middlewares/upload"); // Ton multer bien configuré

const router = express.Router();

router.post(
  "/bateaux",
  upload.array("medias", 10),          // pour les fichiers locaux
  bateauValidationRules,              // validation des champs texte
  handleValidation,                   // gestion des erreurs
  creerBateau                         // logique de création
);

module.exports = router;
