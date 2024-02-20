/*
  Warnings:

  - You are about to alter the column `ratingYear` on the `Rating` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Rating` MODIFY `ratingYear` INTEGER NULL;
