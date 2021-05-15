import { getTasksOfUserQuery, getTaskByIdQuery, createTask, updateTask, deleteTask } from "../graphql/queries/taskGraphqlQueries"
import { SessionService } from "./session.service"

async function getTasksOfUser() {
  const response = await getTasksOfUserQuery(SessionService.getCurrentUser()._id)
  return response.data.getUser.tasks
}

async function getTaskById(tareaId: string) {
  const response = await getTaskByIdQuery(tareaId)
  return response.data.getTask
}

async function crearTarea(tarea: any): Promise<void> {
  await createTask(tarea)
}

async function actualizarTarea(tarea: any): Promise<void> {
  await updateTask(tarea)
}

async function deleteTarea(tarea: any): Promise<void> {
  await deleteTask(tarea._id)
}

export const TareaService = { getTasksOfUser, getTaskById, crearTarea, actualizarTarea, deleteTarea }