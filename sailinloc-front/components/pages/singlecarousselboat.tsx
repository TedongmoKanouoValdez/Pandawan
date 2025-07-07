import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export const SingleCarousselBoat = () => {
  return (
    <>
      <section>
        <div className="h-screen pb-2 pt-2 w-full">
          <LayoutGrid cards={cards} />
        </div>
      </section>
    </>
  );
};

const cards = [
  {
    id: 1,
    content: "",
    className: "md:col-span-2 contentsingleimageboat",
    thumbnail:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020271/yachts-dans-le-port-de-monaco_ivlnh1.jpg",
  },
  {
    id: 2,
    content: "",
    className: "col-span-1 contentsingleimageboat",
    thumbnail:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751020192/yachts-de-luxe-dans-un-port-le-soir_1_vmgidd.jpg",
  },
  {
    id: 3,
    content: "",
    className: "col-span-1 contentsingleimageboat",
    thumbnail:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1750699720/dji-0392-scaled_wpckgh.jpg",
  },
  {
    id: 4,
    content: "",
    className: "md:col-span-2 contentsingleimageboat",
    thumbnail:
      "https://res.cloudinary.com/dluqkutu8/image/upload/v1751324971/soleil_xb95vo.jpg",
  },
];
