/*
  Warnings:

  - You are about to drop the column `linkCardSahdow` on the `GeneralAppearance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GeneralAppearance" DROP COLUMN "linkCardSahdow",
ADD COLUMN     "linkCardShadow" TEXT;
