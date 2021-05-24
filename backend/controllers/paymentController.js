const stripe= require('stripe')('sk_test_51It4PvLgUSTDjbyW1TX14NGrqt6rdXEquDcdixdFU5w3uojSzVzOTmoZwvy5UUN6ab4nPHGHvTw5NDeTcrrzVmZr00zDyQZhzu')
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.processPayment=catchAsyncError(async (req,res,next)=>{
    
    const paymentIntent=await stripe.paymentIntents.create({
        amount:req.body.data*100,
        currency:'usd',
        metadata:{integration_check:'accept_a_payment'}
    })
    console.log(paymentIntent)
    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    })
})
exports.sendStripeApi=catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLIC_KEY
    })
})