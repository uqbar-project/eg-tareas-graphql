import { gql } from '@apollo/client'
import apolloClient from '../graphqlClient.service'

export const loginUserQuery = async (email: string, password: string) => (
  apolloClient.mutate({
    mutation: gql`
      mutation {
        loginUser(userCredentialsInput:{
          email:"${email}"
          password:"${password}"
        }){
          _id
          name
          email
      }
    }`
  })
)
