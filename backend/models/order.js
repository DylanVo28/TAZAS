const mongoose=require('mongoose')
const discount=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Discount'
    },
    name:{
        type:String,
    },
    categoryProduct:{
        type:String,
    },
    value:{
        type:Number,
    },
  
})
const orderSchema=mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }

    },
    transactionEthereum:{
        from: {
            type:String,
            required:true
        },
        hash:{
            type: String,
            required:true
        },
        value:{
            type:String,
            required:true
        },
        to: {
            type:String,
            required:true
        },

        keyword: {
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
        {
            _id:false,
            quantity:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            name:{
                type:String
            },
            price:{
                type:Number
            },
            image:{
                type:String
            }

        }
    ],
    paymentMethod:{
        type:String,
        default:'COD'
    },
    paidAt:{
        type:Date
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing"
    },
    deliveredAt:{
        type:Date
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    discount: discount
   

})
module.exports=mongoose.model('Order',orderSchema)