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

export const responseTask1 = {
  _id: idTask1.toHexString(),
  title: "Tarea 1",
  description: "Esta es la tarea 1",
  priority: 1
}

export const responseTask2 = {
  _id: idTask2.toHexString(),
  title: "Tarea 2",
  description: "Esta es la tarea 2",
  priority: 0
}

export const responseTask3 = {
  _id: idTask3.toHexString(),
  title: "Tarea 3",
  description: "Esta es la tarea 3",
  priority: 2
}

export const dbUser1 = {
  _id: idUser1,
  name: "Usuario 1",
  email: "usuario1@gmail.com",
  password: "usuario1",
  picture: "https://i.imgur.com/OtVw3rL.png",
  tasks: [
    dbTask1,
    dbTask2
  ]
}

export const responseUser1 = {
  _id: idUser1.toHexString(),
  name: "Usuario 1",
  email: "usuario1@gmail.com",
  password: null,
  picture: "https://i.imgur.com/OtVw3rL.png",
  tasks: [
    responseTask1,
    responseTask2
  ]
}

export const dbUser2 = {
  _id: idUser2,
  name: "Usuario 2",
  email: "usuario2@gmail.com",
  password: "usuario2",
  picture: "https://i.imgur.com/fZh6qLo.png",
  tasks: [
    dbTask3
  ]
}

export const responseUser2 = {
  _id: idUser2.toHexString(),
  name: "Usuario 2",
  email: "usuario2@gmail.com",
  password: null,
  picture: "https://i.imgur.com/fZh6qLo.png",
  tasks: [
    responseTask3
  ]
}
