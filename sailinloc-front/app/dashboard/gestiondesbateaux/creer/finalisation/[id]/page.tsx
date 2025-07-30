"use client";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@heroui/checkbox";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { MultiSectionImageUpload } from "@/components/pages/ImageUploadsSections";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { Alert } from "@heroui/alert";
import { addToast, ToastProvider } from "@heroui/toast";

export default function GestionDesBateauxCreerPage() {
  const [imagesSection1, setImagesSection1] = useState<File[]>([]);
  const [imagesSection2, setImagesSection2] = useState<File[]>([]);
  const [noCertificat, setNoCertificat] = useState(false);
  const [attestationFile, setAttestationFile] = useState<File | null>(null);
  const [certificatFile, setCertificatFile] = useState<File | null>(null);
  const [numeroPolice, setNumeroPolice] = useState<string>("");
  const params = useParams();
  const bateauId = params?.id;
  const [placement, setPlacement] = React.useState("top-center");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    imagesSection1.forEach((file) => formData.append("section1", file));
    imagesSection2.forEach((file) => formData.append("section2", file));

    if (attestationFile) formData.append("attestation1", attestationFile);

    formData.append("numeroPolice", numeroPolice);

    if (bateauId) {
      formData.append("bateauId", bateauId as string);
    }

    if (!noCertificat && certificatFile) {
      formData.append("certificat", certificatFile);
    } else {
      formData.append("noCertificat", "true");
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await fetch("http://localhost:3001/upload-documents", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);

      addToast({
        title: "Succès",
        description: "Les documents ont été envoyés avec succès.",
        color: "success",
      });
    } catch (err) {
      addToast({
        title: "Erreur",
        description: "Échec de l'envoi des documents.",
        color: "danger",
      });
    }
  };

  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider
          placement={placement}
          toastOffset={placement.includes("top") ? 60 : 0}
          toastProps={{
            radius: "lg",
            // color: "warning",
            variant: "flat",
            timeout: 9000,
          }}
        />
      </div>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col w-full mx-auto my-4 max-w-6xl">
                  <div className="w-full flex items-center my-3">
                    <Alert
                      color="warning"
                      title="Bonjour, Pour finaliser la création de votre bateau sur notre plateforme, il est nécessaire de compléter certaines informations importantes dans le formulaire dédié. Merci de bien vouloir remplir les sections suivantes :"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
                    <div className="text-lg font-bold mb-4">
                      Photos & médias
                    </div>
                    <div>
                      <MultiSectionImageUpload
                        onChangeSection1={setImagesSection1}
                        onChangeSection2={setImagesSection2}
                      />
                    </div>
                  </div>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
                    <div className="text-lg font-bold mb-4">
                      Informations administratives
                    </div>
                    <div className="grid gap-3 mb-4">
                      <label>Attestation d'assurance (PDF ou image)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          setAttestationFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-3 mb-4">
                        <label>Numéro de police d'assurance</label>
                        <Input
                          id="numero-police"
                          type="text"
                          onChange={(e) => setNumeroPolice(e.target.value)}
                          placeholder="Ex : 12345678-AB"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="grid gap-3 mb-4">
                        <label>Certificat de navigation (si applicable)</label>
                        <input
                          type="file"
                          accept=".pdf"
                          disabled={noCertificat}
                          onChange={(e) => {
                            if (e.target.files?.[0])
                              setCertificatFile(e.target.files[0]);
                          }}
                          className={`mt-2 ${noCertificat ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                        <div className="flex items-center mt-2">
                          <Checkbox
                            checked={noCertificat}
                            onChange={(e) => setNoCertificat(e.target.checked)}
                          >
                            Je ne possède pas de certificat
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-2 rounded shadow"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
