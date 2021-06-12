const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.addToCart=catchAsyncError(async(req,res,next)=>{
    
    const cart=await Cart.find({userId:req.user._id,productId:req.body.data.product})
    if(cart.length==0){
        await Cart.create({
            quantity:1,
            userId:req.user._id,
            productId:req.body.data.product
        })
    }
    else{
        await Cart.updateOne({userId:req.user._id,productId:req.body.data.product},{$inc:{quantity:+1}})
    }
    res.status(200).json({
        success:true
    })
   
})
exports.getMyCart=catchAsyncError(async(req,res,next)=>{
    const cart=await Cart.find({userId:req.user._id})
    if(cart.length==0){
        return next(new ErrorHandler('cart empty', 404))
    }
    var myCart=[]
    await Promise.all(cart.map(async (item) => {
        try {
          // here candidate data is inserted into  
          const product=await Product.findById(item.productId)
          // and response need to be added into final response array 
          if(product){
            myCart.push( {
                _id:item._id,
                product:item.productId,
              checked:item.checked,
              name:product.name,
              image:product.images[0].url,
              price:product.price,
              quantity:item.quantity,
              category:product.category,
              total:Number (product.price*item.quantity)
          })
          }
          
        
        } catch (error) {
          console.log('error'+ error);
        }
      }))
      res.status(200).json({
        success:true,
        myCart
    })
})
exports.updateToCart=catchAsyncError(async(req,res,next)=>{
    const cart=await Cart.findByIdAndDelete(req.body.data)
    if(!cart){
        return next(new ErrorHandler('dont delete item in cart', 404))
    }
    res.status(200).json({
        success:true,
    })
})