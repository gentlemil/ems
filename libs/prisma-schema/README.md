# prisma-schema

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build prisma-schema` to build the library.

If you want open prisma studio (localhost:5555) run:

```
cd libs/prisma-schema
export DATABASE_URL=<your_database_url>
npx nx run prisma-schema:studio
```

If you want to generate prisma types (automatically file prisma-schema/prisma/generated/zod/index.ts will be updated) run:

```
cd libs/prisma-schema
export DATABASE_URL=<your_database_url>
npx nx run prisma-schema:generate-types
```
