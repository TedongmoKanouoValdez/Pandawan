"use client";
import * as React from "react";
import { useState, useEffect } from "react";
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
import { MultiSectionImageUpload } from "@/components/pages/ImageUploadsSections";
import { CalendarDashboardBoat } from "@/components/pages/calendardashboardcreateboat";
import { Alert } from "@heroui/alert";
import { Checkbox } from "@heroui/checkbox";
import { Button as ButtonHeroui, ButtonGroup } from "@heroui/button";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";

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

export default function EditBateauForm() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [selected, setSelected] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [selectedPolicy, setSelectedPolicy] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [noCertificat, setNoCertificat] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tagInputs, setTagInputs] = useState<Record<string, boolean>>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const router = useRouter();
  const params = useParams();
  const bateauId = params.id;

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const safeParse = (jsonString: string, fallback: any = []) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  };

  const defaultFormData = {
    nomBateau: "",
    modeleMarque: "",
    portattache: "",
    tarifbateau: "",
    description: "",
    indisponibilites: [],
    disponibilite: true,
    medias: [],
    equipementsInclus: [],
    tags: [],
    tarifications: [],
  };

  // Charger les données existantes
  useEffect(() => {
    if (bateauId) {
      axios.get(`http://localhost:3001/api/bateaux/${bateauId}`).then((res) => {
        const data = res.data;

        const selectedFromAPI =
          safeParse(data.bateau.details?.optionsPayantes) || [];

        const selectedLabels = selectedFromAPI
          .filter((option) => TAGS.some((tag) => tag.label === option.label))
          .map((option) => ({ id: option.id, label: option.label }));

        setSelectedTags(selectedLabels);

        const tagInputsFromAPI = Object.fromEntries(
          selectedFromAPI.map((option: any) => [option.id, option.detail || ""])
        );
        setTagInputs(tagInputsFromAPI);

        setFormData({
          ...defaultFormData,
          ...data,
          nomBateau: data.bateau.nom,
          modeleMarque: data.bateau.modele,
          typeBateau: data.bateau.typeBateau,
          portattache: data.bateau.port,
          tarifbateau: data.bateau.prix,
          description: data.bateau.description,
          indisponibilites: safeParse(data.datesIndisponibles),
          disponibilite: data.disponibilite,
          medias: data.medias || [],
          equipementsInclus: setSelectedValues(
            safeParse(data.bateau.details?.equipements) || []
          ),
          tags: selectedLabels,
          tarifications: safeParse(data.details?.tarifications),
          anneeConstruction: data.bateau.details?.anneeConstruction,
          longueur: data.bateau.details?.longueur,
          largeur: data.bateau.details?.largeur,
          nombreCabines: data.bateau.details?.nombreCabines,
          tirantEau: data.bateau.details?.tirantEau,
          nombreCouchages: data.bateau.details?.nombreCouchages,
          capaciteMax: data.bateau.details?.capaciteMax,
          portArriver: data.bateau.details?.portArriver,
          portdarriver: data.bateau.details?.portdarriver,
          portdefault: data.bateau.portdefault,
          zonesNavigation: data.bateau.details?.zonesNavigation,
        });

        setLoading(false);
      });
    }
  }, [bateauId]);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`/api/bateaux/${bateauId}`, formData);
      alert("Bateau modifié avec succès !");
      router.push("/bateaux");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification");
    }
  };

  console.log(formData);

  if (loading || !formData) return <p>Chargement...</p>;

  return (
    <>
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
                            value={formData?.nomBateau || "non défini"}
                            placeholder="Ex : L'Étoile de Mer"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nomBateau: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label>Type de bateau à louer</Label>
                          <Select
                            value={formData?.typeBateau || ""}
                            onValueChange={(value) =>
                              setFormData({ ...formData, typeBateau: value })
                            }
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
                            value={formData?.modeleMarque || "non défini"}
                            placeholder="Ex : Beneteau Oceanis 38"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                modeleMarque: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="annee-construction">
                            Année de construction
                          </Label>
                          <Input
                            id="annee-construction"
                            value={formData?.anneeConstruction || "non défini"}
                            placeholder="Ex : 2015"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                anneeConstruction: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="longueur">Longueur (en mètres)</Label>
                          <Input
                            id="longueur"
                            placeholder="Ex : 12.5m"
                            value={formData?.longueur || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                longueur: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="largeur">Largeur (en mètres)</Label>
                          <Input
                            id="largeur"
                            placeholder="Ex : 4.2m"
                            value={formData?.largeur || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                largeur: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="tirant-eau">
                            Tirant d'eau (en mètres)
                          </Label>
                          <Input
                            id="tirant-eau"
                            placeholder="Ex : 1.8m"
                            value={formData?.tirantEau || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                tirantEau: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="capacite-max">
                            Capacité maximale (nombre de personnes)
                          </Label>
                          <Input
                            id="capacite-max"
                            placeholder="Ex : 8"
                            value={formData?.capaciteMax || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                capaciteMax: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="grid gap-3">
                          <Label htmlFor="nombre-cabines">
                            Nombre de cabines
                          </Label>
                          <Input
                            id="nombre-cabines"
                            placeholder="Ex : 3"
                            value={formData?.nombreCabines || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nombreCabines: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="nombre-couchages">
                            Nombre de couchages
                          </Label>
                          <Input
                            id="nombre-couchages"
                            placeholder="Ex : 6"
                            value={formData?.nombreCouchages || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nombreCouchages: e.target.value,
                              })
                            }
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
                            value={formData?.description || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
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
                            onChange={(newTags) => setSelectedTags(newTags)}
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
                            Port d'attache (ville, marina)
                          </Label>
                          <Input
                            id="port-attache"
                            placeholder="Ex : Marina de Cannes"
                            value={formData?.portdefault || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                portdefault: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="zones-navigation">
                            Zones de navigation autorisées ou recommandées
                          </Label>
                          <Input
                            id="zones-navigation"
                            placeholder="Ex : Côte d'Azur, Méditerranée"
                            value={formData?.zonesNavigation || "non défini"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                zonesNavigation: e.target.value,
                              })
                            }
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
                          <Input
                            id="depot-garantie"
                            placeholder="Ex : 1000 €"
                          />
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
                        <div className="grid gap-3">
                          <Label htmlFor="depot-garantie-2">
                            Tarif du bateau
                          </Label>
                          <Input id="tarif-bateau" placeholder="Ex : 1000.00" />
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
