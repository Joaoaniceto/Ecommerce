const Category = require('../models/category');

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
     let category = await Category.findOne({slug:req.params.slug})
     res.json(category);
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
