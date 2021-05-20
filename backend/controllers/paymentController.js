const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.processPayment=catchAsyncError(async (req,res,next)=>{
    const paymentIntent=await stripe.paymentIntent.create({
        amount:req.body.amount,
        currency:'usd',
        metadata:{integration_check:'accept_a_payment'}
    })
    res.status(200).json({
        success:true,
        client_Secret:paymentIntent.client_Secret
    })
})
exports.sendStripeApi=catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLIC_KEY
    })
})