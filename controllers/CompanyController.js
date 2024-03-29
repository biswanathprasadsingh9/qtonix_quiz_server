const response = require("express");

const Company = require("../models/Company");


const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: 'public_Jt6OJjalO7RID1n8yFgxeCxRO44=',
  privateKey: 'private_QtpEEoAzdLoIszG3hC74wS0tBQs=',
  urlEndpoint: 'https://ik.imagekit.io/biswanath',
});

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

const fetchundercompany = (req,res) => {
  Company.find({_id:req.params.company_id})
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
}

//CHECK COMPANY EXIST OR NOT
const checkcompany = (req,res) => {
  Company.findOne({register_url:req.body.register_url,status:true},(err,doc)=>{
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

//UPLOAD IMAGE
const uploadimage = (req,res) => {

  const encoded = req.file.buffer.toString("base64");

  imagekit
    .upload({
      file: encoded,
      fileName: "quiz.jpg",
      useUniqueFileName: true,
      folder: "quiz_app",
    })
    .then((response) => {
      res.json({
        response: true,
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });


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
  index,fetchundercompany,store,update,checkcompany,uploadimage
};
