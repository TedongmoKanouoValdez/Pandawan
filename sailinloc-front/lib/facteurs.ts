// lib/facteurs.ts

export function trouverFacteurs(nombre: number, precision = 2) {
  const resultats: { facteur: number; valeur: number }[] = [];

  for (let facteur = 2; facteur <= 10; facteur++) {
    const valeur = nombre / facteur;
    const valeurArrondie = parseFloat(valeur.toFixed(precision));

    if (
      parseFloat((valeurArrondie * facteur).toFixed(precision)) ===
      parseFloat(nombre.toFixed(precision))
    ) {
      resultats.push({ facteur, valeur: valeurArrondie });
    }
  }

  return resultats;
}
