/*
  Warnings:

  - You are about to drop the column `category` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `seller` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `selleremail` on the `item` table. All the data in the column will be lost.
  - You are about to drop the `userinfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postedby` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `category`,
    DROP COLUMN `seller`,
    DROP COLUMN `selleremail`,
    ADD COLUMN `postedby` INTEGER NOT NULL;

-- DropTable
DROP TABLE `userinfo`;
