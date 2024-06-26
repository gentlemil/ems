# EMS - Employment Management System

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Urls:

1. Admin Page: https://admin-react-production-a6af.up.railway.app/
2. Website: https://website-nextjs-production.up.railway.app/
3.

## Application flow

```mermaid
---
title: Application flow
---
graph LR
    A[WEBSITE<br>NextJS] --> B[PRISMA<br>JS]
    B --> A

    B --> C[(DATABASE<br>Postgres)]
    C --> B

    D[BACKEND<br>NestJS] --> B
    B --> D

    D --> E[ADMIN<br>ReactJS]
    E --> D

    F(COMMON-UI)
```

```mermaid
---
title: Create and display Reviews
---
sequenceDiagram
    actor U as User
    participant W as Website
    participant P as Prisma
    participant DB as Database
    participant AP as Admin Panel
    actor A as Admin

    U->>W: Show reviews
    P-->>W: GET /api/reviews

    U->>+W: CreateReviewForm
    W-->>-P: POST review/add
    Note over W,P: revalidate cache and<br>navigate to /reviews page

    P->>DB: INSERT INTO Review
    Note over P,DB: with is_confirmed=false

    A->>+AP: GET /reviews
    AP->>+P: PATCH /reviews/${id}/confirm
    P-->>-DB: UPDATE
    Note over P,DB: with is_confirmed=true

    AP->>+P: DELETE /reviews/${id}
    P-->>-DB: DELETE
    Note over P,DB: remove record from db
```

## Running tasks

To execute tasks with Nx use the following syntax:

### WEBSITE (NextJS):

https://website-nextjs-production.up.railway.app/

```
npx nx serve website        // http://localhost:4200
npx nx storybook website    // ?

```

### BACKEND (NestJS):

```
npx nx serve backend      // http://localhost:3000
```

### ADMIN (ReactJS):

https://admin-react-production-9a32.up.railway.app/

```
npx nx serve admin        // http://localhost:4800
npx nx storybook admin    // http://localhost:4400
npx nx build admin
```

### COMMON-UI:

```
npx nx serve common-ui        // http://localhost:5173
npx nx storybook common-ui    // http://localhost:4600

```

### PRISMA:

If you want run database locally you need to create docker container by running a command:

```
docker compose up
```

then, if you want open prisma studio (localhost:5555) run:

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

If you want to migrate run:

```
npx nx run prisma-schema:migrate-dev
```

If you want to migrate currenctly made changes run:

```
cd libs/prisma-schema
export DATABASE_URL=<your_database_url>
npx nx run prisma-schema:migrate
```

If you want to plant seed data:

```
npx nx run prisma-client:seed
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
