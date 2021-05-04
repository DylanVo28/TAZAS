const express=require('express')
const router=express.Router()
const {
    registerUser,
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword, 
    userProfile, 
    userUpdatePassword, 
    updateProfile, 
    allUsers, 
    getUserDetail,
    updateUser,
    deleteUser}=require('../controllers/userController')
const { isAuthenticatedUser ,authorizeRoles} = require('../middlewares/user')

router.route('/user/create').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logoutUser)
router.route('/user/password/forgot').post(forgotPassword)
router.route('/user/password/reset/:token').put(resetPassword)
router.route('/me').get(
    isAuthenticatedUser,
    userProfile)
router.route('/user/update-password').put(isAuthenticatedUser,userUpdatePassword)
router.route('/user/update-profile').put(isAuthenticatedUser,updateProfile)
router.route('/admin/all-user').get(
    isAuthenticatedUser,
    // authorizeRoles('admin'),
    allUsers)
router.route('/admin/user/:id')
.get(
    isAuthenticatedUser,
    // authorizeRoles('admin'),
getUserDetail)
.put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)
module.exports=router;
