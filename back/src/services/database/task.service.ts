import { Task } from "services/graphql/generated/API"
import { getDBConnection } from "./databaseConfig"

async function getListOfTasks(): Promise<Task[]>{
    const db = await getDBConnection()
    let tasks = []
    
    await db.collection('users').find({}, { projection: { _id: 0, tasks: 1 } }).forEach(user => {
       tasks = tasks.concat(user.tasks)
       })

    return tasks
}

export const TaskService = { getListOfTasks }
