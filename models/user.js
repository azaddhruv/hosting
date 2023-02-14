const mongoose = require('mongoose')
const Product = require('./product')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [
    {
      name: String,
      price: String,
      quantity: String,
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
})

const User = mongoose.model('User', userSchema)

module.exports = User
