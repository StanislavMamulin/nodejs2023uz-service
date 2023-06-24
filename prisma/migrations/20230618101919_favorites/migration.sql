/*
  Warnings:

  - You are about to drop the column `favoriteListId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteListId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteListId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoriteListId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoriteListId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoriteListId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoriteListId";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoriteListId";

-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "albums" TEXT[],
ADD COLUMN     "artists" TEXT[],
ADD COLUMN     "tracks" TEXT[];

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoriteListId";
