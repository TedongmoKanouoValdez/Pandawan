"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/payment/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payement-success?amount=${amount}`,
      },
    });

    if (error) setErrorMessage(error.message);
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  stripe.confirmCardPayment(clientSecret).then(() => {
  router.push("/contrat-location?bookingId=123"); // passe un identifiant
});

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Paiement sécurisé
          </h2>
          <p className="text-sm text-gray-500">
            Finalisez votre réservation avec Stripe
          </p>
        </div>

        {clientSecret && <PaymentElement id="stripe-payment-element" />}

        {errorMessage && (
          <div className="text-sm text-red-600 text-center">{errorMessage}</div>
        )}

        <button
          disabled={!stripe || loading}
          className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition duration-200 ${
            loading || !stripe
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-900"
          }`}
        >
          {loading ? "Traitement..." : `Payer ${amount.toFixed(2)} €`}
        </button>

        <div className="text-xs text-center text-gray-400 mt-2">
          Transaction sécurisée via Stripe
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
