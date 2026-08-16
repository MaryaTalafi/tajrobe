import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Ensure the fallback category "سایر" exists
  const fallbackCategory = await prisma.category.upsert({
    where: { slug: 'سایر' },
    update: {},
    create: {
      name: 'سایر',
      slug: 'سایر',
      isFallback: true,
    },
  });

  console.log('Fallback category seeded:', fallbackCategory);

  // You can seed more mock data here if you wish
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
