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
      }
    }`
  })
)

export const getUserQuery = async (userId: string) => (
  apolloClient.query({
    query: gql` 
    query {
      getUser(userId: "${userId}"){
        _id
        name
        email
        picture
      }
    }`
  })
)

export const updateUserQuery = async ({ _id, email, name }: any) => (
  apolloClient.mutate({
    mutation: gql`
      mutation {
        updateUser(updateUserInput:{
          _id: "${_id}"
          email:"${email}"
          name:"${name}"
        }){
          _id
      }
    }`
  })
)
