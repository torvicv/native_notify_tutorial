-- AlterTable
ALTER TABLE `BonosUso` ADD COLUMN `clienteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `BonosUso` ADD CONSTRAINT `BonosUso_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
