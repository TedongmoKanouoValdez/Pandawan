import {
  Heading1Icon,
  Heading2Icon,
  MinusIcon,
  PlusIcon,
  TextQuoteIcon,
  TypeIcon,
} from "lucide-react";
import { RiDashboardFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { FaFileCirclePlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <RiDashboardFill size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Votre espace de gestion</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/gestiondesbateaux/creer")}
        >
          <div
            className="bg-background flex size-8 items-center justify-center rounded-md border"
            aria-hidden="true"
          >
            <FaPlus size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Ajouter un bateau</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/reservations")}
        >
          <div
            className="bg-background flex size-8 items-center justify-center rounded-md border"
            aria-hidden="true"
          >
            <IoFileTrayStackedSharp size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Gérer mes réservations</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <div
            className="bg-background flex size-8 items-center justify-center rounded-md border"
            aria-hidden="true"
          >
            <FaFileCirclePlus size={16} className="opacity-60" />
          </div>
          <div>
            <div className="text-sm font-medium">Plus de détails</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
