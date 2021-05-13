import React, { useCallback } from 'react'
import SweetAlert, { SweetAlertIcon } from 'sweetalert2'

// TODO: el type podria ser un enum
export const NotificationContext = React.createContext({
  addErrorNotification: (message: string, type: string) => { },
})

export default function NotificationProvider({ children }: { children: any }) {
  const addErrorNotification = (message: string, type: SweetAlertIcon) => {
    SweetAlert.fire({
      title: message,
      icon: type,
    })
  }

  const contextValue = {
    addErrorNotification: useCallback((message, type) => addErrorNotification(message, type), []),
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}
