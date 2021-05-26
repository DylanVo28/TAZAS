const express=require('express')

const app=express();

const errorMiddleware=require('./middlewares/error')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const cloudinary=require('cloudinary')
const fileUpload=require('express-fileupload')
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials:true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(fileUpload());

cloudinary.config({
    cloud_name:process.env.CLOUNDINARY_CLOUD_NAME,
    api_key:process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_API_SECRET
})
const products=require('./routes/product')
const user=require('./routes/user')
const order=require('./routes/order')
const payment=require('./routes/payment')
const review=require('./routes/review')
const cart=require('./routes/cart')
app.use('/api/v1',products)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use('/api/v1',payment)
app.use('/api/v1',review)
app.use('/api/v1',cart)
app.use(errorMiddleware)

module.exports=app