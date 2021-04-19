import express from "express"
import { graphqlHTTP } from "express-graphql"
import schema from "./services/graphql/schema"
import dotenv from "dotenv"

dotenv.config()


const app = express()
const port = process.env.PORT || 8080

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  }))

  app.listen(port, () => {
    console.log(`server started on port ${port}`)
  })
