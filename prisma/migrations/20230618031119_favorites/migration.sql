-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[],

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);
