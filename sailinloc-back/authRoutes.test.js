// src/test/unitaires/utilisateurService.test.js
const fs = require("fs-extra");

// Mock de fs-extra AVANT d'importer le service
jest.mock("fs-extra", () => ({
  remove: jest.fn().mockResolvedValue(),       // simulation suppression
  readFile: jest.fn().mockResolvedValue(Buffer.from("fake image content")), // simulation lecture
  writeFile: jest.fn().mockResolvedValue(),    // simulation écriture si nécessaire
}));

// Mock Prisma
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      utilisateur: {
        create: jest.fn().mockResolvedValue({
          id: 1,
          email: "john.doe@example.com",
          nom: "Doe",
          prenom: "John",
        }),
      },
      $disconnect: jest.fn().mockResolvedValue(),
    })),
  };
});

// Import DU SERVICE APRÈS les mocks
const utilisateurService = require("../../services/utilisateurService");

describe("utilisateurService", () => {
  test("devrait créer un utilisateur avec des données valides", async () => {
    const data = {
      email: "john.doe@example.com",
      motDePasse: "Password123!", 
      nom: "Doe",
      prenom: "John",
    };

    const file = { path: "C:\\tmp\\fakepath.jpg" }; // mock du fichier

    const utilisateur = await utilisateurService.createUserWithPhoto(data, file);

    expect(utilisateur).toHaveProperty("id", 1);
    expect(utilisateur).toHaveProperty("email", "john.doe@example.com");
    expect(utilisateur).toHaveProperty("nom", "Doe");
    expect(utilisateur).toHaveProperty("prenom", "John");

    expect(fs.remove).not.toHaveBeenCalled();
  });
});
