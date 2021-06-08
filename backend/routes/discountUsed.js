const express=require('express');
const { newDiscountUsed } = require('../controllers/discountUsedController');
const router=express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user');

router.route('/add-discount-used').post(isAuthenticatedUser,newDiscountUsed)
module.exports=router;