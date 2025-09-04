"use client";
import * as React from "react";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { TagsSelector } from "@/components/ui/tags-selector";
import { CalendarDashboardBoat } from "@/components/pages/calendardashboardcreateboat";
import { Alert } from "@heroui/alert";
import { Checkbox } from "@heroui/checkbox";
import { Button as ButtonHeroui, ButtonGroup } from "@heroui/button";
import { useRouter } from "next/navigation";
import { addToast, ToastProvider } from "@heroui/toast";
import { Spinner } from "@heroui/spinner";
import {
  Select as Selectheroui,
  SelectSection as SelectSectionheroui,
  SelectItem as SelectItemheroui,
} from "@heroui/select";

const frameworks = [
  {
    value: "GPS",
    label: "GPS",
  },
  {
    value: "VHF",
    label: "VHF",
  },
  {
    value: "pilote automatique",
    label: "pilote automatique",
  },
  {
    value: "climatisation",
    label: "climatisation",
  },
  {
    value: "cuisine équipée",
    label: "cuisine équipée",
  },
  {
    value: "literie",
    label: "literie",
  },
];

const TAGS = [
  { id: "Skipper", label: "Skipper" },
  { id: "Hôtesse", label: "Hôtesse" },
  { id: "Chef cuisinier", label: "Chef cuisinier" },
  { id: "Instructeur de plongée", label: "Instructeur de plongée" },
  { id: "Paddle", label: "Paddle" },
  { id: "Kayak", label: "Kayak" },
  { id: "Wakeboard", label: "Wakeboard" },
  { id: "Jetski", label: "Jetski" },
  { id: "Bouée tractée", label: "Bouée tractée" },
  { id: "Nettoyage final", label: "Nettoyage final" },
  { id: "Draps et serviettes", label: "Draps et serviettes" },
  { id: "Courses livrées à bord", label: "Courses livrées à bord" },
  { id: "Transfert aéroport / port", label: "Transfert aéroport / port" },
  { id: "Barbecue", label: "Barbecue" },
  { id: "Plancha", label: "Plancha" },
  { id: "Wi-Fi à bord", label: "Wi-Fi à bord" },
  { id: "Générateur portable", label: "Générateur portable" },
];

const fruits = [
  { id: "Aucun", label: "Aucun" },
  { id: "Par heure", label: "Par heure" },
  { id: "Par demi-journée", label: "Par demi-journée" },
  { id: "Par jour (journalier)", label: "Par jour (journalier)" },
  { id: "Par week-end", label: "Par week-end" },
  { id: "Par semaine (hebdomadaire)", label: "Par semaine (hebdomadaire)" },
  { id: "Par mois (mensuel)", label: "Par mois (mensuel)" },
  {
    id: "Par séjour (forfait global, peu importe la durée)",
    label: "Par séjour (forfait global, peu importe la durée)",
  },
];

const cancellationPolicies = [
  {
    id: "flexible",
    label: "Flexible : remboursement complet jusqu'à 24h avant le départ",
  },
  {
    id: "moderate",
    label: "Modérée : remboursement partiel jusqu'à 7 jours avant",
  },
  {
    id: "strict",
    label: "Stricte : non-remboursable ou remboursement limité",
  },
  {
    id: "custom",
    label:
      "Personnalisée : conditions spécifiques définies par le propriétaire",
  },
];

