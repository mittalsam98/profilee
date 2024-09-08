/*
  Warnings:

  - You are about to drop the column `picBorder` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "generalAppearanceId" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "picBorder",
ADD COLUMN     "profilePicBorder" TEXT;

-- CreateTable
CREATE TABLE "GeneralAppearance" (
    "id" TEXT NOT NULL,
    "hideBranding" BOOLEAN DEFAULT false,
    "enableShareButton" BOOLEAN DEFAULT true,
    "primaryBackgroundColor" TEXT DEFAULT '#fff',
    "primaryBackgroundImage" TEXT,
    "fontFamily" TEXT,
    "linkCardSahdow" TEXT,
    "useSecondaryBackfround" BOOLEAN DEFAULT false,
    "secondaryBackgroundColor" TEXT DEFAULT '#fff',
    "secondaryBackgroundImage" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GeneralAppearance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneralAppearance_userId_key" ON "GeneralAppearance"("userId");

-- AddForeignKey
ALTER TABLE "GeneralAppearance" ADD CONSTRAINT "GeneralAppearance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
