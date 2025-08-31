"use client";
import { useEffect, useState } from "react";
import { SplitText } from "@/components/split-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { FlipWords } from "@/components/ui/flip-words";
import { DatePicker } from "@heroui/date-picker";
import { RippleButton } from "@/components/magicui/ripple-button";
import { NumberInput } from "@heroui/number-input";
import { Input } from "@heroui/input";
import { Badge, Space, Tooltip, Divider, Button } from "antd";
import { Chip } from "@heroui/chip";
import { PiSunDimFill } from "react-icons/pi";
import { BiSolidBookmark } from "react-icons/bi";
import { FaSailboat } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { GiCaptainHatProfile } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { Empty } from "antd";

import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@heroui/pagination";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

type Props = {
  texte: string; // Définit que 'texte' doit être une chaîne de caractères
};

interface Media {
  id: number;
  url: string;
  type: string;
  titre: string;
}

interface Bateau {
  id: number;
  header: string;
  slug: string | number;
  modele: string;
  type: string;
  port: string;
  target: string;
  description: string;
  medias: Media[];
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

export const MonTexte = ({ texte }: Props) => {
  const maxChars = 7; // Limite à 100 caractères
  const courtTexte =
    texte.length > maxChars ? texte.slice(0, maxChars) + "..." : texte;

  return <p>{courtTexte}</p>;
};

export const Descritpion = ({ texte }: Props) => {
  const maxChars = 90; // Limite à 100 caractères
  const courtTexte =
    texte.length > maxChars ? texte.slice(0, maxChars) + "..." : texte;

  return <p>{courtTexte}</p>;
};

export default function NosBateauxPage() {
  const words = [
    "Vivez l'expérience de",
    "Imaginez-vous à bord de",
    "Offrez-vous un moment unique avec",
    "Embarquez avec",
  ];
  const [data, setData] = useState<Bateau[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/bateaux")
      .then((res) => res.json())
      .then((json) => {
        if (!json || !Array.isArray(json.bateaux)) {
          console.error("Format de données inattendu :", json);
          setLoading(false);
          return;
        }
        // console.log(json.bateaux);

        const bateauxMapped = json.bateaux.map((bateau: any) => ({
          id: bateau.id,
          header: bateau.nom ?? "Nom inconnu",
          slug: bateau.slug ?? 0,
          modele: bateau.modele ?? "Modèle inconnu",
          type: bateau.typeBateau ?? "Modèle inconnu",
          port: bateau.portdefault ?? "Port inconnu",
          target: bateau.prix ?? "0",
          detail: bateau.details ?? [],
          description: bateau.description ?? "",
          datesIndisponibles: bateau.datesIndisponibles ?? [],
          proprietaireId: bateau.proprietaireId ?? 0,
          medias: bateau.medias ?? [],
        }));

        setData(bateauxMapped);
        setLoading(false);
        setTotalPages(Math.ceil(bateauxMapped.length / itemsPerPage));
      })
      .catch((err) => {
        console.error("Erreur lors du rafraîchissement :", err);
        setLoading(false);
      });
  }, []);

