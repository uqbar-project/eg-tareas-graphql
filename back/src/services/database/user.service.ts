import { Task, User, UserInput } from "services/graphql/generated/API"
import { getDBConnection } from "./databaseConfig"
import { isEmpty } from "lodash"
import { NotFoundResponse } from "http-errors-response-ts/lib"
import { ObjectId } from "mongodb"
import { UserValidator } from "services/validators/userValidator"

async function getTasksOfUser(userId: string): Promise<Task[]> {
    const db = await getDBConnection()

    UserValidator.validateUserId(userId)

    const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { _id: 0, tasks: 1 } })
    if (isEmpty(userData)) {
        //FIXME!! https://i.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.webp
        const error: any = new NotFoundResponse('The user with the given id does not exist')
        error.extensions = {code: "BAD_USER_INPUT"}
        throw error
    }

    return userData.tasks
}

async function getListOfUsers(): Promise<User[]> {
    const db = await getDBConnection()
    return await db.collection('users').find().toArray()
}

async function createUser(userInput: UserInput): Promise<User> {
    const db = await getDBConnection()
    UserValidator.validateUserOnCreate(userInput)

    const result = await db.collection('users').insertOne(userInput)
    return { _id: result.insertedId, ...userInput }
}

export const UserService = { getTasksOfUser, getListOfUsers, createUser }
