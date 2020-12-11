const express  = require('express'); 
const router = express.Router()


//midlewares

const{ authCheck, adminCheck } =require('../midlewares/auth')

//controller 
const { create , remove,update,read,list} = require('../controllers/category')

//routes

router.post('/category',authCheck,adminCheck,create)
router.get('/category/:slug',read)
router.get('/categories',list)
router.put('/category/:slug',authCheck,adminCheck,update)
router.delete('/category/:slug',authCheck,adminCheck,remove)

module.exports = router;

