const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  name:{
    type:String
  },
  qsn_ans:{
    type:Object
  },
  start_time:{
    type:Date
  },
  end_time:{
    type:Date
  },
  status:{
    type:Boolean
  },
  pass_percentage:{
    type:Number
  },
  duration:{
    type:Number
  }
},{timestamps:true})

const Exam = mongoose.model('Exam',ExamSchema)
module.exports = Exam;
