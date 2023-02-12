import mongoose from 'mongoose'

const StockSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ticker: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'stock' }
)

StockSchema.statics.randomize = function () {
  return this.collection.updateMany(
    {},
    {
      $mul: { price: Math.random() * 0.1 + 0.95 },
    }
  )
}

StockSchema.pre('deleteOne', function (next) {
  const stockId = this.getQuery()['_id']
  mongoose
    .model('User')
    .updateMany(
      { ownedStocks: { $elemMatch: { stock: stockId } } },
      { $pull: { ownedStocks: { $elemMatch: { stock: stockId } } } },
      function (err, result) {
        if (err) {
          console.log(`[error] ${err}`)
          next(err)
        } else {
          console.log('success')
          next()
        }
      }
    )
})

const StockModel = mongoose.model('Stock', StockSchema)

export default StockModel
