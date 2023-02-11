import config from '../config/index.js'
import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, config.accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403).json({ message: 'You are not authorised' })
      }
      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
