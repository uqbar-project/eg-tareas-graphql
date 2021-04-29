import { Task, User, UserInput } from "services/graphql/generated/API"
import { getDBConnection } from "./databaseConfig"
import { ObjectId } from "mongodb"
import { UserValidator } from "services/validators/userValidator"
import { GraphqlBadRequest } from "services/validators/customErrors"

async function getTasksOfUser(userId: string): Promise<Task[]> {
    const db = await getDBConnection()

    UserValidator.validateUserId(userId)
    
    const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { _id: 0, tasks: 1 } })
    
    if (!userData) throw new GraphqlBadRequest('The user with the given id does not exist')

    return userData.tasks || []
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
