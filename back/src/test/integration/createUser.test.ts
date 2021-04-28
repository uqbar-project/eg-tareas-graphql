import {
  getTestDBConnection,
  mongoTestDBIsEmpty,
  mongoTestCloseConnection,
  mongoTestFindUserByName,
  mongoTestEmptyDatabase
} from "../utils/databaseTestConfig"
import request from "supertest"
import app from "../../api/app"
import * as dbConfig from "services/database/databaseConfig"
import { responseAsJSON } from "../utils/supertestUtils"
import { InternalServerResponse } from "http-errors-response-ts/lib"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Create User - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })

  describe('When we try to create a user', () => {
    beforeEach(async () => {
      await mongoTestEmptyDatabase()
    })
    it('With valid fields, it gets created successfully', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
              createUser(userInput: {name: "prueba", email: "prueba@gmail.com", password: "admin"}) {
                _id
                name
                email
                password
              }
            }`
      })

      expect(result.status).toBe(200)
      expect(responseAsJSON(result).data.createUser._id).toBeTruthy()
      expect(responseAsJSON(result)).toMatchObject({
        data: {
          createUser: {
            name: "prueba",
            email: "prueba@gmail.com",
            password: "admin"
          }
        }
      })
      expect(await mongoTestFindUserByName('prueba')).toMatchObject({
        name: 'prueba',
        email: 'prueba@gmail.com',
        password: 'admin'
      })
    })

    it('With missing name, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation { 
          createUser(userInput: {email: "prueba@gmail.com", password: "admin"}) {
              _id
              name
              email
              password
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "The user must have a name",
            extensions: { code: "BAD_USER_INPUT" }
          }
        ]
      })

    })

    it('With missing email, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(userInput: {name: "prueba", password: "admin"}) {
              _id
              name
              email
              password
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "The user must have an email",
            extensions: {
              code: "BAD_USER_INPUT"
            }
          }
        ]
      })
    })

    it('With missing password, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(userInput: {email: "prueba@gmail.com", name: "prueba"}) {
              _id
              name
              email
              password
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "The user must have an email",
            extensions: {
              code: "BAD_USER_INPUT"
            }
          }
        ]
      })
    })

    it('Without filled fields, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(userInput: {}) {
              _id
              name
              email
              password
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "User information must be provided",
            extensions: {
              code: "BAD_USER_INPUT"
            }
          }
        ]
      })
    })

    it('Without passing UserInput, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser() {
              _id
              name
              email
              password
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "User information must be provided",
            extensions: {
              code: "BAD_USER_INPUT"
            }
          }
        ]
      })
    })
  })

  describe("If the connection with the database can't be established", () => {
    beforeEach(async () => {
      mockedDatabase.getDBConnection.mockImplementation(() => {
        throw new InternalServerResponse('There was an error while accessing the database')
      })
      await mongoTestEmptyDatabase()
    })

    it('And you try to create a new user with valid fields, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(userInput: {name: "prueba", email: "prueba@gmail.com", password: "admin"}) {
              _id
              name
              email
              password
            }
          }`
      })

      expect(result.status).toBe(200)
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "There was an error while accessing the database",
            extensions: {
              code: "INTERNAL_SERVER_ERROR"
            }
          }
        ]
      })
    })
  })
})
