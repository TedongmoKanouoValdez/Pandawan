"use client";
import React, { useState, useRef } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { PiSunDimFill } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { DatePicker } from "@heroui/date-picker";
import { RippleButton } from "@/components/magicui/ripple-button";
import { NumberInput } from "@heroui/number-input";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Input } from "@heroui/input";
import { BiSolidBookmark } from "react-icons/bi";
import { BsCloudSunFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Badge, Space } from "antd";
import { Chip } from "@heroui/chip";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { BsShieldFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Form } from "@heroui/form";
import { Button, ButtonGroup } from "@heroui/button";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { TbMailFilled } from "react-icons/tb";
// import required modules
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { FaCode } from "react-icons/fa";

type Props = {
  texte: string; // Définit que 'texte' doit être une chaîne de caractères
};

export const MonTexte = ({ texte }: Props) => {
  const maxChars = 10; // Limite à 100 caractères
  const courtTexte =
    texte.length > maxChars ? texte.slice(0, maxChars) + "..." : texte;

  return <p>{courtTexte}</p>;
};

export const Descritpion = ({ texte }: Props) => {
  const maxChars = 45; // Limite à 100 caractères
  const courtTexte =
    texte.length > maxChars ? texte.slice(0, maxChars) + "..." : texte;

  return <p>{courtTexte}</p>;
};

