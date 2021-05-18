import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useState } from 'react'
import './Login.css'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography
} from '@material-ui/core'
import { UserService } from '../../services/user.service'
import { NOTIFICATION_TYPE, useErrorNotification, useSessionService } from '../../hooks/customHooks'
import { useHistory } from 'react-router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const showErrorNotification = useErrorNotification()
  const { setCurrentUser } = useSessionService()
  const router = useHistory()

  const handleLogin = async () => {
    try {
      const user = await UserService.loginUser(email, password)
      setCurrentUser(user)

      router.push('/tareas')
    } catch (error) {
      showErrorNotification(error.message, NOTIFICATION_TYPE.error)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh">

      {/* TODO: Estilizar con css y usar variables para los colores*/}
      <Card style={{
        minWidth: 360,
        maxWidth: 600,
        backgroundColor: '#e3d9cc'
      }}>

        <CardContent>
          <Typography color="textPrimary" variant="h3" align="center">
            Login
        </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="5%"
            my={5}>
            <FormControl variant="filled">
              <InputLabel htmlFor="input-email">Email</InputLabel>
              <FilledInput
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="5%">

            <FormControl variant="filled">
              <InputLabel htmlFor="input-password">Password</InputLabel>
              <FilledInput
                className="input-field"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

        </CardContent>
        <CardActions style={{ justifyContent: 'center', marginBottom: '4%' }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleLogin}>
            Ingresar
          </Button>
        </CardActions>

      </Card>
    </Box >
  )
}
