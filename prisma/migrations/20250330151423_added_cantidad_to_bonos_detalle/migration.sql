/*
  Warnings:

  - Added the required column `cantidad` to the `BonosDetalle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BonosDetalle` ADD COLUMN `cantidad` INTEGER NOT NULL;
