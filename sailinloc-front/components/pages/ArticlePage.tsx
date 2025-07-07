"use client";
import React, { useEffect, useRef, useState } from "react";
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

export default function ArticlePage() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setSticky] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [divTopOffset, setDivTopOffset] = useState<number | null>(null);
  const { date1, date2 } = useDateRange();

  useEffect(() => {
    if (divRef.current) {
      // On récupère la position initiale de la div dans la page
      setDivTopOffset(divRef.current.offsetTop);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (divTopOffset === null) return;

      // La position verticale actuelle du scroll
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

  return (
    <>
      <section style={{
        backgroundImage: "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751624019/5601165_vw0d54.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingBottom: "5rem"
      }} className="pt-16">
        <SingleCarousselBoat />
        <SingleCaracteristiqueBoat />
        <div>
          <div className="mx-auto max-w-6xl">
            <div className="mb-4">
              <Chip variant="dot" className="border-none contentTitleBoat">
                <h1 className="text-4xl">
                  Full Day Adventure : Entre Île du Frioul et Calanques d'Ensues
                </h1>
              </Chip>
            </div>
            <div className="flex flex-row space-x-4 justify-between">
              <div className="flex flex-col space-y-4 w-[40rem]">
                <div className="flex flex-row space-x-4">
                  <div className="text-gray-600">
                    Port L'Estaque, Marseille, France
                  </div>
                  <Chip variant="shadow" className="p-2.5 bgBlue text-white">
                    <div className="flex flex-row space-x-4 items-center">
                      <div>
                        <RiSailboatFill />
                      </div>
                      <div>catamaran</div>
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
                    Louez notre bateau sans permis à Marseille - Tout le confort
                    d'un grand ! Vous rêvez de naviguer en toute liberté sans
                    avoir besoin de permis ? Notre bateau est fait pour vous !
                    Partez à la découverte des magnifiques calanques de
                    Marseille, explorez des criques secrètes aux eaux turquoise
                    et admirez les splendides côtes méditerranéennes, le tout
                    avec le confort et l'équipement d'un grand bateau.
                  </div>
                </div>
                <div className="mt-[3rem]">
                  <div className="text-xl text-black font-bold underline underline-offset-8">
                    Équipements à bord
                  </div>
                  <div className="flex flex-wrap space-x-4 mt-4">
                    <Chip variant="shadow" className="p-2.5 bgBlue text-white">
                      <div className="flex flex-row space-x-4 items-center">
                        <div>
                          <FaWifi />
                        </div>
                        <div>Wi-Fi</div>
                      </div>
                    </Chip>
                    <Chip variant="shadow" className="p-2.5 bgBlue text-white">
                      <div className="flex flex-row space-x-4 items-center">
                        <div>
                          <FaKitchenSet />
                        </div>
                        <div>cuisine équipée</div>
                      </div>
                    </Chip>
                    <Chip variant="shadow" className="p-2.5 bgBlue text-white">
                      <div className="flex flex-row space-x-4 items-center">
                        <div>
                          <IoBed />
                        </div>
                        <div>literie</div>
                      </div>
                    </Chip>
                    <Chip variant="shadow" className="p-2.5 bgBlue text-white">
                      <div className="flex flex-row space-x-4 items-center">
                        <div>
                          <TbAirConditioningDisabled />
                        </div>
                        <div>climatisation</div>
                      </div>
                    </Chip>
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
                    <div className="flex items-center justify-start w-full">
                      <LinkPreview
                        url="https://maps.google.com/?q=Port+de+Nice"
                        className="font-bold"
                      >
                        <Alert
                          color="default"
                          icon={<FaLocationDot />}
                          description="Port de Nice"
                          title="Départ"
                          variant="faded"
                        />
                      </LinkPreview>
                    </div>
                    <div className="flex items-center justify-start w-full">
                      <LinkPreview
                        url="https://maps.google.com/?q=Port+de+Cannes"
                        className="font-bold"
                      >
                        <Alert
                          color="default"
                          icon={<FaLocationDot />}
                          description="Port de Cannes"
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
                        <CalendarSingleBoat />
                      </div>
                    </div>
                    <div className="text-lg text-gray-700 mt-4">
                      Zones de navigation autorisées
                    </div>
                    <div className="text-base text-gray-600 mt-2 pl-2">
                      Méditerranée occidentale
                    </div>
                    <Timeline
                      items={[
                        {
                          children: "Côte d'Azur",
                        },
                        {
                          children: "Corse",
                        },
                        {
                          children: "Baléares",
                        },
                      ]}
                    />
                    <div>
                      <div className="text-lg text-gray-700 mt-2">
                        Conditions de location
                      </div>
                      <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>
                          Caution : 3000 € (empreinte bancaire ou virement).
                        </li>
                        <li>Permis bateau côtier obligatoire.</li>
                        <li>Assurance incluse ou proposée en option.</li>
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
                    <GalerieSingleBoat />
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
                      <Button type="submit" className="w-full" disabled={!isAccepted}>
                        Réserver maintenant
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommentsSection />
        {/* <BateauSimilaireSection /> */}
      </section>
    </>
  );
}
