/*
  Warnings:

  - Made the column `dozensAmount` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `halfDozensAmount` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "dozensAmount" SET NOT NULL,
ALTER COLUMN "dozensAmount" SET DEFAULT 0,
ALTER COLUMN "halfDozensAmount" SET NOT NULL,
ALTER COLUMN "halfDozensAmount" SET DEFAULT 0;
