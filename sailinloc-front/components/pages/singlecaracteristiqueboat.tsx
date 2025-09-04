import { PiBoatFill } from "react-icons/pi";
import { FaRulerCombined } from "react-icons/fa";
import { ImTextWidth } from "react-icons/im";
import { FaDraftingCompass } from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import { MdBedroomChild } from "react-icons/md";
import { GiBoatEngine } from "react-icons/gi";
import { IoWater } from "react-icons/io5";
import { GiFuelTank } from "react-icons/gi";

export interface Details {
  id: number;
  modele?: string; // ajouté pour modèle par exemple
  longueur?: number;
  largeur?: number;
  tirantEau?: number;
  capaciteMax?: number;
  nombreCabines?: number;
  moteur?: string;
  reservoirEau?: number;
  reservoirCarburant?: number;
  // ...autres propriétés possibles
}

export interface Modele {
  modele?: string;
}

interface SingleCaracteristiqueBoatProps {
  detail: Details;
  modele: Modele;
}

const CaracteristiqueItem = ({
  Icon,
  label,
  value,
  unit,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string | number | boolean | null;
  unit?: string;
}) => {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div className="flex flex-col items-center text-center border-r-1 pr-4 border-gray-500">
      <Icon className="w-7 h-7" />
      <div className="text-gray-500">{label}</div>
      <div>
        {typeof value === "boolean" ? (value ? "Oui" : "Non") : value}{" "}
        {unit || ""}
      </div>
    </div>
  );
};

export const SingleCaracteristiqueBoat: React.FC<
  SingleCaracteristiqueBoatProps
> = ({ detail, modele }) => {
  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-glacev2 mb-10">
      <div className="flex flex-row space-x-4 p-2.5 items-center justify-center flex-wrap">
        <CaracteristiqueItem Icon={PiBoatFill} label="Modèle" value={modele} />
        <CaracteristiqueItem
          Icon={FaRulerCombined}
          label="Longueur"
          value={detail.longueur}
          unit="m"
        />
        <CaracteristiqueItem
          Icon={ImTextWidth}
          label="Largeur"
          value={detail.largeur}
          unit="m"
        />
        <CaracteristiqueItem
          Icon={FaDraftingCompass}
          label="Tirant d'eau"
          value={detail.tirantEau}
          unit="m"
        />
        <CaracteristiqueItem
          Icon={FaUsersRays}
          label="Capacité"
          value={detail.capaciteMax}
          unit="personnes"
        />
        <CaracteristiqueItem
          Icon={MdBedroomChild}
          label="Nombre de cabines"
          value={detail.nombreCabines}
          unit="cabanes"
        />
        <CaracteristiqueItem
          Icon={GiBoatEngine}
          label="Moteur"
          value={detail.moteur}
        />
        <CaracteristiqueItem
          Icon={IoWater}
          label="Réservoir d'eau"
          value={detail.reservoirEau}
          unit="L"
        />
        <CaracteristiqueItem
          Icon={GiFuelTank}
          label="Réservoir de carburant"
          value={detail.reservoirCarburant}
          unit="L"
        />
      </div>
    </div>
  );
};
