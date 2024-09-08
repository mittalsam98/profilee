/*
  Warnings:

  - You are about to drop the `LinkTheme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LinkTheme" DROP CONSTRAINT "LinkTheme_adhocLinkId_fkey";

-- DropTable
DROP TABLE "LinkTheme";

-- DropEnum
DROP TYPE "PropertSize";

-- DropEnum
DROP TYPE "TextAlign";
