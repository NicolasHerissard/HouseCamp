-- CreateTable
CREATE TABLE `Equipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentProperties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_id` INTEGER NOT NULL,
    `equipment_id` INTEGER NOT NULL,

    UNIQUE INDEX `EquipmentProperties_property_id_key`(`property_id`),
    UNIQUE INDEX `EquipmentProperties_equipment_id_key`(`equipment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EquipmentProperties` ADD CONSTRAINT `EquipmentProperties_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `Properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentProperties` ADD CONSTRAINT `EquipmentProperties_equipment_id_fkey` FOREIGN KEY (`equipment_id`) REFERENCES `Equipments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
