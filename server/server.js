const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
const regUser = require('./Database/register.js')

const cookieParser = require('cookie-parser');
const authUser = require('./Routes/auth.js')

app.use(express.json());

app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use('/users',authUser);

app.get('/cors',(req,res)=>{
  res.send('CORS enabled route');
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

