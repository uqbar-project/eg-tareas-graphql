import { getTasksOfUserQuery, getTaskByIdQuery, createTask, updateTask, deleteTask } from "../graphql/queries/taskGraphqlQueries"

async function getTasksOfUser(userId: string) {
  const response = await getTasksOfUserQuery(userId)
  return response.data.getUser.tasks
}

async function getTaskById(tareaId: string) {
  const response = await getTaskByIdQuery(tareaId)
  return response.data.getTask
}

async function crearTarea(tarea: any, userId: string): Promise<void> {
  await createTask(tarea, userId)
}

async function actualizarTarea(tarea: any): Promise<void> {
  await updateTask(tarea)
}

async function deleteTarea(tarea: any): Promise<void> {
  await deleteTask(tarea._id)
}

export const TareaService = { getTasksOfUser, getTaskById, crearTarea, actualizarTarea, deleteTarea }