import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COMMON_FAVORITES_ID = 1;

async function main() {
  await prisma.favorites.upsert({
    where: { id: COMMON_FAVORITES_ID },
    create: {
      albums: [],
      artists: [],
      tracks: [],
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
