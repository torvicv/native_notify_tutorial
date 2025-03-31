/*
  Warnings:

  - A unique constraint covering the columns `[ticketDetalleId]` on the table `BonosUso` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `BonosUso` ADD COLUMN `ticketDetalleId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `BonosUso_ticketDetalleId_key` ON `BonosUso`(`ticketDetalleId`);

-- AddForeignKey
ALTER TABLE `BonosUso` ADD CONSTRAINT `BonosUso_ticketDetalleId_fkey` FOREIGN KEY (`ticketDetalleId`) REFERENCES `TicketDetalle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
