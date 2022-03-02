const express=require('express')

const app=express();
const dotenv=require('dotenv');
const errorMiddleware=require('./middlewares/error')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const cloudinary=require('cloudinary')
const fileUpload=require('express-fileupload')
var cors = require('cors')

const path=require('path')


if(process.env.NODE_ENV!=='PRODUCTION'){
    dotenv.config({path:'backend/config/config.env'})
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
const inventory=require('./routes/inventory')
const discount=require('./routes/discount')
const analytic=require('./routes/analytic')
const discountUsed=require('./routes/discountUsed')



app.use('/api/v1',products)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use('/api/v1',payment)
app.use('/api/v1',review)
app.use('/api/v1',cart)
app.use('/api/v1',inventory)
app.use('/api/v1',discount)
app.use('/api/v1',analytic)
app.use('/api/v1',discountUsed)
app.use(errorMiddleware)





if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../frontend/frontend3/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend/frontend3/build/index.html'))
    })
}

module.exports=app