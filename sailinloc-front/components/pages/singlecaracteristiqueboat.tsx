import { PiBoatFill } from "react-icons/pi";
import { FaRulerCombined } from "react-icons/fa";
import { ImTextWidth } from "react-icons/im";
import { FaDraftingCompass } from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import { MdBedroomChild } from "react-icons/md";
import { GiBoatEngine } from "react-icons/gi";
import { IoWater } from "react-icons/io5";
import { GiFuelTank } from "react-icons/gi";

export const SingleCaracteristiqueBoat = () => {
  return (
    <>
      <div className="mx-auto max-w-6xl rounded-lg bg-glacev2 mb-10">
        <div className="flex flex-row space-x-4 p-2.5 items-center justify-center">
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><PiBoatFill className="w-7 h-7" /></div>
                <div className="text-gray-500">Modèle</div>
                <div>Lagoon 42</div>
            </div>
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><FaRulerCombined className="w-7 h-7" /></div>
                <div className="text-gray-500">Longueur</div>
                <div>12,80 m</div>
            </div>
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><ImTextWidth className="w-7 h-7" /></div>
                <div className="text-gray-500">Largeur</div>
                <div>7,70 m</div>
            </div>
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><FaDraftingCompass className="w-7 h-7" /></div>
                <div className="text-gray-500">Tirant d'eau</div>
                <div>1,25 m</div>
            </div>
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><FaUsersRays className="w-7 h-7" /></div>
                <div className="text-gray-500">Capacité</div>
                <div>10 personnes</div>
            </div>
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><MdBedroomChild className="w-7 h-7" /></div>
                <div className="text-gray-500">Nombre de cabines</div>
                <div>4 cabines</div>
            </div>
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><GiBoatEngine className="w-7 h-7" /></div>
                <div className="text-gray-500">Moteur</div>
                <div>2 x 57 CV Yanmar</div>
            </div>
            <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
                <div><IoWater className="w-7 h-7" /></div>
                <div className="text-gray-500">Réservoir d'eau</div>
                <div>600 L</div>
            </div>
            <div className="flex flex-col items-center text-center">
                <div><GiFuelTank className="w-7 h-7" /></div>
                <div className="text-gray-500">Réservoir de carburant</div>
                <div>600 L</div>
            </div>
        </div>
      </div>
    </>
  );
};
