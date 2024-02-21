/*
  Warnings:

  - Made the column `ratingYear` on table `Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Rating` MODIFY `ratingYear` INTEGER NOT NULL;
