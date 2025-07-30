import { Image } from "@heroui/image";

type ImageType = {
  id: number;
  url: string;
  titre: string;
};

export default function VeiwsGalerieBoatDashbordSectionOne({
  images,
}: {
  images: ImageType[];
}) {
  // On filtre d'abord les images valides
  const filteredImages = images.filter((img) =>
    /\.(jpe?g|png|webp|gif)$/i.test(img.url)
  );

  const sectionOne = filteredImages.slice(0, 4);
  const sectionTwo = filteredImages.slice(4, 10);

  return (
    <>
      <div className="flex flex-row space-x-2">
        <div className="w-full max-w-2xl rounded-xl border p-4">
          <h3 className="mb-4 text-lg font-medium">Section 1 (max 4 images)</h3>
          <div className="grid grid-cols-2 gap-2">
            {sectionOne.map((img) => (
              <Image
                key={img.id}
                alt={img.titre}
                src={img.url}
                width={300}
                className="h-[17rem]"
              />
            ))}
          </div>
        </div>
        <div className="w-full max-w-2xl rounded-xl border p-4">
          <h3 className="mb-4 text-lg font-medium">Section 1 (max 6 images)</h3>
          <div className="grid grid-cols-2 gap-2">
            {sectionTwo.map((img) => (
              <Image
                key={img.id}
                alt={img.titre}
                src={img.url}
                width={300}
                className="h-[17rem]"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
