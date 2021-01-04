const express  = require('express'); 
const router = express.Router()


//midlewares

const{ authCheck, adminCheck } =require('../midlewares/auth')

//controller 
const { create , remove,list} = require('../controllers/coupon')

//routes

router.post('/coupon',authCheck,adminCheck,create)
router.get('/coupons',list)
router.delete('/coupon/:coupon',authCheck,adminCheck,remove)

module.exports = router;

