-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiciosDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `servicioId` INTEGER NOT NULL,
    `articuloId` INTEGER NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bonos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `precio` DECIMAL(65, 30) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BonosDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bonoId` INTEGER NOT NULL,
    `articuloId` INTEGER NULL,
    `servicioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BonosUso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bonoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BonosUsoDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bonoUsoId` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `identificador` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    UNIQUE INDEX `Ticket_identificador_key`(`identificador`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketDetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketId` INTEGER NOT NULL,
    `servicioId` INTEGER NULL,
    `articuloId` INTEGER NULL,
    `bonoId` INTEGER NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiciosDetalle` ADD CONSTRAINT `ServiciosDetalle_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiciosDetalle` ADD CONSTRAINT `ServiciosDetalle_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `Articulo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonosDetalle` ADD CONSTRAINT `BonosDetalle_bonoId_fkey` FOREIGN KEY (`bonoId`) REFERENCES `Bonos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonosDetalle` ADD CONSTRAINT `BonosDetalle_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `Articulo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonosDetalle` ADD CONSTRAINT `BonosDetalle_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonosUso` ADD CONSTRAINT `BonosUso_bonoId_fkey` FOREIGN KEY (`bonoId`) REFERENCES `Bonos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonosUsoDetalle` ADD CONSTRAINT `BonosUsoDetalle_bonoUsoId_fkey` FOREIGN KEY (`bonoUsoId`) REFERENCES `BonosUso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketDetalle` ADD CONSTRAINT `TicketDetalle_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketDetalle` ADD CONSTRAINT `TicketDetalle_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketDetalle` ADD CONSTRAINT `TicketDetalle_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `Articulo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketDetalle` ADD CONSTRAINT `TicketDetalle_bonoId_fkey` FOREIGN KEY (`bonoId`) REFERENCES `Bonos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
