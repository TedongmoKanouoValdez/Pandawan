/*
  Warnings:

  - You are about to drop the column `prix` on the `Bateau` table. All the data in the column will be lost.
  - You are about to drop the column `portArriver` on the `DetailsBateau` table. All the data in the column will be lost.
  - You are about to drop the column `portDeplacement` on the `DetailsBateau` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Utilisateur_telephone_key";

-- AlterTable
ALTER TABLE "public"."Bateau" DROP COLUMN "prix",
ALTER COLUMN "slug" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "public"."DetailsBateau" DROP COLUMN "portArriver",
DROP COLUMN "portDeplacement",
ADD COLUMN     "PassagersInclusDansLePrix" TEXT,
ADD COLUMN     "SupplementParPassagerSupplémentaire" TEXT,
ADD COLUMN     "moteur" TEXT,
ADD COLUMN     "reservoirCarburant" TEXT,
ADD COLUMN     "reservoirEau" TEXT;

-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "Total" DECIMAL(65,30),
ADD COLUMN     "heure" TEXT,
ADD COLUMN     "numbreDePassage" TEXT,
ADD COLUMN     "plage" TEXT,
ADD COLUMN     "prixDeBase" DECIMAL(65,30),
ADD COLUMN     "prixOptionsPayantes" DECIMAL(65,30),
ADD COLUMN     "prixSupplementPassagers" DECIMAL(65,30),
ADD COLUMN     "supplement" TEXT,
ADD COLUMN     "urlRecu" TEXT;
