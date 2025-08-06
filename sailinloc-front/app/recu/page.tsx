"use client";

import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";

export default function RecuPage() {
  const params = useSearchParams();

  const prenom = params.get("prenom") || "";
  const nom = params.get("nom") || "";
  const email = params.get("email") || "";
  const telephone = params.get("telephone") || "";
  const total = params.get("total") || "0";
  const reservationId = params.get("reservationId") || "";

  const generateReceiptPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reçu de Paiement", 10, 20);

    doc.setFontSize(12);
    doc.text(`Merci pour votre réservation, ${prenom} ${nom}`, 10, 35);
    doc.text(`Réservation ID: ${reservationId}`, 10, 45);
    doc.text(`Email: ${email}`, 10, 55);
    doc.text(`Téléphone: ${telephone}`, 10, 65);
    doc.text(`Total payé: ${total} €`, 10, 75);

    doc.text(
      "Une confirmation vous a été envoyée par email.",
      10,
      90,
      { maxWidth: 190 }
    );

    doc.save(`recu-${reservationId}.pdf`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold text-green-700"> Paiement Réussi</h1>
        <p className="text-sm text-gray-600">
          Merci <strong>{prenom} {nom}</strong> pour votre réservation.
        </p>
        <div className="space-y-2 text-sm text-gray-700 text-left">
          <p><strong>Réservation ID:</strong> {reservationId}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Téléphone:</strong> {telephone}</p>
          <p><strong>Total payé:</strong> {total} €</p>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Une confirmation vous a été envoyée par email.
        </p>

        <button
          onClick={generateReceiptPdf}
          className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Télécharger le reçu 
        </button>
      </div>
    </div>
  );
}
