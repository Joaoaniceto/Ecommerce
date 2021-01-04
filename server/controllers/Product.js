const product = require('../models/product');

const slugify = require('slugify');
const user = require('../models/user');





exports.create = async(req,res)=>{
try{
    req.body.slug = slugify(req.body.title);
    console.log(req.body);
        
          const newProduct = await new product(req.body).save()
          res.json(newProduct);
}catch(err){
    res.status(400).json({
        err: err.message,
    })
}
}

exports.listAll = async(req,res)=>{
    try{    
              const Products = await product.find({})
              .limit(parseInt(req.params.count))
              .populate('category')
             .populate('subs')
              .sort([['createdAt',"desc"]])
              .exec()
              res.json(Products);
    }catch(err){
        res.status(400).json({
            err: err.message,
        })
    }
    }
    
exports.remove = async(req,res)=>{
    try{    
              const deleted = await product.findOneAndRemove({slug:req.params.slug}).exec()
              res.json(deleted);
    }catch(err){
        res.status(400).json({
            err: err.message,
        })
    }
    }
    
exports.read = async(req,res)=>{
    try{    
     const item = await product.find({slug:req.params.slug})
              .populate('category')
              .populate("subs")
              .exec()
              res.json(item[0]);
    }catch(err){

        res.status(400).json({
            err: err.message,
        })
    }
    }
    

exports.update = async(req,res)=>{
    try{    
            if(req.body.title){
                req.body.slug = slugify(req.body.title);
            }
            console.log(req.body)
              const update = await product.findOneAndUpdate({slug:req.params.slug},
              req.body,
              {new:true}).exec();
              res.json(update);
    }catch(err){
console.log(err);
       return res.status(400).json({
            err: err.message,
        })
    }
    }
    
/*
exports.list = async(req,res)=>{
    try{
       const {sort,order,limit} = req.body;
       const produtss = await product.find({})
       .populate('category')
       .populate('subs')
       .sort([[sort,order]])
       .limit(limit)
       .exec();

       res.json(produtss)
    }catch(err){
        console.log(err);
        res.status(400)
    }
}
*/

exports.list = async(req,res)=>{
    try{
       const {sort,order,page} = req.body;
       const currentPage = page || 1;
       const perPage = 3;
       const produtss = await product.find({})
       .skip((currentPage-1)*perPage)
       .populate('category')
       .populate('subs')
       .sort([[sort,order]])
       .limit(perPage)
       .exec();

       res.json(produtss)
    }catch(err){
        console.log(err);
        res.status(400)
    }
}

exports.productCount = async (req,res)=>{
    try{
    let total = await product.find({}).estimatedDocumentCount().exec()

    res.json(total);
    } catch(err){
        console.log(err);
    }
}

exports.productStar = async (req,res)=>{
    try{
        const foundproduct = await product.findById(req.params.product).exec()
        const founduser = await user.findOne({email:req.user.email}).exec()
        const {star} = req.body;


         // check if curretly logged in user have already added rating to this product
         let existingRatingObject = foundproduct.ratings.find((ele)=>ele.postedBy.toString() == founduser._id.toString())
         //if user haven´t left rating yet,push it

        if(existingRatingObject === undefined){
           let ratingadded = await product.findByIdAndUpdate(foundproduct._id,
            {
                $push:{ ratings: {star, postedBy:founduser._id}}
            },{new:true}).exec();
            console.log(ratingadded);
           res.json(ratingadded)
        } else { let ratingupdated = await product.updateOne(
            {
                ratings: {
                $elemMatch:existingRatingObject
            }
        },{
            $set:{"ratings.$.star":star}
        }
        ).exec();
       res.json(ratingupdated);
    }
    }catch(err){
        console.log(err)
        res.err(err);
    }
}

exports.listRelated = async(req,res) =>{
    try{
    const products = await product.findById(req.params.productId).exec()

    const related = await product.find({
        _id:{ $ne:products._id },
        category:products.category
    })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec()

    res.json(related);
}catch(err){
    console.log(err);
    res.json(err)
}
}


const handleQuery = async (req,res,query)=>{
  const products = await product.find({$text: {$search:query}})
  .populate('category','_id name')
  .populate('subs','_id name')
  .populate('postedBy','_id name')
  .exec()
console.log(products);
  res.json(products)
}

const handlePrice = async (req,res,price)=>{
    try{
        const products = await product.find({price:{
        $gte:price[0],
        $lte:price[1]
        }})
        console.log(products)
        res.json(products)
    }catch(err){
        console.log(error);
    }
}

const handleCategory = async(req,res,category) =>{
try{
const products =await product.find({category})
.populate('category','_id name')
.populate('subs','_id name')
.populate('postedBy','_id name')
.exec();
res.json(products)
}catch(err){
    console.log(err)
}
}

const handleStars = async(req,res,stars)=>{
    product.aggregate([{
        $project:{
          document:"$$ROOT",
           title:"$title",
         
           floorAverage:{
               $floor: {$avg:"$ratings.star"}
           }
        }
    },{$match:{floorAverage:stars}}])
    .limit(12)
    .exec((err,aggregate)=>{
        if(err) console.log(err)
        ProductCard.find({_id:aggregate})
        .populate('category','_id name')
.populate('subs','_id name')
.populate('postedBy','_id name')
.exec((err,products)=>{
    if (err) console.log(err);
    res.json(products);
});
    })
}

const handleSub = async(req,res,sub)=>{
    const products = await product.find({subs:sub})
    .populate('category','_id name')
.populate('subs','_id name')
.populate('postedBy','_id name')
.exec();
res.json(products);
}


const handleShiping = async (req,res,shiping)=>{
    const products = await product.find({shiping})
    .populate('category','_id name')
.populate('subs','_id name')
.populate('postedBy','_id name')
.exec();
res.json(products);
}

const handleColor = async (req,res,color)=>{
    const products = await product.find({color})
    .populate('category','_id name')
.populate('subs','_id name')
.populate('postedBy','_id name')
.exec();
res.json(products);
}

const handleBrand = async (req,res,brand)=>{
    const products = await product.find({brand})
    .populate('category','_id name')
.populate('subs','_id name')
.populate('postedBy','_id name')
.exec();
res.json(products);
}

exports.searchFilters = async (req,res)=>{
 try{
     
const {query , price,category,stars,sub,shiping,color,brand} = req.body;

if(category){
    await handleCategory(req,res,category)
}

if(query){
    await handleQuery(req,res,query)
}
if(price !== undefined){
    console.log(price)
    await handlePrice(req,res,price)
}
if (stars){
    console.log(stars);
    await handleStars(req,res,stars)
}
if(sub){
    await handleSub(req,res,sub)
}
if(shiping){
    await handleShiping(req,res,shiping)
}
if(color){
    await handleColor(req,res,color)
}
if(brand){
    await handleBrand(req,res,brand);
}

 }catch(err){
console.log(err)
 }
}
