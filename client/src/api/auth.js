import { get, post } from '../lib/axios'

export const loginUser = async (payload) => {
  const response = await post(`/api/auth/login`, payload)
  return response.data
}

export const registerUser = async (payload) => {
  const response = await post(`/api/auth/register`, payload)
  return response.data
}
export const verifyToken = async () => {
  const response = await get(`/api/auth/verify-token`)

  return response.data
}
