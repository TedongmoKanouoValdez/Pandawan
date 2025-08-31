"use client";

import { RiLoader2Line } from "react-icons/ri";
import { useEffect, useState } from "react";

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 6000); // 6 secondes
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // cache le loader après 6s

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <RiLoader2Line className="w-12 h-12 animate-spin text-blue-600" />
      <span className="mt-4 text-lg font-semibold">
        Chargement de SailingLoc...
      </span>
    </div>
  );
}
