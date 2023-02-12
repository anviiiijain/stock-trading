import { useEffect, useState } from 'react'
import { tailwindConfig } from '../utils/Utils'
import LineChart from './charts/line-chart'

const TopStocksChart = ({ stocks }) => {
  const [topStock, setTopStock] = useState([])
  const [secondStock, setSecondStock] = useState([])

  const generateDates = () => {
    const now = new Date()
    const dates = []
    topStock.forEach((v, i) => {
      dates.push(new Date(now - 2000 - i * 2000))
    })
    return dates
  }

  const [slicedLabels, setSlicedLabels] = useState(
    generateDates().slice(0, 50).reverse()
  )

  useEffect(() => {
    let _topStock = topStock
    let _secondStock = secondStock

    if (stocks[0]?.price) {
      _topStock.push(stocks[0]?.price)
      setTopStock(_topStock)
    }
    if (stocks[1]?.price) {
      _secondStock.push(stocks[1]?.price)
      setSecondStock(_secondStock)
    }
    setSlicedLabels((slicedLabels) => [...slicedLabels, new Date()])

    if (topStock.length > 50) {
      _topStock.shift()
    }
    if (secondStock.length > 50) {
      _secondStock.shift()
    }
    if (slicedLabels.length > 50) {
      setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels])
    }
  }, [stocks])

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Blue line
      {
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
