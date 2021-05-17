import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useErrorNotification, useSessionService } from '../../hooks/customHooks'
import { Divider, Fab, List, ListItem } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import TareaRow from '../TareaRow/TareaRow'
import { TareaService } from '../../services/tareas.service'
import './ListaTareas.css'

export default function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const showErrorNotification = useErrorNotification()
  const { getCurrentUser } = useSessionService()
  const router = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TareaService.getTasksOfUser(getCurrentUser()._id)
        setTareas(result)
      } catch (error) {
        showErrorNotification(error.message, 'error')
      }
    }
    fetchData()
  }, [showErrorNotification, getCurrentUser])

  const handleCreateClick = () => {
    router.push('/tarea')
  }

  const handleDelete = async (tareaABorrar: any) => {
    try {
      await TareaService.deleteTarea(tareaABorrar)
      setTareas(tareas.filter((tarea: any) => tarea._id !== tareaABorrar._id))
    } catch (error) {
      showErrorNotification(error.message, 'error')
    }
  }

  return (
    <>
      <div className="container-center">
        <h1 style={{ color: 'grey' }}>Lista de Tareas</h1>
      </div>

      <div className="container-center">
        {tareas.length ?
          <List className="ListaTareas-list">
            {/*TODO: Agregar una key para eliminar el warning*/}
            {tareas.map((tarea: any, index: number) => (
              <>
                <ListItem className="ListaTareas-card">
                  <TareaRow tarea={tarea} onDelete={handleDelete} />
                </ListItem>

                {/* Para no mostrar el divisor en el ultimo elemento*/}
                {tareas.length !== index + 1 && <Divider variant="middle" />}
              </>
            ))}
          </List>
          : <h2 className="ListaTareas-subtitle">Parece que no tenés tareas...</h2>
        }
      </div>

      <Fab
        id="ListaTareas-float-button"
        variant="extended"
        onClick={handleCreateClick} >
        <Add style={{ marginRight: "5%" }} />
        Tarea
      </Fab>
    </>
  )
}
