const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/order");
const ErrorHandler = require("../utils/errorHandler");

exports.newOrder=catchAsyncError(async (req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        orderStatus,
        shippingPrice
    }=req.body;
    const order=await Order.create({
        orderItems,
        shippingInfo,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        orderStatus,
        shippingPrice,
        user:req.user.id,
        paidAt:Date.now(),

    })
    res.status(200).json({
        success:true,
        order
    })
})
exports.getOderDetail=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler('order not found',404))
    }
    res.status(200).json({
        success:true,
        order
    })
})
exports.myOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});
    
    res.status(200).json({
        success:true,
        orders
    })
})
exports.allOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find()
    let totalPayment=0;
    orders.forEach(order=>{
        totalPayment+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalPayment,
        orders
    })
})
exports.updateOrder=catchAsyncError(async (req,res,next)=>{
    //update comming
})

exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }
    await order.remove()
    res.status(200).json({
        success:true
    })
})