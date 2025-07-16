const express = require("express");
const router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const bateau = await prisma.bateau.create({
      data: {
        nom: data.nomBateau,
        modele: data.modeleMarque,
        port: data.portattache || "Port inconnu",
        prix: data.tarifbateau || new Prisma.Decimal("0"), // à adapter si tu as un prix
        description: data.description,
        datesIndisponibles: JSON.stringify(data.indisponibilites || []),
        disponibilite: true,
        proprietaireId: null, // À remplacer par l’ID réel

        details: {
          create: {
            longueur: parseFloat(data.longueur) || null,
            largeur: parseFloat(data.largeur) || null,
            tirantEau: parseFloat(data.tirantEau) || null,
            capaciteMax: parseInt(data.capaciteMax) || null,
            nombreCabines: parseInt(data.nombreCabines) || null,
            nombreCouchages: parseInt(data.nombreCouchages) || null,
            equipements: JSON.stringify(data.equipementsInclus || []),
            optionsPayantes: JSON.stringify(data.tags || []),
            zonesNavigation: data.zonesNavigation || "",
            politiqueAnnulation: data.politiqueAnnulation || "",
            locationSansPermis: !!data.locationSansPermis,
            numeroPoliceAssurance: data.numeroPoliceAssurance || "",
            certificatNavigation: data.certificatNavigation || "",
            contact: JSON.stringify(data.contact || {}),
            portdedepart: data.portdepart || "",
            portdarriver: data.portarriver || "",
          },
        },
      },
    });

    res.status(201).json({ success: true, bateau, bateauId: bateau._id || bateau.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du bateau" });
  }
});

// GET /bateaux - récupérer tous les bateaux
router.get("/", async (req, res) => {
  try {
    const bateaux = await prisma.bateau.findMany({
      include: {
        details: true,
      },
    });
    res.json({ success: true, bateaux });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des bateaux" });
  }
});

// GET /bateaux/:id - récupérer un bateau par ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const bateauExistant = await prisma.bateau.findUnique({
      where: { id: parseInt(id) },
      include: { details: true },
    });

    if (!bateauExistant) {
      return res.status(404).json({ error: "Bateau non trouvé" });
    }

    const updateData = {
      nom: data.nomBateau,
      modele: data.modeleMarque,
      port: data.portattache,
      prix: new Prisma.Decimal(data.tarifbateau || "0"),
      description: data.description,
      datesIndisponibles: JSON.stringify(data.indisponibilites || []),
      disponibilite: data.disponibilite ?? true,
    };

    const detailsPayload = {
      longueur: parseFloat(data.longueur) || null,
      largeur: parseFloat(data.largeur) || null,
      tirantEau: parseFloat(data.tirantEau) || null,
      capaciteMax: parseInt(data.capaciteMax) || null,
      nombreCabines: parseInt(data.nombreCabines) || null,
      nombreCouchages: parseInt(data.nombreCouchages) || null,
      equipements: JSON.stringify(data.equipementsInclus || []),
      optionsPayantes: JSON.stringify(data.tags || []),
      zonesNavigation: data.zonesNavigation || "",
      politiqueAnnulation: data.politiqueAnnulation || "",
      locationSansPermis: !!data.locationSansPermis,
      numeroPoliceAssurance: data.numeroPoliceAssurance || "",
      certificatNavigation: data.certificatNavigation || "",
      contact: JSON.stringify(data.contact || {}),
    };

    if (bateauExistant.details) {
      updateData.details = {
        update: detailsPayload,
      };
    } else {
      updateData.details = {
        create: detailsPayload,
      };
    }

    const bateau = await prisma.bateau.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: { details: true },
    });

    res.json({ success: true, bateau });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du bateau" });
  }
});


// PUT /bateaux/:id - mettre à jour un bateau
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const bateau = await prisma.bateau.update({
      where: { id: parseInt(id) },
      data: {
        nom: data.nomBateau,
        modele: data.modeleMarque,
        port: data.portattache,
        prix: new Prisma.Decimal(data.tarifbateau || "0"),
        description: data.description,
        datesIndisponibles: JSON.stringify(data.indisponibilites || []),
        disponibilite: data.disponibilite ?? true,
        details: {
          update: {
            longueur: parseFloat(data.longueur) || null,
            largeur: parseFloat(data.largeur) || null,
            tirantEau: parseFloat(data.tirantEau) || null,
            capaciteMax: parseInt(data.capaciteMax) || null,
            nombreCabines: parseInt(data.nombreCabines) || null,
            nombreCouchages: parseInt(data.nombreCouchages) || null,
            equipements: JSON.stringify(data.equipementsInclus || []),
            optionsPayantes: JSON.stringify(data.tags || []),
            zonesNavigation: data.zonesNavigation || "",
            politiqueAnnulation: data.politiqueAnnulation || "",
            locationSansPermis: !!data.locationSansPermis,
            numeroPoliceAssurance: data.numeroPoliceAssurance || "",
            certificatNavigation: data.certificatNavigation || "",
            contact: JSON.stringify(data.contact || {}),
          },
        },
      },
    });

    res.json({ success: true, bateau });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du bateau" });
  }
});

// DELETE /bateaux/:id - supprimer un bateau
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.detailsBateau.deleteMany({ where: { bateauId: parseInt(id) } });

    await prisma.bateau.delete({ where: { id: parseInt(id) } });

    res.json({ success: true, message: "Bateau supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du bateau" });
  }
});


module.exports = router;
