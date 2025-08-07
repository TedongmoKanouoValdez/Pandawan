"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Button as Buttonheroui } from "@heroui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@heroui/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chip } from "@heroui/chip";
import { FaUserEdit } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa";
import { Alert } from "@heroui/alert";
import { ElementType } from "react";
import { RippleButton } from "@/components/magicui/ripple-button";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { Tooltip } from "@heroui/tooltip";
import { Image } from "@heroui/image";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { Link } from "@heroui/link";
import { Divider, Steps } from "antd";
import { BateauPrefere } from "@/components/pages/bateauprefere";
import { NotificationsUsers } from "@/components/pages/notificationUser";
import { ZonesFavorites } from "@/components/pages/zonesfavorites";
import { FaqUser } from "@/components/pages/faquser";
import ChatUI from "@/components/pages/chatui";
import { Divider as Dividerhenoui } from "@heroui/divider";

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
}

type MoyenDePaimentIconProps = {
  icon: ElementType<{ size?: number | string; color?: string }>;
  size?: number | string;
  color?: string;
  className?: string;
};

const MoyenDePaimentIcon = ({
  icon: Icon,
  size = 24,
  color = "currentColor",
  className,
}: MoyenDePaimentIconProps) => {
  return <Icon size={size} color={color} className={className} />;
};

export type Reservation = {
  id: string;
  photo: string; // URL ou base64 si tu veux une vraie image
  bookingDate: string; // ex: "12 juin 2025"
  sailingDates: string; // ex: "1–7 août 2025"
  destination: string; // ex: "Côte d’Azur"
  boatName: string; // ex: "Lagoon 42"
  status: "Confirmée" | "Annulée" | "En attente";
};
// function parseJwt(token) {
//   if (!token) return null;
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split('')
//       .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//       .join('')
//   );

//   return JSON.parse(jsonPayload);
// }

// const token = localStorage.getItem('token'); // ou autre méthode
// const userData = parseJwt(token);




export const data: Reservation[] = [
  {
    id: "1",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020033/white-yacht-with-mountains_1_mj6jqe.jpg",
    bookingDate: "12 juin 2025",
    sailingDates: "1–7 août 2025",
    destination: "Côte d’Azur",
    boatName: "Lagoon 42",
    status: "Confirmée",
  },
  {
    id: "2",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "1 mars 2025",
    sailingDates: "20–27 avril 2025",
    destination: "Sardaigne",
    boatName: "Sun Odyssey",
    status: "Annulée",
  },
  {
    id: "3",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "5 février 2025",
    sailingDates: "15–22 mai 2025",
    destination: "Baléares",
    boatName: "Bavaria Cruiser",
    status: "Confirmée",
  },
  {
    id: "4",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "10 janvier 2025",
    sailingDates: "10–17 juillet 2025",
    destination: "Croatie",
    boatName: "Beneteau Oceanis",
    status: "En attente",
  },
  {
    id: "5",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "22 mars 2025",
    sailingDates: "5–12 août 2025",
    destination: "Grèce",
    boatName: "Jeanneau 54",
    status: "Confirmée",
  },
  {
    id: "6",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "3 avril 2025",
    sailingDates: "12–19 juin 2025",
    destination: "Sicile",
    boatName: "Dufour 520",
    status: "Annulée",
  },
  {
    id: "7",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "17 mai 2025",
    sailingDates: "1–8 septembre 2025",
    destination: "Ibiza",
    boatName: "Fountaine Pajot",
    status: "Confirmée",
  },
  {
    id: "8",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "8 février 2025",
    sailingDates: "18–25 juillet 2025",
    destination: "Canaries",
    boatName: "Hanse 458",
    status: "En attente",
  },
  {
    id: "9",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "25 mars 2025",
    sailingDates: "2–9 août 2025",
    destination: "Sardaigne",
    boatName: "Sunreef 50",
    status: "Confirmée",
  },
  {
    id: "10",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "12 avril 2025",
    sailingDates: "22–29 juin 2025",
    destination: "Côte Amalfitaine",
    boatName: "Lagoon 450",
    status: "Annulée",
  },
  {
    id: "11",
    photo:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020067/sailing-ship-sea-sunlight-cloudy-sky-daytime_1_ztf587.jpg",
    bookingDate: "12 avril 2025",
    sailingDates: "22–29 juin 2025",
    destination: "Côte Amalfitaine",
    boatName: "Lagoon 450",
    status: "Annulée",
  },
];

