'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  consent: Consent;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  saveConsent: (newConsent: Consent) => void;
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const saved = getCookie('cookie-consent');
    if (saved) {
      try {
        setConsent(JSON.parse(saved as string));
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const save = (newConsent: Consent) => {
    setCookie('cookie-consent', JSON.stringify(newConsent), { path: '/', maxAge: 60 * 60 * 24 * 365 });
    setConsent(newConsent);
    setShowBanner(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });

  return (
    <CookieConsentContext.Provider
      value={{ consent, showBanner, acceptAll, rejectAll, saveConsent: save }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider');
  return ctx;
};