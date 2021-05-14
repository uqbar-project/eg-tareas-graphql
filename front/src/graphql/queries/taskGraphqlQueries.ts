import { gql } from '@apollo/client'
import apolloClient from '../graphqlClient.service'

export const getTasksOfUserQuery = async (userId: string) => (
  apolloClient.query({
    query: gql`{
      getUser(userId: "${userId}"){
        tasks{
          _id
          title
          description
          priority
        }
      }
    }`
  })
)
