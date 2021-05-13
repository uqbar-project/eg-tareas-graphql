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
import { idUser1, dbUser1, dbUser2, responseUser1 } from "../utils/dbData"
import { BAD_USER_INPUT } from "services/validators/customErrors"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })
  describe('Get user', () => {
    describe('When we try to retrieve the list of users', () => {
      beforeEach(async () => {
        await mongoTestEmptyDatabase()
      })
      it('and there is a user in the db, it retrieves it successfully', async () => {
        await mongoTestAddUser(dbUser1)

        const result = await request(app).post('/graphql').send({
          query: `{
            getUser(userId:"${idUser1.toHexString()}"){
              _id
              name
              email
              password
              tasks{
                _id
                title
                description
                priority
              }
            }
          }`
        })

        expect(result.status).toBe(200)
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            getUser: responseUser1
          }
        })
      })
      it('and there are multiple users in the db, it retrieves it successfully', async () => {
        await mongoTestAddUser(dbUser1)
        await mongoTestAddUser(dbUser2)

        const result = await request(app).post('/graphql').send({
          query: `{
            getUser(userId:"${idUser1.toHexString()}"){
              _id
              name
              email
              password
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
        expect(responseAsJSON(result)).toMatchObject({
          data: {
            getUser: responseUser1
          }
        })
      })

      it("and the user doesn't exists, it exits errored", async () => {
        const result = await request(app).post('/graphql').send({
          query: `{
            getUser(userId:"${idUser1.toHexString()}"){
              _id
              name
              email
              password
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
            getUser(userId:"userIdBadFormatted"){
              _id
              name
              email
              password
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

