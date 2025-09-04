"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export type Consent = {
  necessary?: boolean;
  analytics?: boolean;
  marketing?: boolean;
};

export default function useConsent(): Consent | null {
  const [consent, setConsent] = useState<Consent | null>(null);

 useEffect(() => {
  const raw = Cookies.get("userConsent");
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      setConsent(parsed);
    } else {
      throw new Error();
    }
  } catch {
    Cookies.remove("userConsent"); 
    setConsent(null);           
  }
}, []);
}