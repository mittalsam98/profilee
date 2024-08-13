/*
  Warnings:

  - A unique constraint covering the columns `[userId,adhocLinkId]` on the table `LinkAnalytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LinkAnalytics_userId_adhocLinkId_key" ON "LinkAnalytics"("userId", "adhocLinkId");
