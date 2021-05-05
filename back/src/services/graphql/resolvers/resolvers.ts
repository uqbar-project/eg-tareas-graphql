import { Task, TaskInput, User, UserInput } from "../generated/API"
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
    createUser: async (_: unknown, { userInput }: { userInput: UserInput }): Promise<User> => (
      await UserService.createUser(userInput)
    ),

    addTask: async (_: unknown, { userId, taskInput }: { userId: string, taskInput: TaskInput }): Promise<Task> => (
      await TaskService.addTask(new ObjectId(userId), taskInput)
    )
  }
}

export default resolvers
