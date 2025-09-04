/*
  Warnings:

  - The values [VIREMENT] on the enum `MethodePaiement` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."MethodePaiement_new" AS ENUM ('CARTE', 'APPLE_PAY', 'PAYPAL');
ALTER TYPE "public"."MethodePaiement" RENAME TO "MethodePaiement_old";
ALTER TYPE "public"."MethodePaiement_new" RENAME TO "MethodePaiement";
DROP TYPE "public"."MethodePaiement_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."TypeMedia" ADD VALUE 'CONTRAT';
ALTER TYPE "public"."TypeMedia" ADD VALUE 'RECUS';
