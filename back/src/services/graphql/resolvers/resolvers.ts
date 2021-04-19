import dummyUsers from "../../dummyProvider/dummyUsers"
import dummyTasks from "../../dummyProvider/dummyTasks"
//import { User, UserInput } from '../generated/API'


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
        //getTasksOfUser: async (_: unknown, { userId }, context) => await userResolvers.getNotebooksOfUser(userId, extractCredentials(context))
    },

    /*Mutation: {
        createUser: async (_: unknown, { userInput }: { userInput: UserInput }, context): Promise<User> => (
            await userResolvers.createUser(userInput, extractCredentials(context))
        )
    }*/
}

export default resolvers
