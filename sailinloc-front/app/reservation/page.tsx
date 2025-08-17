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
  const [countriesList, setCountriesList] = useState<
    { code: string; name: string }[]
  >([]);
  const [selected, setSelected] = useState("");
  const userData = useAppStore((state) => state.userData);
  const [isSelected, setIsSelected] = React.useState(false);

  const [form, setForm] = useState({
    titre: "",
    prenom: userData?.prenom || "",
    nom: userData?.username || "",
    telephone: userData?.telephone || "",
    email: userData?.email || "",
  });

  useEffect(() => {
    const countryObj = countries.getNames("en", { select: "official" });
    const list = Object.entries(countryObj).map(([code, name]) => ({
      code,
      name,
    }));
    setCountriesList(list);
  }, []);

  const extrasPrices: Record<string, number> = {
    table: 50,
    dg: 120,
    levrette: 50,
    pipe: 10,
  };

  const basePrice = 1;
  const discount = 0;

  const totalExtrasPrice = useMemo(
    () => extras.reduce((sum, key) => sum + (extrasPrices[key] || 0), 0),
    [extras]
  );

  const totalPrice = useMemo(
    () => basePrice - discount + totalExtrasPrice,
    [totalExtrasPrice]
  );

  const handleExtrasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setExtras((prev) => [...prev, value]);
    } else {
      setExtras((prev) => prev.filter((item) => item !== value));
    }
  };

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReserveClick = () => {
    if (!termsAccepted) return;
    if (!validateForm()) return;
    setShowPopup(true);
    setTimeout(() => {
      router.push(`/payementPage?amount=${totalPrice.toFixed(2)}`);
    }, 3000);
  };

  if (!userData) return <p>Aucune donnée</p>;

  console.log(userData);
  console.log(selectedCountry);

  return (
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
            <h2 className="text-2xl font-bold">1. Informations Personnelles</h2>

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

            {/* Extras */}

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">2. Extras</h2>

              <div className="flex flex-col justify-center items-center h-[11rem] overflow-y-scroll space-y-4 pt-[12rem] pb-[2rem]">
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
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
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

            {/* CGU */}
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
          <p id="boat-dates" className="text-sm text-gray-600">
            {userData.DateDeReservation[0] || ""} /{" "}
            {userData.DateDeReservation[1] || ""}
          </p>

          <div className="border rounded p-3 text-sm bg-white">
            <strong id="boat-info">Infos réservation</strong>
            <p id="boat-capacity">Min. 2 adultes / Max. 5 passagers</p>
          </div>

          <div className="text-sm space-y-1 bg-white rounded-xl p-4 shadow">
            <div className="flex justify-between">
              <span>Prix du bateau</span>
              <span>{basePrice.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Remise</span>
              <span>-{discount.toFixed(2)}€</span>
            </div>

            {extras.map((key) => (
              <div key={key} className="flex justify-between text-gray-700">
                <span>
                  {key === "table" ? "Service à table" : "Directeur de groupe"}
                </span>
                <span>+{extrasPrices[key].toFixed(2)}€</span>
              </div>
            ))}

            <div className="flex justify-between font-bold border-t pt-2 mt-2 text-lg">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)}€</span>
            </div>
          </div>

          <button
            onClick={handleReserveClick}
            className={`mt-4 w-full p-3 rounded-xl text-white font-bold transition ${
              termsAccepted
                ? "bg-blue-800 hover:bg-blue-900"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!termsAccepted}
          >
            Procéder au paiement
          </button>

          <div className="text-xs text-center mt-3 text-gray-600">
            <strong>Excellent</strong> ★★★★☆ <br />
            832 avis sur <span className="underline">Trustpilot</span>
          </div>
        </div>
      </div>

      {/* Pop-up de confirmation */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Confirmation
              </h3>
              <p className="text-gray-600 text-sm">
                Vous recevrez un e-mail contenant un lien sécurisé pour
                finaliser le paiement.
              </p>
              <p className="text-gray-500 text-xs">
                Redirection automatique dans quelques secondes...
              </p>
              <button
                className="mt-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                onClick={() => {
                  setShowPopup(false);
                  router.push(`./payementPage?amount=${totalPrice.toFixed(2)}`);
                }}
              >
                Accéder au paiement maintenant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
