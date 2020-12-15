const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
    name: {
         type:String,
         trim:true,
         required:'Name is requrired',
         minlength:[3,'min'],
         maxlength:[32,'max']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true

    },
    parent:{
        type:ObjectId,
        ref:"Category",
        required:true}
},{timestamps:true})

module.exports = mongoose.model('Sub',subSchema)