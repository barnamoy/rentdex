-- CreateTable
CREATE TABLE `rent` (
    `rentid` INTEGER NOT NULL AUTO_INCREMENT,
    `giverid` INTEGER NOT NULL,
    `takerid` INTEGER NOT NULL,
    `adid` INTEGER NOT NULL,
    `done` BOOLEAN NOT NULL,

    PRIMARY KEY (`rentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
