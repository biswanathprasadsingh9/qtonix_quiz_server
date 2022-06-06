const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  exam_id:{
    type:String
  },
  question:{
    type:String
  },
  options:{
    type:Object
  },
  answer:{
    type:Number
  },
},{timestamps:true})

const Quiz = mongoose.model('Quiz',QuizSchema)
module.exports = Quiz;
