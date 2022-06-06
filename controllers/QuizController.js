const response = require("express");

const Quiz = require("../models/Quiz");


// INDEX
const index = (req, res) => {
  Quiz.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};



const store = (req,res) => {

  Quiz.create(req.body)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })


}



const view = (req,res) => {
  Quiz.findById(req.params.id,(err,doc)=>{
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


const viewbyexamid = (req,res) => {
  Quiz.find({exam_id:req.params.exam_id})
  .then((response) => {
    res.json({
      response: true,
      datas: response,
    });
  });
}


const update = (req,res) => {
  Quiz.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{
    res.json({
      response:true,
      data:req.body
    })
  })
}


const deletefile = (req,res) => {
  Quiz.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}



module.exports = {
  index,store,view,viewbyexamid,update,deletefile
};
