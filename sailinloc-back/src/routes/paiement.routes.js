const express = require("express");
const router = express.Router();
const { createPaiement } = require("../services/paiement.service");

router.post("/", async (req, res) => {
  try {
    const paiement = await createPaiement(req.body);
    res.status(201).json({ message: "Paiement enregistré", paiement });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

module.exports = router;
