import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import {
  CheckCircle2Icon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  GripVerticalIcon,
  LoaderIcon,
  MoreVerticalIcon,
  PlusIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link as LinkHeroui } from "@heroui/link";
import { Button, ButtonGroup } from "@heroui/button";

const ActionsCell = ({
  row,
  refreshTable,
}: {
  row: any;
  refreshTable: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/bateaux/slug/${row.original.slug}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        refreshTable(); // à définir dans ton composant parent pour recharger les données
        setIsOpen(false);
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert("Échec de la suppression.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>
            <LinkHeroui
              isExternal
              showAnchorIcon
              href={`/dashboard/gestiondesbateaux/bateau/${row.original.slug}`}
            >
              Voir détails
            </LinkHeroui>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkHeroui
              isExternal
              showAnchorIcon
              href={`/dashboard/gestiondesbateaux/edit/${row.original.id}`}
            >
              Modifier
            </LinkHeroui>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} backdrop="blur">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmer la suppression
              </ModalHeader>
              <ModalBody>
                <p>
                  Voulez-vous vraiment supprimer le bateau{" "}
                  <strong>{row.original.nom}</strong> ?
                </p>
                <p>Cette action est irréversible.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={() => setIsOpen(false)}>
                  Annuler
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Supprimer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionsCell;
