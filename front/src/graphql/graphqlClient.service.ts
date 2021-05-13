import { ApolloClient, InMemoryCache } from '@apollo/client'

const { REACT_APP_GRAPHQL_API_URL } = process.env

const apolloClient = new ApolloClient({
  uri: REACT_APP_GRAPHQL_API_URL,
  cache: new InMemoryCache()
})

export default apolloClient