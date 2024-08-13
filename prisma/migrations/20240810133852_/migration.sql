/*
  Warnings:

  - A unique constraint covering the columns `[adhocLinkId]` on the table `LinkAnalytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LinkAnalytics_adhocLinkId_key" ON "LinkAnalytics"("adhocLinkId");
