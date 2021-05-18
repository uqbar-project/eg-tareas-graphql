import { useHistory } from 'react-router'
import { useSessionService } from '../../hooks/customHooks'
import { Button, IconButton } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import logo from './logo.svg'
import './Header.css'

export default function Header() {
  const { getCurrentUser, resetUser, isLoggedIn } = useSessionService()
  const router = useHistory()

  const handleLogout = () => {
    resetUser()
    router.push('/login')
  }

  const goToPerfil = () => {
    router.push(`/perfil/${getCurrentUser()._id}`)
  }

  return (
    <header className="Header-bar">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="Header-title">Tareas</h1>
        {isLoggedIn() &&
          <div className="Header-actions">
            <p className="Header-user-name">{getCurrentUser().name.toUpperCase()}</p>
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
