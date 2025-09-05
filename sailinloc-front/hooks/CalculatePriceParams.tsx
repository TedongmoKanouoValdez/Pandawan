type ForfaitType = "demi-journee" | "jour" | "weekend" | "semaine" | "mois";

interface CalculatePriceParams {
  forfait: ForfaitType;
  selectedPrice: number; // prix par unité du forfait
  fullRange: Date[]; // tableau des dates sélectionnées
}

export const calculatePrice = ({
  forfait,
  selectedPrice,
  fullRange,
}: CalculatePriceParams): number => {
  const totalDays = fullRange.length;

  switch (forfait) {
    case "demi-journee":
      // chaque jour = 2 demi-journées
      return selectedPrice * totalDays * 2;

    case "jour":
      return selectedPrice * totalDays;

    case "weekend":
      // considérer que 1 weekend = 2 jours minimum
      return selectedPrice * Math.ceil(totalDays / 2);

    case "semaine":
      // 1 semaine = 7 jours, arrondi au-dessus
      return selectedPrice * Math.ceil(totalDays / 7);

    case "mois":
      // 1 mois = 30 jours, arrondi au-dessus
      return selectedPrice * Math.ceil(totalDays / 30);

    default:
      return 0; // fallback
  }
};
