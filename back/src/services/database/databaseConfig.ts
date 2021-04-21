import { MongoClient, Db } from "mongodb"
import { InternalServerResponse } from "http-errors-response-ts/lib"
import dotenv from "dotenv"

dotenv.config()

if(!process.env.DB_URL) throw "MongoDB url wasn't provided, please make sure you've declared it under the DB_URL key on the .env file"

const url = process.env.DB_URL

export async function getDBConnection(): Promise<Db> {
    try {
        const mongo = new MongoClient(url, { useUnifiedTopology: true })
        await mongo.connect()
        return mongo.db()
    } catch (error) {
        throw new InternalServerResponse('There was an error while accessing the database')
    }
}
