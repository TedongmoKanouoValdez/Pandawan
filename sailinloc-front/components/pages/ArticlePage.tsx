"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";
import { Timeline } from "antd";
import { LinkPreview } from "@/components/ui/link-preview";
import { Checkbox } from "@heroui/checkbox";
import { Chip } from "@heroui/chip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@heroui/alert";
import { FaStar } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { BiSolidBookmark } from "react-icons/bi";
import { Tooltip } from "@heroui/tooltip";
import { FaWifi } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { RiSailboatFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { SingleCarousselBoat } from "@/components/pages/singlecarousselboat";
import { SingleCaracteristiqueBoat } from "@/components/pages/singlecaracteristiqueboat";
import { GalerieSingleBoat } from "@/components/pages/galeriesingleboat";
import { CalendarSingleBoat } from "@/components/pages/calendarsingleboat";
import { useDateRange } from "@/context/DateRangeContext";
import CommentsSection from "@/components/pages/CommentsSection";
import BateauSimilaireSection from "@/components/pages/BateauSimilaire";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiRadioTower, GiThermometerCold, GiBunkBeds } from "react-icons/gi";
import { MdOutlineAutoMode } from "react-icons/md";
import {
  FaUserTie,
  FaUserNurse,
  FaUtensils,
  FaWater,
  FaBed,
  FaShoppingCart,
  FaBroom,
  FaBolt,
  FaHotdog,
  FaMotorcycle,
  FaShip,
  FaDrumstickBite,
} from "react-icons/fa";
import { MdAirportShuttle } from "react-icons/md";
import { GiWaterLadder, GiKayak } from "react-icons/gi";
import { BsDot } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import { useAppStore } from "@/store/appStore";
import { useRouter } from "next/navigation";

interface ArticlePageProps {
  slug: string;
}

const typeToLabel: Record<string, string> = {
  Aucun: "",
  "Par heure": "/ heure",
  "Par demi-journée": "/ demi-journée",
  "Par jour (journalier)": "/ jour",
  "Par week-end": "/ week-end",
  "Par semaine (hebdomadaire)": "/ semaine",
  "Par mois (mensuel)": "/ mois",
  "Par séjour (forfait global, peu importe la durée)": "/ séjour",
};

