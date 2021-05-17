
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { TareaService } from '../services/tareas.service'
import CrearTarea from './CrearTarea/CrearTarea'
import EditarTarea from './EditarTarea/EditarTarea'
import Header from "./Header/Header"
import ListaTareas from './ListaTareas/ListaTareas'
import Login from './Login/Login'
import Perfil from './Perfil/Perfil'

export default function TareasRoutes() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/tareas" component={ListaTareas} />
          <Route exact path="/perfil/:idUsuario" component={Perfil} />
          <Route path="/tarea/:idTarea" component={EditarTarea} />
          <Route exact path="/tarea" component={() => <CrearTarea onConfirm={TareaService.crearTarea} title="Crear Tarea" />}
          />
          <Redirect to='/login' />
        </Switch>
      </div>
    </Router>

  )
}