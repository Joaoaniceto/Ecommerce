
const admin = require('../firebase/index');
const user = require('../models/user')


exports.authCheck = async (req,res,next)=>{
   try{
     
const firebaseUser = await admin
.auth()
.verifyIdToken(req.headers.authtoken);
req.user = firebaseUser;
next();
   } catch(e){
       res.status(401).json({
           e: 'Invalid or expired token'
       })
   }
 
}

exports.adminCheck = async(req,res,next)=>{
const {email} = req.user;

const adminUser = await user.findOne({email}).exec()

if(adminUser.role !== 'admin'){
    console.log(adminUser.role);
    res.statues(403).json({
        err:'Admin resource. Acess denied'
    });
} else {
    next();
}

}