/*
  Warnings:

  - You are about to alter the column `issuedDate` on the `Rating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `expiryDate` on the `Rating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Rating` MODIFY `issuedDate` DATETIME(3) NULL,
    MODIFY `expiryDate` DATETIME(3) NULL;
