import axios from 'axios'
import storage from '../utils/storage'

const instance = axios.create({
  baseURL: 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  validateStatus: (status) => status < 500,
})

instance.interceptors.request.use(
  function (config) {
    const token = storage.getToken()
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  function (error) {
    if (error.response.data.code === 401) {
      storage.clearToken()
    }
    return Promise.reject(error)
  }
)

export const get = async (path) => {
  const response = await instance.get(path)

  return response
}

export const post = async (path, body) => {
  const response = await instance.post(path, body)
  return response
}

export const deletes = async (path) => {
  const response = await instance.delete(path)
  return response
}
