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
        //FIXME!! https://i.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.webp
        if (error instanceof InternalServerResponse) {
            const internalServerError: any = error
            internalServerError.extensions = { code: "INTERNAL_SERVER_ERROR" }
            throw internalServerError
        } else {
            console.log(error)
            const internalServerError: any = new InternalServerResponse('There was an error while accessing the database')
            internalServerError.extensions = { code: "INTERNAL_SERVER_ERROR" }
            throw internalServerError
        }
    }
}
