const Review =require('../models/review')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncError=require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')
exports.addReview=catchAsyncError(async (req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review=await Review.create({
        _id:productId,
        rating,
        comment,
        userId:req.user._id
    })
    res.status(200).json({
        success: true,
        review
    })
})