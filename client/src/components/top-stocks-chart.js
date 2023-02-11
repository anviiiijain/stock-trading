import { useEffect, useState } from 'react'
import { tailwindConfig } from '../utils/Utils'
import LineChart from './charts/line-chart'
import Socket from 'socket.io-client'
import useStocks from '../hooks/useStocks'
const socket = Socket('http://localhost:1337', {
  transports: ['websocket', 'polling'],
})
const TopStocksChart = () => {
  const [topStock, setTopStock] = useState([])
  const [secondStock, setSecondStock] = useState([])
  const { stocks } = useStocks()

  useEffect(() => {
    socket.on('stock data', async () => {
      let _topStock = topStock
      _topStock.push(stocks[0].price)
      setTopStock(_topStock)
      let _secondStock = secondStock
      _secondStock.push(stocks[1].price)
      setSecondStock(_secondStock)
    })
  }, [stocks])

  const chartData = {
    labels: [
      '12-01-2020',
      '01-01-2021',
      '02-01-2021',
      '03-01-2021',
      '04-01-2021',
      '05-01-2021',
      '06-01-2021',
      '07-01-2021',
      '08-01-2021',
      '09-01-2021',
      '10-01-2021',
      '11-01-2021',
      '12-01-2021',
      '01-01-2022',
      '02-01-2022',
      '03-01-2022',
      '04-01-2022',
      '05-01-2022',
      '06-01-2022',
      '07-01-2022',
      '08-01-2022',
      '09-01-2022',
      '10-01-2022',
      '11-01-2022',
      '12-01-2022',
      '01-01-2023',
    ],
    datasets: [
      // Blue line
      {
        label: 'Previous',
        data: topStock,
        borderColor: tailwindConfig().theme.colors.blue[400],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
      },
      // Green line
      {
        label: 'Average',
        data: secondStock,
        borderColor: tailwindConfig().theme.colors.green[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
      },
    ],
  }

  return (
    <div className='w-11/12 mx-auto'>
      <h2 className='font-bold text-xl text-left mt-5 '>Most Valued Stocks:</h2>
      <LineChart data={chartData} width={595} height={248} />
    </div>
  )
}

export default TopStocksChart
