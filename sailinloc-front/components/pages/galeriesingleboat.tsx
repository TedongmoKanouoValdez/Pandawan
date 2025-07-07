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

export const GalerieSingleBoat = () => {
  const images = [
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1751567990/vue-interieure-du-bateau_zhknc1.jpg",
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1751567990/interieur-du-bateau_kbzepn.jpg",
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1751567990/une-visite-en-bateau-a-travers-une-grotte-marine-pittoresque_gie4af.jpg",
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1751567990/interieur-de-maison-en-bois-photorealiste-avec-decor-et-meubles-en-bois_qggmxz.jpg",
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1751567990/vue-interieure-du-bateau_1_kswehc.jpg",
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1751567989/a-l-interieur-du-yacht-volant-et-vue-sur-l-ocean_koowxp.jpg",
  ];
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
