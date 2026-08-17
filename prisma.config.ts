import 'dotenv/config';
import { defineConfig } from '@prisma/config';
import path from 'path';

export default defineConfig({
  studio: {
    port: 5555,
  },
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  }
});
