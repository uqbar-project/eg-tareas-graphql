import { UserService } from "../../database/user.service"
import { TaskService } from "../../database/task.service"
import { Task, User, UserInput } from "../generated/API"

async function getListOfUsers(): Promise<User[]>{
    return UserService.getListOfUsers()
}

async function getTasksOfUser(userId: string): Promise<Task[]> {
    return UserService.getTasksOfUser(userId)
}

async function getListOfTasks(): Promise<Task[]>{
    return TaskService.getListOfTasks()
}

async function createUser(userInput: UserInput): Promise<User>{
    return UserService.createUser(userInput)
}

export default { createUser, getTasksOfUser, getListOfUsers, getListOfTasks }
