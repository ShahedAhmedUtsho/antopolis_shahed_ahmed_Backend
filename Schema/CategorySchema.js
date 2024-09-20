const mongoose = require('mongoose');


const CateGorySchema = mongoose.Schema({
  name:{
    type:String ,
    required:true,
    unique:true,

  },
  images : [{
    type:mongoose.Schema.Types.ObjectId,
    ref : 'Image'
  }

  ]

},{timestamps:true})

module.exports = CateGorySchema;
