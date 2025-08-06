"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jsPDF } from "jspdf";

export default function ContratPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const titre = searchParams.get("titre") || "";
  const prenom = searchParams.get("prenom") || "";
  const nom = searchParams.get("nom") || "";
  const codePays = searchParams.get("codePays") || "";
  const telephone = searchParams.get("telephone") || "";
  const email = searchParams.get("email") || "";
  const extras = searchParams.get("extras")?.split(",") || [];
  const total = searchParams.get("total") || "0";
  const reservationId = searchParams.get("reservationId") || "";

  const today = new Date();
  const dateLocale = today.toLocaleDateString("fr-FR"); // exemple : "06/08/2025"


const generatePdf = () => {
  if (!accepted) {
    alert("Vous devez accepter les conditions générales avant de télécharger le contrat.");
    return;
  }

  const imageUrl = "https://res.cloudinary.com/dluqkutu8/image/upload/v1754467613/S_ywnlvv.jpg";
  const doc = new jsPDF();

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;

  img.onload = () => {
    // Logo
    doc.addImage(img, "JPEG", 10, 10, 40, 20); // logo en haut à gauche

    // Titre
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("CONTRAT DE RÉSERVATION - SAILINGLOC", 60, 20);

    // Date
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 150, 30);

    // Partie entreprise
    doc.setFont("helvetica", "bold");
    doc.text("Entre les soussignés :", 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text("SAILINGLOC", 10, 50);
    doc.text("Société spécialisée dans la location de bateaux de plaisance", 10, 55);
    doc.text("Siège social : Marseille, France", 10, 60);
    doc.text("Email : contact@sailingloc.fr", 10, 65);

    // Ligne de séparation
    doc.line(10, 70, 200, 70);

    // Partie client
    doc.setFont("helvetica", "bold");
    doc.text("Et le client :", 10, 80);
    doc.setFont("helvetica", "normal");
    doc.text(`${titre} ${prenom} ${nom}`, 10, 90);
    doc.text(`Téléphone : ${codePays} ${telephone}`, 10, 95);
    doc.text(`Email : ${email}`, 10, 100);

    // Objet
    doc.setFont("helvetica", "bold");
    doc.text("1. Objet du contrat", 10, 115);
    doc.setFont("helvetica", "normal");
    doc.text("Ce contrat a pour objet la réservation d’un bateau de plaisance via SailingLoc.", 10, 121, { maxWidth: 190 });

    // Extras
    doc.setFont("helvetica", "bold");
    doc.text("2. Options / Extras sélectionnés", 10, 135);
    doc.setFont("helvetica", "normal");
    doc.text(extras.length > 0 ? extras.join(", ") : "Aucun", 10, 141);

    // Prix
    doc.setFont("helvetica", "bold");
    doc.text("3. Prix et paiement", 10, 155);
    doc.setFont("helvetica", "normal");
    doc.text(`Le montant total de la réservation est de ${total} € TTC.`, 10, 161);

    // CGV
    doc.setFont("helvetica", "bold");
    doc.text("4. Conditions générales", 10, 175);
    doc.setFont("helvetica", "normal");
    doc.text("Le client accepte sans réserve les conditions générales de vente disponibles sur www.sailingloc.fr.", 10, 181, { maxWidth: 190 });

    // Signature
    doc.setFont("helvetica", "bold");
    doc.text("5. Confirmation et signature", 10, 195);
    doc.setFont("helvetica", "normal");
    doc.text(
      "En signant le présent contrat, le client confirme avoir pris connaissance des conditions générales et accepte sa réservation.",
      10,
      201,
      { maxWidth: 190 }
    );

    // Emplacement de signature
    doc.setFont("helvetica", "bold");
    doc.text("Signature du client :", 10, 220);
    doc.setFont("helvetica", "normal");
    doc.rect(60, 210, 60, 20); // encadré pour signature
    doc.setFontSize(22);
    doc.text("X", 85, 225); // le "X" au milieu

    // Mentions de lieu et date
    doc.setFontSize(11);
    doc.text(`Fait à : Sartrouville`, 10, 245);
    doc.text(`Le : ${dateLocale}`, 110, 245); //

    // Sauvegarde du fichier
    doc.save(`contrat-reservation-${reservationId}.pdf`);
  };
};


  const handlePayment = () => {
    if (!accepted) {
      alert("Vous devez accepter les conditions générales avant de procéder au paiement.");
      return;
    }

    router.push(`/payementPage?amount=${total}&reservationId=${reservationId}&prenom=${prenom}&nom=${nom}&email=${email}&telephone=${codePays}${telephone}`);
  };

 return (
  <div
    className="min-h-screen bg-cover bg-center relative"
    style={{
      backgroundImage: `url('https://res.cloudinary.com/dluqkutu8/image/upload/v1751362027/4847236_rplbu1.jpg')`,
    }}
  >
    <div className="min-h-screen flex items-center justify-center bg-black/30 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-800">Contrat de Réservation</h1>

        <p className="text-sm text-gray-700 text-justify leading-relaxed">
          Ce contrat formalise un accord entre <strong>SailingLoc</strong>, société spécialisée dans la location de bateaux de plaisance,
          et <strong>{titre} {prenom} {nom}</strong>, ci-après dénommé(e) "le Client".<br />
          En acceptant ce contrat, le Client confirme sa réservation et accepte sans réserve les conditions générales de vente de SailingLoc.
        </p>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Nom :</strong> {titre} {prenom} {nom}</p>
          <p><strong>Téléphone :</strong> {codePays} {telephone}</p>
          <p><strong>Email :</strong> {email}</p>
          <p><strong>Extras sélectionnés :</strong> {extras.length > 0 ? extras.join(", ") : "Aucun"}</p>
          <p><strong>Total à payer :</strong> {total} €</p>
          <p><strong>Date du contrat :</strong> {new Date().toLocaleDateString("fr-FR")}</p>
        </div>

        <div className="pt-4 border-t">
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
            />
            <span className="text-sm text-gray-700">
              J’accepte les conditions générales de vente et confirme ma réservation avec SailingLoc.
            </span>
          </label>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={generatePdf}
            disabled={!accepted}
            className={`flex-1 py-3 rounded-xl text-white font-semibold transition duration-200 ${
              accepted ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Télécharger le contrat (PDF)
          </button>

          <button
            onClick={handlePayment}
            disabled={!accepted || loading}
            className={`flex-1 py-3 rounded-xl text-white font-semibold transition duration-200 ${
              accepted && !loading ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Sauvegarde en cours..." : "Payer"}
          </button>
        </div>
      </div>
    </div>
  </div>
)
  }