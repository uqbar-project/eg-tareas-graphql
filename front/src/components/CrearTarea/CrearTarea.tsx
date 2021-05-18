import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { NOTIFICATION_TYPE, useErrorNotification, useSessionService } from '../../hooks/customHooks'
import { Box, Button, Fab, FilledInput, FormControl, InputLabel, MenuItem, TextField } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import './CrearTarea.css'
import '../App/App.css'

export default function CrearTarea({ tarea, onConfirm, title }: { tarea?: any, onConfirm: (tarea: any, userId: string) => Promise<void>, title: string }) {
  const [newTarea, setNewTarea] = useState({ _id: '', title: '', description: '', priority: 0 })
  const showErrorNotification = useErrorNotification()
  const { getCurrentUser } = useSessionService()
  const router = useHistory()

  useEffect(() => {
    if (tarea) setNewTarea(tarea)
  }, [tarea])

  const handleChangeTarea = (newValue: any, field: string) => {
    setNewTarea({ ...newTarea, [field]: newValue })
  }

  const validarInputs = () => {
    if(newTarea.title === '') throw new Error('La tarea debe tener un título')
    if(newTarea.title.length > 40) throw new Error ('El título debe tener como máximo 40 caracteres')

    if(newTarea.description === '') throw new Error('La tarea debe tener una descripción')
    if(newTarea.description.length > 255) throw new Error ('La descripción debe tener como máximo 255 caracteres')
  }

  const handleConfirm = async () => {
    try {
      validarInputs()

      await onConfirm(newTarea, getCurrentUser()._id)
      router.push('/tareas')
    } catch (error) {
      showErrorNotification(error.message, NOTIFICATION_TYPE.error)
    }
  }

  const handleBackClick = () => {
    router.push('/tareas')
  }

  return (
    <>
      <div className="container-center" >
        <h1 id="ListaTareas-title">{title}</h1>

        {/*TODO: Hacer algo al respecto de estas box*/}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5%"
          my={2}>
          <FormControl variant="filled" className="CrearTarea-input-field">
            <InputLabel htmlFor="input-titulo">Titulo</InputLabel>
            <FilledInput
              value={newTarea.title}
              onChange={(e: any) => handleChangeTarea(e.target.value, 'title')}
            />
          </FormControl>
        </Box>


        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5%"
          my={2}>

          <FormControl variant="filled" className="CrearTarea-input-field">
            <InputLabel htmlFor="input-descripcion">Descripcion</InputLabel>
            <FilledInput
              multiline
              rows={4}
              value={newTarea.description}
              onChange={(e: any) => handleChangeTarea(e.target.value, 'description')}
            />
          </FormControl>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5%"
          my={2}>

          <TextField
            className="CrearTarea-input-field"
            select
            value={newTarea.priority}
            onChange={(e: any) => handleChangeTarea(+e.target.value, 'priority')}
            label="Prioridad"
            variant="filled"
          >
            <MenuItem key={0} value={0}>Baja</MenuItem>
            <MenuItem key={1} value={1}>Media</MenuItem>
            <MenuItem key={2} value={2}>Alta</MenuItem>
          </TextField>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5%"
          my={2}>

          <Button
            variant="contained"
            className="CrearTarea-input-field"
            size="large"
            color="primary"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </Box>
      </div>
      <Fab
        id="App-back-float-button"
        onClick={handleBackClick}
      >
        <ArrowBack style={{ marginRight: "5%" }} />
      </Fab>
    </>
  )
}
