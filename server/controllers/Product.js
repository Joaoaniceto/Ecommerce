const product = require('../models/product');

const slugify = require('slugify');




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
        console.log(req.params)
              const item = await product.find({slug:req.params.slug}).populate('category').populate("subs").exec()
              res.json(item);
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
