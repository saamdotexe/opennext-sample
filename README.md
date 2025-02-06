# Repro

A reproducible example of a bug with opennexjs/cloudflare@>=0.4

⚠️ Note: I used Discord as an authentication provider, but you can use any provider you want from the list of supported ones on [Better Auth's documentation](https://www.better-auth.com/docs/introduction)

If you change provider update the files at:

- `src/components/SignIn.tsx`
- `src/utils/auth.ts`

## Setup

1. Create `.env.local` and `.dev.vars` files with the following content:

    ```env
    NEXTJS_ENV=development
    BETTER_AUTH_URL=http://localhost:3000 #Base URL of your app
    BETTER_AUTH_SECRET="XXXX"

    CLOUDFLARE_ACCOUNT_ID="XXX"
    CLOUDFLARE_DATABASE_ID="XXX"
    CLOUDFLARE_API_TOKEN="XXX"

    DISCORD_CLIENT_ID="XXX"
    DISCORD_CLIENT_SECRET="XXX"
    ```

2. Run `pnpm install` to install dependencies

3. Run `pnpm db:local` to create and apply migrations to the local D1 database

4. Run `pnpm dev` to start the development server
