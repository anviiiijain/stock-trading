import React from 'react'
import CustomCard from './elements/custom-card'
import { Typography } from '@mui/material'

const StockCard = (props) => {
  const { heading, currentPrice, profit, chartData } = props
  return (
    <CustomCard
      cardHeader={
        <div>
          <Typography>{heading}</Typography>
        </div>
      }
    >
      <div>{currentPrice}</div>
      <div>{profit}</div>
    </CustomCard>
  )
}

export default StockCard
