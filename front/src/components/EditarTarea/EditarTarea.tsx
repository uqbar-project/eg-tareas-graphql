import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useErrorNotification } from '../../hooks/customHooks'
import { TareaService } from '../../services/tareas.service'
import CrearTarea from '../CrearTarea/CrearTarea'
import './EditarTarea.css'

export default function EditarTarea(props: any) {
  const [tarea, setTarea] = useState({ _id: '', title: '', description: '', priority: null })
  const showErrorNotification = useErrorNotification()
  const router = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TareaService.getTaskById(props.match.params.idTarea)
        setTarea(result)
      } catch (error) {
        showErrorNotification(error.message, 'error')
        router.push('/tareas')
      }
    }
    
    fetchData()
  }, [showErrorNotification, props.match.params.idTarea, router])
  
  return (
    <>
      {tarea._id ?
        <CrearTarea
          tarea={tarea}
          onConfirm={TareaService.actualizarTarea}
          title="Editar Tarea"
        />
        :
        <h1>No se ha encontrado la tarea...</h1>
      }
    </>
  )
}
