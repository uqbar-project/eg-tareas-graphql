import {
  getTestDBConnection,
  mongoTestCloseConnection,
  mongoTestEmptyDatabase,
  mongoTestAddUser
} from "../utils/databaseTestConfig"
import request from "supertest"
import app from "../../api/app"
import * as dbConfig from "services/database/databaseConfig"
import { responseAsJSON } from "../utils/supertestUtils"
import { idUser1, dbUser1, dbUser2, idTask1, idTask2 } from "../utils/dbData"
import { BAD_USER_INPUT } from "services/validators/customErrors"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })
  describe('Tasks of user', () => {
    describe('When we try to retrieve the list of users', () => {
      beforeEach(async () => {
        await mongoTestEmptyDatabase()
      })
      it('and there is a user in the db, it retrieves them successfully', async () => {
        await mongoTestAddUser(dbUser1)

        const result = await request(app).post('/graphql').send({
          query: `{
            getTasksOfUser(userId:"${idUser1.toHexString()}"){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            getTasksOfUser: [
              {
                _id: idTask1.toHexString(),
                title: "Tarea 1",
                description: "Esta es la tarea 1",
                priority: 1
              },
              {
                _id: idTask2.toHexString(),
                title: "Tarea 2",
                description: "Esta es la tarea 2",
                priority: 0
              },
            ]
          }
        })
      })
      it('and there are multiple users in the db, it retrieves them successfully', async () => {
        await mongoTestAddUser(dbUser1)
        await mongoTestAddUser(dbUser2)

        const result = await request(app).post('/graphql').send({
          query: `{
            getTasksOfUser(userId:"${idUser1.toHexString()}"){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            getTasksOfUser: [
              {
                _id: idTask1.toHexString(),
                title: "Tarea 1",
                description: "Esta es la tarea 1",
                priority: 1
              },
              {
                _id: idTask2.toHexString(),
                title: "Tarea 2",
                description: "Esta es la tarea 2",
                priority: 0
              }
            ]
          }
        })
      })

      it("and the user doesn't have tasks, it retrieves an empty list", async () => {
        await mongoTestAddUser({
          _id: idUser1,
          name: "Usuario 1",
          email: "usuario1@gmail.com",
          password: "usuario1"
        })

        const result = await request(app).post('/graphql').send({
          query: `{
            getTasksOfUser(userId:"${idUser1.toHexString()}"){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            getTasksOfUser: []
          }
        })
      })

      it("and the user doesn't exists, it exits errored", async () => {
        const result = await request(app).post('/graphql').send({
          query: `{
            getTasksOfUser(userId:"${idUser1.toHexString()}"){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "The user with the given id does not exist",
              extensions: {
                code: BAD_USER_INPUT
              }
            }
          ]
        })
      })

      it("and the userId is malformed, it exits errored", async () => {
        const result = await request(app).post('/graphql').send({
          query: `{
            getTasksOfUser(userId:"userIdBadFormatted"){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Malformatted user id",
              extensions: {
                code: BAD_USER_INPUT
              }
            }
          ]
        })
      })
    })
  })
})

