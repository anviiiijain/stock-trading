import React, { useEffect, useState } from 'react'
import calcProfit from '../utils/calcProfit'
import formatDate from '../utils/formatDate'
import CustomTable from './elements/custom-table'

let columns = [
  { key: 'name', label: 'Name' },
  { key: 'boughtOnDate', label: 'Bought On' },
  { key: 'boughtAtPrice', label: 'Initail Price' },
  { key: 'price', label: 'Current Price' },
  { key: 'profit', label: 'Profit' },
]

const OwnedStockTable = ({ ownedStocks }) => {
  const [rowsData, setRowsData] = useState([])

  useEffect(() => {
    let _owned = ownedStocks.map((item) => {
      let { stock, ...restItem } = item
      return {
        ...restItem,
        price: Math.floor(stock?.price * 100) / 100,
        name: stock?.name,
        boughtAtPrice: Math.floor(item?.boughtAtPrice * 100) / 100,
        profit: `${calcProfit(item?.boughtAtPrice, stock?.price)}%`,
        boughtOnDate: formatDate(item?.boughtOnDate),
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
