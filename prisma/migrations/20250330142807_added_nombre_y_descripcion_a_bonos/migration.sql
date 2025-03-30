/*
  Warnings:

  - Added the required column `descripcion` to the `Bonos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Bonos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bonos` ADD COLUMN `descripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL;
