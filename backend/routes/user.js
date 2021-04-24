const express=require('express')
const router=express.Router()
const {registerUser,loginUser, logoutUser, forgotPassword, resetPassword}=require('../controllers/userController')
router.route('/user/create').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logoutUser)
router.route('/user/password/forgot').post(forgotPassword)
router.route('/user/password/reset/:token').put(resetPassword)
module.exports=router;
