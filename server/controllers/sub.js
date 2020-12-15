const Sub = require('../models/sub');

const Slugify = require('slugify');




exports.create = async(req,res)=>{
try{
          const { name,parent }=req.body;
          res.json(await Sub({name,slug:Slugify(name),parent}).save());
}catch(err){
    console.log('err----->',err)
    res.status(400).send('create Sub failed')
}
}

exports.remove = async (req,res)=>{
    try{
     const { name }=req.body;
     
     res.json(await Sub.findOneAndDelete({slug:req.params.slug}));
    }catch(err){
        res.status(400).send(`cannot delete ${req.params.slug}`)
    }
}

exports.read = async(req,res)=>{
    try{
        console.log(req.params.slug)
     let sub = await Sub.findOne({slug:req.params.slug})

     res.json(sub);
    }catch(err){
        res.status(400).send('create Sub failed')
    }
}

exports.list = async(req,res)=>{
    try{
     res.json(await Sub.find({}).sort({createdAt:-1}).exec());
    }catch(err){
        res.status(400).send('create Sub failed')
    }
}

exports.update = async(req,res)=>{
    try{
       
     const { name }=req.body;
     const updated = await Sub.findOneAndUpdate({slug:req.params.slug},{name,slug:Slugify(name)},{new:true})
       res.json(updated);
    }catch(err){
        res.status(400).send('create Sub failed')
    }
}
