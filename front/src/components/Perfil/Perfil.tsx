import { useEffect, useState } from 'react'
import { NOTIFICATION_TYPE, useErrorNotification, useSessionService } from '../../hooks/customHooks'
import { UserService } from '../../services/user.service'
import EditarPerfil from './EditarPerfil/EditarPerfil'
import VerPerfil from './VerPerfil/VerPerfil'
import './Perfil.css'

export default function Perfil(props: any) {
  const showErrorNotification = useErrorNotification()
  const [fetchedUser, setFetchedUser] = useState({ _id: undefined, picture: undefined })
  const { getCurrentUser, isLoggedIn } = useSessionService()
  const anonymousProfilePic = 'https://i.imgur.com/OtVw3rL.png'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserService.getFullUserProfile(props.match.params.idUsuario)
        setFetchedUser(result)
      } catch (error) {
        // TODO: Se puede mejorar este manejo de errores?
        // https://i.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.webp
        if (error.graphQLErrors.some((gqlError: any) => gqlError.extensions?.code !== "BAD_USER_INPUT")) {
          showErrorNotification(error.message, NOTIFICATION_TYPE.error)
        }
      }
    }

    fetchData()
  })

  const paramsUserIdIsValid = fetchedUser._id
  const paramsUserIdIsCurrentUser = () => {
    if (isLoggedIn()) {
      return fetchedUser._id === getCurrentUser()._id
    }
    return false
  }

  return (
    <div className="container-center">
      <h1 className="Perfil-title">Perfil</h1>
      <img className="Perfil-picture" src={fetchedUser.picture || anonymousProfilePic} alt="Imagen de perfil" />
      {paramsUserIdIsValid ?
        (paramsUserIdIsCurrentUser() ? <EditarPerfil perfil={fetchedUser} /> : <VerPerfil perfil={fetchedUser} />)
        :
        <h2>El usuario no existe</h2>}
    </div>
  )
}
