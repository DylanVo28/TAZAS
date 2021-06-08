const express=require('express');
const { analyticsByProduct, analyticsByUser, analyticsByOrder, topSellingByProduct, topSellingByReview, topSellingByUser, analyticsByTotalPayment } = require('../controllers/analyticController');
const router=express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user')
router.route('/analytics-by-product').get(isAuthenticatedUser,authorizeRoles('admin'),analyticsByProduct)
router.route('/analytics-by-user').get(isAuthenticatedUser,authorizeRoles('admin'),analyticsByUser)
router.route('/analytics-by-order').get(isAuthenticatedUser,authorizeRoles('admin'),analyticsByOrder)
router.route('/top-sell-by-product').get(isAuthenticatedUser,authorizeRoles('admin'),topSellingByProduct)
router.route('/top-sell-by-review').get(isAuthenticatedUser,authorizeRoles('admin'),topSellingByReview)
router.route('/top-sell-by-user').get(isAuthenticatedUser,authorizeRoles('admin'),topSellingByUser)
router.route('/analytics-payment').get(isAuthenticatedUser,authorizeRoles('admin'),analyticsByTotalPayment)

module.exports=router;
