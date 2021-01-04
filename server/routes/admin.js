const { Router } = require('express');
const express  = require('express');



const router = express.Router()
const {authCheck, adminCheck} = require('../midlewares/auth')
const {orders,orderstatus} = require('../controllers/admin')



router.get('/admin/orders',authCheck,adminCheck, orders)
router.put('/admin/orders-status',authCheck,adminCheck,orderstatus)



module.exports = router