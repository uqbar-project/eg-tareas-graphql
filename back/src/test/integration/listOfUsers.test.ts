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
import { dbUser1, dbUser2 } from "../utils/dbData"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })

  describe('List of users', () => {
    describe('When we try to retrieve the list of users', () => {

      beforeEach(async () => {
        await mongoTestEmptyDatabase()
      })

      it('With a single user in the db, it retrieves that user successfully', async () => {
        await mongoTestAddUser(dbUser1)

        const result = await request(app).post('/graphql').send({
          query: `query {
            getListOfUsers{
              _id
              name
              password
              email
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
            getListOfUsers: [
              {
                name: "Usuario 1",
                email: "usuario1@gmail.com",
                password: "usuario1"
              }
            ]
          }
        })
      })

      it('With multiple users in the db, it retrieves the users successfully', async () => {
        await mongoTestAddUser(dbUser1)
        await mongoTestAddUser(dbUser2)

        const result = await request(app).post('/graphql').send({
          query: `query {
            getListOfUsers{
              _id
              name
              password
              email
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
            getListOfUsers: [
              {
                name: "Usuario 1",
                email: "usuario1@gmail.com",
                password: "usuario1"
              },
              {
                name: "Usuario 2",
                email: "usuario2@gmail.com",
                password: "usuario2"
              }
            ]
          }
        })
      })
      it('With no users in the db, it retrieves an empty list', async () => {
        const result = await request(app).post('/graphql').send({
          query: `query {
            getListOfUsers{
              _id
              name
              password
              email
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
            getListOfUsers: []
          }
        })
      })
    })
  })
})
