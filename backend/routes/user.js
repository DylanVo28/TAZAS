const express=require('express')
const router=express.Router()
const {registerUser,loginUser, logoutUser, forgotPassword}=require('../controllers/userController')
router.route('/user/create').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logoutUser)
router.route('/user/password/forgot').post(forgotPassword)
module.exports=router;
