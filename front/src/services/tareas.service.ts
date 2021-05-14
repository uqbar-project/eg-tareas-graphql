import { getTasksOfUserQuery } from "../graphql/queries/taskGraphqlQueries"
import { SessionService } from "./session.service"

async function getTasksOfUser() {
  const response = await getTasksOfUserQuery(SessionService.getCurrentUser()._id)
  return response.data.getUser.tasks
}

export const TareaService = { getTasksOfUser }