import {
  validateLogin,
  validateRegister,
} from '../../validators/auth.validator.js'
import User from '../../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '../../config/index.js'

export const registerController = async (req, res) => {
  const { error } = validateRegister(req.body)

  if (error) {
    console.log(error)
    return res.send(error.details)
  }

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' })
  }
}
export const loginController = async (req, res) => {
  const { error } = validateLogin(req.body)

  if (error) {
    console.log(error)
    return res.send(error.details)
  }
  const user = await User.findOne({
    email: req.body.email,
  })

  if (!user) {
    return { status: 'error', error: 'Invalid login' }
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      config.accessTokenSecret
    )

    return res.json({ status: 'ok', user: token })
  } else {
    return res.json({ status: 'error', user: false })
  }
}

export const verifyTokenController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      jwt.verify(token, config.accessTokenSecret, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'something went wrong' })
        }
        res.status(200).json({ user })
      })
    } else return res.status(401)
  } catch (err) {
    res.json({ status: 'error', error: err.message })
  }
}
