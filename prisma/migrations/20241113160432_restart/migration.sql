-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "dozensAmount" DROP NOT NULL,
ALTER COLUMN "dozensAmount" DROP DEFAULT,
ALTER COLUMN "halfDozensAmount" DROP NOT NULL,
ALTER COLUMN "halfDozensAmount" DROP DEFAULT;
