const express=require('express')
const router=express.Router()
const {registerUser,loginUser, logoutUser}=require('../controllers/userController')
router.route('/user/create').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logoutUser)
module.exports=router;
