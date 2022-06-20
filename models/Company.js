const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  status:{
    type:Boolean
  },
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  },
  logo:{
    type:String
  },
  register_url:{
    type:String
  }
},{timestamps:true})

const Company = mongoose.model('Company',companySchema)
module.exports = Company;
