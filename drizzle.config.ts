import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import path from 'path';
import fs from 'fs';


config({ path: '.dev.vars' });


function getLocalD1DB() {
    console.log('🔍  Searching for .sqlite file in .wrangler directory...');
    const basePath = path.resolve('.wrangler');
    const dbFile = fs
        .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
        .find((f) => f.endsWith('.sqlite'));
    console.log(`📁  Found ${dbFile} in ${basePath}`);

    if (!dbFile) {
        throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
}

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'sqlite',
    ...(process.env.NEXTJS_ENV === 'production' || process.env.MIGRATING === "true"
        ? {
            driver: 'd1-http',
            dbCredentials: {
                accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
                databaseId: process.env.CLOUDFLARE_DATABASE_ID,
                token: process.env.CLOUDFLARE_API_TOKEN,
            },
        }
        : {
            dbCredentials: {
                url: getLocalD1DB()
            }
        })
});
