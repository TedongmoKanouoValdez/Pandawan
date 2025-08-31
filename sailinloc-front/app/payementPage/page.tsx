"use client";

import React from "react";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

// Vérification de la clé publique Stripe
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function Home() {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount");
  const amount = amountParam ? parseFloat(amountParam) : 0;

  return (
    <main
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dluqkutu8/image/upload/v1751362027/4847236_rplbu1.jpg')`,
      }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0  z-0" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-3xl mx-auto p-6 text-black text-center mt-20 backdrop-blur-md rounded-xl shadow-lg">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-black drop-shadow">
            SailingLoc
          </h1>
          <h2 className="text-2xl drop-shadow">
            a demandé le paiement de
            <span className="font-bold"> {amount.toFixed(2)} €</span>
          </h2>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "eur",
          }}
          
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </main>
  );
}
