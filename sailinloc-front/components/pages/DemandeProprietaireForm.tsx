"use client";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
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

export default function DemandeProprietaireForm({ userId }: { userId: number }) {
  const [form, setForm] = useState<Record<string, string>>({
    nomComplet: "",
    email: "",
    telephone: "",
    typeBateau: "",
    marqueModele: "",
    annee: "",
    longueur: "",
    largeur: "",
    portAttache: "",
    capacite: "",
    zonesNavigation: ""
  });
  const [accepted, setAccepted] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) return setMsg("Veuillez accepter les conditions.");
    try {
      const res = await fetch("http://localhost:3001/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, utilisateurId: userId })
      });
      const json = await res.json();
      setMsg(json.message || "Envoyé !");
    } catch {
      setMsg("Erreur réseau");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        {[
          ["nomComplet", "Nom complet"],
          ["email", "Email", "email"],
          ["telephone", "Téléphone"],
          ["marqueModele", "Marque et modèle"],
          ["annee", "Année de construction"],
          ["longueur", "Longueur (m)"],
          ["largeur", "Largeur (m)"],
          ["portAttache", "Port d'attache"],
          ["capacite", "Capacité max"],
          ["zonesNavigation", "Zones autorisées"]
        ].map(([name, label, type]) => (
          <Input
            key={name}
            name={name}
            type={type || "text"}
            label={label}
            value={form[name]}
            onChange={handleChange}
            required
            className="w-full"
          />
        ))}
      </div>

      <Input
        name="typeBateau"
        label="Type de bateau"
        placeholder="Voilier, Catamaran, etc."
        value={form.typeBateau}
        onChange={handleChange}
        required
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="accept"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <label htmlFor="accept" className="text-sm">
          J'accepte la politique de confidentialité et les conditions d'utilisation.
        </label>
      </div>

      <Button
        type="submit"
        disabled={!accepted}
        color="primary"
        className="w-full"
      >
        Devenir partenaire maintenant
      </Button>

      {msg && <p className="text-center text-sm text-green-600">{msg}</p>}
    </form>
  );
}