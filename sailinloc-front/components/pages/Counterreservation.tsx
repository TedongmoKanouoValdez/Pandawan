"use client";

import React, { useState, useMemo, useEffect } from "react";

interface CounterProps {
  min?: number;
  max?: number;
  initialValue?: number;
  baseNumber: number; // nombre de référence
  multiplier1: number;
  multiplier2: number;
  onResult?: (result: number) => void;
  onValueChange?: (value: number) => void;
}

export default function Counter({
  min = 0,
  max = Infinity,
  initialValue = 0,
  baseNumber,
  multiplier1,
  multiplier2,
  onResult,
  onValueChange,
}: CounterProps) {
  const [value, setValue] = useState<number>(initialValue);

  const increment = () => {
    setValue((prev) => (prev + 1 > max ? max : prev + 1));
  };

  const decrement = () => {
    setValue((prev) => (prev - 1 < min ? min : prev - 1));
  };

  useEffect(() => {
    onValueChange?.(value);

    if (multiplier1 === 0 || value <= baseNumber) {
      onResult?.(0); // aucune opération
    } else {
      const extraPassengers = value - baseNumber; // ex: base=5, value=7 → extra=2
      const result = extraPassengers * multiplier1 * multiplier2;
      // const result = (value - baseNumber) * multiplier1 * multiplier2;
      onResult?.(result);
    }
  }, [value, baseNumber, multiplier1, multiplier2, onResult, onValueChange]);

  return (
    <div className="relative flex items-center max-w-[11rem]">
      {/* Bouton - */}
      <button
        type="button"
        onClick={decrement}
        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 
                       dark:border-gray-600 hover:bg-gray-200 border border-gray-300 
                       rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 
                       focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-3 h-3 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>

      {/* Input */}
      <input
        type="text"
        value={value}
        readOnly
        className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium 
                       text-center text-gray-900 text-sm focus:ring-blue-500 
                       focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                       dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      {/* Label */}
      <div
        className="absolute bottom-1 start-1/2 -translate-x-1/2 
                          rtl:translate-x-1/2 flex items-center text-xs 
                          text-gray-400 space-x-1 rtl:space-x-reverse"
      >
        <svg
          className="w-2.5 h-2.5 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
          />
        </svg>
        <span>passager</span>
      </div>

      {/* Bouton + */}
      <button
        type="button"
        onClick={increment}
        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 
                       dark:border-gray-600 hover:bg-gray-200 border border-gray-300 
                       rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 
                       focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-3 h-3 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
}
