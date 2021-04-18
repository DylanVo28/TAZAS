const Product =require('../models/product')
const ErrorHandler=require('../utils/errorHandler')
//add new product
exports.newProduct=async (req,res,next)=>{
    const product= await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}

//get all product
exports.getProducts=async (req,res,next)=>{
    const products=await Product.find()
    res.status(200).json({
        success:true,
        products
    })
}

//get single product
exports.getSingleProduct=async (req,res,next)=>{
    const product=await Product.findById(req.params.id).catch(error=>console.error())

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    res.status(200).json({
        success:true,
        product
    })
}

//update product
exports.updateProduct=async (req,res,next)=>{
    const product=await Product.findById(req.params.id).catch(error=>console.error())
    if(!product){
        return res.status(404).json({
            success:false,
            message: "Product not found"
        })
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
}

//delete product
exports.deleteProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id).catch(error=>console.error())
    if(!product){
        return res.status(404).json({
            success:false,
            message: "Product not found"
        })
    }
    await product.remove()
    res.status(200).json({
        success:true,
        message:"Product is deleted"
    })
}