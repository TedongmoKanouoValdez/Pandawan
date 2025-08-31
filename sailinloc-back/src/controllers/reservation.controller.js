// reservation.controller.js
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

module.exports = { createReservationController };
