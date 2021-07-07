-- CreateTable
CREATE TABLE `cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `user` INTEGER NOT NULL,
    `orderNo` INTEGER NOT NULL DEFAULT 0,
    `done` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `imgurl` VARCHAR(100) NOT NULL,
    `seller` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seller` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `store_name` VARCHAR(191) NOT NULL,
    `phone` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderinfo` (
    `userid` INTEGER NOT NULL,
    `addressid` VARCHAR(191) NOT NULL,
    `orderid` INTEGER NOT NULL AUTO_INCREMENT,
    `completed` INTEGER NOT NULL DEFAULT 0,
UNIQUE INDEX `orderinfo.orderid_unique`(`orderid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userinfo` (
    `name` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` VARCHAR(20) NOT NULL,
    `email` VARCHAR(20) NOT NULL,
    `id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
