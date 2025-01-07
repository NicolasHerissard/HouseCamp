-- CreateTable
CREATE TABLE `villes_france_free` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ville_departement` VARCHAR(191) NULL,
    `ville_slug` VARCHAR(191) NULL,
    `ville_nom` VARCHAR(191) NULL,
    `ville_nom_simple` VARCHAR(191) NULL,
    `ville_nom_reel` VARCHAR(191) NULL,
    `ville_nom_soundex` VARCHAR(191) NULL,
    `ville_nom_metaphone` VARCHAR(191) NULL,
    `ville_code_postal` VARCHAR(191) NULL,
    `ville_mairie` VARCHAR(191) NULL,
    `ville_latitude_deg` DOUBLE NULL,
    `ville_longitude_deg` DOUBLE NULL,
    `ville_population_2010` INTEGER NULL,
    `ville_population_1999` INTEGER NULL,
    `ville_population_2012` INTEGER NULL,
    `ville_densite_2010` INTEGER NULL,
    `ville_surface` DOUBLE NULL,
    `ville_region` VARCHAR(191) NULL,
    `ville_arrondissement` VARCHAR(191) NULL,
    `ville_canton` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
