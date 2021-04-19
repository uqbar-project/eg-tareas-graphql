import dummyUsers from "../../dummyProvider/dummyUsers"
import dummyTasks from "../../dummyProvider/dummyTasks"
import userResolvers from "./userResolvers"
import { Task, User, UserInput } from "../generated/API"


const resolvers = {
    Query: {
        // Con fines didacticos
        getListOfUsers: () => {
            return dummyUsers
        },

        // Con fines didacticos
        getListOfTasks: () => {
            return dummyTasks
        },
        getTasksOfUser: async (_: any, { userId }: any): Promise<Task[]> => (
            await userResolvers.getTasksOfUser(userId)
        )

    },

    Mutation: {
        createUser: async (_: any, { userInput }: { userInput: UserInput }): Promise<User> => (
            await userResolvers.createUser(userInput)
        )
    }
}

export default resolvers
