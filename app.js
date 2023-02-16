const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const Product = require('./models/product')
const session = require('express-session')
const bcrypt = require('bcrypt')
const { urlencoded } = require('express')
const { isAuth } = require('./middleware')

mongoose
  .connect(
    '',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('db connected')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: 'thisshouldbeagoodsecret' }))

app.get('/', (req, res) => {
  res.send('working')
})

app.post('/user/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    const check = await User.findOne({ username })
    if (check) {
      res.json('username taken')
      return
    }
    const hash = await bcrypt.hash(password, 8)
    const user = new User({
      username,
      password: hash,
    })
    await user.save()
    req.session.user_id = user._id
    res.send('User Created')
  } catch (err) {
    res.send(err.message)
  }
})

app.post('/user/signin', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
      const validPass = await bcrypt.compare(password, user.password)
      if (validPass) {
        req.session.user_id = user._id
        res.send('logged in')
      } else {
        res.send('username or password is incorrect')
      }
    } else {
      res.send('User does not exist')
    }
  } catch (err) {
    res.send(err.message)
  }
})

app.post('/user/logout', (req, res) => {
  req.session.user_id = null
  res.send('Logged out')
})

//Products

app.get('/products', async (req, res) => {
  const product = await Product.find({})
  res.json(product)
})

app.post('/products/order', isAuth, async (req, res) => {
  const { quantity, id } = req.body
  const product = await Product.findById(id)
  if (product) {
    // if (product.quantity < quantity) {
    //   res.send('decrease quantity to proceed')
    //   return
    // }
    product.quantity -= quantity
    // if (product.quantity <= 0) {
    //   await Product.findByIdAndDelete(id)
    // }
    const user = await User.findById(req.session.user_id)
    user.orders.push({
      name: product.name,
      quantity: quantity,
      price: product.price,
    })
    await product.save()
    await user.save()
    res.send('order placed')
  } else {
    res.send('product not found')
  }
})

app.get('/user/order/history', isAuth, async (req, res) => {
  const user = await User.findById(req.session.user_id)
  if (user) {
    res.json(user.orders)
  } else {
    res.send('User not found')
  }
})

app.post('/products', isAuth, async (req, res) => {
  const { name, quantity, price } = req.body
  const product = new Product({ name, quantity, price })
  const user = await User.findById(req.session.user_id)
  product.owner = user
  await product.save()
  res.json({
    message: 'Product created successfully',
    name,
    quantity,
    price,
    owner: user.username,
  })
})

app.listen(8080, () => {
  console.log('Server started on port 8080')
})
