//TODO: Capaz se puede hacer una interfaz
export class GraphqlBadRequest extends Error {
  extensions: { code: string }

  constructor(message: string) {
    super(message)
    this.name = "GraphqlBadRequest"
    this.extensions = { code: 'BAD_USER_INPUT' }
  }
}

export class GraphqlInternalServerError extends Error {
  extensions: { code: string }

  constructor(message: string) {
    super(message)
    this.name = "GraphqlInternalServerError"
    this.extensions = { code: 'INTERNAL_SERVER_ERROR' }
  }
}

export class GraphqlCustomError extends Error {
  extensions: { code: string }

  constructor(name: string, message: string, code: string) {
    super(message)
    this.name = name
    this.extensions = { code }
  }
}
