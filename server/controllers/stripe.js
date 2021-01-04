const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/coupon')

const Stripe = require('stripe')
const coupon = require('../models/coupon')
const stripe = Stripe(process.env.STRIPE_API_KEY);

exports.createPaymentIntent = async (req,res)=>{
    try{
 
        const {copon} = req.body;
    const user = await User.find({email:req.body.email}).exec();


    const {cartTotal,totalAfterDiscount} = await Cart.findOne({orderedBy:user._id}).exec()


if(coupon && totalAfterDiscount){
    finalAmount = Math.round(totalAfterDiscount*100)
} else {
    finalAmount = cartTotal*100;
}


    const paymentIntent = await stripe.paymentIntents.create({
        amount:finalAmount,
        currency:"usd"
    });

    res.send({
        clientSecret:paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable:finalAmount,
    })
    }catch(err){
        console.log(err)
    }
    }