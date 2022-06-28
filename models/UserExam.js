const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserExamSchema = new Schema({
  user_id:{
    type:String
  },
  company_id:{
    type:String
  },
  exam_id:{
    type:String
  },
  exam_score:{
    type:Number
  },
  student_exam_code:{
    type:String
  },
  certificate_url:{
    type:String
  },
  exam_start:{
    type:Boolean,
    default:false
  },
  exam_timeout:{
    type:Boolean,
    default:false
  },
  exam_finished:{
    type:Boolean,
    default:false
  },
  exam_start_time:{
    type:String
  },
  exam_info:{
    type:Object
  },
  exam_question_answer_data:{
    type:Object
  },
  exam_start_datetime:{
    type:Date
  },
  exam_end_datetime:{
    type:Date
  },
  ip_info:{
    type:Object
  },
  device_info:{
    type:Object
  }
},{timestamps:true})

const UserExam = mongoose.model('UserExam',UserExamSchema)
module.exports = UserExam;
