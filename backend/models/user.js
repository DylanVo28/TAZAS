const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please enter your name'],
        maxLength:[40,'Your name cannot exceed 30 characters']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserLogin'
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    
    createAt:{
        type:Date,
        default:Date.now
    },
    cartItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            checked:{
                type:Boolean,
                default:false
            },
            quantity:{
                type:Number,
                default:0.0
            }
        }
    ],
    placeOfBirth:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    emailUser:{
        type:String
    }

})

module.exports=mongoose.model('User',userSchema)