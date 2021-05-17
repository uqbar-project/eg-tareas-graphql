import { gql } from '@apollo/client'
import apolloClient from '../graphqlClient.service'

export const getTasksOfUserQuery = async (userId: string) => (
  apolloClient.query({
    query: gql`{
      getUser(userId: "${userId}"){
        tasks{
          _id
          title
          description
          priority
        }
      }
    }`,
    fetchPolicy: 'network-only'
  })
)

export const getTaskByIdQuery = async (taskId: string) => (
  apolloClient.query({
    query: gql`{
      getTask(taskId: "${taskId}"){
        _id
        title
        description
        priority
      }
    }`
  })
)

export const updateTask = async (task: any) => (
  apolloClient.mutate({
    mutation: gql`
      mutation {
        updateTask(updateTaskInput:{
          _id: "${task._id}",
          title: "${task.title}",
          description: "${task.description}",
          priority: ${task.priority}
        }){
          _id
      }
    }`
  })
)

export const createTask = async (task: any, userId: string) => (
  apolloClient.mutate({
    mutation: gql`
      mutation {
    addTask(
      userId: "${userId}",
      createTaskInput: {
        title: "${task.title}"
        description: "${task.description}"
        priority: ${task.priority}
      }) {
        _id
    }
  }`
  })
)

export const deleteTask = async (taskId: string) => (
  apolloClient.mutate({
    mutation: gql`
      mutation {
    deleteTask(taskId: "${taskId}") {
      _id
    }
  }`
  })
)
