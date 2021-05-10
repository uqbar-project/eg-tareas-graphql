import { ObjectId } from "bson"
import { CreateTaskInput, UpdateTaskInput } from "../graphql/generated/API"
import { GraphqlBadRequest } from "./customErrors"

function validateTaskOnAdd(createTaskInput: CreateTaskInput): void {
  if (createTaskInput.title.length > 40) {
    throw new GraphqlBadRequest('El título debe tener como máximo 40 caracteres')
  }

  if (createTaskInput.description.length > 255) {
    throw new GraphqlBadRequest('La descripción debe tener como máximo 255 caracteres')
  }
}

function validateTaskOnUpdate(updateTaskInput: UpdateTaskInput): void {
  if (updateTaskInput.title) {
    if (updateTaskInput.title.length > 40) {
      throw new GraphqlBadRequest('El título debe tener como máximo 40 caracteres')
    }
  }

  if (updateTaskInput.description) {
    if (updateTaskInput.description.length > 255) {
      throw new GraphqlBadRequest('La descripción debe tener como máximo 255 caracteres')
    }
  }

  if (!ObjectId.isValid(updateTaskInput._id)) {
    throw new GraphqlBadRequest('Malformatted user id')
  }
}

export const TaskValidator = { validateTaskOnAdd, validateTaskOnUpdate }
