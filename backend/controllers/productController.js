const Product =require('../models/product')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncError=require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary=require('cloudinary')
//add new product
exports.newProduct=catchAsyncError (async (req,res,next)=>{
    req.body.user=req.user.id
    // const result=await cloudinary.v2.uploader.upload(req.body.images,{
    //     folder:'tazas',
    //     width:150,
    //     crop:'scale',
    //     limit: '52428800'
    // })
    const product= await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

exports.getAllProduct=catchAsyncError(async (req,res,next)=>{
    const products= await Product.find()
    res.status(201).json({
        success:true,
        products
    })
})

exports.getLengthProduct=catchAsyncError(async(req,res,next)=>{
    const products=await Product.find();
    res.status(201).json({
        success:true,
        lengthProducts:products.length
    })
})
//get all product {{DOMAIN}}/api/v1/products?keyword=?
exports.getProducts=catchAsyncError(async (req,res,next)=>{

  
    const resPerPage=10
    const apiFeatures=new APIFeatures(Product.find(),req.query)
    .search()
    .pagination(resPerPage)
    const products=await apiFeatures.query;
    res.status(200).json({
        success:true,
        products
    })
})

//get single product
exports.getSingleProduct=catchAsyncError(async (req,res,next)=>{
    const product=await Product.findById(req.params.id).catch(error=>console.error())

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    res.status(200).json({
        success:true,
        product
    })
})

//update product
exports.updateProduct=catchAsyncError(async (req,res,next)=>{
    const result=await cloudinary.v2.uploader.upload(req.body.image,{
        folder:'tazas',
        width:150,
        crop:'scale',
        limit: '52428800'
    })
    const product=await Product.findById(req.params.id).catch(error=>console.error())
    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    product.images[0].url=result.secure_url
    product.images[0].public_id=result.asset_id
    product.save()
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

//delete product
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id).catch(error=>console.error())
    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    await product.remove()
    res.status(200).json({
        success:true,
        message:"Product is deleted"
    })
})

exports.createProductReview=catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId}=req.body
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product=await Product.findById(productId)

    const isReviewed=product.reviews.find(
        r=>r.user.toString()===req.user._id.toString()
    )
  
    if(isReviewed){
        product.reviews.forEach(review=>{
            if(review.user.toString()===req.user._id.toString()){
                review.comment=comment
                review.rating=rating
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numOfReviews=product.reviews.length
    }
    product.ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    })
})
exports.getAllReviews=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.query.id)
    if(!product){
        return next(new ErrorHandler('Product  not found',404))
    }
        
    const allReviews=product.reviews
    res.status(200).json({
        success:true,
        allReviews
    })
})
exports.deleteReview=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.query.id)
    if(!product){
        return next(new ErrorHandler('Product  not found',404))
    }
    const reviews= product.reviews.filter(rv=>rv._id.toString()!==req.query.reviewId.toString())
    const numOfReviews=reviews.length
    const ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/reviews.length
    await Product.findByIdAndUpdate(req.query.id,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
})