import { useEffect, useState } from 'react'
import CustomTable from './elements/custom-table'

let columns = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
]

const StockTable = ({ stocks }) => {
  const [rowsData, setRowsData] = useState()
  useEffect(() => {
    let _sotcks = stocks.map((item) => {
      return {
        ...item,
        price: Math.floor(item.price * 100) / 100,
      }
    })
    setRowsData(_sotcks)
  }, [stocks])
  return (
    <div>
      <h1 className='font-bold text-xl text-left my-5'>Most Valued Stocks</h1>
      <CustomTable columns={columns} rows={rowsData} />
    </div>
  )
}

export default StockTable
