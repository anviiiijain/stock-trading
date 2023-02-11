import React, { useEffect, useState } from 'react'
import { fetchOwnedStocks } from '../api/stock'
import CustomTable from './elements/custom-table'
import formatDate from '../utils/formatDate'
import calcProfit from '../utils/calcProfit'
import Socket from 'socket.io-client'
import useStocks from '../hooks/useStocks'
const socket = Socket('http://localhost:1337', {
  transports: ['websocket', 'polling'],
})

let columns = [
  { key: 'name', label: 'Name' },
  { key: 'boughtOnDate', label: 'Bought On' },
  { key: 'boughtAtPrice', label: 'Initail Price' },
  { key: 'price', label: 'Current Price' },
  { key: 'profit', label: 'Profit' },
]

const OwnedStockTable = () => {
  const [rowsData, setRowsData] = useState([])
  const { ownedStocks } = useStocks()

  useEffect(() => {
    let _owned = ownedStocks.map((item) => {
      let { stock, ...restItem } = item
      return {
        ...restItem,
        price: stock.price,
        name: stock.name,
        profit: `${calcProfit(item.boughtAtPrice, stock.price)}%`,
        boughtOnDate: formatDate(item.boughtOnDate),
      }
    })
    setRowsData(_owned)
  }, [ownedStocks])

  return (
    <div>
      <h1 className='font-bold text-xl text-left my-5'> My Stocks</h1>
      <CustomTable columns={columns} rows={rowsData} />
    </div>
  )
}

export default OwnedStockTable
