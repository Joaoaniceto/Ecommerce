const Order = require('../models/order')




exports.orders = async(req,res) =>{
let orders = await Order.find({}).sort('-createAt').populate('products.product').exec();
res.json(orders)
}


exports.orderstatus = async(req,res) =>{
        const{orderId,orderstatus} =  req.body;
  console.log(orderId,orderstatus);

        let updated = await Order.findOneAndUpdate(orderId,{orderStatus:orderstatus},{new:true}).exec();
        res.json(updated)
    }


