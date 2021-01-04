const express  = require('express');



const router = express.Router()
const {authCheck, adminCheck} = require('../midlewares/auth')
const { userCart,getUserCart,emptyCart,saveAdress,applycoupon,createOrder,orders,addtowishlist,wishlist,removefromwishlist,createcashorder } = require('../controllers/user');

/*
 router.get('/user',(req,res)=>{
     res.json({
         message:'user'
     })
 })
*/




 router.post('/user/cart',authCheck,userCart);
 router.get('/user/cart',authCheck,getUserCart);
 router.put('/user/cart',authCheck,emptyCart);
 router.post('/user/address',authCheck,saveAdress);
router.post('/user/order',authCheck,createOrder); //stripe
router.post('/user/cash-order',authCheck,createcashorder);

 router.post('/user/cart/coupon',authCheck,applycoupon);
 router.get('/users/orders',authCheck,orders)

router.post('/user/wishlist',authCheck,addtowishlist)
router.get('/user/getwishlist',authCheck,wishlist)
router.put('/user/wishlist/:productId',authCheck,removefromwishlist)

module.exports = router