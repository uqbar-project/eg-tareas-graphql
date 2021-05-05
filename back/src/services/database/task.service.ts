import { ObjectId } from "bson"
import { Task, TaskInput } from "services/graphql/generated/API"
import { TaskValidator } from "services/validators/taskValidator"
import { getDBConnection } from "./databaseConfig"

async function getListOfTasks(): Promise<Task[]> {
  const db = await getDBConnection()
  let tasks = []

  await db.collection('users').find({}, { projection: { _id: 0, tasks: 1 } }).forEach(user => {
    tasks = tasks.concat(user.tasks)
  })

  return tasks
}

async function addTask(_id: ObjectId, taskInput: TaskInput): Promise<Task> {
  const db = await getDBConnection()

  TaskValidator.validateTaskOnAdd(taskInput)
  
  const newTask = { _id: new ObjectId(), ...taskInput }
  newTask.priority = newTask.priority || 1

  await db.collection('users').findOneAndUpdate({ _id }, { $push: { tasks: newTask } }, { returnOriginal: false })

  return { ...newTask, _id: newTask._id.toHexString() }
}

export const TaskService = { getListOfTasks, addTask }
