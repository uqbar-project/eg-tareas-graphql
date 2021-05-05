/*
  Si, muy polemico tener un user validator en vez de una clase de dominio.
  Para esta aplicacion en particular me parece overkill tener clases
  de dominio porque al ser un dominio muy acotado casi no tienen comportamiento.
*/

import { ObjectId } from "mongodb"
import { UserInput } from "../graphql/generated/API"
import { GraphqlBadRequest } from "./customErrors"

function validateUserOnCreate(userInput: UserInput): void {
  // TODO: Updatear el schema para no tener q hacer esta validacion
  if (!userInput) {
    throw new GraphqlBadRequest('User information must be provided')
  }

  if (userInput.name.length > 80) {
    throw new GraphqlBadRequest('El nombre debe tener como máximo 80 caracteres')
  }

  if (userInput.email.length > 62) {
    throw new GraphqlBadRequest('El nombre debe tener como máximo 62 caracteres')
  }

  if (userInput.password.length > 128) {
    throw new GraphqlBadRequest('La contraseña debe tener como máximo 128 caracteres')
  }
}

function validateUserId(userId: string): void {
  if (!ObjectId.isValid(userId)) {
    throw new GraphqlBadRequest('Malformatted user id')
  }
}

export const UserValidator = { validateUserOnCreate, validateUserId }
