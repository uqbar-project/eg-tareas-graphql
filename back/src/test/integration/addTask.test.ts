import {
  getTestDBConnection,
  mongoTestCloseConnection,
  mongoTestEmptyDatabase,
  mongoTestAddUser,
  mongoTestFindTasksOfUserByName
} from "../utils/databaseTestConfig"
import request from "supertest"
import app from "../../api/app"
import * as dbConfig from "services/database/databaseConfig"
import { responseAsJSON } from "../utils/supertestUtils"
import { idUser1, dbTask2 } from "../utils/dbData"

jest.mock("../../services/database/databaseConfig")
const mockedDatabase = dbConfig as jest.Mocked<typeof dbConfig>
mockedDatabase.getDBConnection.mockImplementation(getTestDBConnection)

describe('API Integration - Suite', () => {
  afterAll(async () => {
    await mongoTestCloseConnection()
  })
  describe('Add task', () => {
    describe('When we try to add a task', () => {
      beforeEach(async () => {
        await mongoTestEmptyDatabase()

        await mongoTestAddUser({
          _id: idUser1,
          name: "Usuario 1",
          email: "usuario1@gmail.com",
          password: "usuario1",
          tasks: [
            dbTask2
          ]
        })
      })
      it('with a valid input, it gets written in the db successfully', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
            addTask(userId:"${idUser1.toHexString()}", createTaskInput:{
              title: "Tarea 1",
              description: "Esta es la tarea 1",
              priority: 1
            }){
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
            addTask:
            {
              title: "Tarea 1",
              description: "Esta es la tarea 1",
              priority: 1
            }
          }
        })
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toMatchObject(
          expect.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
              description: 'Esta es la tarea 1',
              priority: 1
            })]))
      })
      it('with a missing title, it exits errored', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
            addTask(userId:"${idUser1.toHexString()}", createTaskInput:{
              description: "Esta es la tarea 1",
              priority: 1
            }){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(400)
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
            })]))
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Field \"CreateTaskInput.title\" of required type \"String!\" was not provided."
            }
          ]
        })
      })

      it('with a missing description, it exits errored', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
            addTask(userId:"${idUser1.toHexString()}", createTaskInput:{
              title: "Tarea 1",
              priority: 1
            }){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(400)
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
            })]))
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Field \"CreateTaskInput.description\" of required type \"String!\" was not provided."
            }
          ]
        })
      })

      it('with a missing priority, it exits errored', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
            addTask(userId:"${idUser1.toHexString()}", createTaskInput:{
              title: "Tarea 1",
              description: "Esta es la tarea 1",
            }){
              _id
              title
              description
              priority
            }
          }`
        })

        expect(result.status).toBe(400)
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Field \"CreateTaskInput.priority\" of required type \"Int!\" was not provided."
            }
          ]
        })
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
              description: "Esta es la tarea 1",
              priority: 1
            })]))
      })

      it('Without filled fields on TaskInput, it exits errored', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
              addTask(userId:"${idUser1.toHexString()}", createTaskInput: {}) {
                _id
                title
                description
                priority
              }
            }`
        })

        expect(result.status).toBe(400)
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
            })]))
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Field \"CreateTaskInput.title\" of required type \"String!\" was not provided."
            },
            {
              message: "Field \"CreateTaskInput.description\" of required type \"String!\" was not provided."
            },
            {
              message: "Field \"CreateTaskInput.priority\" of required type \"Int!\" was not provided."
            }
          ]
        })
      })

      it('Without passing TaskInput, it exits errored', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
              addTask(userId:"${idUser1.toHexString()}") {
                _id
                title
                description
                priority
              }
            }`
        })

        expect(result.status).toBe(400)
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
            })]))
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Field \"addTask\" argument \"createTaskInput\" of type \"CreateTaskInput!\" is required, but it was not provided.",
            }
          ]
        })
      })

      it('Without filled fields in UserId, it exits errored', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
              addTask(userId:"", createTaskInput: {
                title: "Tarea 1",
                description: "Esta es la tarea 1",
                priority: 1
              }) {
                  _id
                  title
                  description
                  priority
              }
            }`
        })

        expect(result.status).toBe(200)
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
            })]))
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters",
            }
          ]
        })
      })

      it('Without passing UserId, it exits errored', async () => {
        const result = await request(app).post('/graphql').send({
          query: `mutation {
              addTask(createTaskInput: {
                title: "Tarea 1",
                description: "Esta es la tarea 1",
                priority: 1}
                ) {
                _id
                title
                description
                priority
              }
            }`
        })

        expect(result.status).toBe(400)
        expect(await mongoTestFindTasksOfUserByName(idUser1, 'Tarea 1')).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({
              title: 'Tarea 1',
            })]))
        expect(responseAsJSON(result)).toMatchObject({
          errors: [
            {
              message: "Field \"addTask\" argument \"userId\" of type \"ID!\" is required, but it was not provided."
            }
          ]
        })
      })
    })
  })
})

