/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_telephone_key" ON "Utilisateur"("telephone");
