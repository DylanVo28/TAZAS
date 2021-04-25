const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/order");

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