const express  = require('express'); 
const router = express.Router()


//midlewares

const{ authCheck, adminCheck } =require('../midlewares/auth')

//controller 
const { create , remove,update,read,list} = require('../controllers/sub')

//routes

router.post('/sub',authCheck,adminCheck,create)
router.get('/sub/:slug',read)
router.get('/subs',list)
router.put('/sub/:slug',authCheck,adminCheck,update)
router.delete('/sub/:slug',authCheck,adminCheck,remove)

module.exports = router;

