import { get, post } from '../lib/axios'

export const fetchStocks = async () => {
  const response = await get(`/api/stocks`)
  return response.data
}
export const fetchStockById = async (payload, id) => {
  const response = await get(`/api/stocks/${id}`, payload)
  return response.data
}
export const fetchOwnedStocks = async (payload) => {
  const response = await get(`/api/user/owned`, payload)
  return response.data
}
