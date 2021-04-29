import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from "graphql-tools"
import resolvers from "./resolvers/resolvers"

const typeDefs = importSchema('**/*.graphql')

const directiveResolvers = {
    isPrivate(next: any){
        return next().then(() => undefined)
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers
})

export default schema
