import { ThemeProvider } from '@material-ui/styles'
import NotificationProvider from '../../providers/NotificationProvider'
import SessionProvider from '../../providers/SessionProvider'
import { theme } from '../../providers/ThemeProvider'
import TareasRoutes from '../Route'
import './App.css'

export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <SessionProvider>
        <NotificationProvider>
          <TareasRoutes />
        </NotificationProvider>
      </SessionProvider>
    </ ThemeProvider>
  )
}
