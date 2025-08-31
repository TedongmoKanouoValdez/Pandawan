"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import ReactWorldFlags from "react-world-flags";
import countries from "i18n-iso-countries";
import { useAppStore } from "@/store/appStore";
import { allCountries } from "country-telephone-data";
import { Checkbox } from "@heroui/checkbox";
import { cn } from "@/lib/utils";
import { User } from "@heroui/user";
import { Chip } from "@heroui/chip";
import Counter from "@/components/pages/Counterreservation";
import { Label } from "@/components/ui/label";
import { trouverFacteurs } from "@/lib/facteurs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { addToast, ToastProvider } from "@heroui/toast";
import { PiUserListFill } from "react-icons/pi";
import { FaInfoCircle } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { createReservation } from "@/services/reservation";
import { notification } from "antd";
import { FaCheckCircle } from "react-icons/fa";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Préparer les options
const countryOptions = allCountries.map((country) => ({
  value: country.dialCode, // +33, +1, ...
  label: country.iso2, // ISO code pour le drapeau
}));

// Custom option pour afficher uniquement le drapeau
const Option = (props: OptionProps<{ value: string; label: string }>) => (
  <components.Option {...props}>
    <ReactWorldFlags
      code={props.data.label.toUpperCase()}
      style={{ width: 24, height: 16 }}
    />
  </components.Option>
);

const SingleValue = (
  props: SingleValueProps<{ value: string; label: string }>
) => (
  <components.SingleValue {...props}>
    <ReactWorldFlags
      code={props.data.label.toUpperCase()}
      style={{ width: 24, height: 16 }}
    />
  </components.SingleValue>
);

