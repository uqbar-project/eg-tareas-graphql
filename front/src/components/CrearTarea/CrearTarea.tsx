import { useErrorNotification } from '../../hooks/customHooks'
import { Box, Button, FilledInput, FormControl, InputLabel, MenuItem, TextField } from '@material-ui/core'
import { useState, useEffect } from 'react'
import './CrearTarea.css'
import '../App/App.css'

export default function CrearTarea({ tarea, onConfirm }: { tarea?: any, onConfirm: any }) {
  const [newTarea, setNewTarea] = useState({ _id: '', title: '', description: '', priority: null })
  const showErrorNotification = useErrorNotification()

  useEffect(() => {
    if (tarea) setNewTarea(tarea)
  }, [tarea])

  const handleChangeTarea = (newValue: any, field: string) => {
    setNewTarea({ ...newTarea, [field]: newValue })
  }

  const handleConfirm = () => {
    try {
      // TODO: Validar el input
      onConfirm(newTarea)
    } catch (error) {
      showErrorNotification(error.message, 'error')
    }
  }

  return (
    <div className="container-center" >
      <h1>Crear Tarea component</h1>

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
          value={newTarea.priority !== null ? newTarea.priority : ''}
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
  )
}
