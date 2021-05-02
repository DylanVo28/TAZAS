const express=require('express')

const app=express();

const errorMiddleware=require('./middlewares/error')
const cookieParser=require('cookie-parser')
const bodyparser=require('body-parser')
const cloudinary=require('cloudinary')
const fileUpload=require('express-fileupload')
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:4000',
    credentials:true,
    optionsSuccessStatus: 200, // For legacy browser support
    withCredentials:true
}
app.use(cookieParser())
app.use(cors());
app.use(express.json())
app.use(fileUpload());
cloudinary.config({
    cloud_name:process.env.CLOUNDINARY_CLOUD_NAME,
    api_key:process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_API_SECRET
})
const products=require('./routes/product')
const user=require('./routes/user')
const order=require('./routes/order')
app.use('/api/v1',products)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use(errorMiddleware)

module.exports=app