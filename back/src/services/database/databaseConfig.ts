import { MongoClient, Db } from "mongodb"
import { InternalServerResponse } from "http-errors-response-ts/lib"
import dotenv from "dotenv"

dotenv.config()

let mongo: MongoClient
export async function getDBConnection(): Promise<Db> {
    try {
        if (!mongo) {
            if (!process.env.DB_URL) new InternalServerResponse("MongoDB url wasn't provided, please make sure you've declared it under the DB_URL key on the .env file")

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            mongo = new MongoClient(process.env.DB_URL!, { useUnifiedTopology: true })
        }
        await mongo.connect()
        return mongo.db()
    } catch (error) {
        if (error instanceof InternalServerResponse) {
            throw error
        } else {
            console.log(error)
            throw new InternalServerResponse('There was an error while accessing the database')
        }
    }
}
