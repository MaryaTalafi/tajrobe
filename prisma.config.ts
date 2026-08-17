import 'dotenv/config';
import { defineConfig } from '@prisma/config';
import path from 'path';

export default defineConfig({


  datasource: {
    url: process.env.POSTGRES_PRISMA_URL,
    }
});
