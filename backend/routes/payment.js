const express=require('express');
const { processPayment, sendStripeApi } = require('../controllers/paymentController');
const router=express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user')

router.route('/payment/process').post(isAuthenticatedUser,processPayment)
router.route('/get-stripe-api').get(isAuthenticatedUser,sendStripeApi)
module.exports=router;