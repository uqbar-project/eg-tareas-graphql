import { getTasksOfUserQuery, getTaskByIdQuery, createTask, updateTask } from "../graphql/queries/taskGraphqlQueries"
import { SessionService } from "./session.service"

async function getTasksOfUser() {
  const response = await getTasksOfUserQuery(SessionService.getCurrentUser()._id)
  return response.data.getUser.tasks
}

async function getTaskById(tareaId: string) {
  const response = await getTaskByIdQuery(tareaId)
  return response.data.getTask
}

async function actualizarTarea(tarea: any){
  const a = await updateTask(tarea)
  console.log(a)
}

async function crearTarea(tarea: any){
  createTask(tarea)
}

export const TareaService = { getTasksOfUser, getTaskById, actualizarTarea, crearTarea }