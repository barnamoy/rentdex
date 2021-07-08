/*
  Warnings:

  - You are about to drop the column `rent` on the `payment` table. All the data in the column will be lost.
  - Added the required column `advertisementid` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `rent`,
    ADD COLUMN `advertisementid` INTEGER NOT NULL;
