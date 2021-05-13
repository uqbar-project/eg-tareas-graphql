import express from "express"
import cors from 'cors'
import { graphqlHTTP } from "express-graphql"
import schema from "../services/graphql/schema"

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

export default app
