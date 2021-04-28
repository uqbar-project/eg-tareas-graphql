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
import { idUser1, dbUser1, dbUser2, idTask1, idTask2, idTask3 } from "../utils/dbData"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })

  describe('List of tasks', () => {
    describe('When we try to retrieve the list of users', () => {
      beforeAll(() => {
        mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)
      })

      beforeEach(async () => {
        await mongoTestEmptyDatabase()
      })

      it('With a single user in the db, it retrieves that user successfully', async () => {
        await mongoTestAddUser(dbUser1)

        const result = await request(app).post('/graphql').send({
          query: `{
                  getListOfTasks{
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
            getListOfTasks: [
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

      it('With multiple users in the db, it retrieves the users successfully', async () => {
        await mongoTestAddUser(dbUser1)
        await mongoTestAddUser(dbUser2)

        const result = await request(app).post('/graphql').send({
          query: `{
            getListOfTasks{
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
            getListOfTasks: [
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
              {
                _id: idTask3.toHexString(),
                title: "Tarea 3",
                description: "Esta es la tarea 3",
                priority: 2
              }
            ]
          }
        })
      })

      it('With no tasks in the db, it retrieves an empty list', async () => {
        const userWithoutTasks = {
          _id: idUser1,
          name: "Usuario 1",
          email: "usuario1@gmail.com",
          password: "usuario1",
          tasks: []
        }
        
        await mongoTestAddUser(userWithoutTasks)

        const result = await request(app).post('/graphql').send({
          query: `{
            getListOfTasks{
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
            getListOfTasks: []
          }
        })
      })
    })
  })
})
