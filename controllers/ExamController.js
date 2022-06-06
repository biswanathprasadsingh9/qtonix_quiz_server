const response = require("express");

const Exam = require("../models/Exam");
const Quiz = require("../models/Quiz");



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
      Quiz.find({exam_id:doc._id})
      .then(datas=>{
        res.json({
          response:true,
          examinfo:doc,
          questions:datas
        })
      })

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



module.exports = {
  index,store,view,update,deletefile,latestexam
};
