import React, { useState } from "react";
import { Alert } from "@heroui/alert";
import { cn } from "@/lib/utils";
import { Button as Buttonheroui } from "@heroui/button";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useMessages } from "@/hooks/useMessages";
import { markMessageAsRead } from "@/services/notifications";

interface CustomAlertProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "faded" | "solid" | "flat" | "bordered";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
  classNames?: Record<string, string>;
  // ajoute d’autres props si besoin
}

type Props = {
  texte: string; // Définit que 'texte' doit être une chaîne de caractères
};

export const MonTexte = ({ texte }: Props) => {
  const maxChars = 25; // Limite à 100 caractères
  const courtTexte =
    texte.length > maxChars ? texte.slice(0, maxChars) + "..." : texte;

  return <p>{courtTexte}</p>;
};

const CustomAlert = React.forwardRef<HTMLDivElement, CustomAlertProps>(
  (
    {
      title,
      children,
      variant = "faded",
      color = "secondary",
      className,
      classNames = {},
      ...props
    },
    ref
  ) => {
    const colorClass = React.useMemo(() => {
      switch (color) {
        case "default":
          return "before:bg-default-300";
        case "primary":
          return "before:bg-primary";
        case "secondary":
          return "before:bg-secondary";
        case "success":
          return "before:bg-success";
        case "warning":
          return "before:bg-warning";
        case "danger":
          return "before:bg-danger";
        default:
          return "before:bg-default-200";
      }
    }, [color]);

    return (
      <Alert
        ref={ref}
        classNames={{
          ...classNames,
          base: cn(
            [
              "bg-default-50 dark:bg-background shadow-sm",
              "border-1 border-default-200 dark:border-default-100",
              "relative before:content-[''] before:absolute before:z-10",
              "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
              "rounded-l-none border-l-0",
              colorClass,
            ],
            classNames.base,
            className
          ),
          mainWrapper: cn("pt-1", classNames.mainWrapper),
          iconWrapper: cn("dark:bg-transparent", classNames.iconWrapper),
        }}
        color={color}
        title={<MonTexte texte={title as string} />}
        variant={variant}
        {...props}
      >
        {children}
      </Alert>
    );
  }
);

CustomAlert.displayName = "CustomAlert";

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

export const NotificationsUsers = () => {
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

  if (loading) return <p>Recherche...</p>;
  return (
    <>
      <div className="flex flex-col space-y-2">
        {messages.length === 0 ? (
          <div key="new" className="text-black text-center">
            <p>Aucune notification</p>
          </div>
        ) : (
          <>
            <AnimatedList>
              {messages.slice(0, 10).map((msg) => (
                <div key={msg.id} className="flex flex-col w-full gap-y-6">
                  <CustomAlert
                    color="default"
                    title={msg.object}
                    description={<Descritpion texte={msg.contenu} />}
                  >
                    <div className="flex items-center gap-1 mt-3">
                      <Buttonheroui
                        className="bg-background text-default-700 font-medium border-1 shadow-small"
                        size="sm"
                        variant="bordered"
                      >
                        Voir la notification
                      </Buttonheroui>
                    </div>
                  </CustomAlert>
                </div>
              ))}
            </AnimatedList>
          </>
        )}
      </div>
    </>
  );
};
