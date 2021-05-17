import React, { useCallback, useState } from 'react'

export const SessionContext = React.createContext({
  setCurrentUser: (user: any) => { },
  getCurrentUser: (): any => undefined,
  isLoggedIn: (): boolean => false
})

export default function SessionProvider({ children }: { children: any }) {
  const [stateCurrentUser, setStateCurrentUser] = useState({_id: ''})

  const contextValue = {
    isLoggedIn: useCallback((): boolean => !!stateCurrentUser._id, [stateCurrentUser]),
    setCurrentUser: useCallback((user) => setStateCurrentUser(user), []),
    getCurrentUser: useCallback(() => {
      if (!!stateCurrentUser._id) {
        return stateCurrentUser
      } else {
        throw Error('No hay un usuario logueado')
      }
    }, [stateCurrentUser])
  }

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  )
}
