import { useState, useEffect } from 'react'
import { useErrorNotification } from '../../hooks/customHooks'
import { Divider, Fab, List, ListItem } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import TareaRow from '../TareaRow/TareaRow'
import { TareaService } from '../../services/tareas.service'
import './ListaTareas.css'

export default function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const showErrorNotification = useErrorNotification()

  const handleCreateClick = (tarea: any) => {
    alert('TODO: Crear una nueva tarea')
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

      {/* //TODO: Existe una cosa llamada clase CSS... */}
      <Fab variant="extended" style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 20,
        color: 'white',
        backgroundColor: '#596e79'
      }}
        onClick={handleCreateClick} >
        <Add style={{ marginRight: "5%" }} />
        Tarea
      </Fab>

    </>
  )
}
