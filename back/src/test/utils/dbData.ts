import { ObjectId } from "mongodb"

export const idUser1 = new ObjectId()
export const idUser2 = new ObjectId()

export const idTask1 = new ObjectId()
export const idTask2 = new ObjectId()
export const idTask3 = new ObjectId()

export const dbTask1 = {
  _id: idTask1,
  title: "Tarea 1",
  description: "Esta es la tarea 1",
  priority: 1
}

export const dbTask2 = {
  _id: idTask2,
  title: "Tarea 2",
  description: "Esta es la tarea 2",
  priority: 0
}

export const dbTask3 = {
  _id: idTask3,
  title: "Tarea 3",
  description: "Esta es la tarea 3",
  priority: 2
}

export const dbUser1 = {
  _id: idUser1,
  name: "Usuario 1",
  email: "usuario1@gmail.com",
  password: "usuario1",
  tasks: [
    dbTask1,
    dbTask2
  ]
}

export const dbUser2 = {
  _id: idUser2,
  name: "Usuario 2",
  email: "usuario2@gmail.com",
  password: "usuario2",
  tasks: [
    dbTask3
  ]
}
