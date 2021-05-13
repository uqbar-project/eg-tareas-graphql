import { Task, UpdateTaskInput, CreateTaskInput, User, CreateUserInput, UpdateUserInput, UserCredentialsInput } from "../generated/API"
import { UserService } from "../../../services/database/user.service"
import { TaskService } from "../../../services/database/task.service"
import { ObjectId } from "mongodb"


const resolvers = {
  Query: {
    // Con fines didacticos
    getListOfUsers: async (): Promise<User[]> => await UserService.getListOfUsers(),

    // Con fines didacticos
    getListOfTasks: async (): Promise<Task[]> => await TaskService.getListOfTasks(),

    getTasksOfUser: async (_: unknown, { userId }): Promise<Task[]> => await UserService.getTasksOfUser(userId)
  },

  Mutation: {

    // TODO: Testear
    loginUser: async (_: unknown, { userCredentialsInput }: { userCredentialsInput: UserCredentialsInput }): Promise<User> => (
      await UserService.loginUser(userCredentialsInput)
    ),

    createUser: async (_: unknown, { createUserInput }: { createUserInput: CreateUserInput }): Promise<User> => (
      await UserService.createUser(createUserInput)
    ),

    updateUser: async (_: unknown, { updateUserInput }: { updateUserInput: UpdateUserInput }): Promise<User> => (
      await UserService.updateUser(updateUserInput)
    ),

    // TODO: Testear
    deleteUser: async (_: unknown, { userId }: { userId: string }): Promise<User> => (
      await UserService.deleteUser(userId)
    ),

    addTask: async (_: unknown, { userId, createTaskInput }: { userId: string, createTaskInput: CreateTaskInput }): Promise<Task> => (
      await TaskService.addTask(new ObjectId(userId), createTaskInput)
    ),

    // TODO: Testear
    updateTask: async (_: unknown, { updateTaskInput }: { updateTaskInput: UpdateTaskInput }): Promise<Task> => (
      await TaskService.updateTask(updateTaskInput)
    ),

    // TODO: Testear
    deleteTask: async (_: unknown, { taskId }: { taskId: string }): Promise<Task> => (
      await TaskService.deleteTask(taskId)
    )
  }
}

export default resolvers
