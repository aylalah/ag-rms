/*
  Warnings:

  - You are about to drop the column `rating` on the `Rating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `rating`,
    ADD COLUMN `ratingScore` INTEGER NULL;
