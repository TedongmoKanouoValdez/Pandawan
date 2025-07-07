"use client";
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
              <div className="grid grid-cols-3 gap-3 place-items-center">
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751018808/parking-marin-de-bateaux-et-yachts-en-turquie-yacht-amarre-dans-le-port-maritime_ecsqlq.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Ocean Breeze 42
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Voilier" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Voilier" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Inclus" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Inclus" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="320€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="320€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Marseille" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Marseille" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="6 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="6 personnes" />
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
                          <RippleButton className="bg-white text-black">
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020033/white-yacht-with-mountains_1_mj6jqe.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Luxor Cat 45
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Catamaran" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Catamaran" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Inclus" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Inclus" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="720€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="720€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Saint-Tropez" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Saint-Tropez" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="12 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="12 personnes" />
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
                          <RippleButton className="bg-white text-black">
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Luxor Cat 45
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Bateau à moteur" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Bateau à moteur" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Sans" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Sans" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="310€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="310€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Arcachon" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Arcachon" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="6 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="6 personnes" />
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
                          <RippleButton className="bg-white text-black">
                            Voir le bateaux
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020106/view-beautiful-white-yacht-daylight-horizontal-sea-background_bubbsa.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Family Sea 30
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Voilier" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Voilier" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Optionnel" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Optionnel" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="390€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="390€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Hyères" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Hyères" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="8 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="8 personnes" />
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
                          <RippleButton className="bg-white text-black">
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020142/parking-marin-de-bateaux-et-yachts-en-turquie-yacht-amarre-dans-le-port-maritime_1_rsjela.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Serenity 36
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Voilier" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Voilier" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Inclus" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Inclus" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="430/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="430/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Bastia" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Bastia" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="9 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="9 personnes" />
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
                          <RippleButton className="bg-white text-black">
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020192/yachts-de-luxe-dans-un-port-le-soir_1_vmgidd.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Corsica Spirit 40
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Catamaran" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Catamaran" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Inclus" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Inclus" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="680€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="680€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Ajaccio" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Ajaccio" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="10 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="10 personnes" />
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
                          <RippleButton className="bg-white text-black">
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020247/bateau-a-voile-reste-a-bay-a-st-john-iles-vierges_1_valwhy.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Catana Dream 50
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Bateau à moteur" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Bateau à moteur" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Optionnel" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Optionnel" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="270€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="270€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Cannes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Cannes" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="5 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="5 personnes" />
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
                          <RippleButton className="bg-white text-black">
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020334/plage-tropicale-avec-des-bungalows-sur-l-eau-aux-maldives_st17mb.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Sea Harmony 38
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Voilier" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Voilier" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Optionnel" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Optionnel" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="340€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="340€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Toulon" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Toulon" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="7 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="7 personnes" />
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
                          <RippleButton className="bg-white text-black">
                            Voir le bateaux
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
                <div
                  className="relative carddestinationshome flex flex-col space-y-24"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751020271/yachts-dans-le-port-de-monaco_ivlnh1.jpg)",
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
                        25°C en été - <span className="font-bold">France</span>
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
                      <Badge.Ribbon text="Croisières le long de la Côte d'Azur." className="bg-glacev2"></Badge.Ribbon>
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
                          Lagoon Sun 46
                        </Chip>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Catamaran" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <FaSailboat />
                                  </div>
                                  <div>
                                    <MonTexte texte="Catamaran" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="Inclus" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiCaptainHatProfile />
                                  </div>
                                  <div>
                                    <MonTexte texte="Inclus" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="650€/jour" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <GiTakeMyMoney />
                                  </div>
                                  <div>
                                    <MonTexte texte="650€/jour" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="space-x-2">
                          <Space>
                            <Tooltip title="Bormes-les-Mimosas" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <IoMdPin />
                                  </div>
                                  <div>
                                    <MonTexte texte="Bormes-les-Mimosas" />
                                  </div>
                                </div>
                              </Chip>
                            </Tooltip>
                          </Space>
                          <Space>
                            <Tooltip title="10 personnes" color="#000">
                              <Chip color="warning" className="cursor-pointer" variant="shadow">
                                <div className="flex space-x-2 items-center">
                                  <div>
                                    <HiUserGroup />
                                  </div>
                                  <div>
                                    <MonTexte texte="10 personnes" />
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
                          <RippleButton className="bg-white text-black">
                            Voir le bateaux
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
              </div>
              <div className="flex justify-end w-full mt-8">
                <Pagination showControls initialPage={1} total={10} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
