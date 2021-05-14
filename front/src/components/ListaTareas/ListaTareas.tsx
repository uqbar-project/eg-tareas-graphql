import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useErrorNotification } from '../../hooks/customHooks'
import { Divider, Fab, List, ListItem } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import TareaRow from '../TareaRow/TareaRow'
import { TareaService } from '../../services/tareas.service'
import './ListaTareas.css'

export default function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const showErrorNotification = useErrorNotification()
  const router = useHistory()

  const handleCreateClick = () => {
    router.push('/tarea')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TareaService.getTasksOfUser()
        setTareas(result)
      } catch (error) {
        showErrorNotification(error.message, 'error')
      }
    }

    fetchData()
  }, [showErrorNotification])

  return (
    <>
      <div className="ListaTareas-center">
        <h1 style={{ color: 'grey' }}>Lista de Tareas</h1>
      </div>

      <div className="ListaTareas-center">
        {tareas.length ?
          <List className="ListaTareas-list">
            {tareas.map((tarea: any, index: number) => (
              <>
                <ListItem className="ListaTareas-card">
                  <TareaRow tarea={tarea} />
                </ListItem>

                {/* Para no mostrar el divisor en el ultimo elemento*/}
                {tareas.length !== index + 1 && <Divider variant="middle" />}
              </>
            ))}
          </List>
          : <h2 className="ListaTareas-subtitle">Parece que no tenés tareas...</h2>
        }
      </div>

      <Fab variant="extended" id="ListaTareas-float-button"
        onClick={handleCreateClick} >
        <Add style={{ marginRight: "5%" }} />
        Tarea
      </Fab>
    </>
  )
}
