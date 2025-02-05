import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import dz from "../db/dz";
import { accountsTable, sessionsTable, usersTable, verificationTable } from "../db/schema";
import { headers } from "next/headers";
import { createAuthMiddleware } from "better-auth/api";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
    trustedOrigins: ["http://localhost:3000"],
    database: drizzleAdapter((await dz()), {
        provider: "sqlite", // or "mysql", "sqlite"
        schema: {
            verification: verificationTable,
            user: usersTable,
            account: accountsTable,
            session: sessionsTable
        }
    }),
    emailAndPassword: {
        enabled: false,
    },
    socialProviders: {
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID || "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
        },
    },
});

export const GetSession = (async () => {
    const session = await auth.api.getSession({
        headers: headers(),
    });
    return session;
})