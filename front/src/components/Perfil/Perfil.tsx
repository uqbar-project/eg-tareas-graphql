import { useHistory } from 'react-router'
import { Fab } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import './Perfil.css'

export default function Perfil() {
  const router = useHistory()
  const handleBackClick = () => router.push('/tareas')

  return (
    <>
      <h1>Perfil component</h1>
      <Fab
        id="App-back-float-button"
        onClick={handleBackClick}>
        <ArrowBack style={{ marginRight: "5%" }} />
      </Fab>
    </>
  )
}
