const express = require('express')
const { newOrder, getOderDetail, myOrders, allOrders, deleteOrder, updateOrder, deleteOrderBeforeDelivered } = require('../controllers/oderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user')
const router = express.Router()
router.route('/order/create').post(
    isAuthenticatedUser,
    newOrder)
    router.route('/order/:id').get(isAuthenticatedUser,
        getOderDetail)
router.route('/admin/order/:id').get(isAuthenticatedUser,
    authorizeRoles('admin'),
    getOderDetail)
router.route('/orders/me').get(isAuthenticatedUser, myOrders)
router.route('/admin/orders').get(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    allOrders)
router.route('/admin/order/:id').delete(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    deleteOrder)

router.route('/order/:id').delete(
    isAuthenticatedUser,
    // authorizeRoles('admin'),
    deleteOrderBeforeDelivered
)

router.route('/admin/order/:id').put(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    updateOrder

)


module.exports = router