const express=require('express');
const router=express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user')
const { createDiscount, getAllDiscount, getDiscountDetail, getDiscountByName, removeDiscount } = require('../controllers/discountController');

router.route('/create-discount').post(isAuthenticatedUser,authorizeRoles('admin'),createDiscount)
router.route('/admin/discounts').get(isAuthenticatedUser,authorizeRoles('admin'),getDiscountByName)
router.route('/admin/discount/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getDiscountDetail)
.delete(isAuthenticatedUser,authorizeRoles('admin'),removeDiscount)

module.exports=router;
