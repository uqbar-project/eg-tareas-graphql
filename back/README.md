# Backend - GraphQL

## How to develop
To run the docker mongodb instance you have to run the following command:
```bash
docker-compose up
```

After that, you can run it locally with:
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
