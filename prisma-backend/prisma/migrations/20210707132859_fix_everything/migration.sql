/*
  Warnings:

  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deliveryboy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seller` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` VARCHAR(255) NOT NULL,
    ADD COLUMN `phone` VARCHAR(255) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- DropTable
DROP TABLE `cart`;

-- DropTable
DROP TABLE `deliveryboy`;

-- DropTable
DROP TABLE `orderinfo`;

-- DropTable
DROP TABLE `seller`;
