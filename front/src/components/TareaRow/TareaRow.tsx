import { Avatar, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Warning } from '@material-ui/icons'
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

  return (
    <>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: priorityTransformerBackgroundColor() }} >
          <Warning style={{ color: priorityTransformerColor() }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={tarea.title} secondary={tarea.description} />
    </>
  )
}
