const express = require('express');
const upload = require('../middleware/upload');
const { createUtilisateur, updateUtilisateur, deleteUtilisateur, getAllUtilisateurs, getUtilisateur  } = require('../controllers/utilisateurController');

const router = express.Router();

router.post('/', upload.array('photoProfil', 2), (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Photo de profil requise' });
  }
  if (req.files.length > 1) {
    return res.status(400).json({ message: 'Une seule photo de profil est autorisée' });
  }

  req.file = req.files[0];  // On met le fichier unique dans req.file pour la suite
  next();
}, createUtilisateur);

//route de modification de l'utilisateur
router.put('/:id', upload.single('photoProfil'), updateUtilisateur); 

// route pour la suppression d'un utilisateur
router.delete('/:id', deleteUtilisateur);

// affiche les données des utilisateurs
router.get('/', getAllUtilisateurs);

//route pour un utilisateur
router.get('/:id', getUtilisateur);

module.exports = router;
