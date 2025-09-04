const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getMessagesForUser = async (
  userId,
  type = "recus",
  skip = 0,
  take = 20
) => {
  const where =
    type === "recus" ? { expediteurId: userId } : { destinataireId: userId };
  return prisma.message.findMany({
    where,
    include: {
      expediteur: { select: { id: true, nom: true, email: true } },
      destinataire: { select: { id: true, nom: true, email: true } },
      reservation: true,
      bateau: true,
    },
    orderBy: { dateEnvoi: "desc" },
    skip,
    take,
  });
};

exports.markMessageAsRead = async (messageId, userId) => {
  const message = await prisma.message.findUnique({ where: { id: messageId } });
  if (!message || message.destinataireId !== userId) {
    throw new Error("Accès refusé ou message introuvable");
  }
  return prisma.message.update({
    where: { id: messageId },
    data: { lu: true },
  });
};

exports.createMessage = async ({
  expediteurId,
  destinataireId,
  contenu,
  reservationId,
  bateauId,
}) => {
  return prisma.message.create({
    data: {
      expediteurId,
      destinataireId,
      contenu,
      reservationId,
      bateauId,
    },
  });
};
