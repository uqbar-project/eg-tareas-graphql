import dummyUsers from "../../dummyProvider/dummyUsers"
import { Task, User, UserInput } from "../generated/API"

const dummyIdGenerator = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

async function getTasksOfUser(userId: string): Promise<Task[]> {
    // En un futuro esto lo va a resolver el user service pegandole a mongo
    const user = dummyUsers.find(user => user.id === userId)
    if (!user) throw Error('User not found')
    return Promise.resolve(user.tasks)
}

async function createUser(userInput: UserInput): Promise<User>{
    const newUser = {id: dummyIdGenerator(), ...userInput, tasks:[]}
    dummyUsers.push(newUser)
    return Promise.resolve(newUser)

}

export default { createUser, getTasksOfUser }
