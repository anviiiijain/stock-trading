import { useEffect, useState } from 'react'
import { fetchOwnedStocks, fetchStocks } from '../api/stock'
import Socket from 'socket.io-client'
const socket = Socket('http://localhost:1337', {
  transports: ['websocket', 'polling'],
})

export default function useStocks() {
  const [stocks, setStocks] = useState([])
  const [ownedStocks, setOwnedStocks] = useState([])

  async function getStocks() {
    let res = await fetchStocks()
    setStocks(res)
  }

  async function getOwnedStocks() {
    let res = await fetchOwnedStocks()
    setOwnedStocks(res.ownedStocks)
  }

  useEffect(() => {
    socket.on('stock data', async (data) => {
      await getStocks()
      await getOwnedStocks()
    })
  }, [stocks, ownedStocks])

  return {
    stocks,
    ownedStocks,
  }
}
