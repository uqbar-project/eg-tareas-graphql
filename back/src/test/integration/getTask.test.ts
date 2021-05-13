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
import { dbUser1, dbUser2, idTask1, responseTask1 } from "../utils/dbData"
import { BAD_USER_INPUT } from "services/validators/customErrors"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })
  describe('Get task', () => {
    describe('When we try to retrieve a task', () => {
      beforeEach(async () => {
        await mongoTestEmptyDatabase()
      })
      it('and there is a task in the db, it retrieves it successfully', async () => {
        await mongoTestAddUser(dbUser1)

        const result = await request(app).post('/graphql').send({
          query: `{
            getTask(taskId:"${idTask1.toHexString()}"){
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
            getTask: responseTask1
          }
        })
      })
      it('and there are multiple tasks in the db, it retrieves it successfully', async () => {
        await mongoTestAddUser(dbUser1)
        await mongoTestAddUser(dbUser2)

        const result = await request(app).post('/graphql').send({
          query: `{
            getTask(taskId:"${idTask1.toHexString()}"){
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
            getTask: responseTask1
          }
        })
      })

      it("and the task doesn't exists, it exits errored", async () => {
        const result = await request(app).post('/graphql').send({
          query: `{
            getTask(taskId:"${idTask1.toHexString()}"){
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
              message: "The task with the given id does not exist",
              extensions: {
                code: BAD_USER_INPUT
              }
            }
          ]
        })
      })

      it("and the taskId is malformed, it exits errored", async () => {
        const result = await request(app).post('/graphql').send({
          query: `{
            getTask(taskId:"taskIdBadFormatted"){
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
              message: "Malformatted task id",
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

