import { ACCESS_TOKEN_KEY } from './constants'

const storage = {
  getToken: () => {
    const itemStr = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (!itemStr) {
      return null
    }
    const token = itemStr
    return token
  },
  setToken: (token) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },
  clearToken: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  },
}

export default storage
