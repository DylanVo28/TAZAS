const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/order");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const Product = require('../models/product');
const User = require("../models/user");
const Discount = require("../models/discount");
const DiscountUsed = require("../models/discountUsed");

exports.newOrder = catchAsyncError(async (req, res, next) => {

    const {
        orderItems,
        shippingInfo,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        orderStatus,
        shippingPrice,
        discountId
    } = req.body.data;
    if(discountId){
        await Discount.findByIdAndUpdate(discountId,{$inc:{
            quantity:-1
        }})
        const discountUsed=await DiscountUsed.findOne({discountId:discountId,userId:req.user._id})
        if(discountUsed){
            return next(new ErrorHandler('Code discount used', 500))
        }
        await DiscountUsed.create({discountId:discountId,userId:req.user._id})
    }
    const order = await Order.create({
        orderItems,
        shippingInfo,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        orderStatus,
        shippingPrice,
        user: req.user.id,
        discountId
    })
    res.status(200).json({
        success: true,
        order
    })
})
exports.getOderDetail = catchAsyncError(async (req, res, next) => {
    var order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('order not found', 404))
    }
    const discount=await Discount.findById(order.discountId)
    const user=await User.findById(order.user)
    if(!user){
        return next(new ErrorHandler('user not found', 404))

    }
    var orderItems=[]
    await Promise.all(order.orderItems.map(async (item) => {
        try {
          // here candidate data is inserted into  
          const product=await Product.findById(item.product)
          if(product!==null){
            // and response need to be added into final response array 
            orderItems.push({
                name:product.name,
                image:product.images[0].url,
                price:product.price,
                quantity:item.quantity
            })
          }
        } catch (error) {
          console.log('error'+ error);
        }
      }))
    res.status(200).json({
        success: true,
        order,
        orderItems,
        user,
        discount
    })
})
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        orders
    })
})
exports.allOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()
    let totalPayment = 0;
    orders.forEach(order => {
        if(order.orderStatus=='Complete'){
            totalPayment += order.totalPrice
        }
    })
    orders.sort((a,b)=>b.createAt.getTime()-a.createAt.getTime())
    res.status(200).json({
        success: true,
        totalPayment,
        orders
    })
})
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler('Order not found', 404))
    }
    order.orderStatus = req.body.orderStatus
    if(order.orderStatus == 'Confirmed'){
        order.orderItems.forEach(async item => {
            const product = await Product.findById(item.product);
            if(product.stock<item.quantity){
                return next(new ErrorHandler('Stock product less then item request', 404))
            }
            product.stock -= item.quantity
            await product.save()

        })
    }
    if (order.orderStatus == 'Delivered') {
        order.deliveredAt=Date.now()
    }
    if(order.orderStatus=='Complete'){
        order.paidAt=Date.now()
    }
    await order.save();

    res.status(200).json({
        success: true,
        order
    })
})
exports.deleteOrderBeforeDelivered = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler('Order not found', 404))
    }
    if (order.orderStatus == 'Confirmed' || order.orderStatus == 'Processing') {
        await order.remove()
    }
    else{
        return next(new ErrorHandler(`Order have ${order.orderStatus}`, 500))
    }
    res.status(200).json({
        success: true
    })
})

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('Order not found', 404))
    }
    await order.remove()
    res.status(200).json({
        success: true
    })
})
