"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Steps } from "antd";
import { FaCalendarCheck } from "react-icons/fa";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { IoTicketSharp } from "react-icons/io5";
import MoyenDePaiment from "@/components/comp-163";
import CreditCardForm from "@/components/comp-328";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import { FaApplePay } from "react-icons/fa6";
import { IoLogoPaypal } from "react-icons/io5";
import { SiVisa } from "react-icons/si";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { ReservationPayload } from "@/types/reservation";
import { Spinner } from "@heroui/spinner";
import { addToast, ToastProvider } from "@heroui/toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import {
  createPaiement,
  checkIfPaid,
  EtatPaiement,
  MethodePaiement,
} from "@/services/paiement";

const stepsConfig: Record<"card" | "paypal" | "apple", string[]> = {
  card: [
    "Veuillez saisir les informations de votre carte",
    "Vérification de votre carte…",
    "Transaction en cours…",
    "Paiement effectué avec succès",
  ],
  paypal: [
    "Connexion à PayPal…",
    "Autorisez le paiement sur votre compte PayPal",
    "Paiement PayPal réussi",
  ],
  apple: [
    "Vérification de la disponibilité d Apple Pay…",
    "Sélectionnez une carte pour payer",
    "Authentification en cours…",
    "Paiement Apple Pay réussi",
  ],
};

