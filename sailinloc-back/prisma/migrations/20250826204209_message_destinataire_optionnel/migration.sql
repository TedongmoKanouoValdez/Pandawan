-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_destinataireId_fkey";

-- AlterTable
ALTER TABLE "public"."Message" ALTER COLUMN "destinataireId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_destinataireId_fkey" FOREIGN KEY ("destinataireId") REFERENCES "public"."Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
