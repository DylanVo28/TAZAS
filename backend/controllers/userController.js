const User=require('../models/user')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors=require('../middlewares/catchAsyncError')
const sendToken=require('../utils/jwtToken')
const sendEmail=require('../utils/sendEmail')
const crypto=require('crypto')
const { send } = require('process')
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"2a274ebbb5879d870a69caae33d94388a88e0e35",
            url:"https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png"
        }
    })
    sendToken(user,200,res)

})

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body
    //check email or password entered
    if(!email||!password){
        return next(new ErrorHandler('Please enter email or password',400))
    }
    //finding user in database
    const user=await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password',401))
    }
    //check password correct or not
    const isPasswordMatched=await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password',401))
    }
    sendToken(user,200,res)
    
})

exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"logged out"
    })
})

exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email: req.body.email})
    if(!user){
        return next(new ErrorHandler('User not found with this email',404))
    }
    const resetToken=user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})
    const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message =`Your password reset token is a follow: \n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`
    try {
        await sendEmail({
            email:user.email,
            subject :'TAZAS Password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to:${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken=undefined,
        user.resetPasswordExpire=undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }
})

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400))
    }
    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save()
    sendToken(user,200,res)
})

exports.userProfile=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user._id)
    res.status(200).json({
        success:true,
        user
    })
})

exports.userUpdatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user._id).select('+password');
    const isMatched=await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect',404))
    }
    user.password=req.body.password;
    await user.save();
    sendToken(user,200,res);

})