export default function PaiementPage() {
  const router = useRouter();
  const [reservation, setReservation] = useState<ReservationPayload | null>(
    null
  );
  const [methode, setMethode] = useState<"card" | "paypal" | "apple">("card");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const hasPostedRef = useRef(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [placement, setPlacement] = React.useState("top-center");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleBlurEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setIsEmailValid(false);
      addToast({
        title: "Email invalide",
        description: "Veuillez saisir une adresse email correcte",
        color: "danger",
      });
    } else {
      setIsEmailValid(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("reservationPayload");
      if (storedData) {
        try {
          const reservationPayload: ReservationPayload = JSON.parse(storedData);
          setReservation(reservationPayload);
          console.log("Reservation récupérée :", reservationPayload);
          // Optionnel : nettoyage après lecture
          // localStorage.removeItem("reservationPayload");
        } catch (error) {
          console.error("Erreur lors du parsing du localStorage :", error);
        }
      }
    }
  }, []);

  // Simule la progression
  useEffect(() => {
    if (!isOpen) return;
    setStepIndex(0);
    hasPostedRef.current = false;
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        const max = stepsConfig[methode].length - 1;
        return prev < max ? prev + 1 : prev;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isOpen, methode]);

  // À la dernière étape => on enregistre le paiement en back
  useEffect(() => {
    const last = stepsConfig[methode].length - 1;
    if (!isOpen || stepIndex !== last || hasPostedRef.current) return;

    hasPostedRef.current = true; // Bloque tout nouvel appel

    const postPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Vous devez être connecté");

        const reservationIdStr = localStorage.getItem("reservationId");
        if (!reservationIdStr) throw new Error("Aucune réservation trouvée");
        const reservationId = parseInt(reservationIdStr, 10);

        const payloadStr = localStorage.getItem("reservationPayload");
        const payload = payloadStr ? JSON.parse(payloadStr) : null;

        // Vérifier si déjà payé
        const alreadyPaid = await checkIfPaid(reservationId, token);
        if (alreadyPaid) {
          addToast({
            title: "Paiement déjà effectué",
            description: "Vous avez déjà réglé cette réservation",
            color: "success",
          });
          onOpenChange(false); // ferme le popup
          setTimeout(() => router.push("/contrat"), 5000);
          return;
        }

        await createPaiement(
          {
            reservationId,
            montant: String(payload?.reservation?.prixBateau ?? "0"),
            montantTotal: String(payload?.reservation?.total ?? "0"),
            methodePaiement:
              methode === "card"
                ? "CARD"
                : methode === "paypal"
                  ? "PAYPAL"
                  : "APPLE_PAY",
            pourcentageStripe: "2.9",
            etatPaiement: "PAYE" satisfies EtatPaiement,
          },
          token
        );

        addToast({
          title: "Paiement réussi",
          description: "Félicitations ! Votre paiement a été effectué",
          color: "success",
        });
        onOpenChange(false);
        setTimeout(() => router.push("/contrat"), 5000);
      } catch (e: any) {
        console.error(e);

        const message = e instanceof Error ? e.message : String(e);

        // Fermer le popup et arrêter l'évolution si erreur critique
        if (
          !message.includes("Paiement déjà enregistré") &&
          !message.includes("Paiement réussi")
        ) {
          addToast({
            title: "Erreur critique",
            description: message,
            color: "danger",
          });
          onOpenChange(false); // ferme le popup
          return; // stoppe le processus
        }

        // Cas "déjà payé"
        if (message.includes("Paiement déjà enregistré")) {
          addToast({
            title: "Paiement déjà effectué",
            description: "Vous avez déjà réglé cette réservation",
            color: "success",
          });
          onOpenChange(false);
          setTimeout(() => router.push("/contrat"), 5000);
        }
      }
    };

    postPayment();
  }, [isOpen, stepIndex, methode]);

  const handleSelectPrice = (data: { value: "card" | "paypal" | "apple" }) => {
    setMethode(data.value);
    console.log("Prix reçu du composant enfant :", data);
  };

  console.log("Reservation state :", reservation);

  return (
    <>
      <ToastProvider
        placement={placement}
        toastOffset={placement.includes("top") ? 60 : 0}
        toastProps={{
          radius: "lg",
          color: "primary",
          variant: "flat",
          timeout: 9000,
        }}
      />
      <section className="mx-auto max-w-[75rem] mt-[8rem]">
        <div>
          <Steps
            items={[
              {
                title: "Inscrivez votre bateau",
                status: "finish",
                icon: <FaCalendarCheck />,
              },
              {
                title: "Recevez vos réservations",
                // status: "finish",
                icon: <Spinner color="warning" />,
              },
              {
                title: "Naviguez vers le succès",
                // status: "finish",
                icon: <IoDocumentText />,
              },
              {
                title: "Naviguez vers le succès",
                // status: "finish",
                icon: <IoTicketSharp />,
              },
            ]}
          />
        </div>
        <div>
          <div>
            <div className="text-[2rem] font-semibold mt-[3rem] mb-[2rem]">
              Paiement
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="mb-[3rem]">
                  <MoyenDePaiment onSelectPrice={handleSelectPrice} />
                </div>
                <div
                  className="p-6"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    borderRadius: "10px",
                  }}
                >
                  <div className={`${methode === "card" ? "" : "hidden"}`}>
                    <div>Cart</div>
                    <CreditCardForm onOpen={onOpen} setMethode={setMethode} />
                  </div>
                  <div className={`${methode === "paypal" ? "" : "hidden"}`}>
                    <div>PayPal</div>
                    <div className="space-y-4 mt-4">
                      <Input
                        label="Email"
                        type="email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleBlurEmail}
                        required
                      />
                      <Button
                        startContent={<IoLogoPaypal className="w-6 h-6" />}
                        variant="bordered"
                        onPress={() => {
                          setMethode("paypal");
                          onOpen();
                        }}
                        disabled={!isEmailValid}
                      >
                        Payer avec PayPal
                      </Button>
                    </div>
                  </div>
                  <div className={`${methode === "apple" ? "" : "hidden"}`}>
                    <div>Appel Pay</div>
                    <div className="mt-4">
                      <Button
                        startContent={<FaApplePay className="w-6 h-6" />}
                        variant="bordered"
                        onPress={() => {
                          setMethode("apple");
                          onOpen();
                        }}
                      >
                        Payer avec Apple Pay
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "10px",
                  gridColumn: "none",
                }}
              >
                <div className="p-7">
                  <div className="text-[1.3rem] font-semibold mb-4">
                    Récapitulatif de commande
                  </div>
                  <div>
                    <div className="mb-4">
                      <div>
                        <div className="text-lg font-semibold">
                          {reservation?.bateau.nom || ""}
                        </div>
                        <div className="text-sm">
                          {reservation?.reservation.data.typeBateau || ""}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mb-4">
                      <div className="text-base text-gray-600">passager</div>
                      <div className="font-semibold">
                        {reservation?.reservation.nbPassagers || 0}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mb-4">
                      <div className="text-base text-gray-600">
                        prix de base
                      </div>
                      <div className="font-semibold">
                        {reservation?.reservation.prixBateau || 0} €
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mb-4">
                      <div className="text-base text-gray-600">
                        total à payer
                      </div>
                      <div className="font-semibold">
                        {reservation?.reservation.total || 0} €
                      </div>
                    </div>
                  </div>
                  <div className="text-base text-gray-600 mb-4">
                    <p className="w-[20rem]">
                      {reservation?.reservation.data.politiqueAnnulation ||
                        "Politique d annulation : non spécifiée. Veuillez contacter le support pour plus d informations."}
                    </p>
                  </div>
                  <div className="sapce-y-3 mb-4">
                    <div className="text-base text-gray-600">
                      Vos options supplémentaires :
                    </div>
                    <div>
                      {reservation?.reservation.extras ||
                        "Pas d extras pour cette réservation."}
                    </div>
                  </div>
                </div>
                <div className="bg-black text-white mb-4">
                  <div className="text-center text-lg font-semibold py-4">
                    Date de la réservation
                  </div>
                  <div>
                    <div className="flex flex-wrap justify-center gap-3 px-8">
                      <div>
                        {new Date(
                          `${reservation?.reservation.dateDebut}T00:00:00`
                        ).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) || ""}
                      </div>
                      <div>au</div>
                      <div>
                        {new Date(
                          `${reservation?.reservation.dateFin}T00:00:00`
                        ).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) || ""}
                      </div>
                    </div>
                    <div className="text-sm text-center py-4">
                      {reservation?.reservation.plage} jours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            backdrop:
              "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Paiement{" "}
                  {methode === "card"
                    ? "par Carte"
                    : methode === "paypal"
                      ? "PayPal"
                      : "Apple Pay"}
                </ModalHeader>
                <ModalBody>
                  {stepIndex < stepsConfig[methode].length - 1 ? (
                    stepsConfig[methode].map((message, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-md text-sm ${
                          index === stepIndex
                            ? "bg-primary/10 text-primary font-medium"
                            : index < stepIndex
                              ? "text-green-600"
                              : "text-gray-400"
                        }`}
                      >
                        {message}
                      </div>
                    ))
                  ) : (
                    // Dernière étape : paiement réussi
                    <div className="p-4 rounded-md text-center text-green-600 text-lg font-semibold">
                      🎉 Félicitations ! Votre paiement a été effectué avec
                      succès !
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Fermer
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </>
  );
}
