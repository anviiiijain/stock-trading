import dotenv from 'dotenv'

dotenv.config()

export default {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  api: {
    prefix: '/api',
  },
}
