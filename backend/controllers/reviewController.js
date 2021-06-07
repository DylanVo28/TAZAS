const Review =require('../models/review')
const User =require('../models/user')

const ErrorHandler=require('../utils/errorHandler')
const catchAsyncError=require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')
exports.addReview=catchAsyncError(async (req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review=await Review.findOneAndUpdate({productId,userId:req.user._id},{$set:{rating,comment}},{useFindAndModify: false})
    if(!review){
        await Review.create({
            productId,
            rating,
            comment,
            userId:req.user._id
        })
       
    }
    res.status(200).json({
        success: true,
        review
    })
})
exports.getAllReviewByProduct=catchAsyncError(async (req,res,next)=>{
    const reviews=await Review.find({productId:req.query.id})
    var list=await Promise.all(reviews.map(async (item) => {
        try {
          // here candidate data is inserted into  
          const user=await User.findById(item.userId)
          // and response need to be added into final response array 
          return {
            comment: item.comment,
            rating:item.rating,
            createAt:item.createAt,
            image:user.avatar.url,
            userName:user.name
        }
        
        } catch (error) {
          console.log('error'+ error);
        }
      }))
      let averageReview = list.reduce((a, b) => a.rating + b.rating) / list.length;
    res.status(200).json({
        success: true,
        list,
        averageReview
    })
})