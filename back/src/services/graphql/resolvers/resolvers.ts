import { Task, TaskInput, User, CreateUserInput, UpdateUserInput } from "../generated/API"
import { UserService } from "../../../services/database/user.service"
import { TaskService } from "../../../services/database/task.service"
import { ObjectId } from "bson"


const resolvers = {
  Query: {
    // Con fines didacticos
    getListOfUsers: async (): Promise<User[]> => await UserService.getListOfUsers(),

    // Con fines didacticos
    getListOfTasks: async (): Promise<Task[]> => await TaskService.getListOfTasks(),

    getTasksOfUser: async (_: unknown, { userId }): Promise<Task[]> => await UserService.getTasksOfUser(userId)
  },

  Mutation: {
    createUser: async (_: unknown, { createUserInput }: { createUserInput: CreateUserInput }): Promise<User> => (
      await UserService.createUser(createUserInput)
    ),

    updateUser: async(_: unknown, { updateUserInput }: { updateUserInput: UpdateUserInput}): Promise<User> => (
      await UserService.updateUser(updateUserInput)
    ),

    //TODO: Testear
    deleteUser: async(_: unknown, { userId }: {userId: string}): Promise<User> => (
      await UserService.deleteUser(userId)
    ),

    addTask: async (_: unknown, { userId, taskInput }: { userId: string, taskInput: TaskInput }): Promise<Task> => (
      await TaskService.addTask(new ObjectId(userId), taskInput)
    )
  }
}

export default resolvers
