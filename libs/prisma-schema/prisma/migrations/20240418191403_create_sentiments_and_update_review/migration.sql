/*
  Warnings:

  - Added the required column `sentiment` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "sentiment" "Sentiment" NOT NULL;
