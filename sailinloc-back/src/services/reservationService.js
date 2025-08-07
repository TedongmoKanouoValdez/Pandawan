// import prisma from "../config/prismaClient.js"; // ou ton client DB si autre que Prisma

// export const createReservationService = async ({
//   utilisateurId,
//   bateauId,
//   dateDebut,
//   dateFin,
//   statut = "EN_ATTENTE",
//   extras,
//   prixTotal,
// }) => {
//   // Ajoute ici toutes les validations nécessaires

//   const reservation = await prisma.reservation.create({
//     data: {
//       utilisateurId,
//       bateauId,
//       dateDebut: new Date(dateDebut),
//       dateFin: new Date(dateFin),
//       statut,
//       prixTotal,
//       extras: {
//         createMany: {
//           data: extras.map((extra) => ({
//             nom: extra,
//           })),
//         },
//       },
//     },
//     include: {
//       extras: true,
//     },
//   });

//   return reservation;
// };
