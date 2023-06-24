/*
  Warnings:

  - You are about to alter the column `createdAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,0)` to `BigInt`.
  - You are about to alter the column `updatedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,0)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE BIGINT,
ALTER COLUMN "updatedAt" SET DATA TYPE BIGINT;
