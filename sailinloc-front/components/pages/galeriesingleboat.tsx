"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { url } from "inspector";

interface SingleCarousselBoatProps {
  medias: Media[];
}

export const GalerieSingleBoat = ({ medias }: SingleCarousselBoatProps) => {
  const images = React.useMemo(
    () =>
      medias
        .filter((media) => !media.url.toLowerCase().endsWith(".pdf")) // exclure les pdf
        .slice(0, 6)
        .map((media) => media.url),
    [medias]
  );

  if (!medias || medias.length === 0) {
    return <p>Aucune image disponible</p>; // Gestion simple du cas sans image
  }

  return (
    <>
      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((imageUrl, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/">
                <div className="p-1">
                  <Card
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      {/* <span className="text-3xl font-semibold">
                        {index + 1}
                      </span> */}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};
