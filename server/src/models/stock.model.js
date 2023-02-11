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

const StockModel = mongoose.model('Stock', StockSchema)

export default StockModel