export default function CategoriesPage() {
  const words = [
    "d’Exception",
    "de prestige",
    "de rêve",
    "de charme",
    "de beauté",
    "magiques",
  ];

  return (
    <>
      <section className="">
        <div className="relative">
          <div className="contentvideohome">
            <div
              className="contentbannerdestination"
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1755849407/Design_sans_titre_3_jbdcmt.png)",
                width: "100%",
                height: "65vh",
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "97rem",
              }}
            ></div>
          </div>
          <div className="absolute left-[1rem] md:left-[10rem] top-[10rem]">
            <div className="flex flex-col items-center md:items-start md:flex-row space-x-2">
              <div>{/* <LogoSecondaire /> */}</div>
              <div className="Textheader text-white">
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <h1 className="w-[20rem] text-[2.9rem] text-center md:text-5xl font-bold md:w-[46rem] md:text-left">
                    Découvrez nos destinations
                    <FlipWords words={words} className="text-white" />
                  </h1>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <p className="text-lg mt-4 w-[20rem] text-center md:w-[39rem] md:text-left">
                    Partez à l&apos;aventure en voilier ou bateau à moteur. De
                    la Méditerranée aux îles paradisiaques, SailingLoc vous
                    emmène vers des destinations uniques pour des escales
                    inoubliables.
                  </p>
                </BoxReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div
          className="py-24"
          // style={{
          //   backgroundImage:
          //     "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1755865135/paysage-de-plage-d-hawai-avec-la-nature-et-le-littoral_1_tdxpbi.jpg)",
          // }}
        >
          <div className="flex flex-col justify-center items-center pb-20">
            <div className="px-[1rem] md:px-0 text-center">
              <h2 className="text-5xl font-medium mb-5">
                NAVIGUEZ VERS DE NOUVEAUX HORIZONS
              </h2>
            </div>
            <div>
              <p className="w-[20rem] md:w-[35rem] text-center">
                Naviguez dans les plus beaux coins de France et d&apos;Europe
              </p>
            </div>
          </div>
          <div className=" mx-auto max-w-[78rem]">
            <div className="grid grid-cols-3 gap-[3rem]">
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  width: "26rem",
                  padding: "1rem",
                  height: "33rem",
                  borderRadius: "15px",
                }}
                className="bg-white"
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750717340/belle-vue-avec-des-bateaux_o1f6jj.jpg)",
                    backgroundSize: "26rem",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "18px",
                    backgroundPosition: "center",
                  }}
                  className="relative flex h-[23rem] w-[24rem] object-cover justify-center items-end"
                >
                  <div className="absolute flex flex-row space-x-3 top-[1rem] right-[2rem]">
                    <div
                      className="cursor-pointer z-10 bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "50%" }}
                    >
                      <BiSolidBookmark className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 degrade"></div>
                  <div className="flex flex-col text-white mb-10 z-10">
                    <div>
                      <div className="text-lg font-semibold">
                        Côtes méditerranéennes et atlantiques
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="pr-[3rem]">
                        <Descritpion
                          texte="Des plages ensoleillées aux charmants ports de pêche,
                          découvrez les plus belles côtes de France."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4 justify-center w-[24rem] mt-3">
                  <div className="flex flex-row justify-between space-x-4 items-center">
                    <div>
                      <div>France</div>
                      <div>Croisières le long de la Côte d'Azur.</div>
                      <div className="my-3 bg-black w-full h-[0.1rem]"></div>
                    </div>
                    <div
                      className="bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="flex flex-row items-center">
                        <div>25°C</div>
                        <div>
                          <PiSunDimFill className="text-yellow-400 w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-3">
                      <Chip color="warning" variant="shadow">
                        <MonTexte texte="Monocoques" />
                      </Chip>
                      <Chip color="warning" variant="shadow">
                        <MonTexte texte="Catamarans" />
                      </Chip>
                      <Chip color="warning" variant="shadow">
                        <MonTexte texte="voiliers à moteur" />
                      </Chip>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  width: "26rem",
                  padding: "1rem",
                  height: "33rem",
                  borderRadius: "15px",
                }}
                className="bg-white"
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750790401/femme-pleine-de-coups-regardant-des-bateaux_cnc6td.jpg)",
                    backgroundSize: "26rem",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "18px",
                    backgroundPosition: "center",
                  }}
                  className="relative flex h-[23rem] w-[24rem] object-cover justify-center items-end"
                >
                  <div className="absolute flex flex-row space-x-3 top-[1rem] right-[2rem]">
                    <div
                      className="cursor-pointer z-10 bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "50%" }}
                    >
                      <BiSolidBookmark className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 degrade"></div>
                  <div className="flex flex-col text-white mb-10 z-10">
                    <div>
                      <div className="text-lg font-semibold">
                        Costa Brava et Costa Blanca
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="pr-[3rem]">
                        <Descritpion
                          texte="Plages idylliques, criques secrètes et villages
                          pittoresques entre mer et montagnes."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4 justify-center w-[24rem] mt-3">
                  <div className="flex flex-row justify-between space-x-4 items-center">
                    <div>
                      <div>Espagne</div>
                      <div>Plongée dans les eaux cristallines.</div>
                      <div className="my-3 bg-black w-full h-[0.1rem]"></div>
                    </div>
                    <div
                      className="bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="flex flex-row items-center">
                        <div>28°C</div>
                        <div>
                          <PiSunDimFill className="text-yellow-400 w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-3">
                      <Chip color="warning" variant="shadow">
                        <MonTexte texte="Catamarans" />
                      </Chip>
                      <Chip color="warning" variant="shadow">
                        <MonTexte texte="yachts à moteur" />
                      </Chip>
                      <Chip color="warning" variant="shadow">
                        <MonTexte texte="voiliers avec skipper" />
                      </Chip>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  width: "26rem",
                  padding: "1rem",
                  height: "33rem",
                  borderRadius: "15px",
                }}
                className="bg-white"
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750791884/beaux-paysages-varies_1_hs3dsu.jpg)",
                    backgroundSize: "26rem",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "18px",
                    backgroundPosition: "center",
                  }}
                  className="relative flex h-[23rem] w-[24rem] object-cover justify-center items-end"
                >
                  <div className="absolute flex flex-row space-x-3 top-[1rem] right-[2rem]">
                    <div
                      className="cursor-pointer z-10 bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "50%" }}
                    >
                      <BiSolidBookmark className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 degrade"></div>
                  <div className="flex flex-col text-white mb-10 z-10">
                    <div>
                      <div className="text-lg font-semibold">
                        Îles de Sardaigne et de Sicile
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="pr-[3rem]">
                        <Descritpion
                          texte="Venez découvrir deux des plus belles îles
                          méditerranéennes, riches en culture et en paysages
                          sublimes."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4 justify-center w-[24rem] mt-3">
                  <div className="flex flex-row justify-between space-x-4 items-center">
                    <div>
                      <div>Italie</div>
                      <div>Croisières autour des îles volcaniques.</div>
                      <div className="my-3 bg-black w-full h-[0.1rem]"></div>
                    </div>
                    <div
                      className="bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="flex flex-row items-center">
                        <div>30°C</div>
                        <div>
                          <PiSunDimFill className="text-yellow-400 w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="Monocoques" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="voiliers à louer avec skipper" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="catamarans" />
                    </Chip>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  width: "26rem",
                  padding: "1rem",
                  height: "33rem",
                  borderRadius: "15px",
                }}
                className="bg-white"
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750792646/belle-vue-sur-la-cote-de-la-baie-de-gnejna-a-malte_1_oeb0mh.jpg)",
                    backgroundSize: "26rem",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "18px",
                    backgroundPosition: "center",
                  }}
                  className="relative flex h-[23rem] w-[24rem] object-cover justify-center items-end"
                >
                  <div className="absolute flex flex-row space-x-3 top-[1rem] right-[2rem]">
                    <div
                      className="cursor-pointer z-10 bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "50%" }}
                    >
                      <BiSolidBookmark className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 degrade"></div>
                  <div className="flex flex-col text-white mb-10 z-10">
                    <div>
                      <div className="text-lg font-semibold">
                        Côtes méditerranéennes et atlantiques
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="pr-[3rem]">
                        <Descritpion texte="La côte ensoleillée du Portugal, idéale pour les amoureux de la mer et du soleil." />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4 justify-center w-[24rem] mt-3">
                  <div className="flex flex-row justify-between space-x-4 items-center">
                    <div>
                      <div>Portugal</div>
                      <div>Exploration des grottes marines.</div>
                      <div className="my-3 bg-black w-full h-[0.1rem]"></div>
                    </div>
                    <div
                      className="bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="flex flex-row items-center">
                        <div>22°C</div>
                        <div>
                          <BsCloudSunFill className="text-gray-500 w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="Voiliers privés" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="catamarans de luxe" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="excursions en voilier" />
                    </Chip>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  width: "26rem",
                  padding: "1rem",
                  height: "33rem",
                  borderRadius: "15px",
                }}
                className="bg-white"
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750792723/belle-photo-des-vieux-batiments-pres-de-la-falaise-sur-le-rivage-avec-des-bateaux-dans-l-ocean_atfsw2.jpg)",
                    backgroundSize: "26rem",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "18px",
                    backgroundPosition: "center",
                  }}
                  className="relative flex h-[23rem] w-[24rem] object-cover justify-center items-end"
                >
                  <div className="absolute flex flex-row space-x-3 top-[1rem] right-[2rem]">
                    <div
                      className="cursor-pointer z-10 bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "50%" }}
                    >
                      <BiSolidBookmark className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 degrade"></div>
                  <div className="flex flex-col text-white mb-10 z-10">
                    <div>
                      <div className="text-lg font-semibold">
                        Côtes méditerranéennes et atlantiques
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="pr-[3rem]">
                        <Descritpion texte="Vivez l'aventure grecque, entre histoire antique, plages secrètes et mer bleu turquoise." />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4 justify-center w-[24rem] mt-3">
                  <div className="flex flex-row justify-between space-x-4 items-center">
                    <div>
                      <div>Grèce</div>
                      <div>Découverte des sites historiques.</div>
                      <div className="my-3 bg-black w-full h-[0.1rem]"></div>
                    </div>
                    <div
                      className="bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="flex flex-row items-center">
                        <div>28°C</div>
                        <div>
                          <PiSunDimFill className="text-yellow-400 w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="Voiliers avec skipper" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="catamarans" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="yachts privés" />
                    </Chip>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  width: "26rem",
                  padding: "1rem",
                  height: "33rem",
                  borderRadius: "15px",
                }}
                className="bg-white"
              >
                <div
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750792785/pin-francais_1_i81dpt.jpg)",
                    backgroundSize: "26rem",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "18px",
                    backgroundPosition: "center",
                  }}
                  className="relative flex h-[23rem] w-[24rem] object-cover justify-center items-end"
                >
                  <div className="absolute flex flex-row space-x-3 top-[1rem] right-[2rem]">
                    <div
                      className="cursor-pointer z-10 bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "50%" }}
                    >
                      <BiSolidBookmark className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 degrade"></div>
                  <div className="flex flex-col text-white mb-10 z-10">
                    <div>
                      <div className="text-lg font-semibold">Côte dalmate</div>
                    </div>
                    <div className="mt-1">
                      <div className="pr-[3rem]">
                        <Descritpion texte="Un paradis caché, avec des eaux transparentes et des paysages d'une beauté à couper le souffle." />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4 justify-center w-[24rem] mt-3">
                  <div className="flex flex-row justify-between space-x-4 items-center">
                    <div>
                      <div>Croatie</div>
                      <div>Découverte des îles de Hvar et Korčula.</div>
                      <div className="my-3 bg-black w-full h-[0.1rem]"></div>
                    </div>
                    <div
                      className="bg-glacev2 p-[0.5rem]"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="flex flex-row items-center">
                        <div>26°C</div>
                        <div>
                          <PiSunDimFill className="text-yellow-400 w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="Voiliers à moteur" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="catamarans" />
                    </Chip>
                    <Chip color="warning" variant="shadow">
                      <MonTexte texte="excursions en groupe" />
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
