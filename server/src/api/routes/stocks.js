import { Router } from 'express'
import { checkAuth } from '../../middleware/checkAuth.js'
import {
  addStock,
  deleteStock,
  fetchStockById,
  fetchStocks,
} from '../controllers/stocks.controller.js'

const route = Router()

export default (app) => {
  app.use('/stocks', route)

  route.get('/', fetchStocks)
  route.get('/:id', fetchStockById)
  route.post('/', checkAuth, addStock)
  route.delete('/:id', checkAuth, deleteStock)
}
