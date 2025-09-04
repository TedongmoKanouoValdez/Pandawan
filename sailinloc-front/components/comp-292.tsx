"use client";
import { useState, useEffect } from "react";
import { useMessages } from "@/hooks/useMessages";
import { markMessageAsRead } from "@/services/notifications";
import { Info, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Button as Buttonheroui } from "@heroui/button";
import { IoNotifications } from "react-icons/io5";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import Image from "next/image";

function decodeJWT(token: string): Token | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded as Token;
  } catch (e) {
    console.error("Erreur decoding JWT :", e);
    return null;
  }
}

export const Descritpion = ({ texte }: Props) => {
  const maxChars = 60; // Limite à 100 caractères
  const courtTexte =
    texte.length > maxChars ? texte.slice(0, maxChars) + "..." : texte;

  return <p>{courtTexte}</p>;
};

export default function Notification() {
  const token = localStorage.getItem("token") || "";
  let userId = 0;
  const [open, setOpen] = useState(false);

  if (token) {
    const decoded = decodeJWT(token);
    if (decoded) userId = Number(decoded.userId);
  }

  const [type, setType] = useState<"recus" | "envoyes">("recus");
  const { messages, setMessages, loading } = useMessages(token, userId, type);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markMessageAsRead(id, token);
      setMessages(
        messages.map((msg) => (msg.id === id ? { ...msg, lu: true } : msg))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {/* <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Buttonheroui isIconOnly aria-label="Notification" variant="light">
            <IoNotifications className="text-white w-6 h-6" />
          </Buttonheroui>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="faded">
          {messages.length === 0 ? (
            <DropdownItem key="new">
              <p>Aucun message</p>
            </DropdownItem>
          ) : (
            <>
              {messages.map((msg) => (
                <DropdownItem
                  key={msg.id}
                  className={`p-4 border rounded-lg ${msg.lu ? "bg-gray-100" : "bg-white shadow"}`}
                >
                  <div className="bg-background z-50 max-w-[400px] rounded-md border p-4 shadow-lg">
                    <div className="flex gap-2">
                      <div className="flex grow gap-3">
                        <Info
                          className="mt-0.5 shrink-0 text-blue-500"
                          size={16}
                          aria-hidden="true"
                        />
                        <div className="flex grow flex-col gap-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{msg.object}</p>
                            <p className="text-muted-foreground text-sm">
                              {new Date(msg.dateEnvoi).toLocaleString("fr-FR")}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {msg.contenu}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {!msg.lu && type === "recus" && (
                              <Button
                                size="sm"
                                onClick={() => handleMarkAsRead(msg.id)}
                              >
                                Voir plus
                              </Button>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                          aria-label="Close notification"
                        >
                          <XIcon
                            size={16}
                            className="opacity-60 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </DropdownItem>
              ))}
            </>
          )}
          <DropdownItem key="delete" className="text-blue-800" color="primary">
            Voir plus
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      <div className="relative">
        {/* Bouton */}
        <button
          onClick={() => setOpen(!open)}
          className="relative inline-flex items-center text-sm font-medium text-white dark:hover:text-white dark:text-gray-400"
        >
          {/* Icône cloche */}
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 20"
          >
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>

          {/* Badge rouge */}
          <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 left-2.5 dark:border-gray-900"></div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 z-20 w-80 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700">
            <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              Notifications
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-scroll h-[19rem]">
              {messages.length === 0 ? (
                <div key="new">
                  <p>Aucun message</p>
                </div>
              ) : (
                <>
                  {messages.slice(0, 10).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${msg.lu ? "bg-gray-100" : "bg-white shadow"}`}
                    >
                      <div className="shrink-0 relative">
                        <div className="flex items-center justify-center w-5 h-5 left-6 -top-1 border rounded-full dark:border-gray-800">
                          <svg
                            className="w-4 h-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                          >
                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                            <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="w-full ps-3">
                        <p className="text-black text-sm font-medium text-wrap">
                          {msg.object}
                        </p>
                        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400 text-wrap">
                          <Descritpion texte={msg.contenu} />
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-500">
                          Voir plus
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <a
              href="#"
              className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              View all
            </a>
          </div>
        )}
      </div>
    </>
  );
}
