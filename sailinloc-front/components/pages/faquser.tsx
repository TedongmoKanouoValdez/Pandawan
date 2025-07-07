import { Accordion, AccordionItem } from "@heroui/accordion";
import { FaTicketAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { IoInformationCircle } from "react-icons/io5";

export const FaqUser = () => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <>
      <Accordion
        className="p-2 flex flex-col gap-1 w-full"
        itemClasses={itemClasses}
        showDivider={false}
        variant="shadow"
      >
        <AccordionItem
          key="1"
          aria-label="Comment réserver un bateau ?"
          startContent={<FaTicketAlt className="text-primary" />}
          //   subtitle={
          //     <p className="flex">
          //       2 issues to <span className="text-primary ml-1">fix now</span>
          //     </p>
          //   }
          title="Comment réserver un bateau ?"
        >
          Sélectionnez vos dates, choisissez le bateau, payez en ligne.
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Puis-je annuler ma réservation ?"
          startContent={<IoCloseCircle />}
          //   subtitle="3 apps have read permissions"
          title="Puis-je annuler ma réservation ?"
        >
          Oui, selon notre politique d'annulation. Voir détails.
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Quels moyens de paiement sont acceptés ?"
        //   classNames={{ subtitle: "text-warning" }}
          startContent={<GiPayMoney />}
          //   subtitle="Complete your profile"
          title="Quels moyens de paiement sont acceptés ?"
        >
          Carte bancaire, PayPal, virement bancaire.
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Que faire en cas de problème à bord ?"
        //   classNames={{ subtitle: "text-danger" }}
          startContent={<IoInformationCircle />}
          //   subtitle="Please, update now"
          title={
            <p className="flex gap-1 items-center">
              Que faire en cas de problème à bord ?
            </p>
          }
        >
          Contactez immédiatement notre support au numéro indiqué.
        </AccordionItem>
      </Accordion>
    </>
  );
};