export default function GestionDesBateauxCreerPage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [selected, setSelected] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [selectedPolicy, setSelectedPolicy] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});
  const [unavailableDates, setUnavailableDates] = useState<Dayjs[]>([]);
  const [placement, setPlacement] = React.useState("top-center");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typeBateau, setTypeBateau] = useState<string>("");
  const [portattache, setPortattache] = useState<string>("");

  const router = useRouter();

  const handleSelect = (value: string) => {
    if (value === "Aucun") {
      setSelected(["Aucun"]);
      setInputs({});
      return;
    }

    if (selected.includes("Aucun")) {
      setSelected([value]);
    } else if (!selected.includes(value)) {
      setSelected([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    setSelected((prev) => prev.filter((v) => v !== value));
    setInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[value];
      return newInputs;
    });
  };

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleValue = (val: string) => {
    setSelectedValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      nomBateau: (document.getElementById("nom-bateau") as HTMLInputElement)
        .value,
      typeBateau: typeBateau,
      modeleMarque: (
        document.getElementById("modele-marque") as HTMLInputElement
      ).value,
      anneeConstruction: (
        document.getElementById("annee-construction") as HTMLInputElement
      ).value,
      longueur: (document.getElementById("longueur") as HTMLInputElement).value,
      largeur: (document.getElementById("largeur") as HTMLInputElement).value,
      tirantEau: (document.getElementById("tirant-eau") as HTMLInputElement)
        .value,
      capaciteMax: (document.getElementById("capacite-max") as HTMLInputElement)
        .value,
      nombreCabines: (
        document.getElementById("nombre-cabines") as HTMLInputElement
      ).value,
      nombreCouchages: (
        document.getElementById("nombre-couchages") as HTMLInputElement
      ).value,
      description: (
        document.getElementById("description-detaillee") as HTMLTextAreaElement
      ).value,
      zonesnavigation: (
        document.getElementById("zones-navigation") as HTMLInputElement
      ).value,
      portattache: portattache,
      portdepart: (document.getElementById("port-depart") as HTMLInputElement)
        .value,
      portarriver: (document.getElementById("port-arriver") as HTMLInputElement)
        .value,

      equipementsInclus: selectedValues,
      tags: selectedTags.map((tag) => ({
        id: tag.id,
        label: tag.label,
        detail: tagInputs[tag.id] || "",
      })),

      tarifications: selected.map((id) => ({
        type: id,
        montant: inputs[id] || "",
      })),

      politiqueAnnulation:
        selectedPolicy === "custom"
          ? customDescription
          : cancellationPolicies.find((p) => p.id === selectedPolicy)?.label ||
            "",

      Depotgarantie: (
        document.getElementById("depot-garantie") as HTMLInputElement
      ).value,

      DureeLocation: (
        document.getElementById("duree-location") as HTMLInputElement
      ).value,

      PassagersInclusDansLePrix: (
        document.getElementById("PassagersInclusDansLePrix") as HTMLInputElement
      ).value,

      SupplementParPassagerSupplémentaire: (
        document.getElementById(
          "SupplementParPassagerSupplémentaire"
        ) as HTMLInputElement
      ).value,

      reservoirCarburant: (
        document.getElementById("reservoirCarburant") as HTMLInputElement
      ).value,

      reservoirEau: (
        document.getElementById("reservoirEau") as HTMLInputElement
      ).value,

      Moteurs: (document.getElementById("Moteurs") as HTMLInputElement).value,

      // contact: {
      //   nom: (document.getElementById("nom-proprietaire") as HTMLInputElement)
      //     .value,
      //   telephone: (
      //     document.getElementById("telephone-proprietaire") as HTMLInputElement
      //   ).value,
      //   email: (
      //     document.getElementById("email-proprietaire") as HTMLInputElement
      //   ).value,
      // },

      indisponibilites: unavailableDates.map((d) => d.format("YYYY-MM-DD")),
    };

    console.log("📤 Données à envoyer :", formData);

    try {
      const response = await fetch("http://localhost:3001/api/bateaux", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const id = data.bateauId;
        addToast({
          title: "Succès",
          description: "Bateau enregistré avec succès.",
          color: "success",
        });
        router.push(`/dashboard/gestiondesbateaux/creer/finalisation/${id}`);
        // ici tu peux reset le formulaire ou rediriger si besoin
      } else {
        const errorData = await response.json();
        addToast({
          title: "Erreur",
          description: errorData.message || response.statusText,
          color: "danger",
        });
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error);
      addToast({
        title: "Erreur réseau",
        description: "Veuillez réessayer plus tard.",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastProvider
        placement={placement}
        toastOffset={placement.includes("top") ? 60 : 0}
        toastProps={{
          radius: "lg",
          color: "primary",
          variant: "flat",
          timeout: 9000,
        }}
      />
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div>
                      <div className="text-lg font-bold mb-4">
                        Informations générales
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="nom-bateau">Nom du bateau</Label>
                          <Input
                            id="nom-bateau"
                            placeholder="Ex : L'Étoile de Mer"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label>Type de bateau à louer</Label>
                          <Select
                            value={typeBateau}
                            onValueChange={setTypeBateau}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type de bateau" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Type de bateau à louer
                                </SelectLabel>
                                <SelectItem value="voilier">Voilier</SelectItem>
                                <SelectItem value="catamaran">
                                  Catamaran
                                </SelectItem>
                                <SelectItem value="yacht à voile">
                                  Yacht à voile
                                </SelectItem>
                                <SelectItem value="yacht à moteur">
                                  Yacht à moteur
                                </SelectItem>
                                <SelectItem value="bateau à moteur">
                                  Bateau à moteur
                                </SelectItem>
                                <SelectItem value="semi-rigide">
                                  Semi-rigide
                                </SelectItem>
                                <SelectItem value="Goelétte">
                                  Goélette
                                </SelectItem>
                                <SelectItem value="trimaran">
                                  Trimaran
                                </SelectItem>
                                <SelectItem value="péniche">Péniche</SelectItem>
                                <SelectItem value="jet-ski">Jet-ski</SelectItem>
                                <SelectItem value="houseboat (péniche habitable)">
                                  Houseboat (péniche habitable)
                                </SelectItem>
                                <SelectItem value="bateau de pêche">
                                  Bateau de pêche
                                </SelectItem>
                                <SelectItem value="vedette rapide">
                                  Vedette rapide
                                </SelectItem>
                                <SelectItem value="catamaran à moteur">
                                  Catamaran à moteur
                                </SelectItem>
                                <SelectItem value="dinghy / annexe">
                                  Dinghy / Annexe
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="modele-marque">Modèle / marque</Label>
                          <Input
                            id="modele-marque"
                            placeholder="Ex : Beneteau Oceanis 38"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="annee-construction">
                            Année de construction
                          </Label>
                          <Input
                            id="annee-construction"
                            placeholder="Ex : 2015"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="longueur">Longueur (en mètres)</Label>
                          <Input id="longueur" placeholder="Ex : 12.5" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="largeur">Largeur (en mètres)</Label>
                          <Input id="largeur" placeholder="Ex : 4.2" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="tirant-eau">
                            Tirant d'eau (en mètres)
                          </Label>
                          <Input id="tirant-eau" placeholder="Ex : 1.8" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="capacite-max">
                            Capacité maximale (nombre de personnes)
                          </Label>
                          <Input id="capacite-max" placeholder="Ex : 8" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="nombre-cabines">
                            Nombre de cabines
                          </Label>
                          <Input id="nombre-cabines" placeholder="Ex : 3" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="nombre-couchages">
                            Nombre de couchages
                          </Label>
                          <Input id="nombre-couchages" placeholder="Ex : 6" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="Moteurs">Moteurs</Label>
                          <Input
                            id="Moteurs"
                            placeholder="Torqeedo Travel 1103 C"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="reservoirEau">réservoirs d’eau</Label>
                          <Input
                            id="reservoirEau"
                            placeholder="Vetus FTANK série (PEHD, 100 à 400 L)"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="reservoirCarburant">
                            réservoirs de carburant
                          </Label>
                          <Input
                            id="reservoirCarburant"
                            placeholder="12 L à 30 L"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold mb-4">
                        Description & équipement
                      </div>
                      <div className="grid grid-cols-1 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="description-detaillee">
                            Description détaillée
                          </Label>
                          <Textarea
                            id="description-detaillee"
                            placeholder="Ex : Bateau confortable, idéal pour la famille."
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-1 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="equipements-inclus">
                            Équipements inclus
                          </Label>
                          <Popover
                            open={popoverOpen}
                            onOpenChange={setPopoverOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[20rem] justify-between"
                              >
                                {selectedValues.length > 0
                                  ? frameworks
                                      .filter((f) =>
                                        selectedValues.includes(f.value)
                                      )
                                      .map((f) => f.label)
                                      .join(", ")
                                  : "Sélectionner des équipements..."}
                                <ChevronsUpDown className="ml-2 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[20rem] p-0">
                              <Command>
                                <CommandInput placeholder="Rechercher un équipement..." />
                                <CommandList>
                                  <CommandEmpty>
                                    Aucun équipement trouvé.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {frameworks.map((framework) => (
                                      <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={() =>
                                          toggleValue(framework.value)
                                        }
                                      >
                                        {framework.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            selectedValues.includes(
                                              framework.value
                                            )
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-1 mb-4">
                        <div className="grid gap-3">
                          <TagsSelector
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            inputs={tagInputs}
                            setInputs={setTagInputs}
                            tags={TAGS}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold mb-4">
                        Ports & zones de navigation
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="port-attache">
                            Port d&apos;attache (ville, marina)
                          </Label>
                          <Selectheroui
                            className="max-w-xs"
                            placeholder="Sélectionne un port"
                            variant="bordered"
                            value={portattache}
                            onSelectionChange={(keys) => {
                              const selected = Array.from(keys)[0] as string; // récupère la première clé
                              setPortattache(selected);
                            }}
                          >
                            <SelectSectionheroui showDivider title="France">
                              <SelectItemheroui key="Marseille">
                                Marseille
                              </SelectItemheroui>
                              <SelectItemheroui key="Le Havre">
                                Le Havre
                              </SelectItemheroui>
                              <SelectItemheroui key="Dunkerque">
                                Dunkerque
                              </SelectItemheroui>
                              <SelectItemheroui key="Nantes – Saint-Nazaire">
                                Nantes – Saint-Nazaire
                              </SelectItemheroui>
                              <SelectItemheroui key="Bordeaux">
                                Bordeaux
                              </SelectItemheroui>
                              <SelectItemheroui key="Toulon">
                                Toulon
                              </SelectItemheroui>
                              <SelectItemheroui key="Nice">
                                Nice
                              </SelectItemheroui>
                              <SelectItemheroui key="La Rochelle">
                                La Rochelle
                              </SelectItemheroui>
                              <SelectItemheroui key="Brest">
                                Brest
                              </SelectItemheroui>
                              <SelectItemheroui key="Calais">
                                Calais
                              </SelectItemheroui>
                            </SelectSectionheroui>
                            <SelectSectionheroui showDivider title="Espagne">
                              <SelectItemheroui key="Barcelone">
                                Barcelone
                              </SelectItemheroui>
                              <SelectItemheroui key="Valence">
                                Valence
                              </SelectItemheroui>
                              <SelectItemheroui key="Algeciras">
                                Algeciras
                              </SelectItemheroui>
                              <SelectItemheroui key="Bilbao">
                                Bilbao
                              </SelectItemheroui>
                              <SelectItemheroui key="Las Palmas (Canaries)">
                                Las Palmas (Canaries)
                              </SelectItemheroui>
                              <SelectItemheroui key="Santa Cruz de Tenerife (Canaries)">
                                Santa Cruz de Tenerife (Canaries)
                              </SelectItemheroui>
                              <SelectItemheroui key="Malaga">
                                Malaga
                              </SelectItemheroui>
                              <SelectItemheroui key="Santander">
                                Santander
                              </SelectItemheroui>
                              <SelectItemheroui key="Vigo">
                                Vigo
                              </SelectItemheroui>
                              <SelectItemheroui key="Palma de Majorque">
                                Palma de Majorque
                              </SelectItemheroui>
                            </SelectSectionheroui>
                            <SelectSectionheroui showDivider title="Italie">
                              <SelectItemheroui key="Gênes (Genova)">
                                Gênes (Genova)
                              </SelectItemheroui>
                              <SelectItemheroui key="Trieste">
                                Trieste
                              </SelectItemheroui>
                              <SelectItemheroui key="Naples (Napoli)">
                                Naples (Napoli)
                              </SelectItemheroui>
                              <SelectItemheroui key="Livourne (Livorno)">
                                Livourne (Livorno)
                              </SelectItemheroui>
                              <SelectItemheroui key="Civitavecchia (Rome)">
                                Civitavecchia (Rome)
                              </SelectItemheroui>
                              <SelectItemheroui key="La Spezia">
                                La Spezia
                              </SelectItemheroui>
                              <SelectItemheroui key="Palerme (Palermo)">
                                Palerme (Palermo)
                              </SelectItemheroui>
                              <SelectItemheroui key="Venise (Venezia)">
                                Venise (Venezia)
                              </SelectItemheroui>
                              <SelectItemheroui key="Bari">
                                Bari
                              </SelectItemheroui>
                              <SelectItemheroui key="Messine (Messina)">
                                Messine (Messina)
                              </SelectItemheroui>
                            </SelectSectionheroui>
                            <SelectSectionheroui showDivider title="Portugal">
                              <SelectItemheroui key="Lisbonne (Lisboa)">
                                Lisbonne (Lisboa)
                              </SelectItemheroui>
                              <SelectItemheroui key="Porto de Leixões">
                                Porto de Leixões
                              </SelectItemheroui>
                              <SelectItemheroui key="Sines">
                                Sines
                              </SelectItemheroui>
                              <SelectItemheroui key="Funchal (Madère)">
                                Funchal (Madère)
                              </SelectItemheroui>
                              <SelectItemheroui key="Ponta Delgada (Açores)">
                                Ponta Delgada (Açores)
                              </SelectItemheroui>
                              <SelectItemheroui key="Setúbal">
                                Setúbal
                              </SelectItemheroui>
                              <SelectItemheroui key="Aveiro">
                                Aveiro
                              </SelectItemheroui>
                              <SelectItemheroui key="Faro">
                                Faro
                              </SelectItemheroui>
                              <SelectItemheroui key="Viana do Castelo">
                                Viana do Castelo
                              </SelectItemheroui>
                              <SelectItemheroui key="Portimão">
                                Portimão
                              </SelectItemheroui>
                            </SelectSectionheroui>
                            <SelectSectionheroui showDivider title="Grèce">
                              <SelectItemheroui key="Le Pirée (Athènes)">
                                Le Pirée (Athènes)
                              </SelectItemheroui>
                              <SelectItemheroui key="Thessalonique (Thessaloniki)">
                                Thessalonique (Thessaloniki)
                              </SelectItemheroui>
                              <SelectItemheroui key="Héraklion (Crète)">
                                Héraklion (Crète)
                              </SelectItemheroui>
                              <SelectItemheroui key="Patras">
                                Patras
                              </SelectItemheroui>
                              <SelectItemheroui key="Rhodes">
                                Rhodes
                              </SelectItemheroui>
                              <SelectItemheroui key="Corfou (Kerkyra)">
                                Corfou (Kerkyra)
                              </SelectItemheroui>
                              <SelectItemheroui key="Volos">
                                Volos
                              </SelectItemheroui>
                              <SelectItemheroui key="Mykonos">
                                Mykonos
                              </SelectItemheroui>
                              <SelectItemheroui key="Santorin (Santorini)">
                                Santorin (Santorini)
                              </SelectItemheroui>
                              <SelectItemheroui key="Kavala">
                                Kavala
                              </SelectItemheroui>
                            </SelectSectionheroui>
                            <SelectSectionheroui title="Croatie">
                              <SelectItemheroui key="Rijeka">
                                Rijeka
                              </SelectItemheroui>
                              <SelectItemheroui key="Split">
                                Split
                              </SelectItemheroui>
                              <SelectItemheroui key="Dubrovnik">
                                Dubrovnik
                              </SelectItemheroui>
                              <SelectItemheroui key="Zadar">
                                Zadar
                              </SelectItemheroui>
                              <SelectItemheroui key="Ploče">
                                Ploče
                              </SelectItemheroui>
                              <SelectItemheroui key="Šibenik">
                                Šibenik
                              </SelectItemheroui>
                              <SelectItemheroui key="Rovinj">
                                Rovinj
                              </SelectItemheroui>
                              <SelectItemheroui key="Pula">
                                Pula
                              </SelectItemheroui>
                              <SelectItemheroui key="Umag">
                                Umag
                              </SelectItemheroui>
                              <SelectItemheroui key="Makarska">
                                Makarska
                              </SelectItemheroui>
                            </SelectSectionheroui>
                          </Selectheroui>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="zones-navigation">
                            Zones de navigation autorisées ou recommandées
                          </Label>
                          <Input
                            id="zones-navigation"
                            placeholder="Ex : Côte d'Azur, Méditerranée"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold mb-4">
                        Conditions de location
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="tarification">
                            Tarif journalier, hebdomadaire, etc.
                          </Label>
                          <Select onValueChange={handleSelect}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choisissez une tarification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Tarifications disponibles
                                </SelectLabel>
                                {fruits
                                  .filter((f) => !selected.includes(f.id))
                                  .map((option) => (
                                    <SelectItem
                                      key={option.id}
                                      value={option.id}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {selected.length > 0 && selected[0] !== "Aucun" && (
                            <div className="space-y-4">
                              {selected.map((id) => {
                                const label = fruits.find(
                                  (f) => f.id === id
                                )?.label;
                                return (
                                  <div key={id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">
                                        {label}
                                      </span>
                                      <button
                                        onClick={() => handleRemove(id)}
                                        className="text-red-500 text-sm"
                                      >
                                        Supprimer
                                      </button>
                                    </div>
                                    <Input
                                      placeholder={`Tarif pour : ${label}`}
                                      value={inputs[id] || ""}
                                      onChange={(e) =>
                                        setInputs((prev) => ({
                                          ...prev,
                                          [id]: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="depot-garantie">
                            Dépôt de garantie
                          </Label>
                          <Input id="depot-garantie" placeholder="Ex : 1000" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="duree-location">
                            Durée minimale / maximale de location
                          </Label>
                          <Input
                            id="duree-location"
                            placeholder="Ex : 2 jours / 1 mois"
                          />
                        </div>
                      </div>
                      <Alert
                        color="warning"
                        title="Si vous souhaitez facturer un supplément au-delà d’un certain nombre de passagers, indiquez ici le prix par passager supplémentaire et par jour.
Laissez vide ou mettez 0 si aucun supplément n’est appliqué."
                      />
                      <div className="grid grid-cols-2 gap-2 mt-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="depot-garantie-2">
                            Passagers inclus dans le prix
                          </Label>
                          <Input
                            id="PassagersInclusDansLePrix"
                            placeholder="ex : 4"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="depot-garantie-2">
                            Supplément par passager supplémentaire (€ / jour)
                          </Label>
                          <Input
                            type="number"
                            id="SupplementParPassagerSupplémentaire"
                            placeholder="ex : 20"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <Alert
                        color="warning"
                        title="Merci de fournir un lien d'adresse Google Maps valide, tel que : https://www.google.com/maps/place/... Cela nous permettra de localiser précisément le port de départ et d'arriver de votre bateau."
                      />
                      <div className="grid grid-cols-2 gap-2 mb-4 mt-2">
                        <div className="grid gap-3">
                          <Label htmlFor="port-depart">
                            Port de départ (optionnel)
                          </Label>
                          <Input id="port-depart" placeholder="Port de Nice" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="depot-garantie-2">
                            Port d'arriver (optionnel)
                          </Label>
                          <Input id="port-arriver" placeholder="Port de Nice" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label className="font-medium">
                            Politique d'annulation
                          </Label>
                          <Select
                            onValueChange={(value) => setSelectedPolicy(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une politique" />
                            </SelectTrigger>
                            <SelectContent>
                              {cancellationPolicies.map((policy) => (
                                <SelectItem key={policy.id} value={policy.id}>
                                  {policy.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedPolicy === "custom" && (
                            <div className="space-y-2">
                              <Label className="font-medium">
                                Description personnalisée{" "}
                                <span className="text-muted-foreground">
                                  (optionnel)
                                </span>
                              </Label>
                              <Textarea
                                placeholder="Ex : Remboursement à 50% si annulation 14 jours avant"
                                value={customDescription}
                                onChange={(e) =>
                                  setCustomDescription(e.target.value)
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <Checkbox>
                          Le bateau peut être loué sans certificat / permis
                        </Checkbox>
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold mb-4">
                        Indisponibilités
                      </div>
                      <div className="flex items-center justify-center w-full mb-4">
                        <div className="flex flex-col w-full">
                          <div className="w-full flex items-center my-3">
                            <Alert
                              color="warning"
                              title="Sélectionnez les jours où votre bateau ne sera pas disponible à la location. Cliquez sur un jour pour l'ajouter comme indisponible; cliquez à nouveau pour l'enlever. Les dates sélectionnées apparaîtront ci-dessous."
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <CalendarDashboardBoat
                          unavailableDates={unavailableDates}
                          setUnavailableDates={setUnavailableDates}
                        />
                      </div>
                    </div>

                    {/* <div>
                      <div className="text-lg font-bold mb-4">
                        Contact propriétaire
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-3 mb-4">
                          <label>Nom du propriétaire</label>
                          <Input
                            id="nom-proprietaire"
                            type="text"
                            placeholder="Ex : Jean Dupont"
                            required
                          />
                        </div>

                        <div className="grid gap-3 mb-4">
                          <label>Téléphone</label>
                          <Input
                            id="telephone-proprietaire"
                            type="tel"
                            placeholder="+33 6 12 34 56 78"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <div className="grid gap-3 mb-4">
                          <label>Email</label>
                          <Input
                            id="email-proprietaire"
                            type="email"
                            placeholder="exemple@domaine.com"
                            required
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="ml-4 mt-4">
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-2 rounded shadow flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            classNames={{ label: "text-white" }}
                            color="default"
                            variant="simple"
                          />
                          <span>Soumission...</span>
                        </>
                      ) : (
                        "Soumettre"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
