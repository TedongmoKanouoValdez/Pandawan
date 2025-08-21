"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X, Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { addToast, ToastProvider } from "@heroui/toast";

type MultiSectionImageUploadProps = {
  onChangeSection1?: (files: File[]) => void;
  onChangeSection2?: (files: File[]) => void;
};

export function MultiSectionImageUpload({
  onChangeSection1,
  onChangeSection2,
}: MultiSectionImageUploadProps) {
  const [section1Images, setSection1Images] = useState<UploadedImage[]>([]);
  const [section2Images, setSection2Images] = useState<UploadedImage[]>([]);

  const section1InputRef = useRef<HTMLInputElement>(null);
  const section2InputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: 1 | 2
  ) => {
    const files = e.target.files;
    if (!files) return;

    const maxSizeInBytes = 10 * 1024 * 1024; // 10 Mo

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]; // pas de webp ni avif

    const validFiles: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      if (file.size > maxSizeInBytes) {
        addToast({
          title: "Information",
          description: `Le fichier ${file.name} dépasse 10 Mo et a été ignoré.`,
          color: "default",
        });
        continue;
      }

      if (!allowedTypes.includes(file.type)) {
        addToast({
          title: "Information",
          description: `Le format ${file.type} n'est pas autorisé (webp/avif interdits).`,
          color: "default",
        });
        continue;
      }

      validFiles.push({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (section === 1) {
      const updated = [...section1Images, ...validFiles].slice(0, 4);
      setSection1Images(updated);
      onChangeSection1?.(updated.map((img) => img.file));
    } else {
      const updated = [...section2Images, ...validFiles].slice(0, 5);
      setSection2Images(updated);
      onChangeSection2?.(updated.map((img) => img.file));
    }
  };

  const handleRemove = (index: number, section: 1 | 2) => {
    if (section === 1) {
      const updated = section1Images.filter((_, i) => i !== index);
      setSection1Images(updated);
      onChangeSection1?.(updated.map((img) => img.file));
    } else {
      const updated = section2Images.filter((_, i) => i !== index);
      setSection2Images(updated);
      onChangeSection2?.(updated.map((img) => img.file));
    }
  };

  return (
    <>
      <div className="flex flex-row space-x-2">
        {/* Section 1 */}
        <div className="w-full max-w-2xl rounded-xl border p-4">
          <h3 className="mb-4 text-lg font-medium">Section 1 (max 4 images)</h3>

          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={section1InputRef}
            onChange={(e) => handleImageUpload(e, 1)}
          />

          <div
            className="flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:bg-muted/50"
            onClick={() => section1InputRef.current?.click()}
          >
            <div className="text-center">
              <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Cliquez ou glissez-déposez ici
              </p>
              <p className="text-xs text-muted-foreground">Section 1</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            {section1Images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-40 overflow-hidden rounded-lg border group"
              >
                <Image
                  src={img.previewUrl}
                  alt={`Upload ${idx}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => handleRemove(idx, 1)}
                  className="absolute top-2 right-2 rounded-full bg-black/50 p-1 opacity-0 transition group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full max-w-2xl rounded-xl border p-4">
          <h3 className="mb-4 text-lg font-medium">Section 2 (max 5 images)</h3>

          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={section2InputRef}
            onChange={(e) => handleImageUpload(e, 2)}
          />

          <div
            className="flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:bg-muted/50"
            onClick={() => section2InputRef.current?.click()}
          >
            <div className="text-center">
              <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Cliquez ou glissez-déposez ici
              </p>
              <p className="text-xs text-muted-foreground">Section 2</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {section2Images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-32 overflow-hidden rounded-lg border group"
              >
                <Image
                  src={img.previewUrl}
                  alt={`Upload ${idx}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => handleRemove(idx, 2)}
                  className="absolute top-2 right-2 rounded-full bg-black/50 p-1 opacity-0 transition group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlus, X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

type UploadedImage = {
  file: File
  previewUrl: string
}

export function MultiSectionImageUpload() {
  const [section1Images, setSection1Images] = useState<UploadedImage[]>([])
  const [section2Images, setSection2Images] = useState<UploadedImage[]>([])

  const section1InputRef = useRef<HTMLInputElement>(null)
  const section2InputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: 1 | 2,
  ) => {
    const files = e.target.files
    if (!files) return

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    if (section === 1) {
      setSection1Images((prev) =>
        [...prev, ...newImages].slice(0, 4), // limite à 4 images
      )
    } else {
      setSection2Images((prev) =>
        [...prev, ...newImages].slice(0, 5), // limite à 5 images
      )
    }
  }

  const handleRemove = (index: number, section: 1 | 2) => {
    if (section === 1) {
      setSection1Images((prev) => prev.filter((_, i) => i !== index))
    } else {
      setSection2Images((prev) => prev.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="flex flex-row space-x-2">
      {/* Section 1 */}
      <div className="w-full max-w-2xl rounded-xl border p-4">
        <h3 className="mb-4 text-lg font-medium">Section 1 (max 4 images)</h3>

        <Input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={section1InputRef}
          onChange={(e) => handleImageUpload(e, 1)}
        />

        <div
          className="flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:bg-muted/50"
          onClick={() => section1InputRef.current?.click()}
        >
          <div className="text-center">
            <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Cliquez ou glissez-déposez ici</p>
            <p className="text-xs text-muted-foreground">Section 1</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {section1Images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-40 overflow-hidden rounded-lg border group"
            >
              <Image
                src={img.previewUrl}
                alt={`Upload ${idx}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => handleRemove(idx, 1)}
                className="absolute top-2 right-2 rounded-full bg-black/50 p-1 opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full max-w-2xl rounded-xl border p-4">
        <h3 className="mb-4 text-lg font-medium">Section 2 (max 5 images)</h3>

        <Input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={section2InputRef}
          onChange={(e) => handleImageUpload(e, 2)}
        />

        <div
          className="flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:bg-muted/50"
          onClick={() => section2InputRef.current?.click()}
        >
          <div className="text-center">
            <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Cliquez ou glissez-déposez ici</p>
            <p className="text-xs text-muted-foreground">Section 2</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {section2Images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-32 overflow-hidden rounded-lg border group"
            >
              <Image
                src={img.previewUrl}
                alt={`Upload ${idx}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => handleRemove(idx, 2)}
                className="absolute top-2 right-2 rounded-full bg-black/50 p-1 opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
