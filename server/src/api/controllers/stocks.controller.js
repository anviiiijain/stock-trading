import Stock from '../../models/stock.model.js'

export const fetchStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ price: -1 })
    res.json(stocks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const fetchStockById = async (req, res) => {
  let stock
  try {
    stock = await Stock.findById(req.params.id)
    if (stock == null) {
      return res.status(404).json({ message: 'Cannot find stock' })
    }
    res.json(stock)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const addStock = async (req, res) => {
  const stock = new Stock({
    name: req.body.name,
    ticker: req.body.ticker,
    price: req.body.price,
    date: req.body.date,
  })
  try {
    const newStock = await stock.save()
    res.status(201).json(newStock)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteStock = async (req, res) => {
  try {
    console.log({ req: req.params.id })
    stock = await Stock.findOne({ _id: req.params.id })
    console.log('whutttt', { stock })
    if (!stock) {
      return res.status(404).json({ message: 'Cannot find stock' })
    }
    await stock.remove()
    res.json({ message: 'Deleted stock' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
