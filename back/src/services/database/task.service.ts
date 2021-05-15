import { ObjectId } from "mongodb"
import { GraphqlBadRequest, GraphqlDBUnknownError, GraphQLNotFound } from "../../services/validators/customErrors"
import { Task, CreateTaskInput, UpdateTaskInput } from "../../services/graphql/generated/API"
import { TaskValidator } from "../../services/validators/taskValidator"
import { getDBConnection } from "./databaseConfig"

async function getListOfTasks(): Promise<Task[]> {
  const db = await getDBConnection()
  let tasks = []

  await db.collection('users').find({}, { projection: { _id: 0, tasks: 1 } }).forEach(user => {
    tasks = tasks.concat(user.tasks)
  })

  return tasks
}

async function getTask(taskId: string): Promise<Task> {
  const db = await getDBConnection()

  TaskValidator.validateTaskId(taskId)

  const userData = await db.collection('users').findOne({ 'tasks._id': new ObjectId(taskId) })

  if (!userData) throw new GraphqlBadRequest('The task with the given id does not exist')

  return userData.tasks.filter(task => task._id.toHexString() === taskId)[0]
}

async function addTask(_id: ObjectId, createTaskInput: CreateTaskInput): Promise<Task> {
  const db = await getDBConnection()

  TaskValidator.validateTaskOnAdd(createTaskInput)

  const newTask = { _id: new ObjectId(), ...createTaskInput }

  await db.collection('users').findOneAndUpdate({ _id }, { $push: { tasks: newTask } }, { returnOriginal: false })

  return { ...newTask, _id: newTask._id.toHexString() }
}

async function updateTask(updateTaskInput: UpdateTaskInput): Promise<Task> {
  const db = await getDBConnection()
  TaskValidator.validateTaskOnUpdate(updateTaskInput)

  const { _id, ...task } = updateTaskInput
  const idAsObjectId = new ObjectId(_id)

  // La vida con un ORM es mas feliz
  const fieldsToUpdate = {
    _id: idAsObjectId.equals,
    ...(task.title && { 'tasks.$.title': task.title }),
    ...(task.description && { 'tasks.$.description': task.description }),
    ...(task.priority !== null && { 'tasks.$.priority': task.priority })
  }

  const result = await db.collection('users').findOneAndUpdate({ 'tasks._id': idAsObjectId }, { $set: fieldsToUpdate }, { returnOriginal: false })

  if (!result.value) throw new GraphQLNotFound('There is no task with the given id')
  if (!result.ok) throw new GraphqlDBUnknownError()

  return result.value.tasks.filter((task: { _id: ObjectId }) => task._id.toHexString() === _id)[0]
}

async function deleteTask(taskId: string): Promise<Task> {
  const db = await getDBConnection()

  const result = await db.collection('users').findOneAndUpdate({ 'tasks._id': new ObjectId(taskId) }, { $pull: { 'tasks': { _id: new ObjectId(taskId) } } })

  if (!result.ok) throw new GraphqlDBUnknownError()
  if (!result.value) throw new GraphQLNotFound('Could not find a task with the given id')

  return result.value.tasks.filter((task: { _id: ObjectId }) => task._id.toHexString() === taskId)[0]
}

export const TaskService = { getListOfTasks, getTask, addTask, updateTask, deleteTask }
