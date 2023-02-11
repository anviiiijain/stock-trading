import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './api/routes/index.js'
import { Server } from 'socket.io'
import socket from '../socket.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes())

mongoose.connect('mongodb://localhost:27017/stock-trading-db')

const server = app.listen(1337, () => {
  console.log('Server started on 1337')
})

const io = new Server(server, {
  transports: ['websocket', 'polling'],
})

socket(io)
