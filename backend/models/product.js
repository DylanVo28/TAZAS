const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter product name"],
        trim: true,
        maxLength: [100,"Product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        required:[true,"Please enter price"],
        maxLength:[15,"Product price cannot exceed 15 characters "],
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter description"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },

        }
    ],
    classify:{
        type:String,
        required:[true,'Please enter classify'],
        enum:{
            values:[
                "Men",
                "Women",
                "Kid"
            ]
        }
    },
    category:{
        type:String,
        required:[true,'Please enter category'],
        enum:{
            values:[
                'Jackets & Coats',
                'Hoodies & Sweatshirts',
                'Cardigan & Jumpers',
                'T-shirt & Tanks',
                'Shoes',
                'Shirts',
                'Basics',
                'Blazers & Suits',
                'Shorts',
                'Trousers',
                'Jeans',
                'Swimwear',
                'Underwear',
                'Socks',
                
            ],
            message:'Please enter select category'
        }
    },
    seller:{
        type:String,
        required:[true,'Please enter product seller']
    },
    stock:{
        type:Number,
        required:[true,'Please enter product stock'],
        maxLength:[5,'Product stock cannot exceed 5 characters']
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
    //add value 

})
module.exports=mongoose.model('Product',productSchema)