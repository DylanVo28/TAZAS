const express=require('express')
const router=express.Router()
const {getProducts,newProduct,getSingleProduct,updateProduct,deleteProduct, createProductReview, getAllReviews, deleteReview, getAllProduct}=require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user')

router.route('/products').get(
    // isAuthenticatedUser,authorizeRoles('admin'),
    getAllProduct)

router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/new').post(isAuthenticatedUser,newProduct)
router.route('/admin/product/:id').put(isAuthenticatedUser,updateProduct)
router.route('/admin/product/:id').delete(isAuthenticatedUser,deleteProduct)
router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(isAuthenticatedUser,getAllReviews).delete(isAuthenticatedUser,deleteReview)
module.exports=router;