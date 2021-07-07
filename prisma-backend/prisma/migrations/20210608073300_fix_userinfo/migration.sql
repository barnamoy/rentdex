/*
  Warnings:

  - The primary key for the `userinfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uni` on the `userinfo` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `userinfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Int`.

*/
-- AlterTable
ALTER TABLE `userinfo` DROP PRIMARY KEY,
    DROP COLUMN `uni`,
    ADD COLUMN `orderid` VARCHAR(20) NOT NULL DEFAULT 'None',
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
