import { useEffect } from 'react'
import useStocks from '../hooks/useStocks'
import CustomTable from './elements/custom-table'

let columns = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
]

const StockTable = () => {
  const { stocks } = useStocks()
  useEffect(() => {}, [stocks])

  return (
    <div>
      <h1 className='font-bold text-xl text-left my-5'>Most Valued Stocks</h1>
      <CustomTable columns={columns} rows={stocks} />
    </div>
  )
}

export default StockTable
