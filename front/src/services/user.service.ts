import { loginUserQuery, getUserQuery } from "../graphql/queries/loginGraphqlQueries"

async function loginUser(email: string, password: string) {
  const response = await loginUserQuery(email, password)
  return response.data.loginUser
}

async function getFullUserProfile(userId: string){
  const response = await getUserQuery(userId)
  return response.data.getUser
}

export const UserService = { loginUser, getFullUserProfile }