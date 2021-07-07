/*
  Warnings:

  - You are about to drop the column `key` on the `userinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userinfo` DROP COLUMN `key`,
    ADD COLUMN `uni` VARCHAR(191) NOT NULL DEFAULT '-1';
