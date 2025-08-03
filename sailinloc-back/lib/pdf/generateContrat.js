

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

/**
 * Génère un contrat de location PDF pour une réservation.
 * @param {Object} reservation - Les détails de la réservation (avec utilisateur, bateau...).
 * @returns {Promise<Uint8Array>} - Le buffer PDF à uploader ensuite dans Cloudinary.
 */
async function generateContract(reservation) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontSize = 12;
  let y = height - 40;

  // Données nécessaires
  const utilisateur = reservation.utilisateur;
  const bateau = reservation.bateau;
  const dateDebut = new Date(reservation.dateDebut).toLocaleDateString();
  const dateFin = new Date(reservation.dateFin).toLocaleDateString();

  const lines = [
    'CONTRAT DE LOCATION DE BATEAU',
    '',
    `Nom du locataire : ${utilisateur.nom} ${utilisateur.prenom}`,
    `Email : ${utilisateur.email}`,
    '',
    `Bateau : ${bateau.nom} - ${bateau.modele}`,
    `Port de départ : ${bateau.port}`,
    '',
    `Date de début : ${dateDebut}`,
    `Date de fin : ${dateFin}`,
    '',
    `Montant total : ${reservation.paiement?.montant ?? 'Non défini'} €`,
    '',
    'En signant ce contrat, le locataire accepte les termes de la location.',
    '',
    'Signature du locataire : ____________________________',
    '',
    'Date : ____________________________',
  ];

  lines.forEach(line => {
    page.drawText(line, {
      x: 50,
      y: y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 25;
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

module.exports = generateContract;
