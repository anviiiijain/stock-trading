import { Router } from 'express'
import { checkAuth } from '../../middleware/checkAuth.js'
import {
  buyStock,
  fetchUserStockById,
  fetchUserStocks,
} from '../controllers/user.controller.js'

const route = Router()

export default (app) => {
  app.use('/user', route)
  route.get('/owned', checkAuth, fetchUserStocks)
  route.post('/buy', checkAuth, buyStock)
  route.get('/owned/:id', checkAuth, fetchUserStockById)
}
