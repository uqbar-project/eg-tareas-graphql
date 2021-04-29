
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Db, MongoClient } from 'mongodb'
import { User } from 'services/graphql/generated/API'
import { GraphqlInternalServerError } from '../../services/validators/customErrors'

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
        throw new GraphqlInternalServerError('There was an error while accessing the database')
    }
}

export async function dropDatabaseMongoTestDB(): Promise<void> {
    const db = await getTestDBConnection()
    await db.dropDatabase()
}

export async function mongoTestEmptyDatabase(): Promise<void> {
    const db = await getTestDBConnection()
    await db.dropDatabase()
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
