/*
  Warnings:

  - You are about to drop the column `createdAt` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `userinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderinfo` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `userinfo` DROP COLUMN `createdAt`,
    DROP COLUMN `done`;
