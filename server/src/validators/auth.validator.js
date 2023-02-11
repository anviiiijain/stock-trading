import Joi from 'joi'

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
  confirmPassword: Joi.ref('password'),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
})

export const validateRegister = validator(registerSchema)
export const validateLogin = validator(loginSchema)
