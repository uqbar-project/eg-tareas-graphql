import {
  getTestDBConnection,
  mongoTestDBIsEmpty,
  mongoTestCloseConnection,
  mongoTestFindUserByName,
  mongoTestEmptyDatabase,
  mongoTestAddUser
} from "../utils/databaseTestConfig"
import request from "supertest"
import app from "../../api/app"
import * as dbConfig from "services/database/databaseConfig"
import { responseAsJSON } from "../utils/supertestUtils"
import { GraphqlInternalServerError, INTERNAL_SERVER_ERROR } from "services/validators/customErrors"
import { dbTask2, idTask2, idUser1 } from "test/utils/dbData"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Update User - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })

  describe('When we try to update a user', () => {
    beforeEach(async () => {
      await mongoTestEmptyDatabase()

      await mongoTestAddUser({
        _id: idUser1,
        name: "Usuario 1",
        email: "usuario1@gmail.com",
        password: "usuario1",
        picture: "https://i.imgur.com/OtVw3rL.png",
        tasks: [
          dbTask2
        ]
      })
    })

    describe('With valid fields', () => {
      beforeEach(async () => {
        await mongoTestEmptyDatabase()

        await mongoTestAddUser({
          _id: idUser1,
          name: "Usuario 1",
          email: "usuario1@gmail.com",
          password: "usuario1",
          picture: "https://i.imgur.com/OtVw3rL.png",
          tasks: [
            dbTask2
          ]
        })
      })
      it('it gets updated successfully', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
              updateUser(updateUserInput: {
                _id: "${idUser1.toHexString()}",
                name: "prueba",
                email: "prueba@gmail.com"
                picture: "https://i.imgur.com/mrk3BVJ.jpg",
              }) {
                  _id
                  name
                  email
                  picture
                }
              }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result).data.updateUser._id).toBeTruthy()
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            updateUser: {
              name: "prueba",
              email: "prueba@gmail.com",
              picture: "https://i.imgur.com/mrk3BVJ.jpg"
            }
          }
        })
        expect(await mongoTestFindUserByName('prueba')).toMatchObject({
          name: 'prueba',
          email: 'prueba@gmail.com',
          picture: "https://i.imgur.com/mrk3BVJ.jpg"
        })
      })
      it("you can't retrieve the password", async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
            updateUser(updateUserInput: {
              _id: "${idUser1.toHexString()}",
              name: "prueba",
              email: "prueba@gmail.com",
              picture: "https://i.imgur.com/mrk3BVJ.jpg"
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
        expect(responseAsJSON(result).data.updateUser._id).toBeTruthy()
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            updateUser: {
              name: "prueba",
              email: "prueba@gmail.com",
              password: null,
              picture: "https://i.imgur.com/mrk3BVJ.jpg"
            }
          }
        })
        expect(await mongoTestFindUserByName('prueba')).toMatchObject({
          name: 'prueba',
          email: 'prueba@gmail.com',
          password: "usuario1",
          picture: "https://i.imgur.com/mrk3BVJ.jpg"
        })
      })
    })
    it('With missing name, it gets updated successfully', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation { 
          updateUser(updateUserInput: {
            _id: "${idUser1.toHexString()}",
            email: "prueba@gmail.com",
            picture: "https://i.imgur.com/mrk3BVJ.jpg"
          }) {
              _id
              name
              email
              picture
              tasks {
                _id
                title
                description
                priority
              }
            }
          }`
      })

      expect(result.status).toBe(200)
      expect(responseAsJSON(result).data.updateUser._id).toBeTruthy()
      expect(responseAsJSON(result)).toMatchObject({
        data: {
          updateUser: {
            name: "Usuario 1",
            email: "prueba@gmail.com",
            picture: "https://i.imgur.com/mrk3BVJ.jpg",
            tasks: [
              {
                _id: idTask2.toHexString(),
                title: "Tarea 2",
                description: "Esta es la tarea 2",
                priority: 0
              }
            ]
          }
        }
      })
      expect(await mongoTestFindUserByName('Usuario 1')).toMatchObject({
        name: 'Usuario 1',
        email: 'prueba@gmail.com',
        password: "usuario1",
        picture: "https://i.imgur.com/mrk3BVJ.jpg",
        tasks: [
          {
            _id: idTask2,
            title: "Tarea 2",
            description: "Esta es la tarea 2",
            priority: 0
          }
        ]
      })
    })

    it('With missing email, it gets updated successfully', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
          updateUser(updateUserInput: {
            _id: "${idUser1.toHexString()}",
            name: "prueba",
            picture: "https://i.imgur.com/mrk3BVJ.jpg"
          }) {
              _id
              name
              email
              picture
              tasks {
                _id
                title
                description
                priority
              }
            }
          }`
      })

      expect(result.status).toBe(200)
      expect(responseAsJSON(result).data.updateUser._id).toBeTruthy()
      expect(responseAsJSON(result)).toMatchObject({
        data: {
          updateUser: {
            name: "prueba",
            email: "usuario1@gmail.com",
            picture: "https://i.imgur.com/mrk3BVJ.jpg",
            tasks: [
              {
                _id: idTask2.toHexString(),
                title: "Tarea 2",
                description: "Esta es la tarea 2",
                priority: 0
              }
            ]
          }
        }
      })
      expect(await mongoTestFindUserByName('prueba')).toMatchObject({
        name: 'prueba',
        email: 'usuario1@gmail.com',
        password: "usuario1",
        picture: "https://i.imgur.com/mrk3BVJ.jpg",
        tasks: [
          {
            _id: idTask2,
            title: "Tarea 2",
            description: "Esta es la tarea 2",
            priority: 0
          }
        ]
      })
    })

    it('Without filled fields, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
          updateUser(updateUserInput: {}) {
              _id
              name
              email
              picture
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "Field \"UpdateUserInput._id\" of required type \"ID!\" was not provided.",
          }
        ]
      })
    })

    it('Without passing UserInput, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
            updateUser {
              _id
              name
              email
              picture
            }
          }`
      })

      expect(result.status).toBe(400)
      expect(await mongoTestDBIsEmpty())
      expect(responseAsJSON(result)).toMatchObject({
        errors: [
          {
            message: "Field \"updateUser\" argument \"updateUserInput\" of type \"UpdateUserInput!\" is required, but it was not provided.",
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

      await mongoTestAddUser({
        _id: idUser1,
        name: "Usuario 1",
        email: "usuario1@gmail.com",
        password: "usuario1",
        picture: "https://i.imgur.com/mrk3BVJ.jpg",
        tasks: [
          dbTask2
        ]
      })
    })

    it('And you try to create a new user with valid fields, it exits errored', async () => {
      const result = await request(app).post('/graphql').send({
        query: `mutation {
          updateUser(updateUserInput: {
            _id: "${idUser1.toHexString()}",
            name: "prueba",
            email: "prueba@gmail.com",
            picture: "https://i.imgur.com/mrk3BVJ.jpg"
          }) {
              _id
              name
              email
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
