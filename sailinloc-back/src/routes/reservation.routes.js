// reservation.routes.js
const express = require("express");
const {
  createReservationController,
  getReservationsByProprietaire,
} = require("../controllers/reservation.controller");

const router = express.Router();
router.post("/", createReservationController);

// GET /reservations/proprietaire/:proprietaireId
router.get("/proprietaire/:proprietaireId", getReservationsByProprietaire);

module.exports = router;
