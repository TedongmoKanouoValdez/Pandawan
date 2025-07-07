"use client";
import React, { useState } from "react";
import { PiSunDimFill } from "react-icons/pi";
import { Badge, Space, Tooltip, Divider, Button } from "antd";
import { BiSolidBookmark } from "react-icons/bi";
import { Chip } from "@heroui/chip";
import { FaSailboat } from "react-icons/fa6";
import { GiCaptainHatProfile } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdPin } from "react-icons/io";
import { RippleButton } from "@/components/magicui/ripple-button";
import { HiUserGroup } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

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

export default function BateauSimilaireSection() {
  return (
    <div className="mx-auto max-w-6xl grid grid-cols-2 gap-2 place-items-center">
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
                Ocean Breeze 42
              </Chip>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="space-x-2">
                <Space>
                  <Tooltip title="Voilier" color="#000">
                    <Chip
                      color="warning"
                      className="cursor-pointer"
                      variant="shadow"
                    >
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
                          <MonTexte texte="Inclus" />
                        </div>
                      </div>
                    </Chip>
                  </Tooltip>
                </Space>
                <Space>
                  <Tooltip title="320€/jour" color="#000">
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
                          <MonTexte texte="Marseille" />
                        </div>
                      </div>
                    </Chip>
                  </Tooltip>
                </Space>
                <Space>
                  <Tooltip title="6 personnes" color="#000">
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
                Luxor Cat 45
              </Chip>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="space-x-2">
                <Space>
                  <Tooltip title="Catamaran" color="#000">
                    <Chip
                      color="warning"
                      className="cursor-pointer"
                      variant="shadow"
                    >
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
                          <MonTexte texte="Inclus" />
                        </div>
                      </div>
                    </Chip>
                  </Tooltip>
                </Space>
                <Space>
                  <Tooltip title="720€/jour" color="#000">
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
                          <MonTexte texte="Saint-Tropez" />
                        </div>
                      </div>
                    </Chip>
                  </Tooltip>
                </Space>
                <Space>
                  <Tooltip title="12 personnes" color="#000">
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
                Luxor Cat 45
              </Chip>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="space-x-2">
                <Space>
                  <Tooltip title="Bateau à moteur" color="#000">
                    <Chip
                      color="warning"
                      className="cursor-pointer"
                      variant="shadow"
                    >
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
                          <MonTexte texte="Sans" />
                        </div>
                      </div>
                    </Chip>
                  </Tooltip>
                </Space>
                <Space>
                  <Tooltip title="310€/jour" color="#000">
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
                          <MonTexte texte="Arcachon" />
                        </div>
                      </div>
                    </Chip>
                  </Tooltip>
                </Space>
                <Space>
                  <Tooltip title="6 personnes" color="#000">
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
    </div>
  );
}
