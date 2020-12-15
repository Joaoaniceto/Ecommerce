const express  = require('express'); 
const router = express.Router()


//midlewares

const{ authCheck, adminCheck } = require('../midlewares/auth')


const { upload , remove } = require('../controllers/cloudinary')


//controller



router.post('/uploadimage',authCheck,adminCheck,upload)
router.post('/removeimage',authCheck,adminCheck,remove)

module.exports = router;
