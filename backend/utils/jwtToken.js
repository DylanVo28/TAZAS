const sendToken=(user,statusCode,res)=>{
    const token=user.getJwtToken()
    const options={
        expries:new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly:true
    }
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header( 'Access-Control-Allow-Credentials',true);
    res.cookie('token',token,options)
    res.status(statusCode).json({
        success:true,
        token,
        user
    })
}
module.exports=sendToken