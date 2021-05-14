import { useState, useEffect } from 'react'
import './CrearTarea.css'

export default function CrearTarea({ tarea }: { tarea?: any }) {
  const [newTarea, setNewTarea] = useState({})

  useEffect(() => {
    tarea ? alert('Es una edicion') : alert('Es una creacion')
  }, [tarea])

  return (
    <h1>
      Crear Tarea component
    </h1>
  )
}
