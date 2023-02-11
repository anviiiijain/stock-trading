import Stock from '../../models/stock.model.js'
import User from '../../models/user.model.js'

export const fetchUserStocks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: 'something went wrong' })
    }
    const user = await User.findOne({ where: { id: req.user.id } }).populate(
      'ownedStocks.stock'
    )
    if (!user) {
      return res.status(403).json({ message: 'error in fetching stocks' })
    }

    res.status(200).json({ ownedStocks: user.ownedStocks })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const fetchUserStockById = async (req, res) => {
  const { id } = req.params
  try {
    if (!req.user) {
      return res.status(403).json({ message: 'something went wrong' })
    }
    const user = await User.findOne({ where: { id: req.user.id } })
    if (!user) {
      return res.status(403).json({ message: 'error in fetching stocks' })
    }
    const ownedStocks = user.ownedStocks
    const indexOfStock = ownedStocks.indexOf(id)
    const stock = ownedStocks[indexOfStock]
    res.status(200).json({ stock })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const buyStock = async (req, res) => {
  const { id } = req.body
  try {
    if (!req?.user) {
      return res.status(403).json({ message: 'something went wrong' })
    }
    const user = await User.findOne({ where: { id: req?.user?.email } })
    if (!user) {
      return res.status(403).json({ message: 'error in fetching stocks' })
    }
    console.log({ user })
    if (user.ownedStocks.find((item) => item.stock == id)) {
      return res.json({ message: 'stock already owned' })
    }
    const stock = await Stock.findById(id)
    if (!stock) {
      return res.status(404).json({ message: 'this stock does not exist' })
    }
    let stockInfo = {
      boughtOnDate: Date.now(),
      boughtAtPrice: stock?.price,
      stock: id,
    }
    let ownedStocks = user?.ownedStocks
    ownedStocks.push(stockInfo)
    const response = await User.updateOne(
      { where: { id: req?.user?.id } },
      { ownedStocks }
    )

    res.status(200)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
