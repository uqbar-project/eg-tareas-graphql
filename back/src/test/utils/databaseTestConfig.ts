
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Db, MongoClient, ObjectId } from 'mongodb'
import { Task, User } from 'services/graphql/generated/API'
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
// TODO: Decidir si eliminar
export async function mongoTestFindTaskByName(title: string): Promise<Task> {
  const db = await getTestDBConnection()
  const user = await db.collection('users').findOne({ "tasks.title": title })
  return user ? user.tasks[0] : null
}

export async function mongoTestFindTasksOfUserByName(_id: ObjectId, title: string): Promise<Task[]> {
  const db = await getTestDBConnection()
  const users = await db.collection('users').find({ _id, "tasks.title": title }).toArray()
  const user = users[0]
  
  return user ? user.tasks : []
}

export async function mongoTestCloseConnection(): Promise<void> {
  await mongo.close()
  await mongoTestServer.stop()
}

export async function mongoTestAddUser(user: unknown): Promise<void> {
  const db = await getTestDBConnection()
  await db.collection('users').insertOne(user)
}
