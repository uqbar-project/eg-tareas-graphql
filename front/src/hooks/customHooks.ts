import { useContext } from 'react'
import { NotificationContext } from '../providers/NotificationProvider'
import { SessionContext } from '../providers/SessionProvider'

export enum NOTIFICATION_TYPE {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
  question = 'question'
}

export function useErrorNotification() {
  const { addErrorNotification } = useContext(NotificationContext)
  return addErrorNotification
}

export function useSessionService() {
  const { setCurrentUser, getCurrentUser, isLoggedIn, resetUser } = useContext(SessionContext)
  return { setCurrentUser, getCurrentUser, isLoggedIn, resetUser }
}
