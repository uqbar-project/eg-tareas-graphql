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
import { GraphqlInternalServerError, INTERNAL_SERVER_ERROR } from "services/validators/customErrors"

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

    describe('With valid fields', () => {
      beforeEach(async () => {
        await mongoTestEmptyDatabase()
      })
      it('it gets created successfully', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
                createUser(createUserInput: {
                  name: "prueba",
                  email: "prueba@gmail.com",
                  password: "admin",
                  picture: "https://i.imgur.com/OtVw3rL.png"
                }) {
                  _id
                  name
                  email
                  picture
                }
              }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result).data.createUser._id).toBeTruthy()
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            createUser: {
              name: "prueba",
              email: "prueba@gmail.com"
            }
          }
        })
        expect(await mongoTestFindUserByName('prueba')).toMatchObject({
          name: 'prueba',
          email: 'prueba@gmail.com',
          picture: "https://i.imgur.com/OtVw3rL.png",
          password: 'admin'
        })
      })
      it("you can't retrieve the password", async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
                createUser(createUserInput: {
                  name: "prueba",
                  email: "prueba@gmail.com",
                  password: "admin",
                  picture: "https://i.imgur.com/OtVw3rL.png"
                }) {
                  _id
                  name
                  email
                  password
                  picture
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
              password: null
            }
          }
        })
        expect(await mongoTestFindUserByName('prueba')).toMatchObject({
          name: 'prueba',
          email: 'prueba@gmail.com',
          password: 'admin'
        })
      })
    })

    it('With missing picture, it gets created successfully', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(createUserInput: {
              email: "prueba@gmail.com",
              name: "prueba",
              password: "admin"
            }) {
              _id
              name
              email
              password
              picture
            }
          }`
      })

      expect(result.status).toBe(200)
      expect(responseAsJSON(result).data.createUser._id).toBeTruthy()
      expect(responseAsJSON(result)).toMatchObject({
        data: {
          createUser: {
            name: "prueba",
            email: "prueba@gmail.com"
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
          createUser(createUserInput: {
            email: "prueba@gmail.com",
            password: "admin",
            picture: "https://i.imgur.com/OtVw3rL.png"
          }) {
              _id
              name
              email
              password
              picture
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "Field \"CreateUserInput.name\" of required type \"String!\" was not provided."
          }
        ]
      })

    })

    it('With missing email, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(createUserInput: {
              name: "prueba",
              password: "admin"
              picture: "https://i.imgur.com/OtVw3rL.png",
            }) {
              _id
              name
              email
              password
              picture
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "Field \"CreateUserInput.email\" of required type \"String!\" was not provided."
          }
        ]
      })
    })

    it('With missing password, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(createUserInput: {
              email: "prueba@gmail.com",
              name: "prueba",
              picture: "https://i.imgur.com/OtVw3rL.png"
            }) {
              _id
              name
              email
              password
              picture
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "Field \"CreateUserInput.password\" of required type \"String!\" was not provided.",
          }
        ]
      })
    })

    it('Without filled fields, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(createUserInput: {}) {
              _id
              name
              email
              password
              picture
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "Field \"CreateUserInput.name\" of required type \"String!\" was not provided.",
          },
          {
            message: "Field \"CreateUserInput.email\" of required type \"String!\" was not provided.",
          },
          {
            message: "Field \"CreateUserInput.password\" of required type \"String!\" was not provided.",
          }
        ]
      })
    })

    it('Without passing UserInput, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser {
              _id
              name
              email
              password
              picture
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: 'Field "createUser" argument "createUserInput" of type "CreateUserInput!" is required, but it was not provided.',
          }
        ]
      })
    })
  })

  // TODO: Revisar este test
  describe("If the connection with the database can't be established", () => {
    beforeEach(async () => {
      mockedDatabase.getDBConnection.mockImplementation(() => {
        throw new GraphqlInternalServerError('There was an error while accessing the database')
      })
      await mongoTestEmptyDatabase()
    })

    it('And you try to create a new user with valid fields, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            createUser(createUserInput: {
              name: "prueba",
              email: "prueba@gmail.com",
              password: "admin",
              picture: "https://i.imgur.com/OtVw3rL.png"
            }) {
              _id
              name
              email
              password
              picture
            }
          }`
      })

      expect(result.status).toBe(200)
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "There was an error while accessing the database",
            extensions: {
              code: INTERNAL_SERVER_ERROR
            }
          }
        ]
      })
    })
  })
})
