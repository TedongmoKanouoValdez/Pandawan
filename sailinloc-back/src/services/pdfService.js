// src/services/pdfService.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generatePdfContrat(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.fontSize(18).text('Contrat de Location', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Nom du client: ${data.nomClient}`);
      doc.text(`Bateau: ${data.bateau}`);
      doc.text(`Date de location: ${data.dateDebut}`);
      doc.text(`Date de retour: ${data.dateFin}`);
      doc.text(`Montant: ${data.montant} €`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generatePdfContrat };
