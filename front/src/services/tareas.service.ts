import { getTasksOfUserQuery, getTasksByIdQuery } from "../graphql/queries/taskGraphqlQueries"
import { SessionService } from "./session.service"

async function getTasksOfUser() {
  const response = await getTasksOfUserQuery(SessionService.getCurrentUser()._id)
  return response.data.getUser.tasks
}

async function getTasksById(tareaId: string) {
  const response = await getTasksByIdQuery(tareaId)
  return response.data.getTask
}

export const TareaService = { getTasksOfUser, getTasksById }