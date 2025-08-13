"use client";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table-user";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function GestionDesUtilisateursPage() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/utilisateur")
      .then((res) => res.json())
      .then((json) => {
        if (!json || !Array.isArray(json.utilisateurs)) {
          console.error("Format de données inattendu :", json);
          setLoading(false);
          return;
        }
        console.log(json.utilisateurs);
        setUtilisateurs(
          json.utilisateurs.map((user: any) => ({
            id: user.id,
            nomcomplet:
              `${user.nom ?? ""} ${user.prenom ?? ""}`.trim() || "Nom inconnu",
            nom: `${user.nom ?? ""}`.trim() || "Nom inconnu",
            prenom: `${user.prenom ?? ""}`.trim() || "Nom inconnu",
            email: user.email ?? "Email inconnu",
            telephone: user.telephone ?? "Non renseigné",
            adresse: user.adresse ?? "Non renseignée",
            role: user.role ?? "Non défini",
            nbbateau: user.nbbateau ?? 0,
            photoProfil: user.photoProfil ?? "",
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des utilisateurs :", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {loading ? (
                  <p className="text-center text-gray-500">Chargement...</p>
                ) : (
                  <DataTable data={utilisateurs} />
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
