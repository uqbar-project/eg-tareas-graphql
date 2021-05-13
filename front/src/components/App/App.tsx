import NotificationProvider from '../../providers/NotificationProvider'
import TareasRoutes from '../Route'
import './App.css'

export default function App() {
  return (
    <NotificationProvider>
      <TareasRoutes />
    </NotificationProvider>
  )
}
