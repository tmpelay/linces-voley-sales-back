/*
  Warnings:

  - Made the column `active` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "dozenAmount" DROP NOT NULL,
ALTER COLUMN "halfDozenAmount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "active" SET NOT NULL;
