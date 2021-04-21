const express=require('express')

const app=express();

const errorMiddleware=require('./middlewares/error')
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
const products=require('./routes/product')
const user=require('./routes/user')
app.use('/api/v1',products)
app.use('/api/v1',user)
app.use(errorMiddleware)

module.exports=app