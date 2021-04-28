/*
  Si, muy polemico tener un user validator en vez de una clase de dominio.
  Para esta aplicacion en particular me parece overkill tener clases
  de dominio porque al ser un dominio muy acotado casi no tienen comportamiento.
*/
import { ObjectId } from "mongodb"
import { UserInput } from "../graphql/generated/API"

//TODO: Tipar errores de negocio
function validateUserOnCreate(userInput: UserInput): void {
  if (!userInput) {
    //FIXME!! https://i.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.webp
    const error: any = Error('User information must be provided')
    error.extensions = { code: "BAD_USER_INPUT" }
    throw error
  }

  if (userInput.name.length > 80) {
    const error: any = Error('El nombre debe tener como máximo 80 caracteres')
    error.extensions = { code: "BAD_USER_INPUT" }
    throw error
  }

  if (userInput.email.length > 62) {
    const error: any = Error('El nombre debe tener como máximo 62 caracteres')
    error.extensions = { code: "BAD_USER_INPUT" }
    throw error
  }

  if (userInput.password.length > 128) {
    const error: any = Error('La contraseña debe tener como máximo 128 caracteres')
    error.extensions = { code: "BAD_USER_INPUT" }
    throw error
  }
}

function validateUserId(userId: any){
  if (!ObjectId.isValid(userId)          	){
    const error: any = Error('Malformatted user id')
    error.extensions = {code: "BAD_USER_INPUT"}
    throw error
  }           
}

export const UserValidator = { validateUserOnCreate, validateUserId }
