# Backend - GraphQL

## How to develop
```bash
npm run dev
```

You can access to `localhost:8080/graphql` to interact graphically with the API.

### Update the schema
As we're using typescript we can take advantage of `graphql-codegen` to automatically generate the graphql types for us, for that reason if you change the GraphQL schema you should run the following command to update the types:
```bash
npm run codegen
```

It will generate a file named `API.ts`.
