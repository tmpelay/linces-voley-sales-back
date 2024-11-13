/*
  Warnings:

  - You are about to drop the column `dozenAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `halfDozenAmount` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dozenAmount",
DROP COLUMN "halfDozenAmount",
ADD COLUMN     "dozensAmount" INTEGER,
ADD COLUMN     "halfDozensAmount" INTEGER;
