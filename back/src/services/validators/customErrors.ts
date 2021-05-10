export const BAD_USER_INPUT = 'BAD_USER_INPUT'
export const NOT_FOUND = 'NOT_FOUND'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
// TODO: Usar un nombre un poco mas copado 
export const DB_UNKNOWN_ERROR = 'DB_UNKNOWN_ERROR'

abstract class GraphqlError extends Error {
  extensions: { code: string }

  constructor(message: string, name: string, code: string) {
    super(message)
    this.name = name
    this.extensions = { code }
  }
}

export class GraphqlBadRequest extends GraphqlError {
  constructor(message: string) {
    super(message, "GraphqlBadRequest", BAD_USER_INPUT)
  }
}

export class GraphQLNotFound extends GraphqlError {
  constructor(message: string){
    super(message, "GraphqlNotFound", NOT_FOUND)
  }
}

export class GraphqlInternalServerError extends GraphqlError {
  constructor(message: string) {
    super(message, 'GraphqlInternalServerError', INTERNAL_SERVER_ERROR)
  }
}

export class GraphqlDBUnknownError extends GraphqlError {
  constructor() {
    super('There was an unknown error while hitting the database', 'GraphqlDBUnknownError', DB_UNKNOWN_ERROR)
  }
}

export class GraphqlCustomError extends GraphqlError {
  constructor(name: string, message: string, code: string) {
    super(message, name, code)
  }
}
