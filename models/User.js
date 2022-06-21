const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  },
  password:{
    type:String
  },
  company_id:{
    type:String
  },
  type:{
    type:String,
    default:'User'
  },
},{timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports = User;
