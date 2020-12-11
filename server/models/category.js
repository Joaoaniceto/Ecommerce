const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
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

    }
},{timestamps:true})

module.exports = mongoose.model('Category',categorySchema)