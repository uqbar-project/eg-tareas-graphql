import { loginUserQuery, getUserQuery, updateUserQuery } from "../graphql/queries/loginGraphqlQueries"

async function loginUser(email: string, password: string) {
  const response = await loginUserQuery(email, password)
  return response.data.loginUser
}

async function getFullUserProfile(userId: string){
  const response = await getUserQuery(userId)
  return response.data.getUser
}

async function updateUser(user: any){
  const response = await updateUserQuery(user)
  return response.data.updateUser
}

export const UserService = { loginUser, getFullUserProfile, updateUser }