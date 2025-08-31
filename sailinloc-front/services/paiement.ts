// services/paiement.ts
export type EtatPaiement = "PAYE" | "EN_ATTENTE" | "ECHEC";
export type MethodePaiement = "CARD" | "PAYPAL" | "APPLE_PAY";

export type PaiementData = {
  reservationId: number;
  montant: string; // Decimal → string
  montantTotal: string; // Decimal → string
  methodePaiement: MethodePaiement; // "CARD" | "PAYPAL" | "APPLE_PAY"
  pourcentageStripe: string; // Decimal → string
  etatPaiement: EtatPaiement;
};

export const createPaiement = async (data: PaiementData, token: string) => {
  const res = await fetch("http://localhost:3001/api/paiements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Erreur lors du paiement");
  }
  return res.json(); // { message, paiement }
};

export async function checkIfPaid(
  reservationId: number,
  token: string
): Promise<boolean> {
  try {
    const res = await fetch(`/api/paiements/${reservationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Erreur lors de la vérification du paiement");
    const data = await res.json();
    return data.paye === true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