  const pagedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) return <p>Chargement…</p>;

  console.log(data);

  return (
    <>
      <section className="">
        <div className="relative">
          <div className="contentvideohome">
            <video
              muted
              autoPlay
              loop
              playsInline
              controls={false}
              style={{ width: "100%", height: "100vh", objectFit: "cover" }}
              src="https://res.cloudinary.com/dluqkutu8/video/upload/v1750975848/18682386-uhd_3840_2160_25fps_tavnq6.mp4"
            />
          </div>
          <div className="contenttext">
            <div className="flex flex-row space-x-2">
              <div className="text-white">
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <h1 className="text-6xl font-bold w-[60rem]">
                    <FlipWords words={words} className="text-white" />
                    nos bateaux disponibles à la location
                  </h1>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <p className="text-lg mt-4 w-[31rem]">
                    Voiliers, catamarans, bateaux à moteur… trouvez le bateau
                    idéal pour votre prochaine aventure en mer, avec ou sans
                    skipper.
                  </p>
                </BoxReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751014902/5615262_z9dztf.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "200rem",
        }}
      >
        <div className="pt-20">
          <div className="flex flex-col justify-center items-center pb-20">
            <div>
              <h2 className="text-5xl font-medium mb-5">
                EXPLORER NOTRE FLOTTE DE BATEAUX A LOUER
              </h2>
            </div>
            <div>
              <p className="descriptionallsectionhome text-center">
                Réservez facilement le bateau qui vous ressemble, en quelques
                clics, partout en France et en Europe.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl pb-20">
          <div>
            <div className=" mb-8">
              <form action="">
                <div className="grid grid-cols-5 gap-4 place-items-center">
                  <div className="">
                    <Input
                      label="Veuillez saisire votre destination"
                      type="text"
                      variant="bordered"
                      color="primary"
                    />
                  </div>
                  <div className="">
                    <Input
                      label="Type de bateau"
                      type="text"
                      variant="bordered"
                      color="primary"
                    />
                  </div>
                  <div className="">
                    <DatePicker
                      label={"Dates de navigation"}
                      variant="bordered"
                      color="primary"
                    />
                  </div>
                  <div className="">
                    <NumberInput
                      label="Nombre de passagers"
                      variant="bordered"
                      color="primary"
                    />
                  </div>
                  <div>
                    <RippleButton
                      rippleColor="#ADD8E6"
                      className="py-3.5 text-white bg-black"
                    >
                      Rechercher
                    </RippleButton>
                  </div>
                </div>
              </form>
            </div>
            <hr className="mb-8 border border-black" />
            <div>
              <div className={`grid ${pagedData && pagedData.length > 0 ? 'grid-cols-3 gap-3' : 'grid-cols-1 gap-1' } place-items-center`}>
                {pagedData && pagedData.length > 0 ? (
                  pagedData.map((bateau) => {
                    const cover = bateau.medias.find((m) => m.type === "COVER");
                    let optionsPayantes = [];
                    if (bateau?.detail?.optionsPayantes) {
                      optionsPayantes = JSON.parse(
                        bateau.detail.optionsPayantes
                      );
                    }
                    const hasSkipper = optionsPayantes.some(
                      (option) => option.id === "Skipper"
                    );

                    if (!bateau?.detail?.tarifications) return null;

                    let affichage = "";

                    try {
                      const tarifs = JSON.parse(
                        bateau.detail.tarifications || "[]"
                      );

                      affichage = tarifs
                        .map((tarif: any) => {
                          const montant = parseFloat(tarif.montant);
                          const label = typeToLabel[tarif.type] || "";
                          return `${montant}€ ${label}`;
                        })
                        .join(", ");
                    } catch (error) {
                      console.error(
                        `Erreur parsing tarifications pour ${bateau.header} :`,
                        error
                      );
                    }

                    return (
                      <div
                        key={bateau.id}
                        className="relative carddestinationshome flex flex-col space-y-24"
                        style={{
                          backgroundImage: `url(${cover?.url || "https://res.cloudinary.com/dluqkutu8/image/upload/v1754741102/view-boat-water_razzxb.jpg"})`,
                          backgroundPositionX: "center",
                          backgroundSize: "26rem",
                        }}
                      >
                        <div className="flex flex-row justify-between mx-4 mt-4 items-center">
                          <div className="bg-glace flex flex-row space-x-4 items-center px-2.5 py-1 rounded-full">
                            <div>
                              <PiSunDimFill className="text-yellow-400 w-6 h-6" />
                            </div>
                            <div className="text-white text-base">
                              25°C en été -{" "}
                              <span className="font-bold">France</span>
                            </div>
                          </div>
                          <div className="cursor-pointer z-10">
                            <BiSolidBookmark className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div>
                          <Space
                            direction="vertical"
                            size="middle"
                            style={{ width: "100%", gap: "2rem" }}
                          >
                            <Badge.Ribbon
                              text="Croisières le long de la Côte d'Azur."
                              className="bg-glacev2"
                            ></Badge.Ribbon>
                          </Space>
                        </div>
                        <div className="bg-glace contentinfocarddestination text-left text-base space-y-4 px-2">
                          <div className="space-y-2 px-2">
                            <div>
                              <Chip
                                color="warning"
                                className="text-white text-lg font-medium mt-2 border-none"
                                variant="dot"
                              >
                                {bateau.header}
                              </Chip>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="space-x-2">
                                <Space>
                                  <Tooltip title={bateau.type} color="#000">
                                    <Chip
                                      color="warning"
                                      className="cursor-pointer"
                                      variant="shadow"
                                    >
                                      <div className="flex space-x-2 items-cenyter">
                                        <div>
                                          <FaSailboat />
                                        </div>
                                        <div>
                                          <MonTexte texte={bateau.type} />
                                        </div>
                                      </div>
                                    </Chip>
                                  </Tooltip>
                                </Space>
                                <Space>
                                  <Tooltip
                                    title={hasSkipper ? "Inclus" : "Non inclus"}
                                    color="#000"
                                  >
                                    <Chip
                                      color="warning"
                                      className="cursor-pointer"
                                      variant="shadow"
                                    >
                                      <div className="flex space-x-2 items-center">
                                        <div>
                                          <GiCaptainHatProfile />
                                        </div>
                                        <div>
                                          <MonTexte
                                            texte={
                                              hasSkipper
                                                ? "Inclus"
                                                : "Non inclus"
                                            }
                                          />
                                        </div>
                                      </div>
                                    </Chip>
                                  </Tooltip>
                                </Space>
                                <Space>
                                  <Tooltip title={affichage} color="#000">
                                    <Chip
                                      color="warning"
                                      className="cursor-pointer"
                                      variant="shadow"
                                    >
                                      <div className="flex space-x-2 items-center">
                                        <div>
                                          <GiTakeMyMoney />
                                        </div>
                                        <div>
                                          <MonTexte texte={affichage} />
                                        </div>
                                      </div>
                                    </Chip>
                                  </Tooltip>
                                </Space>
                              </div>
                              <div className="space-x-2">
                                <Space>
                                  <Tooltip title={bateau.port} color="#000">
                                    <Chip
                                      color="warning"
                                      className="cursor-pointer"
                                      variant="shadow"
                                    >
                                      <div className="flex space-x-2 items-center">
                                        <div>
                                          <IoMdPin />
                                        </div>
                                        <div>
                                          <MonTexte texte={bateau.port} />
                                        </div>
                                      </div>
                                    </Chip>
                                  </Tooltip>
                                </Space>
                                <Space>
                                  <Tooltip
                                    title={`${bateau?.detail?.capaciteMax} personnes`}
                                    color="#000"
                                  >
                                    <Chip
                                      color="warning"
                                      className="cursor-pointer"
                                      variant="shadow"
                                    >
                                      <div className="flex space-x-2 items-center">
                                        <div>
                                          <HiUserGroup />
                                        </div>
                                        <div>
                                          <MonTexte
                                            texte={`${bateau?.detail?.capaciteMax} personnes`}
                                          />
                                        </div>
                                      </div>
                                    </Chip>
                                  </Tooltip>
                                </Space>
                              </div>
                            </div>
                            <div
                              className="flex flex-row justify-between items-center"
                              style={{ marginBottom: "1rem" }}
                            >
                              <div>
                                <RippleButton
                                  onClick={() =>
                                    router.push(`/boat/${bateau.slug}`)
                                  }
                                  className="bg-white text-black"
                                >
                                  Voir les bateaux
                                </RippleButton>
                              </div>
                              <div className="flex flex-row space-x-2">
                                <FaStar className="text-amber-400" />
                                <FaStar className="text-amber-400" />
                                <FaStar className="text-amber-400" />
                                <FaStar className="text-amber-400" />
                                <FaStar className="text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Empty description={false} />
                )}
              </div>
              <div className="flex justify-end w-full mt-8">
                {/* <Pagination showControls initialPage={1} total={10} /> */}
                {totalPages > 1 && (
                  <Pagination
                    page={page}
                    onChange={setPage}
                    total={totalPages}
                    showControls
                    initialPage={1}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
