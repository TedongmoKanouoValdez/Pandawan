// reservation.routes.js
const express = require("express");
const {
  createReservationController,
} = require("../controllers/reservation.controller");

const router = express.Router();
router.post("/", createReservationController);

module.exports = router;
