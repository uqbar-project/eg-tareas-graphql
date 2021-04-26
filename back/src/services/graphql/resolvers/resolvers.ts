//FIXME: Ningun sentido tiene el pasamanos de userResolvers
import userResolvers from "./userResolvers"
import { Task, User, UserInput } from "../generated/API"


const resolvers = {
    Query: {
        // Con fines didacticos
        getListOfUsers: async () => await userResolvers.getListOfUsers(),

        // Con fines didacticos
        getListOfTasks: async () => userResolvers.getListOfTasks(),
        
        getTasksOfUser: async (_: any, { userId }: any): Promise<Task[]> => await userResolvers.getTasksOfUser(userId)
    },

    Mutation: {
        createUser: async (_: any, { userInput }: { userInput: UserInput }): Promise<User> => (
            await userResolvers.createUser(userInput)
        )
    }
}

export default resolvers
