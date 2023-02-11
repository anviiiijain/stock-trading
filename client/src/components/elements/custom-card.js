import { Card, CardContent, CardHeader, CardMedia } from '@mui/material'
import React from 'react'

const CustomCard = (props) => {
  const { children, cardAction, cardHeader, cardMediaProps, ...rest } = props
  return (
    <Card sx={{ backgroundColor: '#fff' }}>
      {cardHeader && <CardHeader>{cardHeader}</CardHeader>}
      {cardMediaProps && <CardMedia {...cardMediaProps} />}
      <CardContent>{children}</CardContent>
      {cardAction && <CardHeader>{cardAction}</CardHeader>}
    </Card>
  )
}

export default CustomCard