export const columns: ColumnDef<Reservation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout sélectionner"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la réservation"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "photo",
    header: "🛥️",
    cell: ({ row }) => (
      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
        {row.original.photo ? (
          <img
            src={row.original.photo}
            alt="Bateau"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xl">🛥️</span>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bookingDate",
    header: "Date de réservation",
    cell: ({ row }) => <div>{row.original.bookingDate}</div>,
  },
  {
    accessorKey: "sailingDates",
    header: "Dates de navigation",
    cell: ({ row }) => <div>{row.original.sailingDates}</div>,
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => <div>{row.original.destination}</div>,
  },
  {
    accessorKey: "boatName",
    header: "Nom du bateau",
    cell: ({ row }) => <div>{row.original.boatName}</div>,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "Confirmée"
          ? "success"
          : status === "Annulée"
            ? "danger"
            : "warning";
      return (
        <Chip color={`${color}`} variant="shadow" className="text-white">
          {status}
        </Chip>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;
      const { isOpen, onOpen, onOpenChange } = useDisclosure();

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={onOpen}>
                Voir détails
              </DropdownMenuItem>
              <DropdownMenuItem>Voir contrat</DropdownMenuItem>
              {reservation.status !== "Annulée" && (
                <DropdownMenuItem
                  onClick={() =>
                    console.log(`Annuler réservation ${reservation.id}`)
                  }
                >
                  Annuler
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Drawer
            hideCloseButton
            backdrop="blur"
            classNames={{
              base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                    <Tooltip content="Close">
                      <Buttonheroui
                        isIconOnly
                        className="text-default-400"
                        size="sm"
                        variant="light"
                        onPress={onClose}
                      >
                        <svg
                          fill="none"
                          height="20"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                        </svg>
                      </Buttonheroui>
                    </Tooltip>
                    <div className="w-full flex justify-start gap-2">
                      <Buttonheroui
                        className="font-medium text-small text-default-500"
                        endContent={
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 17 17 7M7 7h10v10" />
                          </svg>
                        }
                        size="sm"
                        variant="flat"
                      >
                        Annuler la réservation
                      </Buttonheroui>
                      <Buttonheroui
                        className="font-medium text-small text-default-500"
                        endContent={
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 17 17 7M7 7h10v10" />
                          </svg>
                        }
                        size="sm"
                        variant="flat"
                      >
                        Contacter le loueur
                      </Buttonheroui>
                    </div>
                    {/* <div className="flex gap-1 items-center">
                      <Tooltip content="Previous">
                        <Buttonheroui
                          isIconOnly
                          className="text-default-500"
                          size="sm"
                          variant="flat"
                        >
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                        </Buttonheroui>
                      </Tooltip>
                      <Tooltip content="Next">
                        <Buttonheroui
                          isIconOnly
                          className="text-default-500"
                          size="sm"
                          variant="flat"
                        >
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </Buttonheroui>
                      </Tooltip>
                    </div> */}
                  </DrawerHeader>
                  <DrawerBody className="pt-16">
                    <div className="flex w-full justify-center items-center pt-4">
                      <Image
                        isBlurred
                        isZoomed
                        alt="Event image"
                        className="aspect-square w-full hover:scale-110"
                        height={300}
                        src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/san-francisco.png"
                      />
                    </div>
                    <div className="flex flex-col gap-2 py-4">
                      <h2 className="text-2xl font-bold leading-7">
                        SF Bay Area Meetup in November
                      </h2>
                      <h2 className="text-lg text-gray-600 underline underline-offset-8">
                        Informations principales
                      </h2>
                      <div className="text-sm text-default-500">
                        <span>Type de bateau : </span>{" "}
                        <Chip color="warning" variant="dot">
                          catamaran
                        </Chip>
                      </div>
                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex gap-3 items-center">
                          <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden">
                            <div className="text-tiny bg-default-100 py-0.5 text-default-500">
                              Nov
                            </div>
                            <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
                              19
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-medium text-foreground font-medium">
                              Tuesday, November 19
                            </p>
                            <p className="text-small text-default-500">
                              5:00 PM - 9:00 PM PST
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="flex items-center justify-center border-1 border-default-200/50 rounded-small w-11 h-11">
                            <svg
                              className="text-default-500"
                              height="20"
                              viewBox="0 0 16 16"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                              >
                                <path d="M2 6.854C2 11.02 7.04 15 8 15s6-3.98 6-8.146C14 3.621 11.314 1 8 1S2 3.62 2 6.854" />
                                <path d="M9.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                              </g>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <Link
                              isExternal
                              showAnchorIcon
                              anchorIcon={
                                <svg
                                  className="group-hover:text-inherit text-default-400 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                  fill="none"
                                  height="16"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 17 17 7M7 7h10v10" />
                                </svg>
                              }
                              className="group gap-x-0.5 text-medium text-foreground font-medium"
                              href="https://www.google.com/maps/place/555+California+St,+San+Francisco,+CA+94103"
                              rel="noreferrer noopener"
                            >
                              555 California St suite 500
                            </Link>
                            <p className="text-small text-default-500">
                              San Francisco, California
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col mt-4 gap-3 items-start">
                          <h2 className="text-lg text-gray-600 underline underline-offset-8">
                            Détails de la réservation
                          </h2>
                          <span className="text-medium font-medium">
                            About the event
                          </span>
                          <div className="text-medium text-default-500 flex flex-col gap-2">
                            <p>
                              Hey Bay Area! We are excited to announce our next
                              meetup on Tuesday, November 19th.
                            </p>
                            <div>
                              <span>Numéro de réservation : </span>{" "}
                              <Chip color="warning" variant="bordered">
                                NGT-TFR785JUY
                              </Chip>
                            </div>
                            <div>
                              <span>
                                Date à laquelle la réservation a été faite
                                :{" "}
                              </span>{" "}
                              <Chip color="warning" variant="faded">
                                18/06/2025
                              </Chip>
                            </div>

                            <div>
                              <span>
                                Date à laquelle la réservation a été faite
                                :{" "}
                              </span>{" "}
                              <Chip
                                color="warning"
                                variant="shadow"
                                className="text-white"
                              >
                                En attente
                              </Chip>
                            </div>

                            <div>
                              <span>Récapitulatif des options choisies : </span>{" "}
                              <Steps
                                progressDot
                                current={2}
                                direction="vertical"
                                items={[
                                  {
                                    title: "skipper",
                                    // description:
                                    //   "This is a description. This is a description.",
                                  },
                                  {
                                    title: "hôtesse",
                                    // description:
                                    //   "This is a description. This is a description.",
                                  },
                                  {
                                    title: "matériel",
                                    // description:
                                    //   "This is a description. This is a description.",
                                  },
                                ]}
                              />
                            </div>

                            <h2 className="text-lg text-gray-600 underline underline-offset-8">
                              Prix et paiement
                            </h2>

                            <div>
                              <div>
                                <div>Prix total : </div>
                                <div className="text-black font-medium">
                                  650.00€
                                </div>
                              </div>
                              <div>
                                <div>Montant restant à payer : </div>
                                <div className="text-black font-medium">
                                  0.00€
                                </div>
                              </div>
                              <div>
                                <div>
                                  Moyens de paiement utilisés ou prévus :{" "}
                                </div>
                                <div className="text-black font-medium">
                                  PayPal
                                </div>
                              </div>
                              <div>
                                <div>
                                  Téléchargement de la facture ou du reçu :{" "}
                                </div>
                                <div>
                                  <Link
                                    className="text-default-700 font-medium"
                                    href="/"
                                  >
                                    SailingLocFacture
                                  </Link>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              Voir le bateau{" "}
                              <Link
                                className="text-default-700"
                                href="https://heroui.com"
                              >
                                SF Bay Area Meetup in November
                              </Link>
                              .
                            </div>
                          </div>
                        </div>
                        <h2 className="text-lg text-gray-600 underline underline-offset-8">
                          Conditions de location
                        </h2>
                        <div>
                          <div>
                            <span className="font-medium">
                              Politique d&apos;annulation :
                            </span>{" "}
                            Annulation gratuite jusqu&apos;à 30 jours avant le
                            départ. 50% remboursé entre 29 et 15 jours. Aucun
                            remboursement si moins de 15 jours. Cas de force
                            majeure et météo extrême pris en compte.
                          </div>
                          <div>
                            Montant de la caution demandée :{" "}
                            <span className="font-medium">Aucun</span>
                          </div>
                          <div>
                            Conditions spécifiques :{" "}
                            <span>interdit de fumer, animaux acceptés</span>
                          </div>
                        </div>
                        <h2 className="text-lg text-gray-600 underline underline-offset-8">
                          Contacts utiles
                        </h2>
                        <div className="flex flex-col mt-4 gap-3 items-start">
                          <span className="text-small text-default-500">
                            Propiètaire
                          </span>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              name="HeroUI"
                              size="sm"
                              src="https://heroui.com/android-chrome-192x192.png"
                            />
                            <span className="text-small text-default-500">
                              John Doe
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col mt-4 gap-3 items-start">
                          <span className="text-small text-default-500">
                            Informations sur le skipper si réservé :
                          </span>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              name="HeroUI"
                              size="sm"
                              src="https://heroui.com/android-chrome-192x192.png"
                            />
                            <span className="text-small text-default-500">
                              John Doe
                            </span>
                          </div>
                        </div>
                        <div>
                          <div>
                            Contact du support client :{" "}
                            <span className="font-medium">
                              +33 7 85 89 04 45
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DrawerBody>
                  <DrawerFooter className="flex flex-col gap-1">
                    <Link
                      className="text-default-400"
                      href="mailto:hello@heroui.com"
                      size="sm"
                    >
                      Télécharger le contrat de location
                    </Link>
                    {/* <Link
                      className="text-default-400"
                      href="mailto:hello@heroui.com"
                      size="sm"
                    >
                      Report event
                    </Link> */}
                  </DrawerFooter>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </>
      );
    },
  },
];

export default function ProfilPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleBackdropChange = (backdrop: string) => {
    setBackdrop(backdrop);
    onOpen();
  };


  const [selectedFile, setSelectedFile] = useState<File | null>(null);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file);
  }
};

  const [user, setUser] = useState<{
  firstName: string;
  lastName: string;
  email: string;
  role: string;
} | null>(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const userData = parseJwt(token);
    setUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
    });
  }
}, []);

