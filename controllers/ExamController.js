const response = require("express");

const Exam = require("../models/Exam");
const Quiz = require("../models/Quiz");
const UserExam = require("../models/UserExam");




// INDEX
const index = (req, res) => {
  Exam.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const latestexam = (req,res) => {
  Exam.findOne({status:true},(err,doc)=>{
    if(doc===undefined){
      res.json({
        response:false
      })
    }else{
      if(doc===null){
        res.json({
          response:false,
          examinfo:doc,
          questions:[]
        })
      }else{
        Quiz.find({exam_id:doc._id})
        .then(datas=>{
          res.json({
            response:true,
            examinfo:doc,
            questions:datas
          })
        })
      }
    }
  })
}



const store = (req,res) => {

  console.log(req.body)

  Exam.findOne({name:req.body.name},(err,doc)=>{
    console.log(doc)
    if(doc===null){
      Exam.create(req.body)
      .then(response=>{
        res.json({
          response:true,
          data:response
        })
      })
    }else{
      res.json({
        response:false,
        message:'exam_name_already_exist'
      })
    }
  })


}



const view = (req,res) => {
  Exam.findById(req.params.id,(err,doc)=>{
    console.log(doc)
    if(doc===undefined){
      res.json({
        response:false
      })
    }else{
        res.json({
          response:true,
          data:doc
        })
    }
  })
}


const update = (req,res) => {
  Exam.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{
    res.json({
      response:true,
      data:req.body
    })
  })
}


const deletefile = (req,res) => {
  Exam.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


const examcreateview = (req,res) =>{
  UserExam.findOne({user_id:req.body.user_id,exam_id:req.body.exam_id},(err,doc)=>{
    if(doc===null){
      UserExam.create(req.body)
      .then(response=>{
        res.json({
          response:true,
          datas:response
        })
      })
    }else{
      res.json({
        response:true,
        datas:doc
      })
    }
  })
}

const startexam = (req,res) => {
  UserExam.findOneAndUpdate({user_id:req.body.user_id,exam_id:req.body.exam_id},req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,store,view,update,deletefile,latestexam,examcreateview,startexam
};
