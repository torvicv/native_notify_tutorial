-- AlterTable
ALTER TABLE `BonosUsoDetalle` ADD COLUMN `articuloId` INTEGER NULL,
    ADD COLUMN `servicioId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `BonosUsoDetalle` ADD CONSTRAINT `BonosUsoDetalle_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonosUsoDetalle` ADD CONSTRAINT `BonosUsoDetalle_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `Articulo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
