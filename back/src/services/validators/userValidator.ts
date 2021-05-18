/*
  Si, muy polemico tener un user validator en vez de una clase de dominio.
  Para esta aplicacion en particular me parece overkill tener clases
  de dominio porque al ser un dominio muy acotado casi no tienen comportamiento.
*/

import { ObjectId } from "mongodb"
import { CreateUserInput, UpdateUserInput } from "../graphql/generated/API"
import { GraphqlBadRequest } from "./customErrors"

function validateUserOnCreate(createUserInput: CreateUserInput): void {

  if (createUserInput.name.length > 80) {
    throw new GraphqlBadRequest('El nombre debe tener como máximo 80 caracteres')
  }

  if (createUserInput.email.length > 62) {
    throw new GraphqlBadRequest('El email debe tener como máximo 62 caracteres')
  }

  if (createUserInput.password.length > 128) {
    throw new GraphqlBadRequest('La contraseña debe tener como máximo 128 caracteres')
  }
}

function validateUserId(userId: string): void {
  if (!ObjectId.isValid(userId)) {
    throw new GraphqlBadRequest('Malformatted user id')
  }
}

export function validateUserOnUpdate(updateUserInput: UpdateUserInput): void {

  if (updateUserInput.name && updateUserInput.name.length > 80) {
    throw new GraphqlBadRequest('El nombre debe tener como máximo 80 caracteres')
  }

  if (updateUserInput.email && updateUserInput.email.length > 62) {
    throw new GraphqlBadRequest('El nombre debe tener como máximo 62 caracteres')
  }
}

export const UserValidator = { validateUserOnUpdate, validateUserOnCreate, validateUserId }
