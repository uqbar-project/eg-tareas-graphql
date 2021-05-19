import { useState } from 'react'
import { useHistory } from 'react-router'
import { NOTIFICATION_TYPE, useErrorNotification, useSessionService } from '../../../hooks/customHooks'
import { Box, Button, Fab, FilledInput, FormControl, InputLabel } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { UserService } from '../../../services/user.service'
import './EditarPerfil.css'

export default function EditarPerfil({ perfil }: { perfil: any }) {
  const [newUsuario, setNewUsuario] = useState(perfil)
  const { setCurrentUser } = useSessionService()
  const showErrorNotification = useErrorNotification()
  const router = useHistory()

  const handleBackClick = () => router.push('/tareas')

  const handleChangeUsuario = (newValue: any, field: string) => {
    setNewUsuario({ ...newUsuario, [field]: newValue })
  }

  const validarInputs = () => {
    if (newUsuario.name === '') throw new Error('Debe ingresar un nombre')
    if (newUsuario.name.length > 80) throw new Error('El nombre debe tener como máximo 80 caracteres')

    if (newUsuario.email === '') throw new Error('Debe ingresar un email')
    if (newUsuario.email.length > 62) throw new Error('El email debe tener como máximo 62 caracteres')
  }

  const handleConfirm = () => {
    try {
      validarInputs()

      UserService.updateUser(newUsuario)
      setCurrentUser(newUsuario)
      router.push('/tareas')
    } catch (error) {
      showErrorNotification(error.message, NOTIFICATION_TYPE.error)
    }
  }

  return (
    <div className="container-center">

      <FormControl variant="filled" className="EditarPerfil-input-field">
        <InputLabel htmlFor="input-name">Nombre</InputLabel>
        <FilledInput
          value={newUsuario.name}
          onChange={(e: any) => handleChangeUsuario(e.target.value, 'name')}
        />
      </FormControl>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="5%"
        my={2}
        width="100%">
        <FormControl variant="filled" className="EditarPerfil-input-field">
          <InputLabel htmlFor="input-email">Email</InputLabel>
          <FilledInput
            value={newUsuario.email}
            onChange={(e: any) => handleChangeUsuario(e.target.value, 'email')}
          />
        </FormControl>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="5%"
        width="75%"
        my={2}>
        <Button
          variant="contained"
          className="CrearTarea-input-field"
          size="large"
          color="primary"
          onClick={handleConfirm}>
          Confirmar
          </Button>
      </Box>

      <Fab
        id="App-back-float-button"
        onClick={handleBackClick}>
        <ArrowBack style={{ marginRight: "5%" }} />
      </Fab>
    </div>
  )
}