const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

useEffect(() => {
  if (user) {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      password: '', 
    });
  }
}, [user]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) return;

  const userData = parseJwt(token);
  const userId = userData?.id;

  const form = new FormData();
  form.append("firstName", formData.firstName);
  form.append("lastName", formData.lastName);
  form.append("email", formData.email);
  form.append("password", formData.password);
  if (selectedFile) {
    form.append("photoProfil", selectedFile);
  }

  try {
    const response = await fetch(`http://localhost:3000/api/utilisateurs/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // PAS de "Content-Type"
      },
      body: form,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Utilisateur mis à jour :", result);

      // Met à jour le state local avec les nouvelles données
      setUser({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        role: result.role,
        photoProfil: result.photoProfil,
      });

      // Optionnel : reset le formulaire
      setSelectedFile(null);
      setFormData((prev) => ({ ...prev, password: "" }));

      // Fermer le dialog (si besoin)
      onOpenChange(false);
    } else {
      const error = await response.json();
      console.error("Erreur :", error.message);
    }
  } catch (err) {
    console.error("Erreur de mise à jour :", err);
  }
};



const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};



  return (
    <main>
      <section className="relative">
        <div
          className="absolute top-0"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751093328/9551504_v1w9w0.jpg)",
            height: "56vh",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          <div className="mx-auto max-w-6xl mt-48 text-white font-bold text-5xl">
            <div>
              <h1>Bienvenue sur votre espace personnel.</h1>
            </div>
          </div>
        </div>
        <div
          className="pb-10 pt-[21rem]"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751362027/4847236_rplbu1.jpg)",
          }}
        >
          <div>
            <Tabs defaultValue="account" className="w-[87rem]">
              <div className="bg-glacev2 flex justify-between w-[77rem] p-4 ml-[9rem] items-center rounded-lg">
                <div>
                  <div>
                    <User
                    avatarProps={{
  src: selectedFile
    ? URL.createObjectURL(selectedFile)
    : user?.photoProfil || "https://i.pravatar.cc/150?u=a04258114e29026702d",
}}

  name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                    />
                  </div>
                </div>

                <TabsList>
                  <TabsTrigger value="account">
                    Présentation & Informations
                  </TabsTrigger>
                  <TabsTrigger value="chat">chat</TabsTrigger>
                  <TabsTrigger value="parametre">
                    Paramètres du compte
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="ml-[9rem]">
                <TabsContent value="account">
                  <div className="flex flex-col space-y-8 mt-8">
                    <div>
                      <Chip variant="dot" className="border-none contenttitresectionprofile mb-4">
                        <div className="text-lg font-bold">Profil & bateau favori</div>
                      </Chip>
                      <div className="flex flex-row space-x-3">
                        <div className="bg-glacev2 flex flex-col space-y-4 p-4 w-[30rem] rounded-lg h-[16rem]">
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg text-black font-bold underline underline-offset-8">
                              Présentation de l&apos;utilisateur
                            </h2>
                            <Dialog>
                              <form onSubmit={handleSubmit} encType="multipart/form-data"
                              >
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    <FaUserEdit /> Modifier mes informations
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Modifier votre profile
                                    </DialogTitle>
                                    <DialogDescription>
                                      Modifiez vos informations personnelles
                                      pour garder votre profil à jour et
                                      améliorer votre expérience sur notre
                                      plateforme. Vous pouvez changer votre nom,
                                      votre adresse ou vos coordonnées de
                                      contact.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4">
                                    <div className="grid gap-3">
                                      <Label htmlFor="photoProfil">Photo de profil</Label>
                                      <Input
                                        id="photoProfil"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                      />
                                      {selectedFile && (
                                        <img
                                          src={URL.createObjectURL(selectedFile)}
                                          alt="Aperçu"
                                          className="mt-2 rounded"
                                          width={100}
                                        />
                                      )}
                                        </div>
                                    <div className="grid gap-3">
                                      <Label htmlFor="firstName">Nom</Label>
                                      <Input
                                          id="firstName"
                                          name="firstName"
                                          value={formData.firstName}
                                          onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                      <Label htmlFor="lastName">Prénom</Label>
                                      <Input
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                          />
                                    </div>
                                    <div className="grid gap-3">
                                      <Label htmlFor="Email">E-mail</Label>
                                      <Input
                                              id="Email"
                                              name="email"
                                              type="email"
                                              value={formData.email}
                                              onChange={handleChange}
                                            />
                                    </div>
                                    <div className="grid gap-3">
                                      <Label htmlFor="password">
                                        Mot de passe
                                      </Label>
                                      <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                          />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Annuler</Button>
                                    </DialogClose>
                                    <Button type="submit">Enregistrer</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </form>
                            </Dialog>
                          </div>

                         <div className="flex flex-col space-y-2">
                            <span>
                              <span className="text-gray-500">Nom complet :</span>{" "}
                              <span>{user ? `${user.firstName} ${user.lastName}` : "Chargement..."}</span>
                            </span>
                            <span>
                              <span className="text-gray-500">Email :</span>{" "}
                              <span>{user ? user.email : "Chargement..."}</span>
                            </span>
                            <span>
                              <span className="text-gray-500">Mot de passe :</span>{" "}
                              <span>*************</span>
                            </span>
                            <span>
                              <span className="text-gray-500">Statut :</span>{" "}
                              <span>{user ? user.role : "Chargement..."}</span>
                            </span>
                            <span className="flex justify-end w-full">
                              <Chip color="success" variant="dot">
                                Connecté
                              </Chip>
                            </span>
                          </div>

                        </div>
                        <div className="bg-glacev2 flex flex-col space-y-4 p-4 w-[46.4rem] rounded-lg h-[16rem] overflow-y-scroll">
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg text-black font-bold underline underline-offset-8">
                              Bateau préféré
                            </h2>
                          </div>
                          <div>
                            <BateauPrefere />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Chip variant="dot" className="border-none contenttitresectionprofile mb-4">
                        <div className="text-lg font-bold">Mes préférences et alertes</div>
                      </Chip>

                      <div className="flex flex-row space-x-3">
                        <div className="bg-glacev2 flex flex-col space-y-4 p-4 w-[36rem] rounded-lg h-[21rem] overflow-y-scroll mt-2 contentswitch">
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg text-black font-bold underline underline-offset-8">
                              Notifications
                            </h2>
                          </div>
                          <div>
                            <NotificationsUsers />
                          </div>
                        </div>
                        <div className="bg-glacev2 flex flex-col space-y-4 p-4 w-[40.4rem] rounded-lg h-[21rem] overflow-y-scroll mt-2">
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg text-black font-bold underline underline-offset-8">
                              Zones de navigation favorites
                            </h2>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <ZonesFavorites />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Chip variant="dot" className="border-none contenttitresectionprofile mb-4">
                        <div className="text-lg font-bold">Aide & Paiements enregistrés</div>
                      </Chip>

                      <div className="flex flex-row space-x-3">
                        <div className="bg-glacev2 flex flex-col space-y-4 p-4 w-[38.2rem] rounded-lg h-[21rem] overflow-y-scroll mt-2 contentswitch">
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg text-black font-bold underline underline-offset-8">
                              Moyens de paiement enregistrés
                            </h2>
                            <div>
                              <Dialog>
                                <form>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">
                                      <BsCreditCard2FrontFill /> Ajouter un
                                      moyens de paiement
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Ajouter un moyens de paiement
                                      </DialogTitle>
                                      <DialogDescription>
                                        Ajoutez un nouveau moyen de paiement
                                        pour simplifier vos prochaines
                                        réservations et régler facilement vos
                                        locations. Vos informations resteront
                                        confidentielles et sécurisées.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                      <div className="grid gap-3">
                                        <Label htmlFor="ncarte">
                                          Numéro de carte
                                        </Label>
                                        <Input
                                          id="ncarte"
                                          name="numerodecarte"
                                          defaultValue="4111 1111 1111 1111"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-1">
                                        <div className="grid gap-3">
                                          <Label htmlFor="nomtitulairecarte">
                                            Nom du titulaire de la carte
                                          </Label>
                                          <Input
                                            id="nomtitulairecarte"
                                            name="nomtitulairecarte"
                                            defaultValue="John Doe"
                                          />
                                        </div>
                                        <div className="grid gap-3">
                                          <Label htmlFor="datexpiration">
                                            Date d&apos;expiration
                                          </Label>
                                          <Input
                                            id="datexpiration"
                                            name="username"
                                            defaultValue="12/26"
                                          />
                                        </div>
                                      </div>

                                      <div className="grid gap-3">
                                        <Label htmlFor="cryptogramme">
                                          Cryptogramme (CVC/CVV)
                                        </Label>
                                        <Input
                                          id="cryptogramme"
                                          name="cryptogramme"
                                          defaultValue="123"
                                          className="w-[4rem]"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline">
                                          Annuler
                                        </Button>
                                      </DialogClose>
                                      <Button type="submit">Enregistrer</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </form>
                              </Dialog>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <Alert
                              icon={<MoyenDePaimentIcon icon={FaCcVisa} />}
                              color="primary"
                              variant="faded"
                            >
                              <div className="flex justify-between w-full">
                                <div>
                                  <div>
                                    <span>**** **** **** 1234</span>
                                  </div>
                                  <div className="flex flex-row space-x-2">
                                    <div>
                                      <span>Titulaire :</span>{" "}
                                      <span>Jane Doe</span>
                                    </div>
                                    <div>|</div>
                                    <div>
                                      <span>Expire le :</span>{" "}
                                      <span>08/25</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <RippleButton rippleColor="#ADD8E6">
                                    Retirer comme principale
                                  </RippleButton>
                                  <RippleButton rippleColor="#ADD8E6">
                                    Supprimer
                                  </RippleButton>
                                </div>
                              </div>
                            </Alert>
                            <Alert
                              icon={
                                <MoyenDePaimentIcon icon={FaCcMastercard} />
                              }
                            >
                              <div className="flex justify-between w-full">
                                <div>
                                  <div>
                                    <span>**** **** **** 1234</span>
                                  </div>
                                  <div className="flex flex-row space-x-2">
                                    <div>
                                      <span>Titulaire :</span>{" "}
                                      <span>Jane Doe</span>
                                    </div>
                                    <div>|</div>
                                    <div>
                                      <span>Expire le :</span>{" "}
                                      <span>08/25</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <RippleButton rippleColor="#ADD8E6">
                                    Définir comme principale
                                  </RippleButton>
                                  <RippleButton rippleColor="#ADD8E6">
                                    Supprimer
                                  </RippleButton>
                                </div>
                              </div>
                            </Alert>
                            <Alert
                              icon={
                                <MoyenDePaimentIcon icon={SiAmericanexpress} />
                              }
                            >
                              <div className="flex justify-between w-full">
                                <div>
                                  <div>
                                    <span>**** **** **** 1234</span>
                                  </div>
                                  <div className="flex flex-row space-x-2">
                                    <div>
                                      <span>Titulaire :</span>{" "}
                                      <span>Jane Doe</span>
                                    </div>
                                    <div>|</div>
                                    <div>
                                      <span>Expire le :</span>{" "}
                                      <span>08/25</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <RippleButton rippleColor="#ADD8E6">
                                    Définir comme principale
                                  </RippleButton>
                                  <RippleButton rippleColor="#ADD8E6">
                                    Supprimer
                                  </RippleButton>
                                </div>
                              </div>
                            </Alert>
                            <Alert
                              icon={<MoyenDePaimentIcon icon={FaCcPaypal} />}
                            >
                              <div className="flex justify-between w-full">
                                <div>
                                  <div>
                                    <span>**** **** **** 1234</span>
                                  </div>
                                  <div className="flex flex-row space-x-2">
                                    <div>
                                      <span>Titulaire :</span>{" "}
                                      <span>Jane Doe</span>
                                    </div>
                                    <div>|</div>
                                    <div>
                                      <span>Expire le :</span>{" "}
                                      <span>08/25</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <RippleButton rippleColor="#ADD8E6">
                                    Définir comme principale
                                  </RippleButton>
                                  <RippleButton rippleColor="#ADD8E6">
                                    Supprimer
                                  </RippleButton>
                                </div>
                              </div>
                            </Alert>
                          </div>
                        </div>
                        <div className="bg-glacev2 flex flex-col space-y-4 p-4 w-[38.2rem] rounded-lg h-[21rem] overflow-y-scroll mt-2">
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg text-black font-bold underline underline-offset-8">
                              FAQ
                            </h2>
                          </div>

                          <div>
                            <FaqUser />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Chip variant="dot" className="border-none contenttitresectionprofile mb-4">
                        <div className="text-lg font-bold">Vos réservations</div>
                      </Chip>

                      <div className="bg-glacev2 flex flex-col space-y-4 p-4 w-[76.4rem] rounded-lg mt-2 contentswitch">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg text-black font-bold underline underline-offset-8">
                            Mes réservations / locations
                          </h2>
                        </div>

                        <div>
                          <div className="w-full">
                            <div className="flex items-center py-4">
                              <Input
                                placeholder="Filter emails..."
                                value={
                                  (table
                                    .getColumn("destination")
                                    ?.getFilterValue() as string) ?? ""
                                }
                                onChange={(event) =>
                                  table
                                    .getColumn("destination")
                                    ?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm"
                              />
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="ml-auto">
                                    Columns <FaChevronDown />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                      return (
                                        <DropdownMenuCheckboxItem
                                          key={column.id}
                                          className="capitalize"
                                          checked={column.getIsVisible()}
                                          onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                          }
                                        >
                                          {column.id}
                                        </DropdownMenuCheckboxItem>
                                      );
                                    })}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="rounded-md border">
                              <Table>
                                <TableHeader>
                                  {table
                                    .getHeaderGroups()
                                    .map((headerGroup) => (
                                      <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                          return (
                                            <TableHead key={header.id}>
                                              {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                      .header,
                                                    header.getContext()
                                                  )}
                                            </TableHead>
                                          );
                                        })}
                                      </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                  {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                      <TableRow
                                        key={row.id}
                                        data-state={
                                          row.getIsSelected() && "selected"
                                        }
                                      >
                                        {row.getVisibleCells().map((cell) => (
                                          <TableCell key={cell.id}>
                                            {flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext()
                                            )}
                                          </TableCell>
                                        ))}
                                      </TableRow>
                                    ))
                                  ) : (
                                    <TableRow>
                                      <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                      >
                                        No results.
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                            <div className="flex items-center justify-end space-x-2 py-4">
                              <div className="text-muted-foreground flex-1 text-sm">
                                {
                                  table.getFilteredSelectedRowModel().rows
                                    .length
                                }{" "}
                                of {table.getFilteredRowModel().rows.length}{" "}
                                row(s) selected.
                              </div>
                              <div className="space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => table.previousPage()}
                                  disabled={!table.getCanPreviousPage()}
                                >
                                  Previous
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => table.nextPage()}
                                  disabled={!table.getCanNextPage()}
                                >
                                  Next
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="chat">
                  <ChatUI />
                </TabsContent>
                <TabsContent value="parametre">
                  <div className="h-[20rem] bg-glacev2 p-4 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="text-medium font-medium">
                        Paramètres du compte
                      </h4>
                      <p className="text-small text-default-400">
                        Gérez les options liées à votre compte. Cette section
                        vous permet de désactiver temporairement votre compte si
                        vous ne souhaitez plus l'utiliser pour le moment, ou de
                        le supprimer définitivement si vous ne souhaitez plus
                        bénéficier de nos services. Veuillez noter que la
                        suppression est irréversible.
                      </p>
                    </div>
                    <Dividerhenoui className="my-4" />
                    <div className="flex h-5 items-center space-x-4 text-small">
                      <div>
                        <p className="pt-24">
                          En désactivant votre compte, vous ne pourrez plus
                          accéder à votre profil ni effectuer de réservations.
                          Vous pourrez réactiver votre compte ultérieurement en
                          vous reconnectant.{" "}
                        </p>
                        <RippleButton className="mt-4 bg-gray-700 text-white font-medium">
                          Désactiver mon compte
                        </RippleButton>
                      </div>
                      <Dividerhenoui orientation="vertical" />
                      <div>
                        <p className="pt-24">
                          Attention: cette action est irréversible. Toutes vos
                          données, réservations et préférences seront
                          définitivement supprimées.
                        </p>
                        <RippleButton className="mt-4 bg-red-700 text-white font-medium">
                          Supprimer mon compte définitivement
                        </RippleButton>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}
