/*
  Warnings:

  - You are about to drop the column `useSecondaryBackfround` on the `GeneralAppearance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GeneralAppearance" DROP COLUMN "useSecondaryBackfround",
ADD COLUMN     "useSecondaryBackground" BOOLEAN DEFAULT false;
