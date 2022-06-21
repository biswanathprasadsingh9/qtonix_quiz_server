const response = require("express");

const Company = require("../models/Company");


// INDEX
const index = (req, res) => {
  Company.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

//CHECK COMPANY EXIST OR NOT
const checkcompany = (req,res) => {
  Company.findOne({register_url:req.body.register_url},(err,doc)=>{
    if(doc===null){
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


//STORE
const store = (req,res) => {
  Company.findOne({register_url:req.body.register_url},(err,doc)=>{
    if(doc!==null){
      res.json({
        response:false
      })
    }else{
      Company.create(req.body)
      .then(response=>{
        res.json({
          response:true
        })
      })
    }
  })
}

//UPDATE
const update = (req,res) => {
  Company.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}



module.exports = {
  index,store,update,checkcompany
};
