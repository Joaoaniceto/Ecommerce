const express  = require('express'); 
const router = express.Router()


//midlewares

const{ authCheck, adminCheck } =require('../midlewares/auth')

//controller 
const { create ,listAll,remove,read ,update,list,productCount,productStar,listRelated,searchFilters} = require('../controllers/product')

//routes

router.post('/product',authCheck,adminCheck,create)
router.get('/products/total',productCount)
router.get('/products/related/:productId',listRelated)
router.get('/products/:count',listAll)
router.delete('/product/:slug',authCheck,adminCheck,remove)
router.get('/product/:slug',read)
router.put('/product/:slug',authCheck,adminCheck,update)
router.put('/product/star/:product',authCheck,productStar);

router.post('/products',list)


router.post('/search/filters',searchFilters)



module.exports = router;

