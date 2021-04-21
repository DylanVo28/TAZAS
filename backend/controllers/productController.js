const Product =require('../models/product')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncError=require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')
//add new product
exports.newProduct=catchAsyncError (async (req,res,next)=>{
    req.body.user=req.user.id
    const product= await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

//get all product {{DOMAIN}}/api/v1/products?keyword=?
exports.getProducts=catchAsyncError(async (req,res,next)=>{
    const resPerPage=4
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
    const product=await Product.findById(req.params.id).catch(error=>console.error())
    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
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