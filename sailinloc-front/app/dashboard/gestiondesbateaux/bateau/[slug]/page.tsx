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
import VeiwsGalerieBoatDashbordSectionOne from "@/components/pages/veiwsgalerieboatdashbordsectionone";
import { CalendarDashboardBoat } from "@/components/pages/calendardashboardcreateboat";
import { Alert } from "@heroui/alert";
import { Checkbox } from "@heroui/checkbox";
import { Button as ButtonHeroui, ButtonGroup } from "@heroui/button";
import { Link } from "@heroui/link";
import { IoIosLink } from "react-icons/io";
import { useParams } from "next/navigation";
import { Chip } from "@heroui/chip";
import dayjs from "dayjs";

export default function GestionDesBateauxCreerPage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [selected, setSelected] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [selectedPolicy, setSelectedPolicy] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [noCertificat, setNoCertificat] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Dayjs[]>([]);

  const [bateau, setBateau] = useState<any>(null);
  const params = useParams();
  const slug = params?.slug as string;

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

  useEffect(() => {
    const fetchBateau = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/bateaux/slug/${slug}`
        );
        const data = await res.json();
        setBateau(data.bateau);
      } catch (err) {
        console.error("Erreur chargement bateau :", err);
      }
    };

    if (slug) fetchBateau();
  }, [slug]);

  useEffect(() => {
    if (bateau?.datesIndisponibles) {
      try {
        const parsed = JSON.parse(bateau.datesIndisponibles);
        const converted = Array.isArray(parsed)
          ? parsed.map((date: string) => dayjs(date))
          : [];
        setUnavailableDates(converted);
      } catch (e) {
        console.error("Erreur parsing datesIndisponibles :", e);
        setUnavailableDates([]);
      }
    } else {
      setUnavailableDates([]);
    }
  }, [bateau?.datesIndisponibles]);

  console.log(bateau);

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="text-lg font-bold mb-4">
                    Bateau - <span>{bateau?.nom || ""}</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-4">
                      Informations générales
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="grid gap-3">
                        <Label>Nom du bateau</Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.nom || ""}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <Label>Type de bateau à louer</Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.typeBateau || ""}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="modele-marque">Modèle / marque</Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.modele || ""}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="annee-construction">
                          Année de construction
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.anneeConstruction || ""}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="longueur">Longueur (en mètres)</Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.longueur || ""}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="largeur">Largeur (en mètres)</Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.largeur || ""}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="tirant-eau">
                          Tirant d'eau (en mètres)
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.tirantEau || ""}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="capacite-max">
                          Capacité maximale (nombre de personnes)
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.capaciteMax || ""}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="nombre-cabines">
                          Nombre de cabines
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.nombreCabines || ""}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="nombre-couchages">
                          Nombre de couchages
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.nombreCouchages || ""}
                        </Chip>
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
                        <Chip color="warning" variant="dot">
                          {bateau?.description || ""}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="equipements-inclus">
                          Équipements inclus
                        </Label>
                        <Chip color="warning" variant="dot">
                          {(() => {
                            const raw = bateau?.details?.equipements;
                            let list: string[] = [];

                            if (Array.isArray(raw)) {
                              list = raw;
                            } else if (typeof raw === "string") {
                              try {
                                const parsed = JSON.parse(raw);
                                if (Array.isArray(parsed)) list = parsed;
                              } catch (e) {
                                list = [];
                              }
                            }

                            return list.join(", ");
                          })()}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="equipements-inclus">
                          Options payantes ou en supplément
                        </Label>
                        <Chip color="warning" variant="dot">
                          {(() => {
                            const raw = bateau?.details?.optionsPayantes;
                            let list: { label: string; detail?: string }[] = [];

                            if (typeof raw === "string") {
                              try {
                                const parsed = JSON.parse(raw);
                                if (Array.isArray(parsed)) list = parsed;
                              } catch (e) {
                                list = [];
                              }
                            }

                            return list
                              .map((item) => `${item.label} (${item.detail} €)`)
                              .join(", ");
                          })()}
                        </Chip>
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
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.portdefault ||
                            "Aucun port d'attache défini"}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="zones-navigation">
                          Zones de navigation autorisées ou recommandées
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.zonesNavigation || "Non définie"}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="port-attache">
                          Port de départ (optionnel)
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.portdarriver || "Non défini"}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="zones-navigation">
                          Port d'arrivé (optionnel)
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.portdedepart || "Non défini"}
                        </Chip>
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
                        <div className="grid grid-cols-2 gap-2">
                          <Chip color="warning" variant="dot">
                            {(() => {
                              const raw = bateau?.details?.tarifications;
                              let list: { label: string; detail?: string }[] =
                                [];

                              if (typeof raw === "string") {
                                try {
                                  const parsed = JSON.parse(raw);
                                  if (Array.isArray(parsed)) list = parsed;
                                } catch (e) {
                                  list = [];
                                }
                              }

                              return list
                                .map(
                                  (item) => `${item.type} (${item.montant} €)`
                                )
                                .join(", ");
                            })()}
                          </Chip>
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="depot-garantie">
                          Dépôt de garantie
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.Depotgarantie || "Non défini"}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="grid gap-3">
                        <Label htmlFor="duree-location">
                          Durée minimale / maximale de location
                        </Label>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.DureeLocation || "Non défini"}
                        </Chip>
                      </div>
                      <div className="grid gap-3">
                        <div className="grid gap-3">
                          <Label className="font-medium">
                            Politique d'annulation
                          </Label>
                        </div>
                        <Chip color="warning" variant="dot">
                          {bateau?.details?.politiqueAnnulation || "Non défini"}
                        </Chip>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Checkbox
                        defaultChecked={
                          bateau?.details?.locationSansPermis || false
                        }
                        isDisabled
                      >
                        Le bateau peut être loué sans certificat / permis
                      </Checkbox>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-4">
                      Photos & médias
                    </div>
                    <div>
                      <VeiwsGalerieBoatDashbordSectionOne
                        images={bateau?.medias || []}
                      />
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
                        editable={false}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-4">
                      Informations administratives
                    </div>
                    <div className="grid gap-3 mb-4">
                      <label>Attestation d'assurance (PDF ou image)</label>
                      <Link
                        isExternal
                        showAnchorIcon
                        underline="always"
                        anchorIcon={<IoIosLink />}
                        href="https://github.com/heroui-inc/heroui"
                      >
                        Informations administratives.pdf
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-3 mb-4">
                        <label>Numéro de police d'assurance</label>
                        <Input
                          disabled
                          id="numero-police"
                          type="text"
                          placeholder="Ex : 12345678-AB"
                        />
                      </div>

                      <div className="grid gap-3 mb-4">
                        <label>Attestation d'assurance (PDF ou image)</label>
                        <Link
                          isExternal
                          underline="always"
                          showAnchorIcon
                          anchorIcon={<IoIosLink />}
                          href="https://github.com/heroui-inc/heroui"
                        >
                          Attestation d'assurance.pdf
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="grid gap-3 mb-4">
                        <label>Certificat de navigation (si applicable)</label>
                        <Link
                          isExternal
                          showAnchorIcon
                          underline="always"
                          anchorIcon={<IoIosLink />}
                          href="https://github.com/heroui-inc/heroui"
                        >
                          Certificat de navigation.pdf
                        </Link>
                        <div className="flex items-center mt-2">
                          <Checkbox
                            checked={noCertificat}
                            onChange={(e) => setNoCertificat(e.target.checked)}
                          >
                            Je ne possède pas de certificat
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-4">
                      Contact propriétaire
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-3 mb-4">
                        <label>Nom du propriétaire</label>
                        <Input
                          disabled
                          id="nom-proprietaire"
                          type="text"
                          placeholder="Ex : Jean Dupont"
                          required
                        />
                      </div>

                      <div className="grid gap-3 mb-4">
                        <label>Téléphone</label>
                        <Input
                          disabled
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
                          disabled
                          id="email-proprietaire"
                          type="email"
                          placeholder="exemple@domaine.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <ButtonHeroui color="primary" variant="shadow">
                    Enregistrer
                  </ButtonHeroui>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
