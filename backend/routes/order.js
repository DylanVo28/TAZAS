const express=require('express')
const { newOrder } = require('../controllers/oderController')
const { isAuthenticatedUser } = require('../middlewares/user')
const router=express.Router()
router.route('/order/create').post(isAuthenticatedUser,newOrder)
module.exports=router