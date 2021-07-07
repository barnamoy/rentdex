/*
  Warnings:

  - You are about to drop the column `israted` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `israted`,
    ADD COLUMN `isratedbydeliveryboy` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `isratedbyuser` INTEGER NOT NULL DEFAULT 0;
