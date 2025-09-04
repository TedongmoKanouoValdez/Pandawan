// components/GlobalLoader.tsx
"use client";
import { useEffect, useState } from "react";

export default function GlobalLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temps minimum d'affichage (ex: 2 secondes)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 11000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
