import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ----------------------------------------------------- AUTH

export const usersTable = sqliteTable("user", {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: integer({ mode: 'boolean' }).notNull(),
    image: text(),
    createdAt: integer({ mode: 'timestamp' }).notNull(),
    updatedAt: integer({ mode: 'timestamp' }).notNull(),
    stripeCustomerId: text()
});

export type UserRow = typeof usersTable.$inferSelect

export const sessionsTable = sqliteTable("session", {
    id: text().primaryKey(),
    expiresAt: integer({ mode: 'timestamp' }).notNull(),
    token: text().notNull().unique(),
    createdAt: integer({ mode: 'timestamp' }).notNull(),
    updatedAt: integer({ mode: 'timestamp' }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text().notNull().references(() => usersTable.id),
    browser: text(),
    os: text(),
    language: text(),
    timezone: text()
});

export type SessionRow = typeof sessionsTable.$inferSelect

export const accountsTable = sqliteTable("account", {
    id: text().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text().notNull().references(() => usersTable.id),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: integer({ mode: 'timestamp' }),
    refreshTokenExpiresAt: integer({ mode: 'timestamp' }),
    scope: text(),
    password: text(),
    createdAt: integer({ mode: 'timestamp' }).notNull(),
    updatedAt: integer({ mode: 'timestamp' }).notNull()
});

export type AccountRow = typeof accountsTable.$inferSelect

export const verificationTable = sqliteTable("verification", {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: integer({ mode: 'timestamp' }).notNull(),
    createdAt: integer({ mode: 'timestamp' }),
    updatedAt: integer({ mode: 'timestamp' })
});

export type VerificationRow = typeof verificationTable.$inferSelect
