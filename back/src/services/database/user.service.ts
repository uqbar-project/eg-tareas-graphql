import { Task, User, UserInput } from "services/graphql/generated/API"
import { getDBConnection } from "./databaseConfig"
import { isEmpty } from "lodash"
import { NotFoundResponse } from "http-errors-response-ts/lib"
import { ObjectId } from "mongodb"

async function getTasksOfUser(userId: string): Promise<Task[]> {
    const db = await getDBConnection()

    const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { _id: 0, tasks: 1 } })
    if (isEmpty(userData)) {
        throw new NotFoundResponse('The user with the given id does not exist')
    }

    return userData.tasks
}

async function getListOfUsers(): Promise<User[]> {
    const db = await getDBConnection()
    return await db.collection('users').find().toArray()
}

async function createUser(userInput: UserInput): Promise<User> {
    const db = await getDBConnection()

    // TODO: Validar userInput

    const result = await db.collection('users').insertOne(userInput)
    return { _id: result.insertedId, ...userInput }
}

export const UserService = { getTasksOfUser, getListOfUsers, createUser }
