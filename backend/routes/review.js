const express=require('express')
const router=express.Router()
const { addReview } = require('../controllers/reviewController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user')

router.route('/review').put(isAuthenticatedUser,addReview)
module.exports=router;

