import { useEffect, useState } from 'react'
import { hexToRGB, tailwindConfig } from '../utils/Utils'
import RealtimeChart from './charts/realtime-chart'

const data = [
  57.81, 57.75, 55.48, 54.28, 53.14, 52.25, 51.04, 52.49, 55.49, 56.87, 53.73,
  56.42, 58.06, 55.62, 58.16, 55.22, 58.67, 60.18, 61.31, 63.25, 65.91, 64.44,
  65.97, 62.27, 60.96, 59.34, 55.07, 59.85, 53.79, 51.92, 50.95, 49.65, 48.09,
  49.81, 47.85, 49.52, 50.21, 52.22, 54.42, 53.42, 50.91, 58.52, 53.37, 57.58,
  59.09, 59.36, 58.71, 59.42, 55.93, 57.71, 50.62, 56.28, 57.37, 53.08, 55.94,
  55.82, 53.94, 52.65, 50.25,
]

const StockChart = () => {
  const [counter, setCounter] = useState(0)
  const [increment, setIncrement] = useState(0)
  const [range, setRange] = useState(35)
  const [slicedData, setSlicedData] = useState(data.slice(0, range))

  // Generate fake dates from now to back in time
  const generateDates = () => {
    const now = new Date()
    const dates = []
    data.forEach((v, i) => {
      dates.push(new Date(now - 2000 - i * 2000))
    })
    return dates
  }

  const [slicedLabels, setSlicedLabels] = useState(
    generateDates().slice(0, range).reverse()
  )

  // Fake update every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [counter])

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1)
    if (increment + range < data.length) {
      setSlicedData(([x, ...slicedData]) => [
        ...slicedData,
        data[increment + range],
      ])
    } else {
      setIncrement(0)
      setRange(0)
    }
    setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()])
    return () => setIncrement(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Indigo line
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  }
  return <RealtimeChart data={chartData} width={595} height={248} />
}
export default StockChart
