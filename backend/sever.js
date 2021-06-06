const app=require('./app')

const connectDatabase=require('./config/database')

const dotenv=require('dotenv');
const cloudinary=require('cloudinary')

if(process.env.NODE_ENV==='PRODUCTION'){
    dotenv.config({path:'backend/config/config.env'})
}

connectDatabase()

const sever=app.listen(process.env.PORT,()=>{
    console.log(`Sever started on Port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})
cloudinary.config({
    cloud_name:process.env.CLOUNDINARY_CLOUD_NAME,
    api_key:process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_API_SECRET
})
process.on('uncaughtException',err=>{
    console.log(`ERROR: ${err.stack}`)
    console.log('shutting down the sever due to uncaught exception')
    process.exit(1)
})
process.on('unhandledRejection',err=>{
    console.log(`ERROR : ${err.message}`)
    console.log('shutting down the sever due to Unhandle Promise rejection')
    sever.close(()=>{
        process.exit(1)
    })
})