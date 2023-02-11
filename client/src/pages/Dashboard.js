import React from 'react'
import Navbar from '../components/layout/navbar'
import OwnedStockTable from '../components/owned-stock-table'
import StockTable from '../components/stock-table'
import TopStocksChart from '../components/top-stocks-chart'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className='w-11/12 mx-auto '>
        {/* <StockChart /> */}
        <TopStocksChart />
        <div className='w-11/12 mx-auto'>
          <StockTable />
          <OwnedStockTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
