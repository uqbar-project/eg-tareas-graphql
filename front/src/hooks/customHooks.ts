import { useContext } from 'react'
import { NotificationContext } from '../providers/NotificationProvider'
import { SessionContext } from '../providers/SessionProvider'

export function useErrorNotification() {
  const { addErrorNotification } = useContext(NotificationContext)
  return addErrorNotification
}

export function useSessionService() {
  const { setCurrentUser, getCurrentUser, isLoggedIn } = useContext(SessionContext)
  return { setCurrentUser, getCurrentUser, isLoggedIn }
}
