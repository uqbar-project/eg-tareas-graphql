let currentUser: any

const getCurrentUser = () => currentUser

const setCurrentUser = (newUser: any) => { currentUser = newUser }

export const SessionService = { getCurrentUser, setCurrentUser }
