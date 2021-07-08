/*
  Warnings:

  - Added the required column `duration` to the `rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rent` ADD COLUMN `duration` INTEGER NOT NULL;
