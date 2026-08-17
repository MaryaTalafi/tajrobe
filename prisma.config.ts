import 'dotenv/config';
import { defineConfig } from '@prisma/config';
import path from 'path';

export default defineConfig({
<<<<<<< HEAD


  datasource: {
    url: process.env.POSTGRES_PRISMA_URL,
    }
=======
  earlyAccess: true,
  studio: {
    port: 5555,
  },
  migrations: {
    url: process.env.POSTGRES_PRISMA_URL,
    directUrl: process.env.POSTGRES_URL_NON_POOLING,
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.POSTGRES_PRISMA_URL,
    directUrl: process.env.POSTGRES_URL_NON_POOLING,
  }
>>>>>>> 79f796c46f97d72b8b729b2e477ec179efa309db
});
