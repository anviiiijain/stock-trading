import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ownedStocks: [
      {
        stock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Stock',
        },
        boughtOnDate: {
          type: Date,
          default: Date.now,
        },
        boughtAtPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  { collection: 'user' }
)

const UserModel = mongoose.model('User', User)

export default UserModel
