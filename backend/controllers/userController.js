const User=require('../models/user')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors=require('../middlewares/catchAsyncError')
const sendToken=require('../utils/jwtToken')
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