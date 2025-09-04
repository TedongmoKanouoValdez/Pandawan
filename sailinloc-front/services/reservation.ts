// services/reservation.ts
export type ReservationData = {
  utilisateurId: number;
  bateauId: number;
  bateaunom: string;
  dateDebut: string;
  dateFin: string;
  plage?: string;
  numbreDePassage?: string;
  supplement?: string;
  prixDeBase?: number;
  prixSupplementPassagers?: number;
  prixOptionsPayantes?: number;
  Total?: number;
  heure?: string;
  data?: string;
};

export const createReservation = async (
  data: ReservationData,
  token: string
) => {
  const res = await fetch("http://localhost:3001/api/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erreur lors de la réservation");
  }

  return res.json(); // { message, reservation }
};
