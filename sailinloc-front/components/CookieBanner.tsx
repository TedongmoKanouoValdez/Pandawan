'use client';

import { useState } from 'react';
import { useCookieConsent } from '@/context/CookieConsentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, CheckSquare, Square, X } from 'lucide-react';

export default function CookieBanner() {
  const { showBanner, saveConsent, consent: globalConsent } = useCookieConsent();
  const [isModalOpen, setModalOpen] = useState(false);
  const [localConsent, setLocalConsent] = useState(globalConsent);

  const openModal = () => {
    setLocalConsent(globalConsent);
    setModalOpen(true);
  };

  const toggleCategory = (key: keyof typeof localConsent) => {
    setLocalConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    saveConsent(localConsent);
    setModalOpen(false);
  };

  const Checkbox = ({ label, checked, onChange, disabled = false }: {
    label: string;
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
  }) => (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${disabled ? 'opacity-50' : ''}`}
    >
      {checked ? (
        <CheckSquare size={20} className="text-sky-500" />
      ) : (
        <Square size={20} className="text-slate-400" />
      )}
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );

  if (!showBanner) return null;

  return (
    <>
      {/* Bannière */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 inset-x-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-100 shadow-2xl z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col lg:flex-row items-center gap-4">
          <p className="text-sm sm:text-base leading-relaxed">
            🍪 Choisissez vos préférences cookies.
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
              className="px-5 py-2.5 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 rounded-full shadow-md"
            >
              Tout accepter
            </button>
            <button
              onClick={() => saveConsent({ necessary: true, analytics: false, marketing: false })}
              className="px-5 py-2.5 text-sm font-semibold bg-rose-500 hover:bg-rose-400 rounded-full shadow-md"
            >
              Tout refuser
            </button>
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-sky-500 hover:bg-sky-400 rounded-full shadow-md"
            >
              <Settings size={16} />
              Personnaliser
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modale */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800">Préférences cookies</h2>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <Checkbox
                  label="Cookies nécessaires"
                  checked={localConsent.necessary}
                  onChange={() => toggleCategory('necessary')}
                />
                <Checkbox
                  label="Cookies analytiques"
                  checked={localConsent.analytics}
                  onChange={() => toggleCategory('analytics')}
                />
                <Checkbox
                  label="Cookies marketing"
                  checked={localConsent.marketing}
                  onChange={() => toggleCategory('marketing')}
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-500 hover:underline"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-semibold bg-sky-600 text-white rounded-md hover:bg-sky-700"
                >
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}