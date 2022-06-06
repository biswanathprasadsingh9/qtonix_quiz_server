const response = require("express");

const User = require("../models/User");


// INDEX
const index = (req, res) => {
  User.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};



const store = (req,res) => {

  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      User.create(req.body)
      .then(response=>{
        res.json({
          response:true,
          data:response
        })
      })
    }else{
      res.json({
        response:false,
      })
    }
  })



}



const view = (req,res) => {
  User.findById(req.params.id,(err,doc)=>{
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
  User.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{
    res.json({
      response:true,
      data:req.body
    })
  })
}


const deletefile = (req,res) => {
  User.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const login = (req,res) => {
  User.findOne({email:req.body.email,password:req.body.password},(err,doc)=>{
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

module.exports = {
  index,store,view,update,deletefile,login
};
