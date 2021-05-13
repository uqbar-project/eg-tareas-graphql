import { loginUserQuery } from "../graphql/queries/loginGraphqlQueries"

async function loginUser(email: string, password: string) {
  const response = await loginUserQuery(email, password)
  return response.data.loginUser
}

export const UserService = { loginUser }