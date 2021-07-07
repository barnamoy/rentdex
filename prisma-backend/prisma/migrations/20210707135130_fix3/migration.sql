/*
  Warnings:

  - Added the required column `maxduration` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `maxduration` VARCHAR(255) NOT NULL;
