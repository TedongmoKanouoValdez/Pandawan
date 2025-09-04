"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import { GiMoneyStack } from "react-icons/gi";

interface OptionPaiementProps {
  tarifs: string;
  onSelectPrice?: (data: { prix: number; periode: string }) => void;
}

export default function OptionPaiement({
  tarifs,
  onSelectPrice,
}: OptionPaiementProps) {
  const id = useId();
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  // Transformer la string en tableau
  const tarifsArray: string[] = useMemo(() => {
    if (!tarifs) return [];
    return tarifs.split(",").map((t) => t.trim()); // ["250€ / jour", "750€ / semaine"]
  }, [tarifs]);

  // Fonction pour parser un tarif
  const parseTarif = (tarif: string) => {
    const match = tarif.match(/(\d+)\s*€\s*\/\s*(.+)/);
    if (!match) return { prix: 0, periode: "" };
    return { prix: Number(match[1]), periode: match[2].trim() };
  };

  return (
    <RadioGroup
      className="grid grid-cols-2 gap-2 max-w-[400px]"
      aria-label="Méthode de paiement"
      value={selectedPrice}
      onValueChange={(value) => {
        setSelectedPrice(value);
        const [prixStr, periode] = value.split("|");
        const prixNumber = Number(prixStr);

        if (onSelectPrice) onSelectPrice({ prix: prixNumber, periode });
      }}
    >
      {tarifsArray.length > 0 ? (
        tarifsArray.map((tarifText) => {
          const { prix, periode } = parseTarif(tarifText);

          return (
            <div
              key={tarifText}
              className="relative flex w-full items-start gap-2 bg-white rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
            >
              <RadioGroupItem
                value={`${prix}|${periode}`}
                id={`tarif-${prix}-${periode}`}
                aria-describedby={`tarif-${prix}-${periode}-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="flex grow items-center gap-3">
                <GiMoneyStack />
                <div className="grid grow gap-2">
                  <Label htmlFor={`tarif-${prix}-${periode}`}>
                    {prix} € / {periode}
                  </Label>
                  <p
                    id={`tarif-${prix}-${periode}-description`}
                    className="text-xs text-muted-foreground"
                  >
                    Paiement sécurisé.
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Aucun tarif disponible.</p>
      )}
    </RadioGroup>
  );
}
