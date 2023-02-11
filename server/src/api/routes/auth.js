import { Router } from 'express'
import {
  loginController,
  registerController,
  verifyTokenController,
} from '../controllers/auth.controller.js'
import { checkAuth } from '../../middleware/checkAuth.js'

const route = Router()

export default (app) => {
  app.use('/auth', route)

  route.post('/register', registerController)
  route.post('/login', loginController)
  route.get('/verify-token', verifyTokenController)
}
