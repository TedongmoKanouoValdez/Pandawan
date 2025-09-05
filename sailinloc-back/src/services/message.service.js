const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Récupérer les messages d'un utilisateur (reçus ou envoyés)
 */
exports.getMessagesForUser = async (
  userId,
  type = "recus",
  skip = 0,
  take = 20
) => {
  if (!userId) throw new Error("userId est requis");

  let where = {};
  if (type === "recus") {
    where = { destinataireId: userId };
  } else if (type === "envoyes") {
    where = { expediteurId: userId };
  } else {
    throw new Error("Type invalide (utilise 'recus' ou 'envoyes')");
  }

  return prisma.message.findMany({
    where,
    include: {
      expediteur: {
        select: { id: true, nom: true, prenom: true, email: true },
      },
      destinataire: {
        select: { id: true, nom: true, prenom: true, email: true },
      },
      reservation: true,
      bateau: true,
    },
    orderBy: { dateEnvoi: "desc" },
    skip,
    take,
  });
};

/**
 * Marquer un message comme lu
 */
exports.markMessageAsRead = async (messageId, userId) => {
  if (!messageId || !userId) throw new Error("messageId et userId sont requis");

  const message = await prisma.message.findUnique({ where: { id: messageId } });

  if (!message) throw new Error("Message introuvable");
  if (message.destinataireId !== userId) {
    throw new Error("Accès interdit : vous n'êtes pas le destinataire");
  }

  return prisma.message.update({
    where: { id: messageId },
    data: { lu: true },
  });
};

/**
 * Créer un message
 */
exports.createMessage = async ({
  expediteurId,
  destinataireId,
  contenu,
  object,
  reservationId,
  bateauId,
}) => {
  if (!expediteurId || !contenu)
    throw new Error("expediteurId et contenu sont requis");

  return prisma.message.create({
    data: {
      expediteurId,
      destinataireId,
      reservationId: reservationId || null,
      bateauId: bateauId || null,
      contenu,
      object: object || null,
      dateEnvoi: new Date(),
    },
  });
};
