"use client";
import React, { useRef, useState } from "react";
import { Button } from "@heroui/button";
import { RiEdit2Fill } from "react-icons/ri";
import { IoTicket, IoCloudDownload } from "react-icons/io5";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { QRCode } from "antd";
import { Logo } from "@/components/icons";
import { Alert } from "@heroui/alert";

export default function ContratLocation() {
  const contratRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [message, setMessage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const title = "Téléchargez votre contrat et vos reçus";
  const description =
    "Pour votre sécurité et afin de faciliter votre réservation sur place, nous vous recommandons de télécharger votre contrat de location et vos reçus. Ces documents sont essentiels pour confirmer votre réservation et éviter tout malentendu. N oubliez pas également de cliquer sur le bouton « Terminé » pour finaliser votre réservation.";

  const payloadStr =
    typeof window !== "undefined"
      ? localStorage.getItem("reservationPayload")
      : null;
  const payload = payloadStr ? JSON.parse(payloadStr) : null;

  const reservationId =
    typeof window !== "undefined"
      ? localStorage.getItem("reservationId")
      : null;
  const reservation = reservationId ? JSON.parse(reservationId) : 0;

  // Nouvelle génération PDF avec html-to-image + jsPDF
  const handleDownload = async () => {
    if (!isSigned) {
      setMessage("⚠️ Vous devez signer le contrat avant de télécharger.");
      return;
    }

    setIsDownloading(true);
    setMessage("📥 Téléchargement en cours...");

    if (contratRef.current) {
      setMessage("");
      try {
        // Convertit ton contrat en image PNG
        const dataUrl = await toPng(contratRef.current, {
          cacheBust: true,
          useCors: true,
        });

        // Création du PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

        const pdfBlob = pdf.output("blob");

        const formData = new FormData();
        formData.append("file", pdfBlob, "contrat-location.pdf");
        formData.append("reservationId", reservation.toString());

        const res = await fetch("http://localhost:3001/api/upload-contrat", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          pdf.save("contrat-location.pdf");
          setMessage("PDF téléchargé avec succès !");
        } else {
          setMessage("Échec du téléchargement");
        }
        setIsDownloading(false);

        console.log("PDF généré !");
      } catch (err) {
        console.error("Erreur PDF:", err);
      }
    }
  };

  // ---- Téléchargement reçu ----
  const handleDownloadReceipt = async () => {
    if (!isSigned) {
      setMessage("⚠️ Vous devez signer avant de télécharger le reçu.");
      return;
    }

    setIsDownloading(true);
    setMessage("📥 Téléchargement du reçu...");

    try {
      // Convertit le reçu invisible en PNG
      const dataUrl = await toPng(receiptRef.current!, {
        cacheBust: true,
        useCors: true,
        backgroundColor: "#ffffff",
      });

      // Génération PDF
      const pdf = new jsPDF("p", "mm", "a6");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");

      // Envoi du PDF au backend
      const formData = new FormData();
      formData.append("file", pdfBlob, "recu-location.pdf");
      formData.append("reservationId", reservation.toString());

      const res = await fetch("http://localhost:3001/api/upload-recu", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        pdf.save("recu-location.pdf"); // Téléchargement côté client
        setMessage("Reçu téléchargé et envoyé au serveur avec succès !");
      } else {
        setMessage("Échec du téléchargement du reçu");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la génération du reçu");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSign = () => {
    setIsSigned(true);
    setMessage("Contrat signé avec succès !");
  };

  return (
    <div className="p-6 flex flex-col items-center my-16">
      <div className="mx-auto max-w-7xl mb-4 flex items-center justify-center w-full">
        <Alert description={description} title={title} />
      </div>

      {/* Contrat */}
      <div
        ref={contratRef}
        className="w-full max-w-3xl bg-white shadow-xl text-gray-800"
      >
        {/* Banner */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dluqkutu8/image/upload/v1755611066/sun-shines-wooden-wheel-held-by-man_h7kjfn.jpg"
            alt="Bannière"
            crossOrigin="anonymous"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h1 className="absolute bottom-4 left-6 text-3xl font-bold text-white drop-shadow-md">
            Contrat de Location de Bateau
          </h1>
        </div>

        {/* Infos contrat */}
        <div className="space-y-4 p-8 relative">
          <h2 className="text-xl font-semibold text-blue-600 z-10 relative">
            Informations générales
          </h2>
          <p className="z-10 relative">
            Ce contrat est conclu entre{" "}
            <span className="font-semibold">[Nom du Propriétaire]</span> et{" "}
            <span className="font-semibold">
              {payload?.client?.titre} {payload?.client?.nom}{" "}
              {payload?.client?.prenom}
            </span>
            , contact :{" "}
            <span className="font-semibold">
              +{payload?.client?.codePays} {payload?.client?.telephone}
            </span>
            , pour la location du bateau{" "}
            <span className="font-semibold">{payload?.bateau?.nom}</span>.
          </p>

          <h2 className="text-xl font-semibold text-blue-600 z-10 relative">
            Durée de la location
          </h2>
          <p className="z-10 relative">
            La période de location commence le{" "}
            <strong>
              {payload?.reservation?.dateDebut &&
                new Date(
                  `${payload?.reservation.dateDebut}T00:00:00`
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </strong>{" "}
            et se termine le{" "}
            <strong>
              {payload?.reservation?.dateFin &&
                new Date(
                  `${payload?.reservation.dateFin}T00:00:00`
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </strong>
            .
          </p>

          <h2 className="text-xl font-semibold text-blue-600 z-10 relative">
            Conditions
          </h2>
          <ul className="list-disc list-inside space-y-1 z-10 relative">
            <li>Le locataire s engage à respecter les règles de navigation.</li>
            <li>Le bateau doit être rendu dans le même état qu à la remise.</li>
            <li>Toute dégradation sera à la charge du locataire.</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600 z-10 relative">
            Signature
          </h2>
          <div className="flex justify-between mt-6">
            {/* Signature propriétaire */}
            <div className="flex flex-col z-10">
              <img
                src="https://res.cloudinary.com/dluqkutu8/image/upload/v1756560406/signature_vxizai.png"
                alt="Signature Propriétaire"
                crossOrigin="anonymous"
                className="h-16 object-contain"
              />
              <div className="border-t border-gray-400 mt-6 w-48"></div>
            </div>

            {/* Signature locataire */}
            <div className="flex flex-col z-10">
              {isSigned ? (
                <img
                  src="https://res.cloudinary.com/dluqkutu8/image/upload/v1756561839/signature_3_on17el.png"
                  alt="Signature Locataire"
                  crossOrigin="anonymous"
                  className="h-12 object-contain"
                />
              ) : (
                <div className="h-12 w-48 border border-dashed border-gray-400 flex items-center justify-center text-gray-500">
                  Signature requise
                </div>
              )}
              <div className="border-t border-gray-400 mt-6 w-48"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Reçu (invisible mais téléchargeable) */}
      <div ref={receiptRef}>
        <section className="w-full flex-grow bg-white flex items-center justify-center p-4 mt-4">
          <div
            className="flex w-full max-w-3xl text-zinc-900 h-64"
            style={{ border: "1px solid #000", borderRadius: "10px" }}
          >
            <div className="h-full bg-white flex items-center justify-center px-8 rounded-l-3xl">
              <QRCode
                errorLevel="H"
                value={`identifiant de la réservation : ${reservationId}`}
                icon="https://res.cloudinary.com/dluqkutu8/image/upload/v1755867176/S-removebg-preview_illnml.png"
              />
            </div>
            <div className="relative h-full flex flex-col items-center border-dashed justify-between border-2 bg-white border-zinc-900">
              <div
                className="absolute rounded-full w-8 h-8 bg-white -top-5"
                style={{ borderBottom: "1px solid #000" }}
              ></div>
              <div
                className="absolute rounded-full w-8 h-8 bg-white -bottom-5"
                style={{ borderTop: "1px solid #000" }}
              ></div>
            </div>
            <div className="h-full py-8 px-10 bg-white flex-grow rounded-r-3xl flex flex-col">
              <div className="flex flex-col w-full justify-between items-start">
                <h2 className="text-2xl font-bold mb-2">Reçu de Paiement</h2>
                <p className="text-sm text-zinc-500">
                  Merci pour votre confiance ! Voici le reçu de votre
                  réservation.
                </p>

                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    <strong>Nom :</strong> {payload?.client?.nom}{" "}
                    {payload?.client?.prenom}
                  </p>
                  <p>
                    <strong>Bateau :</strong> {payload?.bateau?.nom}
                  </p>
                  <p
                    className={`${payload?.reservation?.heure ? "" : "hidden"}`}
                  >
                    <strong>heure :</strong> {payload?.reservation?.heure}
                  </p>
                </div>
              </div>
              <div className="flex w-full mt-auto justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Date</span>
                  <span className="font-mono">
                    {new Date().toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Montant</span>
                  <span className="font-mono">
                    {payload?.reservation?.total} €
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Passenger</span>
                  <span className="font-mono">
                    {payload?.reservation?.nbPassagers}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">port</span>
                  <span className="font-mono">{payload?.bateau?.port}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Boutons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button
          onClick={handleSign}
          disabled={isDownloading}
          startContent={<RiEdit2Fill />}
          className={`px-6 py-3 font-semibold rounded-lg shadow-lg text-white ${
            isDownloading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isDownloading ? "⏳ Téléchargement..." : "Signer le contrat"}
        </Button>

        <Button
          onClick={handleDownload}
          disabled={isDownloading || !isSigned}
          startContent={<IoCloudDownload />}
          className={`px-6 py-3 font-semibold rounded-lg shadow-lg text-white ${
            isDownloading || !isSigned
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isDownloading ? "⏳ Téléchargement..." : "Télécharger en PDF"}
        </Button>

        <Button
          onClick={() =>
            isSigned && !isDownloading
              ? handleDownloadReceipt()
              : setMessage(
                  !isSigned
                    ? "⚠️ Vous devez signer avant de télécharger le reçu."
                    : "⏳ Téléchargement en cours..."
                )
          }
          disabled={isDownloading || !isSigned}
          startContent={<IoTicket />}
          className={`px-6 py-3 font-semibold rounded-lg shadow-lg text-white ${
            isDownloading || !isSigned
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isDownloading ? "⏳ Téléchargement..." : "Télécharger votre reçu"}
        </Button>
      </div>

      {/* Message utilisateur */}
      {message && (
        <p className="mt-4 text-red-600 font-semibold animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
