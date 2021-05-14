import { Avatar, IconButton, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { Warning, Delete, Edit } from '@material-ui/icons'
import './TareaRow.css'

export default function TareaRow({ tarea }: { tarea: any }) {

  const priorityTransformerColor = () => {
    switch (tarea.priority) {
      case 0: return 'darkgreen'
      case 1: return 'darkorange'
      case 2: return 'darkred'
      default: return 'white'
    }
  }

  const priorityTransformerBackgroundColor = () => {
    switch (tarea.priority) {
      case 0: return 'springgreen'
      case 1: return 'sandybrown'
      case 2: return 'tomato'
      default: return ''
    }
  }

  const handleEditClick = (tarea: any) => {
    alert(`TODO: Editar la tarea con id: ${tarea._id}`)
  }

  const handleDeleteClick = (tarea: any) => {
    alert(`TODO: Eliminar la tarea con id: ${tarea._id}`)
  }

  return (
    <>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: priorityTransformerBackgroundColor() }} >
          <Warning style={{ color: priorityTransformerColor() }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={tarea.title} secondary={tarea.description} />

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => handleEditClick(tarea)}>
          <Edit />
        </IconButton>

        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(tarea)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  )
}
