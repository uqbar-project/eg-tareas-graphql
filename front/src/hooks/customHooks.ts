import { useContext } from 'react'
import { NotificationContext } from '../providers/NotificationProvider'

export function useErrorNotification() {
  const { addErrorNotification } = useContext(NotificationContext)
  return { addErrorNotification }
}
