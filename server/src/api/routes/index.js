import { Router } from 'express'
import auth from './auth.js'
import stocks from './stocks.js'
import user from './user.js'

export default () => {
  const app = Router()
  auth(app)
  stocks(app)
  user(app)
  return app
}
