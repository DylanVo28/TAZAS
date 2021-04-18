const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter product name"],
        trim: true,
        maxLength: [100,"Product name cannot exceed 100 characters"]
    }
    //add value 
})
module.exports=mongoose.model('Product',productSchema)