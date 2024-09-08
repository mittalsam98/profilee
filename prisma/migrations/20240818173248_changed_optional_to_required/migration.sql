/*
  Warnings:

  - Made the column `hideBranding` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enableShareButton` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `primaryBackgroundColor` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `primaryBackgroundImage` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fontFamily` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondaryBackgroundColor` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondaryBackgroundImage` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `useSecondaryBackground` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkCardShadow` on table `GeneralAppearance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pic` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bioColor` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bioFontSize` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titleColor` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titleFontSize` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePicBorder` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GeneralAppearance" ALTER COLUMN "hideBranding" SET NOT NULL,
ALTER COLUMN "enableShareButton" SET NOT NULL,
ALTER COLUMN "primaryBackgroundColor" SET NOT NULL,
ALTER COLUMN "primaryBackgroundImage" SET NOT NULL,
ALTER COLUMN "fontFamily" SET NOT NULL,
ALTER COLUMN "secondaryBackgroundColor" SET NOT NULL,
ALTER COLUMN "secondaryBackgroundImage" SET NOT NULL,
ALTER COLUMN "useSecondaryBackground" SET NOT NULL,
ALTER COLUMN "linkCardShadow" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "pic" SET NOT NULL,
ALTER COLUMN "bioColor" SET NOT NULL,
ALTER COLUMN "bioFontSize" SET NOT NULL,
ALTER COLUMN "titleColor" SET NOT NULL,
ALTER COLUMN "titleFontSize" SET NOT NULL,
ALTER COLUMN "profilePicBorder" SET NOT NULL;
