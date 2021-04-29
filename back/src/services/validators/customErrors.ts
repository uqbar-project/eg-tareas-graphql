export const BAD_USER_INPUT = 'BAD_USER_INPUT'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'

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

export class GraphqlInternalServerError extends GraphqlError {
  constructor(message: string) {
    super(message, 'GraphqlInternalServerError', INTERNAL_SERVER_ERROR)
  }
}

export class GraphqlCustomError extends GraphqlError {
  constructor(name: string, message: string, code: string) {
    super(message, name, code)
  }
}
