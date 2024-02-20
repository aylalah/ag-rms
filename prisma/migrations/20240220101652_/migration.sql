/*
  Warnings:

  - You are about to drop the column `issuedDate` on the `Rating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `issuedDate`,
    ADD COLUMN `issueDate` DATETIME(3) NULL;
