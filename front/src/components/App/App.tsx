import NotificationProvider from '../../providers/NotificationProvider'
import SessionProvider from '../../providers/SessionProvider'
import TareasRoutes from '../Route'
import './App.css'

export default function App() {
  return (
    <SessionProvider>
      <NotificationProvider>
        <TareasRoutes />
      </NotificationProvider>
    </SessionProvider>
  )
}
