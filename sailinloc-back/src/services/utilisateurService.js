const { PrismaClient, RoleUtilisateur, TypeMedia  } = require('@prisma/client');
const { validateUtilisateurInput } = require('../validation/utilisateurValidation');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const {cloudinary, getPublicIdFromUrl } = require('../utils/cloudinaryConfig');

const fs = require('fs-extra');
const path = require('path');
async function createUserWithPhoto(data, file) {
  const error = validateUtilisateurInput(data);
  if (error) {
    await fs.remove(file.path);  // Supprime le fichier si erreur de validation
    throw new Error(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(data.motDePasse, 10);

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'users/profiles',
    });

    const user = await prisma.utilisateur.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        motDePasse: hashedPassword,
        role: data.role ? data.role : RoleUtilisateur.PROPRIETAIRE,
        telephone: data.telephone || null,
        adresse: data.adresse || null,
        photoProfil: result.secure_url,
        medias: {
          create: {
            url: result.secure_url,
            type: TypeMedia.PROFIL,
            titre: 'Photo de profil'
          }
        }
      },
    });

    await fs.remove(file.path);

    const { motDePasse, ...userWithoutPassword } = user;
    return userWithoutPassword;

  } catch (err) {
    await fs.remove(file.path); // supprime le fichier en cas d’erreur aussi
    throw err;
  }
}

async function updateUserWithPhoto(id, data, file) {
  const utilisateur = await prisma.utilisateur.findUnique({
    where: { id: parseInt(id) },
  });

  if (!utilisateur) {
    if (file) await fs.remove(file.path);
    throw new Error('Utilisateur non trouvé');
  }

  if (file) {
    try {
      // ✅ Supprimer ancienne image Cloudinary
      if (utilisateur.photoProfil) {
        const publicId = getPublicIdFromUrl(utilisateur.photoProfil);
        await cloudinary.uploader.destroy(publicId);
      }

      // ✅ Uploader nouvelle image
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'utilisateurs',
      });

      data.photoProfil = result.secure_url;

      // ✅ Ajouter aussi la photo dans la table medias (comme lors de create)
      await prisma.media.create({
        data: {
          url: result.secure_url,
          type: TypeMedia.PROFIL,
          titre: 'Photo de profil',
          utilisateurId: utilisateur.id,
        }
      });

    } catch (err) {
      console.error("Erreur Cloudinary:", err);
      await fs.remove(file.path);
      throw new Error("Erreur lors de la mise à jour de la photo de profil");
    } finally {
      // ✅ Supprime TOUJOURS le fichier temporaire, qu'il y ait une erreur ou non
      await fs.remove(file.path);
    }
  }

  // ✅ Mise à jour des autres données (y compris photoProfil si présente)
  const utilisateurMisAJour = await prisma.utilisateur.update({
    where: { id: parseInt(id) },
    data,
  });

  return utilisateurMisAJour;
}


async function deleteUserById(id) {
  const utilisateur = await prisma.utilisateur.findUnique({
    where: { id }
  });

  if (!utilisateur) {
    throw new Error('Utilisateur non trouvé');
  }

  // Supprimer la photo Cloudinary si elle existe
  if (utilisateur.photoProfil) {
    const publicId = getPublicIdFromUrl(utilisateur.photoProfil);
    await cloudinary.uploader.destroy(publicId);
  }

  // Supprimer l'utilisateur dans la base
  await prisma.utilisateur.delete({
    where: { id }
  });
}

// affichage de tous les utilisateurs
async function getAllUtilisateur() {
  return await prisma.utilisateur.findMany();
  console.log("Service getAllUtilisateurs lancé");
}

//affichage d'un utilisateur
async function getUtilisateurById(id) {
  return await prisma.utilisateur.findUnique({
    where: { id: Number(id) },
  });
}

module.exports = {
  createUserWithPhoto,
  updateUserWithPhoto,
  deleteUserById,
  getAllUtilisateur,
  getUtilisateurById
};
