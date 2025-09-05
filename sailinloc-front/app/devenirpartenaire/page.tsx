"use client";
import React, { useEffect, useRef, useState } from "react";
import { GrSecure } from "react-icons/gr";
import { IoTimeSharp } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { Steps } from "antd";
import { SlNote } from "react-icons/sl";
import { IoMailUnread } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Checkbox } from "@heroui/checkbox";
import { jwtDecode } from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";

export default function DevenirPartenairePage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [decoded, setDecoded] = useState([]);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Veuillez valider le CAPTCHA.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload = {
      nomComplet: formData.get("nomcomplet"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      typeBateau: formData.get("typeBateau"),
      marqueetmodele: formData.get("marqueetmodele"),
      anneedeconstruction: formData.get("anneedeconstruction"),
      longueur: formData.get("longueur"),
      largeur: formData.get("largeur"),
      portdattacheprincipal: formData.get("portdattacheprincipal"),
      capacitemaximale: formData.get("capacitemaximale"),
      zonedenavigationautorisee: formData.get("zonedenavigationautorisee"),
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté");
      setLoading(false);
      return;
    }

    setDecoded(jwtDecode(token));
    const userId = decoded?.userId;

    try {
      const res = await fetch("http://localhost:3001/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...payload, captchaToken }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          "Merci ! Votre demande a bien été envoyée. Un expert la traitera sous 24 h."
        );
        formRef.current?.reset();
        setIsAccepted(false);
        setCaptchaToken(null);
      } else if (res.status === 401) {
        alert(data.message);
      } else if (res.status === 409) {
        alert(data.message);
      } else {
        alert(
          "Oups, quelque chose s’est mal passé. Veuillez réessayer ou nous contacter."
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Impossible de joindre le serveur. Vérifiez votre connexion ou ré-essayez plus tard."
      );
    }
  };

  return (
    <>
      <main>
        <section className="relative">
          <div
            className="absolute top-0 bannerpagedevenirpartenaire"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751644473/photo-de-collegues-occupes-appreciant-le-processus-de-travail_1_sxogkd.jpg)",
              height: "56vh",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            <div className="relative mx-auto max-w-6xl mt-48 text-white font-bold z-10">
              <div>
                <h1 className="text-4xl">
                  Devenez partenaire et louez votre bateau en toute simplicité
                </h1>
              </div>
              <div>
                <p>
                  Rejoignez notre réseau de propriétaires et augmentez vos
                  revenus en louant votre bateau aux passionnés de navigation.
                  Notre plateforme vous permet de gérer vos annonces facilement,
                  en toute sécurité.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl pt-[27rem]">
          <div className="mb-24">
            <div>
              <h2 className="text-4xl font-medium mb-5">Avantages</h2>
            </div>
          </div>

          <div className="contentpourquoihome mx-auto max-w-6xl">
            <div className="grid grid-cols-4 gap-4 mb-24">
              <div className="relative">
                <div className="absolute bg-glace flex justify-center items-center w-24 h-24 iconecardpourquoi rounded-full">
                  <TfiStatsUp className="w-12 h-12" />
                </div>
                <div className="bg-glace contentcardpourquoi px-8 py-4 pt-20 rounded-lg text-center space-y-2">
                  <div className="text-xl font-bold">Augmentez vos revenus</div>
                  <div className="text-sm">
                    Rentabilisez votre bateau même quand vous ne l'utilisez pas.
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute bg-glace flex justify-center items-center w-24 h-24 iconecardpourquoi rounded-full">
                  <GrSecure className="w-12 h-12" />
                </div>
                <div className="bg-glace contentcardpourquoi px-4 py-4 pt-20 rounded-lg text-center space-y-2">
                  <div className="text-xl font-bold">Sécurité assurée</div>
                  <div className="text-sm">
                    Assurances adaptées et vérification des locataires.
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute bg-glace flex justify-center items-center w-24 h-24 iconecardpourquoi rounded-full">
                  <IoTimeSharp className="w-12 h-12" />
                </div>
                <div className="bg-glace contentcardpourquoi px-4 py-4 pt-20 rounded-lg text-center space-y-2">
                  <div className="text-xl font-bold">Gestion simplifiée</div>
                  <div className="text-sm">
                    Planning, réservations et paiements centralisés.
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute bg-glace flex justify-center items-center w-24 h-24 iconecardpourquoi rounded-full">
                  <FaGlobe className="w-12 h-12" />
                </div>
                <div className="bg-glace contentcardpourquoi px-4 py-4 pt-20 rounded-lg text-center space-y-2">
                  <div className="text-xl font-bold">Visibilité maximale</div>
                  <div className="text-sm">
                    Votre bateau accessible à des milliers de plaisanciers.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-4xl font-medium mb-5">Comment ça marche ?</h2>
            </div>
          </div>

          <div className="contentpourquoihome mb-24">
            <Steps
              items={[
                {
                  title: "Inscrivez votre bateau",
                  description: "Remplissez le formulaire en quelques minutes.",
                  status: "finish",
                  icon: <SlNote />,
                },
                {
                  title: "Recevez vos réservations",
                  description:
                    "Les clients réservent directement sur la plateforme.",
                  status: "finish",
                  icon: <IoMailUnread />,
                },
                {
                  title: "Naviguez vers le succès",
                  description:
                    "Générez des revenus pendant que votre bateau est au port.",
                  status: "finish",
                  icon: <TfiStatsUp />,
                },
              ]}
            />
          </div>

          <div>
            <div>
              <h2 className="text-4xl font-medium mb-5">
                Formulaire de contact{" "}
              </h2>
            </div>
          </div>

          <div className="contentpourquoihome mb-24 flex justify-center">
            <Card className="w-full max-w-2xl">
              <CardContent>
                <form className="pt-8" onSubmit={handleSubmit} ref={formRef}>
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="nomcomplet">Nom complet</Label>
                        <Input
                          id="nomcomplet"
                          name="nomcomplet"
                          type="text"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="telephone"
                          type="text"
                          placeholder="+33 07 11 11 11 11"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Type de bateau à louer</Label>
                        <Select name="typeBateau">
                          <SelectTrigger>
                            <SelectValue placeholder="Séléctionné un type de bateau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type de bateau à louer</SelectLabel>
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
                              <SelectItem value="Goelétte">Goélette</SelectItem>
                              <SelectItem value="trimaran">Trimaran</SelectItem>
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
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="marqueetmodele">Marque et modèle</Label>
                        <Input
                          id="marqueetmodele"
                          name="marqueetmodele"
                          type="text"
                          placeholder="Jeanneau Sun Odyssey 45"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="anneedeconstruction">
                          Année de construction
                        </Label>
                        <Input
                          id="anneedeconstruction"
                          name="anneedeconstruction"
                          type="anneedeconstruction"
                          placeholder="18/08/2025"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="longueur">Longueur (en mètres)</Label>
                        <Input
                          id="longueur"
                          name="longueur"
                          type="text"
                          placeholder="12,5m"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="largeur">Largeur (en mètres)</Label>
                        <Input
                          id="largeur"
                          name="largeur"
                          type="text"
                          placeholder="4,2 m"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="portdattacheprincipal">
                          Port d'attache principal
                        </Label>
                        <Input
                          id="portdattacheprincipal"
                          name="portdattacheprincipal"
                          type="text"
                          placeholder="Le port où le bateau est le plus souvent disponible."
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="capacitemaximale">
                          Capacité maximale (nombre de passagers autorisés)
                        </Label>
                        <Input
                          id="capacitemaximale"
                          name="capacitemaximale"
                          type="text"
                          placeholder="8 personnes"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="zonedenavigationautorisee">
                          Zones de navigation autorisées
                        </Label>
                        <Input
                          id="zonedenavigationautorisee"
                          name="zonedenavigationautorisee"
                          type="text"
                          placeholder="Méditerranée, Atlantique, Manche…"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Checkbox
                        isSelected={isAccepted}
                        onValueChange={setIsAccepted}
                      >
                        J'accepte la politique de confidentialité et les
                        conditions d'utilisation.
                      </Checkbox>
                    </div>
                  </div>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={setCaptchaToken}
                  />
                  <Button
                    type="submit"
                    disabled={!isAccepted}
                    className="w-full"
                  >
                    Devenir partenaire maintenant
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}