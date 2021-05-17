import { useHistory } from 'react-router'
import { useSessionService } from '../../hooks/customHooks'
import { Button, IconButton } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import logo from './logo.svg'
import './Header.css'

export default function Header() {
  const { getCurrentUser, setCurrentUser, isLoggedIn } = useSessionService()
  const router = useHistory()

  // TODO: Exponer un resetUser
  const handleLogout = () => {
    setCurrentUser({ _id: '' })
    router.push('/login')
  }

  const goToPerfil = () => {
    router.push(`/perfil/${getCurrentUser()._id}`)
  }

  // TODO: Agregar nombre al header para contar casos de uso

  return (
    <header className="Header-bar">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="Header-title">Tareas</h1>
      {isLoggedIn() &&
        <div className="Header-actions">
          <Button 
          style={{ color: 'white' }}
          onClick={goToPerfil}>Perfil</Button>
          <IconButton
            style={{ marginLeft: 10, color: 'white' }}
            onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </div>
      }
    </header>
  )
}
