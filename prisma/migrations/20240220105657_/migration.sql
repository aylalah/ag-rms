-- AlterTable
ALTER TABLE `Rating` MODIFY `supervisor` VARCHAR(191) NOT NULL,
    MODIFY `primaryAnalyst` VARCHAR(191) NULL,
    MODIFY `secondaryAnalyst` VARCHAR(191) NULL;
