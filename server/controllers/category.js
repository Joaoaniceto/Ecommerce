const Category = require('../models/category');
const Sub = require('../models/sub');
const product = require('../models/product');

const Slugify = require('slugify');




exports.create = async(req,res)=>{
try{
          const { name }=req.body;
          res.json(await Category({name,slug:Slugify(name)}).save());
}catch(err){
    res.status(400).send('create category failed')
}
}

exports.remove = async (req,res)=>{
    try{
     const { name }=req.body;
     
     res.json(await Category.findOneAndDelete({slug:req.params.slug}));
    }catch(err){
        res.status(400).send(`cannot delete ${req.paras.slug}`)
    }
}

exports.read = async(req,res)=>{
    try{
     let categori = await Category.findOne({slug:req.params.slug})
     
     const products=await product.find({category:categori})
     .populate('category')
     .populate('postedBY','_id name')
     .exec();
     res.json({categori,products});
    }catch(err){
        res.status(400).send('create category failed')
    }
}

exports.list = async(req,res)=>{
    try{
     res.json(await Category.find({}).sort({createdAt:-1}).exec());
    }catch(err){
        res.status(400).send('create category failed')
    }
}

exports.update = async(req,res)=>{
    try{
       
     const { name }=req.body;
     const updated = await Category.findOneAndUpdate({slug:req.params.slug},{name,slug:Slugify(name)},{new:true})
       res.json(updated);
    }catch(err){
        res.status(400).send('create category failed')
    }
}

exports.getSubs = async(req,res)=>{ 
       Sub.find({parent:req.params.slug}).exec((err,subs)=>{
           if (err) console.log(err);
           res.json(subs)
       })

}
