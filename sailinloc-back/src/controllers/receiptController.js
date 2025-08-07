const { generateAndUploadReceipt } = require('../services/receiptService');

async function generateReceiptController(req, res) {
  const { clientName, boatName, amount, date } = req.body;

  if (!clientName || !boatName || !amount || !date) {
    return res.status(400).json({ message: 'Données manquantes pour générer le reçu.' });
  }

  try {
    const url = await generateAndUploadReceipt({ clientName, boatName, amount, date });
    res.status(200).json({ receiptUrl: url });
  } catch (error) {
    console.error('[generateReceiptController] Erreur:', error);
    res.status(500).json({ message: 'Erreur lors de la génération du reçu.' });
  }
}

module.exports = {
  generateReceiptController
};
