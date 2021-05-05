import { TaskInput } from "../graphql/generated/API"
import { GraphqlBadRequest } from "./customErrors"

function validateTaskOnAdd(taskInput: TaskInput): void {
  if (taskInput.title.length > 40) {
    throw new GraphqlBadRequest('El título debe tener como máximo 40 caracteres')
  }

  if (taskInput.description.length > 255) {
    throw new GraphqlBadRequest('La descripción debe tener como máximo 255 caracteres')
  }
}

export const TaskValidator = { validateTaskOnAdd }
