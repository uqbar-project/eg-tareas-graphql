import { useErrorNotification } from '../../hooks/customHooks'
import { Button, FilledInput, FormControl, InputLabel, MenuItem, TextField } from '@material-ui/core'
import { useState, useEffect } from 'react'
import './CrearTarea.css'

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
      console.log(error)
      showErrorNotification(error.message, 'error')
    }
    
  }

  return (
    <>
      <h1>Crear Tarea component</h1>

      <FormControl variant="filled">
        <InputLabel htmlFor="input-titulo">Titulo</InputLabel>
        <FilledInput
          className="input-field"
          value={newTarea.title}
          onChange={(e: any) => handleChangeTarea(e.target.value, 'title')}
        />
      </FormControl>

      <FormControl variant="filled">
        <InputLabel htmlFor="input-descripcion">Descripcion</InputLabel>
        <FilledInput
          className="input-field"
          multiline
          rows={4}
          value={newTarea.description}
          onChange={(e: any) => handleChangeTarea(e.target.value, 'description')}
        />
      </FormControl>

      <TextField
        className="input-field"
        select
        value={newTarea.priority !== null ? newTarea.priority : '' }
        onChange={(e: any) => handleChangeTarea(+e.target.value, 'priority')}
        label="Prioridad"
        variant="filled"
      >
        <MenuItem key={0} value={0}>Baja</MenuItem>
        <MenuItem key={1} value={1}>Media</MenuItem>
        <MenuItem key={2} value={2}>Alta</MenuItem>
      </TextField>

      <Button variant="contained"
        size="large"
        color="primary"
        onClick={handleConfirm}>
        Confirmar
      </Button>
    </>
  )
}
