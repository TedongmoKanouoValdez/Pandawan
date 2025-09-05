// reservation.controller.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { createReservation } = require("../services/reservation.service");

const createReservationController = async (req, res) => {
  try {
    const data = req.body;

    const reservation = await createReservation(data);

    res.status(201).json({ message: "Réservation créée", reservation });
  } catch (error) {
    console.error(error);

    // Vérifier si l'erreur est personnalisée
    const status = error.statusCode || 500;
    const message =
      error.message || "Erreur lors de la création de la réservation";

    res.status(status).json({ error: message });
  }
};

// Récupérer les réservations d’un propriétaire
const getReservationsByProprietaire = async (req, res) => {
  const { proprietaireId } = req.params;

  if (!proprietaireId) {
    return res.status(400).json({ error: "proprietaireId est requis" });
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        bateau: {
          proprietaireId: parseInt(proprietaireId),
        },
      },
      include: {
        bateau: { include: { medias: true } },
        utilisateur: true,
      },
      orderBy: { creeLe: "desc" },
    });

    if (!reservations.length) {
      return res.status(404).json({ error: "Aucune réservation trouvée" });
    }

    res.json({ success: true, reservations });
  } catch (error) {
    console.error("❌ Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des réservations du propriétaire",
      message: error?.message,
    });
  }
};
module.exports = { createReservationController, getReservationsByProprietaire };
