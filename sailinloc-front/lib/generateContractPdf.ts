// lib/pdf/generateContractPdf.ts
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

interface ContractData {
  customerName: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
}

export async function generateContractPdf(data: ContractData): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            line-height: 1.5;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          .section {
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Contrat de location</h1>
        <div class="section">
          <strong>Client :</strong> ${data.customerName}
        </div>
        <div class="section">
          <strong>Véhicule :</strong> ${data.vehicleName}
        </div>
        <div class="section">
          <strong>Du :</strong> ${data.startDate}<br/>
          <strong>Au :</strong> ${data.endDate}
        </div>
        <div class="section">
          <strong>Montant total :</strong> ${data.totalAmount} €
        </div>
        <p>
          En signant ce contrat, le locataire accepte les conditions générales de location.
        </p>
      </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
}
