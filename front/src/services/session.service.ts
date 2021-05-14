let currentUser: any

const getCurrentUser = () => {
  if (currentUser) {
    return currentUser
  } else {
    throw Error('No hay un usuario logueado')
  }
}

const setCurrentUser = (newUser: any) => { currentUser = newUser }

export const SessionService = { getCurrentUser, setCurrentUser }
