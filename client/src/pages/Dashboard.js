import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/navbar'
import OwnedStockTable from '../components/owned-stock-table'
import StockTable from '../components/stock-table'
import TopStocksChart from '../components/top-stocks-chart'
import Socket from 'socket.io-client'
import { fetchOwnedStocks, fetchStocks } from '../api/stock'
import RealtimeChart from '../components/charts/realtime-chart'
const socket = Socket('http://localhost:1337', {
  transports: ['websocket', 'polling'],
})

const Dashboard = () => {
  const [stocks, setStocks] = useState([])
  const [ownedStocks, setOwnedStocks] = useState([])

  useEffect(() => {
    socket.on('stock data', async (data) => {
      let res = await Promise.all([fetchStocks(), fetchOwnedStocks()])
      setStocks(res[0])
      setOwnedStocks(res[1].ownedStocks)
    })
  }, [])
  return (
    <div>
      <Navbar />
      <div className='w-11/12 mx-auto '>
        <TopStocksChart stocks={stocks} />
        <div className='w-11/12 mx-auto'>
          <StockTable stocks={stocks} />
          <OwnedStockTable ownedStocks={ownedStocks} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