export default function ReservationPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<{
    value: string;
    label: string;
  } | null>(null);
  const [extras, setExtras] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const userData = useAppStore((state) => state.userData);
  const [selectedOptions, setSelectedOptions] = useState<
    { value: string; detail?: string }[]
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");
  const [placement, setPlacement] = React.useState("top-center");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [result, setResult] = useState<number>(0);
  const [countnumberuser, setCountnumberuser] = useState<number>(0);
  const handleThreshold = (res: number) => {
    console.log("Résultat reçu :", res);
    setResult(res); // tu peux stocker le résultat dans le state du parent
  };

  const handleThresholdnumber = (res: number) => {
    console.log("Résultat reçu quatity :", res);
    setCountnumberuser(res); // tu peux stocker le résultat dans le state du parent
  };

  // Calculer la somme des détails sélectionnés
  const totalDetail = selectedOptions.reduce((sum, option) => {
    // Assurer que detail est bien un nombre
    const value = Number(option.detail) || 0;
    return sum + value;
  }, 0);

  const selectedLabels = selectedOptions.map((option) => option.value);

  const [totalSum, setTotalSum] = useState(0);
  const date1 = new Date(`${userData.DateDeReservation[0]}T00:00:00`);
  const date2 = new Date(`${userData.DateDeReservation[1]}T00:00:00`);

  const formattedDate1 = date1.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDate2 = date2.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [form, setForm] = useState({
    titre: "",
    prenom: userData?.prenom || "",
    nom: userData?.username || "",
    telephone: userData?.telephone || "",
    email: userData?.email || "",
  });

  useEffect(() => {
    setTotalSum(result + userData.tarifs + totalDetail);
  }, [result, userData.tarifs, totalDetail]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const validateForm = () => {
    const requiredFields = ["titre", "prenom", "nom", "telephone", "email"];
    const newErrors: { [key: string]: boolean } = {};

    requiredFields.forEach((field) => {
      if (!form[field as keyof typeof form]) newErrors[field] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      addToast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        color: "danger",
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = () => {
    const isValid = validateForm();
    if (!isValid) return;
    setBackdrop("blur");
    onOpen();
  };

  const resultats = result > 0 ? trouverFacteurs(result, 2) : [];
  const sommeFacteurs = resultats.reduce((acc, item) => acc + item.facteur, 0);
  const sommeValeurs = resultats.reduce((acc, item) => acc + item.valeur, 0);

  const [api, contextHolder] = notification.useNotification();

  const buildReservationPayload = () => {
    return {
      client: {
        idUser: userData.idUser || 0,
        titre: form.titre || "",
        prenom: form.prenom || "",
        nom: form.nom || "",
        telephone: form.telephone || "",
        email: form.email || "",
        codePays: selectedCountry?.value || null,
      },
      bateau: {
        idbateau: userData.idbateau || 0,
        port: userData.port || "",
        nom: userData.nomdubateau || "",
        capaciteMax: userData.capaciteMax || "",
        passagersInclus: userData.PassagersInclusDansLePrix || "",
        supplementParPassager:
          userData.SupplementParPassagerSupplémentaire || "",
        politiqueAnnulation: userData.politiqueAnnulation || "",
      },
      reservation: {
        dateDebut: userData.DateDeReservation[0] || "",
        dateFin: userData.DateDeReservation[1] || "",
        nbPassagers: countnumberuser || "",
        supplementPassagers: result || "",
        extras: selectedLabels.join(", ") || "", // [{ value, detail }]
        supplementExtras: totalDetail || 0,
        prixBateau: userData.tarifs || 0,
        total: totalSum || 0,
        plage: userData.plage.length || 0,
        data: userData || "",
        heure: userData.plagehoraire || "",
      },
    };
  };

  const sendReservation = async () => {
    const payload = buildReservationPayload();
    console.log(payload);

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Vous devez être connecté");

      const data = await createReservation(
        {
          utilisateurId: payload.client.idUser,
          bateaunom: payload.bateau.nom,
          bateauId: payload.bateau.idbateau,
          dateDebut: new Date(payload.reservation.dateDebut).toISOString(),
          dateFin: new Date(payload.reservation.dateFin).toISOString(),
          plage: String(payload.reservation.plage),
          numbreDePassage: String(payload.reservation.nbPassagers),
          supplement: payload.reservation.extras,
          prixDeBase: payload.reservation.prixBateau,
          prixSupplementPassagers: payload.reservation.supplementPassagers,
          prixOptionsPayantes: payload.reservation.supplementExtras,
          Total: payload.reservation.total,
          heure: payload.reservation.heure,
          data: payload.reservation.data,
        },
        token
      );

      // addToast({
      //   title: "Merci pour votre réservation !",
      //   description: "Votre réservation a bien été enregistrée.",
      //   color: "success",
      // });

      const reservationId = data.reservation.id;

      // Tu le stockes dans le localStorage
      localStorage.setItem("reservationId", reservationId.toString());

      api.success({
        message: "Réservation enregistrée",
        description:
          "Votre réservation a bien été créée. Vous pouvez maintenant procéder au paiement pour la confirmer.",
        showProgress: true,
        icon: <FaCheckCircle className="text-green-700" />,
        pauseOnHover: true,
      });

      localStorage.setItem("reservationPayload", JSON.stringify(payload));

      setTimeout(() => {
        router.push("/paiement");
      }, 7000);
      setSuccess(data.message);
    } catch (err: any) {
      addToast({
        title: "Échec de la réservation",
        description: err.message,
        color: "danger",
      });
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reviewsreservations = buildReservationPayload();

  if (!userData) return <p>Aucune donnée</p>;

  console.log(userData);
  // console.log(selectedCountry);
  // console.log(userData.plage.length);
  // console.log(selectedOptions);

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
      {contextHolder}
      <div
        className="min-h-screen bg-cover bg-center p-4 md:p-8"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dluqkutu8/image/upload/v1751362027/4847236_rplbu1.jpg')",
        }}
      >
        <div className="flex justify-center pt-24 items-start  mb-4 flex-col gap-2 lg:flex-row mx-auto max-w-6xl">
          <div className="mx-2xl flex flex-col lg:flex-row gap-2 lg:gap-4 bg-white bg-opacity-90 rounded-2xl shadow-lg p-6">
            {/* Formulaire */}
            <div className="flex-1 rounded-xl bg-white/70 p-6 space-y-6">
              <h2 className="text-2xl font-bold">
                1. Informations Personnelles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="titre" className="block text-sm mb-1">
                    Civilité<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="titre"
                    value={form.titre}
                    onChange={handleChange}
                    className={`w-full border p-2 rounded ${errors.titre && "border-red-500"}`}
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="M.">Monsieur</option>
                    <option value="Mme">Madame</option>
                    <option value="Mx">Mx</option>
                    <option value="Autre">Autre / Préféré ne pas dire</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-sm mb-1">
                    Prénom<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    type="text"
                    className={`w-full border p-2 rounded ${errors.prenom && "border-red-500"}`}
                  />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm mb-1">
                    Nom<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nom"
                    value={form.nom}
                    onChange={handleChange}
                    type="text"
                    className={`w-full border p-2 rounded ${errors.nom && "border-red-500"}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="codePays" className="block text-sm mb-1">
                    Code pays
                  </label>
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(option) => setSelectedCountry(option)}
                    components={{ Option, SingleValue }}
                    placeholder="Select a country"
                    isSearchable
                    styles={{
                      option: (provided) => ({
                        ...provided,
                        display: "flex",
                        justifyContent: "center",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        display: "flex",
                        justifyContent: "center",
                      }),
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="telephone" className="block text-sm mb-1">
                    Téléphone<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    type="text"
                    className={`w-full border p-2 rounded ${errors.telephone && "border-red-500"}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  E-mail<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className={`w-full border p-2 rounded ${errors.email && "border-red-500"}`}
                />
              </div>
              <div>
                <div>
                  <label
                    htmlFor="bedrooms-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Veuillez sélectionner le nombre de passager :
                  </label>
                  <Counter
                    min={1}
                    max={
                      Number(userData.SupplementParPassagerSupplémentaire) > 0
                        ? 100
                        : Number(userData.capaciteMax) || 0
                    }
                    initialValue={1}
                    baseNumber={userData.PassagersInclusDansLePrix || 0}
                    multiplier1={
                      userData.SupplementParPassagerSupplémentaire || 0
                    }
                    multiplier2={userData.plage.length}
                    onResult={handleThreshold} // ← ici on passe la fonction
                    onValueChange={handleThresholdnumber}
                  />
                </div>
              </div>
              {/* Extras */}

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">2. Extras</h2>

                <div className="flex flex-col space-y-4 p-[2rem]">
                  {userData?.optionsPayantes.map((item, index) => (
                    <Checkbox
                      key={index}
                      aria-label={item.value}
                      classNames={{
                        base: cn(
                          "inline-flex w-full max-w-md bg-content1 contourselector",
                          "hover:bg-content2 items-center justify-start",
                          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                          "data-[selected=true]:border-primary"
                        ),
                        label: "w-full",
                      }}
                      isSelected={selectedOptions.some(
                        (o) => o.value === item.value
                      )}
                      onValueChange={(selected) => {
                        if (selected) {
                          setSelectedOptions([
                            ...selectedOptions,
                            { value: item.value, detail: item.detail },
                          ]);
                        } else {
                          setSelectedOptions(
                            selectedOptions.filter(
                              (o) => o.value !== item.value
                            )
                          );
                        }
                      }}
                    >
                      <div className="w-full flex justify-between gap-2">
                        <User
                          avatarProps={{
                            size: "md",
                            src: "https://res.cloudinary.com/dluqkutu8/image/upload/v1755118569/15558_jdfeoh.jpg",
                          }}
                          name={item.value}
                        />
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-tiny text-default-500">
                            {userData.nomdubateau || ""}
                          </span>
                          <Chip color="success" size="sm" variant="flat">
                            {item.detail ? `${item.detail} €` : ""}
                          </Chip>
                        </div>
                      </div>
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="w-full lg:w-[350px] bg-blue-50 rounded-2xl p-6 shadow space-y-5">
            <div className="flex justify-between text-sm text-gray-600">
              <span id="address">{userData.port || ""}</span>
            </div>

            <p id="boat-name" className="text-lg font-bold text-gray-800">
              {userData.nomdubateau || ""}
            </p>
            <span>{userData.typeBateau || ""}</span>
            <p id="boat-dates" className="flex flex-col text-sm text-gray-600">
              <span>Dates de réservation</span>
              {formattedDate1 || ""} / {formattedDate2 || ""}
            </p>

            <div className="border rounded p-3 text-sm bg-white space-y-2">
              <strong id="boat-info">Infos réservation</strong>
              <p id="boat-capacity">
                <span className="font-semibold">
                  Capacité totale : {userData.capaciteMax}
                </span>{" "}
                personnes
              </p>
              <p
                id="boat-capacity"
                className={`${userData.PassagersInclusDansLePrix ? "" : "hidden"}`}
              >
                <span className="font-semibold">
                  Inclus dans le prix : {userData.PassagersInclusDansLePrix}
                </span>{" "}
                clients
              </p>
              <p id="boat-capacity">
                <span className="font-semibold">
                  {!userData.PassagersInclusDansLePrix
                    ? ""
                    : "Passagers supplémentaires : les restants sont des membres professionnels"}
                </span>
              </p>
              <p
                id="boat-capacity"
                className={`${userData.SupplementParPassagerSupplémentaire ? "" : "hidden"}`}
              >
                <span className="font-semibold">
                  Supplément : {userData.SupplementParPassagerSupplémentaire}
                </span>{" "}
                € par passager supplémentaire (au-delà des{" "}
                {userData.PassagersInclusDansLePrix} inclus)
              </p>
            </div>

            <div className="text-sm space-y-1 bg-white rounded-xl p-4 shadow">
              <div className="flex justify-between">
                <span>Prix du bateau</span>
                <span className="font-bold">{userData.tarifs} €</span>
              </div>
              <div className="flex justify-between">
                <span>Supplement passager</span>
                <span className="font-bold">{result} €</span>
              </div>
              <div>
                <div className="flex justify-between">
                  <span>Supplement équipement</span>
                  <span className="font-bold">{totalDetail} €</span>
                </div>
                <div>
                  <p>Options sélectionnées: {selectedLabels.join(", ")}</p>
                </div>
              </div>

              <div className="flex justify-between font-bold border-t pt-2 mt-2 text-lg">
                <span>Total</span>
                <span>{totalSum} €</span>
              </div>
            </div>

            <div className="flex items-start mt-6">
              <input
                id="accept-cgu"
                type="checkbox"
                className="mt-1"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <p className="ml-2 text-sm">
                J’ai lu et j’accepte les{" "}
                <a href="#" className="text-blue-600 underline">
                  conditions générales
                </a>
                .
              </p>
            </div>

            <Button
              onPress={() => handleOpen()}
              className={`mt-4 w-full p-3 rounded-xl text-white font-bold transition ${
                termsAccepted
                  ? "bg-blue-800 hover:bg-blue-900"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!termsAccepted}
            >
              Procéder au paiement
            </Button>
          </div>
        </div>

        {/* Pop-up de confirmation */}
        <Modal backdrop={backdrop} size="3xl" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Résumé de la réservation
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-wrap gap-4">
                      <div className="w-full">
                        <fieldset className="relative border border-gray-300 rounded-xl p-6 bg-white shadow-sm w-full">
                          <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700 bg-white">
                            <PiUserListFill className="w-4 h-4" /> Vos
                            informations
                          </legend>

                          <div className="space-y-3 text-sm">
                            <p>
                              {reviewsreservations.client.titre}{" "}
                              {reviewsreservations.client.nom}{" "}
                              {reviewsreservations.client.prenom}
                            </p>
                            <p>
                              <span className="font-semibold">Email :</span>{" "}
                              {reviewsreservations.client.email}
                            </p>
                            <p>
                              <span className="font-semibold">Téléphone :</span>{" "}
                              +{reviewsreservations.client.codePays}
                              {reviewsreservations.client.telephone}
                            </p>
                          </div>
                        </fieldset>
                      </div>
                      <div className="w-full">
                        <fieldset className="relative border border-gray-300 rounded-xl p-6 bg-white shadow-sm w-full">
                          <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700 bg-white">
                            <FaInfoCircle className="w-4 h-4" /> Détails
                          </legend>

                          <div className="space-y-3 text-sm">
                            <p>
                              <span className="font-semibold">Bateau : </span>
                              {reviewsreservations.bateau.nom}
                            </p>
                            <p>
                              <span className="font-semibold">Port : </span>{" "}
                              {reviewsreservations.bateau.port}
                            </p>
                            <p>
                              <span className="font-semibold">Date :</span>
                              <span className="flex flex-wrap gap-3">
                                <span>
                                  {new Date(
                                    `${reviewsreservations.reservation.dateDebut}T00:00:00`
                                  ).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                                au
                                <span>
                                  {new Date(
                                    `${reviewsreservations.reservation.dateFin}T00:00:00`
                                  ).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </span>
                            </p>
                            <p>
                              <span className="font-semibold">Durée : </span>
                              {reviewsreservations.reservation.plage} jours
                            </p>
                            <p
                              className={`${reviewsreservations.reservation.heure ? "" : "hidden"}`}
                            >
                              <span className="font-semibold">Heure : </span>
                              {reviewsreservations.reservation.heure}
                            </p>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="w-full">
                        <fieldset className="relative border border-gray-300 rounded-xl p-6 bg-white shadow-sm w-full">
                          <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700 bg-white">
                            <FaMoneyCheckDollar className="w-4 h-4" /> Paiement
                          </legend>

                          <div className="space-y-3 text-sm">
                            <p>
                              <span className="font-semibold">Options : </span>{" "}
                              {reviewsreservations.reservation.extras}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Nombre de passager :{" "}
                              </span>{" "}
                              {reviewsreservations.reservation.nbPassagers}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Supplement équipement :{" "}
                              </span>{" "}
                              {reviewsreservations.reservation.supplementExtras}{" "}
                              €
                            </p>
                            <p>
                              <span className="font-semibold">
                                Supplement passager :{" "}
                              </span>{" "}
                              {
                                reviewsreservations.reservation
                                  .supplementPassagers
                              }{" "}
                              €
                            </p>
                            <p>
                              <span className="font-semibold">
                                Prix du bateau :{" "}
                              </span>{" "}
                              {reviewsreservations.reservation.prixBateau} €
                            </p>
                            <p>
                              <span className="font-semibold">Total : </span>
                              {reviewsreservations.reservation.total} €
                            </p>
                          </div>
                        </fieldset>
                      </div>
                      <div className="w-full">
                        <fieldset className="relative border border-gray-300 rounded-xl p-6 bg-white shadow-sm w-full">
                          <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700 bg-white">
                            <HiOutlineClipboardDocumentList className="w-4 h-4" />{" "}
                            Conditions
                          </legend>

                          <div className="space-y-3 text-sm">
                            <p>
                              {reviewsreservations.bateau.politiqueAnnulation
                                ? reviewsreservations.bateau.politiqueAnnulation
                                : "Aucune politique d annulation"}
                            </p>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Annuler
                  </Button>
                  <Button color="primary" onClick={sendReservation}>
                    Procéder au paiement
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
