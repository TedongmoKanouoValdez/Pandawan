"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { FooterWrapper } from "@/components/FooterWrapper";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/dashboard", "/dashboard/gestiondesbateaux", "/dashboard/gestiondesbateaux/creer"]; // Ajoute d'autres routes ici

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <div className="relative flex flex-col h-screen">
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
      {!shouldHideNavbar && <FooterWrapper />}
    </div>
  );
}
