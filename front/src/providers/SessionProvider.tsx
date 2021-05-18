import React, { useCallback, useState } from 'react'

const initialUserState = { _id: '' }

export const SessionContext = React.createContext({
  setCurrentUser: (user: any) => { },
  getCurrentUser: (): any => undefined,
  isLoggedIn: (): boolean => false,
  resetUser: () => { }
})

export default function SessionProvider({ children }: { children: any }) {
  const [stateCurrentUser, setStateCurrentUser] = useState(initialUserState)

  const contextValue = {
    isLoggedIn: useCallback((): boolean => !!stateCurrentUser._id, [stateCurrentUser]),
    setCurrentUser: useCallback((user) => setStateCurrentUser(user), []),
    resetUser: useCallback(() => setStateCurrentUser(initialUserState), []),
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
