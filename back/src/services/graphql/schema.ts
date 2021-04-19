import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from "graphql-tools"
import resolvers from "./resolvers/resolvers"

const typeDefs = importSchema('**/*.graphql')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema
