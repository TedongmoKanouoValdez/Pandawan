"use client";

import { useId } from "react";
import { RiAppleLine, RiBankCardLine, RiPaypalLine } from "@remixicon/react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OptionPaiementProps {
  tarifs: string;
  onSelectPrice?: (data: { value: string }) => void;
}

export default function MoyenDePaiement({
  tarifs,
  onSelectPrice,
}: OptionPaiementProps) {
  const id = useId();

  return (
    <RadioGroup
      defaultValue="card"
      className="grid grid-cols-3 gap-4"
      onValueChange={(value) => {
        if (onSelectPrice) onSelectPrice({ value: value });
      }}
    >
      {/* Card */}
      <div className="flex flex-col items-center">
        <RadioGroupItem
          id={`${id}-card`}
          value="card"
          className="peer sr-only"
        />
        <label
          htmlFor={`${id}-card`}
          className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary/30 
                     flex cursor-pointer flex-col w-full items-center gap-2 rounded-md border border-input px-3 py-4 text-center shadow-sm transition"
        >
          <RiBankCardLine className="opacity-70" size={22} aria-hidden="true" />
          <span className="text-xs font-medium">Card</span>
        </label>
      </div>

      {/* PayPal */}
      <div className="flex flex-col items-center">
        <RadioGroupItem
          id={`${id}-paypal`}
          value="paypal"
          className="peer sr-only"
        />
        <label
          htmlFor={`${id}-paypal`}
          className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary/30 
                     flex cursor-pointer flex-col w-full items-center gap-2 rounded-md border border-input px-3 py-4 text-center shadow-sm transition"
        >
          <RiPaypalLine className="opacity-70" size={22} aria-hidden="true" />
          <span className="text-xs font-medium">PayPal</span>
        </label>
      </div>

      {/* Apple Pay */}
      <div className="flex flex-col items-center">
        <RadioGroupItem
          id={`${id}-apple`}
          value="apple"
          className="peer sr-only"
        />
        <label
          htmlFor={`${id}-apple`}
          className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary/30 
                     flex cursor-pointer flex-col w-full items-center gap-2 rounded-md border border-input px-3 py-4 text-center shadow-sm transition"
        >
          <RiAppleLine className="opacity-70" size={22} aria-hidden="true" />
          <span className="text-xs font-medium">Apple Pay</span>
        </label>
      </div>
    </RadioGroup>
  );
}
