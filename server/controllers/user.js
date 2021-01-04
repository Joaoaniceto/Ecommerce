
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const Order = require('../models/order');
const uniqueid = require('uniqueid')


exports.userCart = async (req,res)=>{
    try{
const {cart} = req.body;

let allproducts = [];
const user = await User.find({email: req.user.email}).exec();
 
//check if cart with logged in user id already exist
let cartExistByThisUser = await Cart.findOne({orderedBy:user._id}).exec();


if(cartExistByThisUser){
   cartExistByThisUser.remove();
}

for(let i=0;i<cart.length;i++){
    let object ={}
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    //get price for creating total;
    let productfromdb = await Product.findById(cart[i]._id).select('price').exec();
    object.price = productfromdb.price;

    allproducts.push(object);

}
let carttotal = 0;

for(let i = 0;i<allproducts.length;i++){
carttotal += allproducts[i].price * allproducts[i].count;
}

let newCart = await new Cart({
   products:allproducts,
    cartTotal:carttotal,
    orderedBy: user._id,

}).save();

res.json({
    ok:true
})
    }catch(err){console.log(err)}
};



exports.getUserCart = async (req, res) => {
    try{
    const user = await User.find({email: req.user.email}).exec();
  
    let cart = await Cart.findOne({ orderedBy: user._id })
      .populate(
          "products.product",
       "_id title price totalAfterDiscount"
       )
      .exec();

      console.log(cart)

     const {products,cartTotal,totalAfterDiscount} = cart;

    res.json({products,cartTotal,totalAfterDiscount});
    }catch(err){console.log(err)}
  };


  exports.emptyCart = async (req,res)=>{
      try{
          console.log(req.user.email);
      const user = await  User.find({email:req.user.email}).exec();

      const cart = await  Cart.findOneAndRemove({orderedBy:user._id}).exec();
      console.log(cart);
      res.json(cart)
    }catch(er){
        console.log(er);
    }
  }

  exports.saveAdress = async(req,res) =>{
      try{

        const userAdress = await User.findOneAndUpdate(
            {email:req.user.email},
            {address:req.body.adress})
            res.json({
                ok:true
            })
      }catch(err){
          console.log(err)
      }
  }

  exports.applycoupon = async (req,res)=>{
      try{
      const {coupon} = req.body;
      console.log(coupon);

      const validcoupon = await Coupon.findOne({name:coupon})

      console.log(validcoupon);
      if (validcoupon === null){
          res.json({
              err:'invalid coupon'
          })
      }

      const user = await User.find({email:req.user.email}).exec()

      console.log(user._id)
     
      let cart = await Cart.findOne({ orderedBy: user._id })
      .populate(
          "products.product",
       "_id title price totalAfterDiscount"
       )
      .exec();

      
      console.log(cart)

      let totalAfterDiscount = cart.cartTotal -(cart.cartTotal * 0.01 * validcoupon.discount).toFixed(2);
      console.log(totalAfterDiscount)
      await Cart.findOneAndUpdate({orderedBy:user._id},{totalAfterDiscount},{new:true});
    res.json(totalAfterDiscount);
    }catch(err){
        console.log(err);
    }
 }

 exports.createOrder = async(req,res)=>{

    const {paymentIntent} = req.body.striperesponse;
    console.log(req.body)
    console.log(paymentIntent);
    const user = await   User.find({email:req.user.email}).exec();
   let{products} = await Cart.findOne({orderedBy:user._id})

   let newOrder = await new Order({
       products,
       paymentIntent,
       orderedBy:user._id

   }).save();

   //decrement quantity,increment sold,
   let bulkoption = products.map((item)=>{
  return{
      updateOne:{
          filter:{_id: item.product._id},
          update:{$inc:{quantity:-item.count,sold:+item.count}}
      }
  }
   })

   let updated = await Product.bulkWrite(bulkoption,{});
   console.log(updated)

   res.json({ok:true})
 }

 exports.orders = async (req,res) =>{
 let user = await User.find({email:req.user.email}).exec();

 let userOrders = await (await Order.findOne({orderedBy:user._id}))
 .populated('products.product')
 .exec();

 res.json(userOrders);
 }

 exports.addtowishlist = async (req,res)=>{

 }

 exports.addtowishlist = async (req,res)=>{
     const {productId} = req.body; 
     const user = await User.findOneAndUpdate({email:req.user.email},{$addToSet:{wishlist:productId}},{new:true}).exec();
     res.json({
         ok:true
     })

     
 }


 exports.wishlist = async (req,res)=>{
    const list =await User.find({email:req.user.email}).select('wishlist').populate('wishlist').exec();
 
    res.json(list)
    
}

exports.removefromwishlist = async(req,res)=>{
    const productId = req.params.productId; 
    const updated = await User.findOneAndUpdate({email:req.user.email},{$pull:{wishlist:productId}},{new:true}).exec();

res.json({
    ok:true
})
}




exports.createcashorder = async(req,res)=>{

    const {cod} = req.body;

   if(!cod) return res.status(400).send('created cash order failed')


    const user = await   User.find({email:req.user.email}).exec();
   let usercart = await Cart.findOne({orderedBy:user._id});

   let newOrder = await new Order({
       products:usercart.products,
       paymentIntent:{
        id:uniqueid(),
        amount:usercart.carttotal,
        currency: "usd",
        status:"cash On Delivery",
        created:Date.now(),
        payment_method_types:['cash'],
       },
       orderedBy:user._id

   }).save()

    //decrement quantity,increment sold,
    let bulkoption = usercart.products.map((item)=>{
        return{
            updateOne:{
                filter:{_id: item.product._id},
                update:{$inc:{quantity:-item.count,sold:+item.count}}
            }
        }
         })
      
         let updated = await Product.bulkWrite(bulkoption,{});
    
      
         res.json({ok:true})

}
