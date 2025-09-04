"use client";

import React, { useEffect, useState, useRef, useId } from "react";
import { CreditCardIcon, WalletIcon } from "lucide-react";
import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";
import { SiVisa } from "react-icons/si";
import { Button, ButtonGroup } from "@heroui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addToast, ToastProvider } from "@heroui/toast";
import cardValidator from "card-validator";

interface PaiementProps {
  setMethode: (value: "card" | "paypal" | "apple") => void;
  onOpen?: () => void;
}

function isValidCardNumber(number: string) {
  const sanitized = number.replace(/\D/g, "");
  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export default function CreditCardForm({ setMethode, onOpen }: PaiementProps) {
  const id = useId();
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  const [nomCarte, setNomCarte] = useState("");
  const [placement, setPlacement] = React.useState("top-center");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleBlur = () => {
    // Supprime tout sauf les chiffres
    let value = expiry.replace(/\D/g, "");

    // Si on a au moins MMYY
    if (value.length >= 4) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
      setExpiry(value);
    }

    const validation = cardValidator.expirationDate(value);
    if (!validation.isValid) {
      addToast({
        title: "Erreur",
        description: "Date d expiration invalide",
        color: "danger",
      });
    }
  };

  const handleCVCBlur = () => {
    const sanitized = cvc.replace(/\D/g, ""); // garde seulement les chiffres
    if (sanitized.length < 3 || sanitized.length > 4) {
      addToast({
        title: "Erreur",
        description: "CVC invalide",
        color: "danger",
      });
    } else {
      setCvc(sanitized);
    }
  };

  useEffect(() => {
    const cardNumber = getCardNumberProps().value || "";
    const isNumberValid = isValidCardNumber(cardNumber);
    const expiryValid = cardValidator.expirationDate(expiry).isValid;
    const cvcValid = /^\d{3,4}$/.test(cvc);
    const nameValid = nomCarte.trim().length > 0;

    setIsFormValid(isNumberValid && expiryValid && cvcValid && nameValid);
  }, [nomCarte, expiry, cvc, getCardNumberProps]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      addToast({
        title: "Erreur",
        description: "Veuillez saisir de bonnes information",
        color: "danger",
      });
      return;
    }

    // Vérification des champs
    if (!nomCarte.trim()) {
      addToast({
        title: "Erreur",
        description: "Veuillez saisir le nom figurant sur la carte",
        color: "danger",
      });
      return;
    }

    // Tout est OK
    setMethode("card");
    if (onOpen) onOpen();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
      <div className="space-y-4">
        <div className="*:not-first:mt-2">
          <Label htmlFor={`name-${id}`}>Nom sur la carte</Label>
          <Input
            id={`name-${id}`}
            type="text"
            required
            value={nomCarte}
            onChange={(e) => setNomCarte(e.target.value)}
          />
        </div>
        <div className="*:not-first:mt-2">
          <Label htmlFor={`number-${id}`}>Numéro de carte</Label>
          <div className="relative">
            <Input
              {...getCardNumberProps()}
              id={`number-${id}`}
              className="peer pe-9 [direction:inherit]"
              onBlur={(e) => {
                if (!isValidCardNumber(e.target.value)) {
                  addToast({
                    title: "Erreur",
                    description: "Numéro de carte invalide",
                    color: "danger",
                  });
                  return;
                }
              }}
              required
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
              {meta.cardType ? (
                <svg
                  className="overflow-hidden rounded-sm"
                  {...getCardImageProps({
                    images: images as unknown as CardImages,
                  })}
                  width={20}
                />
              ) : (
                <CreditCardIcon size={16} aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor={`expiry-${id}`}>Date d expiration</Label>
            <Input
              className="[direction:inherit]"
              {...getExpiryDateProps()}
              id={`expiry-${id}`}
              value={expiry}
              maxLength={5}
              onChange={(e) => setExpiry(e.target.value)}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor={`cvc-${id}`}>CVC</Label>
            <Input
              className="[direction:inherit]"
              {...getCVCProps()}
              id={`cvc-${id}`}
              onChange={(e) => setCvc(e.target.value)}
              onBlur={handleCVCBlur}
              required
            />
          </div>
        </div>
      </div>
      {/* <div className="flex items-center gap-2">
        <Checkbox id={`primary-${id}`} />
        <Label
          htmlFor={`primary-${id}`}
          className="text-muted-foreground font-normal"
        >
          Set as default payment method
        </Label>
      </div> */}
      <Button
        startContent={<SiVisa className="w-6 h-6" />}
        type="submit"
        variant="bordered"
        className="mt-4"
      >
        Payer avec Carte
      </Button>
    </form>
  );
}
