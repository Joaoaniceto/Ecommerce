const Coupon = require('../models/coupon')




exports.create = async(req,res)=>{
try{
    console.log(req.body)
    const {name,expiry,discount} = req.body.coupon


   res.json(await new Coupon({name,discount,expiry}).save())

}catch(err){console.log(err)}
}


exports.remove = async(req,res)=>{
    console.log(req.params)
    try{
        res.json(await Coupon.findByIdAndDelete(req.params.coupon).exec())
    }catch(err){console.log(err)}
}



exports.list = async(req,res)=>{
    try{
     res.json(await Coupon.find({}).sort({createAt:-1}).exec())
    }catch(err){console.log(err)}
}