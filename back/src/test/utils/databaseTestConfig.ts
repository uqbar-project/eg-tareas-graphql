
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Db, MongoClient } from 'mongodb'
import { InternalServerResponse } from "http-errors-response-ts/lib"
import { User } from 'services/graphql/generated/API'

let mongo: MongoClient
let mongoTestServer: MongoMemoryServer
export async function getTestDBConnection(): Promise<Db> {
    try {
        mongoTestServer = mongoTestServer || new MongoMemoryServer()
        const uri = await mongoTestServer.getUri()
        mongo = mongo || await MongoClient.connect(uri, { useUnifiedTopology: true })
        return mongo.db()
    } catch (error) {
        console.log(error)
        //FIXME!! https://i.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.webp
        const internalServerError: any = new InternalServerResponse('There was an error while accessing the database')
        internalServerError.extensions = { code: "INTERNAL_SERVER_ERROR" }
        throw internalServerError
    }
}

export async function dropDatabaseMongoTestDB(): Promise<void> {
    const db = await getTestDBConnection()
    await db.dropDatabase()
}

export async function mongoTestEmptyDatabase(): Promise<void> {
    const db = await getTestDBConnection()
    db.dropDatabase()
}

export async function mongoTestDBIsEmpty(): Promise<boolean> {
    const db = await getTestDBConnection()
    return (await db.listCollections().toArray()).length === 0
}

export async function mongoTestFindUserByName(name: string): Promise<User> {
    const db = await getTestDBConnection()
    return db.collection('users').findOne({ name })
}

export async function mongoTestCloseConnection(): Promise<void> {
    await mongo.close()
    await mongoTestServer.stop()
}

export async function mongoTestAddUser(user: unknown): Promise<void> {
    const db = await getTestDBConnection()
    await db.collection('users').insertOne(user)
}
