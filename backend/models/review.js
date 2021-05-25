const mongoose=require('mongoose')
const reviewSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
   
    comment:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
    
} )
module.exports=mongoose.model('Review',reviewSchema)
