const express=require('express')

const app=express();

const errorMiddleware=require('./middlewares/error')
const cookieParser=require('cookie-parser')
var cors = require('cors')
const corsOptions ={
    origin:'http://localhost:3000/dashboard', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
const products=require('./routes/product')
const user=require('./routes/user')
const order=require('./routes/order')
app.use('/api/v1',products)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use(errorMiddleware)

module.exports=app