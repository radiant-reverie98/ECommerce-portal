const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
const uploadProduct = require('./Routes/fileUpload.js')
const path = require('path')
const homePage = require('./Routes/homePage')
const cookieParser = require('cookie-parser');
const authUser = require('./Routes/auth.js')
const editUser = require('./Routes/edit.js')
const buyer_auth = require('./Routes/buyer_auth.js')
const cart = require('./Routes/cart.js')
const orders = require('./Routes/orders.js')

app.use(express.json());

app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use('/users',authUser);
app.use('/edit',editUser);
app.use('/uploads', express.static('uploads'));
app.use('/upload',uploadProduct)
app.use('/buyer',homePage)
app.use('/buyerAuth',buyer_auth)
app.use('/cart',cart)
app.use('/orders', orders);
app.use('/upload', express.static(path.join(__dirname, 'uploads')));


app.get('/cors',(req,res)=>{
  res.send('CORS enabled route');
})


app.get('/', (req, res) => {
  res.send('Server running on port 3000....')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

