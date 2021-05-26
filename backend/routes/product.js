const express=require('express')
const router=express.Router()
const {getProducts,newProduct,getSingleProduct,updateProduct,deleteProduct, createProductReview, getAllReviews, deleteReview, getAllProduct, getLengthProduct, getProductsHome}=require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user')

router.route('/products').get(
    isAuthenticatedUser,
    // authorizeRoles('admin'),
    getProducts)
router.route('/admin/products').get(
        isAuthenticatedUser,
        authorizeRoles('admin'),
        getProducts)
    
router.route('/products-home').get(getProductsHome)

router.route('/length-product').get(
        isAuthenticatedUser,
        authorizeRoles('admin'),
        getLengthProduct)
router.route('/home-length-product').get(
        getLengthProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getSingleProduct)

router.route('/admin/product/new').post(
    isAuthenticatedUser,
        authorizeRoles('admin'),
    newProduct)
router.route('/admin/product/:id').put(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    updateProduct)
router.route('/admin/product/:id').delete(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    deleteProduct)
module.exports=router;