export default function ArticlePage({ slug }: ArticlePageProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setSticky] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [divTopOffset, setDivTopOffset] = useState<number | null>(null);
  const { date1, date2, fullRange } = useDateRange();
  const [data, setData] = useState<Bateau[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [utilisateurId, setUtilisateurId] = useState<number>(0);
  const setUserData = useAppStore((state) => state.setUserData);
  const router = useRouter();

  function handleNext() {
    setUserData({
      DateDeReservation: [
        date1.format("YYYY-MM-DD"),
        date2.format("YYYY-MM-DD"),
      ],
      username: token.nom,
      email: token.email,
      telephone: token.telephone,
      optionsPayantes: data[0].optionsPayantes,
      idbateau: data[0].id,
      nomdubateau: data[0].header,
      port: data[0].port,
      dureeLocation: data[0].dureeLocation,
      politiqueAnnulation: data[0].politiqueAnnulation.split(":")[1]?.trim(),
      tarifs: affichageTarifs,
      SupplementParPassagerSupplémentaire:
        data[0].SupplementParPassagerSupplémentaire,
      PassagersInclusDansLePrix: data[0].PassagersInclusDansLePrix,
      comition: data[0].depotgarantie,
      capaciteMax: data[0].capaciteMax,
      plage: fullRange,
      idUser: token.userId,
      prenom: token.prenom,
    });
    router.push("/reservation");
  }

  useEffect(() => {
    const sessionData = localStorage.getItem("token");
    if (sessionData) {
      const Token = jwtDecode(sessionData);
      setUtilisateurId(Token.userId);
      setToken(Token);
      // console.log("Token JWT :", Token);
      // console.log("ID :", Token.userId);
    }
  }, []);

  const ICONS_MAP: Record<string, JSX.Element> = {
    GPS: <FaMapMarkerAlt />,
    VHF: <GiRadioTower />,
    "pilote automatique": <MdOutlineAutoMode />,
    climatisation: <GiThermometerCold />,
    "cuisine équipée": <FaKitchenSet />,
    literie: <GiBunkBeds />,
  };

  const OPTIONS_PAYANTES_ICONS: Record<string, JSX.Element> = {
    Skipper: <FaUserTie />,
    Hôtesse: <FaUserNurse />,
    "Chef cuisinier": <FaUtensils />,
    "Instructeur de plongée": <FaWater />,
    Paddle: <GiWaterLadder />,
    Kayak: <GiKayak />,
    Wakeboard: <FaWater />,
    Jetski: <FaMotorcycle />,
    "Bouée tractée": <BsDot />,
    "Nettoyage final": <FaBroom />,
    "Draps et serviettes": <FaBed />,
    "Courses livrées à bord": <FaShoppingCart />,
    "Transfert aéroport / port": <MdAirportShuttle />,
    Barbecue: <FaDrumstickBite />,
    Plancha: <FaHotdog />,
    "Wi-Fi à bord": <FaWifi />,
    "Générateur portable": <FaBolt />,
  };

  useEffect(() => {
    if (divRef.current) {
      setDivTopOffset(divRef.current.offsetTop);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (divTopOffset === null) return;

      const scrollY = window.scrollY;

      if (scrollY >= divTopOffset && !isSticky) {
        setSticky(true);
      } else if (scrollY < divTopOffset && isSticky) {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [divTopOffset, isSticky]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/bateaux/slug/${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json || !json.bateau) {
          console.error("Format de données inattendu :", json);
          setLoading(false);
          return;
        }
        console.log(json.bateau);

        const details = json.bateau?.details ?? {};
        const rawEquipements = details.equipements ?? [];

        // Si c'est une chaîne JSON, on la parse
        const equipementsArray = Array.isArray(rawEquipements)
          ? rawEquipements
          : typeof rawEquipements === "string"
            ? JSON.parse(rawEquipements)
            : [];

        const equipementsFormatted = equipementsArray.map((eq: string) => ({
          value: eq,
          icon: ICONS_MAP[eq] ?? null,
        }));

        let optionsPayantesRaw = details.optionsPayantes ?? [];
        let optionsPayantesArray = [];

        if (typeof optionsPayantesRaw === "string") {
          try {
            optionsPayantesArray = JSON.parse(optionsPayantesRaw);
          } catch (e) {
            console.error("Erreur parsing optionsPayantes:", e);
            optionsPayantesArray = [];
          }
        } else if (Array.isArray(optionsPayantesRaw)) {
          optionsPayantesArray = optionsPayantesRaw;
        }

        // Formatage avec icône en fonction de l'id
        const optionsPayantesFormatted = optionsPayantesArray.map(
          (opt: { id: string; label: string; detail: string }) => ({
            value: opt.label,
            icon: OPTIONS_PAYANTES_ICONS[opt.id.trim()] ?? null,
            detail: opt.detail, // si besoin d'afficher le prix ou autre
          })
        );

        const datesIndispo = JSON.parse(json.bateau.datesIndisponibles);

        const zonesNavigation =
          json.bateau?.details?.zonesNavigation
            ?.split(",")
            .map((zone: string) => ({ children: zone.trim() })) ?? [];

        const bateau = {
          id: json.bateau.id ?? 0,
          header: json.bateau.nom ?? "Nom inconnu",
          slug: json.bateau.slug ?? "",
          modele: json.bateau.modele ?? "Modèle inconnu",
          type: json.bateau.typeBateau ?? "Modèle inconnu",
          port: json.bateau.portdefault ?? "Port inconnu",
          target: json.bateau.prix ?? "0",
          detail: json.bateau.details ?? [],
          description: json.bateau.description ?? "",
          datesIndisponibles: json.bateau.datesIndisponibles ?? [],
          proprietaireId: json.bateau.proprietaireId ?? 0,
          medias: json.bateau.medias ?? [],
          equipements: equipementsFormatted,
          optionsPayantes: optionsPayantesFormatted,
          datesIndisponibles: datesIndispo ?? [],
          zonesNavigation,
          depotgarantie: json.bateau?.details.depotgarantie,
          locationSansPermis: json.bateau?.details.locationSansPermis,
          dureeLocation: json.bateau?.details.dureeLocation,
          tarifications: json.bateau?.details.tarifications,
          PassagersInclusDansLePrix:
            json.bateau?.details.PassagersInclusDansLePrix,
          SupplementParPassagerSupplémentaire:
            json.bateau?.details.SupplementParPassagerSupplémentaire,
          politiqueAnnulation: json.bateau?.details.politiqueAnnulation,
          capaciteMax: json.bateau?.details.capaciteMax,
        };

        setData([bateau]); // mettre dans un tableau si ton state est un tableau
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du rafraîchissement :", err);
        setLoading(false);
      });
  }, [slug]);

  const affichageTarifs = (() => {
    try {
      if (!data?.[0]?.tarifications) return "N/A";

      const tarifs = JSON.parse(data[0].tarifications || "[]");

      return tarifs
        .map((tarif: any) => {
          const montant = parseFloat(tarif.montant);
          const label = typeToLabel[tarif.type] || "";
          return `${montant}€ ${label}`;
        })
        .join(", ");
    } catch (error) {
      console.error(
        `Erreur parsing tarifications pour ${data[0]?.header} :`,
        error
      );
      return "Erreur";
    }
  })();

  if (loading) return <p>Chargement…</p>;

  console.log(fullRange);

  return (
    <>
      <section
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751624019/5601165_vw0d54.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          paddingBottom: "5rem",
        }}
        className="pt-16"
      >
        {data.length > 0 && (
          <SingleCarousselBoat medias={data[0].medias.slice(0, 4)} />
        )}
        {data.length > 0 && (
          <SingleCaracteristiqueBoat
            detail={data[0].detail}
            modele={data[0].type}
          />
        )}
        <div>
          <div className="mx-auto max-w-6xl">
            <div className="mb-4">
              <Chip variant="dot" className="border-none contentTitleBoat">
                <h1 className="text-4xl">{data[0].header}</h1>
              </Chip>
            </div>
            <div className="flex flex-row space-x-4 justify-between">
              <div className="flex flex-col space-y-4 w-[40rem]">
                <div className="flex flex-row space-x-4">
                  <div className="text-gray-600">{data[0].port}</div>
                  <Chip variant="shadow" className="p-2.5 bgBlue text-white">
                    <div className="flex flex-row space-x-4 items-center">
                      <div>
                        <RiSailboatFill />
                      </div>
                      <div>{data[0].type}</div>
                    </div>
                  </Chip>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-row space-x-2">
                    <FaStar className="text-amber-400 w-6 h-6" />
                    <FaStar className="text-amber-400 w-6 h-6" />
                    <FaStar className="text-white w-6 h-6" />
                    <FaStar className="text-white w-6 h-6" />
                    <FaStar className="text-white w-6 h-6" />
                  </div>
                  <div className="flex flex-row space-x-4">
                    <Tooltip color="secondary" content="Partager" offset={15}>
                      <div className="flex justify-center items-center cursor-pointer p-2.5 bg-glacev2 rounded-full w-12 h-12">
                        <IoMdShare className="w-8 h-8" />
                      </div>
                    </Tooltip>
                    <Tooltip
                      color="secondary"
                      content="Mettre en favorie"
                      offset={15}
                    >
                      <div className="flex justify-center items-center cursor-pointer p-2.5 bg-glacev2 rounded-full w-12 h-12">
                        <BiSolidBookmark className="w-8 h-8" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <div className="text-xl text-black font-bold underline underline-offset-8">
                    Description
                  </div>
                  <div className="text-gray-600 mt-2">
                    {data[0].description}
                  </div>
                </div>
                <div>
                  <div className="text-xl text-black font-bold underline underline-offset-8">
                    Détails
                  </div>
                  <div className="text-gray-600 mt-2">
                    Prix de base : {affichageTarifs}
                  </div>
                  <div className="text-gray-600 mt-2">
                    Passagers inclus dans le prix :{" "}
                    {data[0].PassagersInclusDansLePrix}
                  </div>
                  <div className="text-gray-600 mt-2">
                    Supplément par passager supplémentaire :{" "}
                    {data[0].SupplementParPassagerSupplémentaire}
                  </div>
                  <div className="text-gray-600 mt-2">
                    Durée de Location : {data[0].dureeLocation}
                  </div>
                </div>
                <div className="mt-[3rem]">
                  <div className="text-xl text-black font-bold underline underline-offset-8">
                    Équipements à bord
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {data[0]?.equipements?.map((eq) => (
                      <Chip
                        key={eq.value}
                        variant="shadow"
                        className="p-2.5 bgBlue text-white"
                      >
                        <div className="flex flex-row space-x-4 items-center">
                          <div>{eq.icon}</div>
                          <div>{eq.value}</div>
                        </div>
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="mt-[3rem]">
                  <div className="text-xl text-black font-bold underline underline-offset-8">
                    Options payantes
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {data[0]?.optionsPayantes?.map((opt) => (
                      <Chip
                        key={opt.value}
                        variant="shadow"
                        className="p-2.5 bgBlue text-white"
                      >
                        <div className="flex flex-row space-x-4 items-center">
                          <div>{opt.icon}</div>
                          <div>
                            {opt.value} {opt.detail ? `- ${opt.detail} €` : ""}
                          </div>
                        </div>
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="mt-[3rem]">
                  <div className="text-xl text-black font-bold underline underline-offset-8">
                    Informations de navigation
                  </div>
                  <div className="flex flex-col space-y-4 mt-4">
                    <div className="text-lg text-gray-700">
                      Port de départ et d'arrivée
                    </div>
                    <div
                      className={`flex items-center justify-start w-full ${data[0]?.detail.portdarriver && data[0]?.detail.portdedepart ? "" : "hidden"}`}
                    >
                      <LinkPreview
                        url={`${data[0]?.detail.portdarriver}`}
                        className="font-bold"
                      >
                        <Alert
                          color="default"
                          icon={<FaLocationDot />}
                          // description="Port de Nice"
                          title="Départ"
                          variant="faded"
                        />
                      </LinkPreview>
                    </div>
                    <div
                      className={`flex items-center justify-start w-full ${data[0]?.detail.portdarriver && data[0]?.detail.portdedepart ? "" : "hidden"}`}
                    >
                      <LinkPreview
                        url={`${data[0]?.detail.portdedepart}`}
                        className="font-bold"
                      >
                        <Alert
                          color="default"
                          icon={<FaLocationDot />}
                          // description="Port de Cannes"
                          title="Arrivée"
                          variant="faded"
                        />
                      </LinkPreview>
                    </div>
                    <div className="mt-[3rem]">
                      <div className="text-xl text-black font-bold underline underline-offset-8 mb-4">
                        Disponibilités
                      </div>
                      <div className="flex items-center justify-center w-full mb-4">
                        <div className="flex flex-col w-full">
                          <div className="w-full flex items-center my-3">
                            <Alert
                              color="warning"
                              title="Sélectionnez la plage de dates souhaitée pour commencer votre réservation."
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <CalendarSingleBoat
                          datesIndisponibles={data[0].datesIndisponibles}
                        />
                      </div>
                    </div>
                    <div className="text-lg text-gray-700 mt-4">
                      Zones de navigation autorisées
                    </div>
                    <div className="text-base text-gray-600 mt-2 pl-2">
                      Méditerranée occidentale
                    </div>
                    <Timeline items={data[0].zonesNavigation} />

                    <div>
                      <div className="text-lg text-gray-700 mt-2">
                        Conditions de location
                      </div>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Caution : {data[0].depotgarantie} €.</li>
                        <li>
                          {data[0].locationSansPermis
                            ? "Permis bateau côtier obligatoire"
                            : "Permis bateau côtier non obligatoire"}
                        </li>
                        <li>
                          Politique d'annulation :{" "}
                          {data[0].politiqueAnnulation.split(":")[1]?.trim()}
                        </li>
                        <li>Contrat de location signé avant le départ.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-[3rem]">
                  <div className="text-xl text-black font-bold underline underline-offset-8 mb-4">
                    Galerie
                  </div>
                  <div>
                    {data.length > 0 && (
                      <GalerieSingleBoat medias={data[0].medias.slice(4, 9)} />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div
                  ref={divRef}
                  style={{
                    // background: "lightblue",
                    // padding: "20px",
                    // width: "100%",
                    ...(isSticky
                      ? {
                          position: "fixed",
                          top: "6rem",
                          left: "58rem",
                          right: 0,
                          zIndex: 30,
                        }
                      : {}),
                  }}
                >
                  <Card className="w-full max-w-sm">
                    <CardHeader>
                      <CardTitle>
                        Réservez votre bateau en quelques clics
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center justify-center w-full mb-4">
                          <div className="flex flex-col w-full">
                            <div className="w-full flex items-center my-3">
                              <Alert
                                color="warning"
                                title="En cas d'annulation plus de 30 jours avant le départ, remboursement intégral. Passé ce délai, voir nos conditions d'annulation."
                              />
                            </div>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="flex flex-col gap-6">
                          <div className="grid gap-2">
                            <Label htmlFor="datedebut">Date de début</Label>
                            <Input
                              id="datedebut"
                              type="text"
                              value={
                                date1
                                  ? date1.format("YYYY-MM-DD")
                                  : "Non définie"
                              }
                              //   placeholder="m@example.com"
                              //   required
                              disabled
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="datefin">Date de fin</Label>
                            <Input
                              id="datefin"
                              type="text"
                              value={
                                date2
                                  ? date2.format("YYYY-MM-DD")
                                  : "Non définie"
                              }
                              disabled
                            />
                          </div>
                          <div className="grid gap-2">
                            <Checkbox
                              isSelected={isAccepted}
                              onValueChange={setIsAccepted}
                              radius="full"
                            >
                              J'accepte les conditions de location et la
                              politique d'annulation.
                            </Checkbox>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleNext();
                        }}
                      >
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={!isAccepted}
                        >
                          Réserver maintenant
                        </Button>
                      </form>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommentsSection bateauId={data[0].id} utilisateurId={utilisateurId} />
        {/* <BateauSimilaireSection /> */}
      </section>
    </>
  );
}
