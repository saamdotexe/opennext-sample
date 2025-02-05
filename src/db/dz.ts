import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { getCloudflareContext } from "@opennextjs/cloudflare";

async function dz(): Promise<DrizzleD1Database> {
    let ctx = await getCloudflareContext()
    const db = drizzle(ctx.env.D1)
    return db
}

export default dz
