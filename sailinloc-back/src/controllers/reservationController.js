// import { createReservationService } from "../services/reservationService.js";

// export const createReservation = async (req, res) => {
//   try {
//     const reservationData = req.body;

//     const reservation = await createReservationService(reservationData);

//     res.status(201).json({ reservationId: reservation.id, message: "Réservation créée avec succès" });
//   } catch (error) {
//     console.error("Erreur création réservation :", error);
//     res.status(500).json({ error: "Erreur lors de la création de la réservation" });
//   }
// };
