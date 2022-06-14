const response = require("express");

const Exam = require("../models/Exam");
const User = require("../models/User");

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

      var d = new Date();
      var n = d.valueOf();
      var student_exam_code = 'EX'+n;
      var tmpData=req.body;
      tmpData.student_exam_code=student_exam_code;
      tmpData.certificate_url='not_generated';


      UserExam.create(tmpData)
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

const submitexam = async (req,res) => {
  var user_info= await User.findById(req.body.user_id);


  UserExam.findOneAndUpdate({user_id:req.body.user_id,exam_id:req.body.exam_id},req.body)
  .then(response=>{




    //PDF GENERATE
    var pdf = require("pdf-creator-node");;
    var fs = require("fs");
    var path = require("path");
    var html = fs.readFileSync(path.join(__dirname, "../pdf_templete/templetetest.html"), "utf8");


    var options = {
      format: "A4",
      orientation: "landscape",
      border: "10mm",
    };



    var document = {
      html: html,
      data: {
        name:user_info.name
      },
      path: "./public/pdf/" + response.student_exam_code + ".pdf",
      type: "pdf", // "stream" || "buffer" || "" ("" defaults to pdf)
    };

    console.log(document);
    pdf
    .create(document, options)
    .then((resasas) => {
      res.json({
        response:true
      })
    })
    .catch((error) => {
      console.error(error);
    });
    //PDF GENERATE




  })






}



const viewscore = (req,res) => {
  UserExam.findOne({user_id:req.body.user_id,exam_id:req.body.exam_id},(err,doc)=>{
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


const examusersactive = (req,res) => {
  UserExam.find({exam_id:req.params.exam_id,exam_start:true,exam_finished:false}).select({ "user_id": 1, "student_exam_code": 1, "certificate_url":1})
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}

const examuserscompleted = (req,res) => {
  UserExam.find({exam_id:req.params.exam_id,exam_start:true,exam_finished:true}).select({ "user_id": 1, "student_exam_code": 1, "certificate_url":1, "exam_score":1}).sort({"exam_score":-1,"exam_end_datetime":-1})
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}


const deleteuserexam = (req,res) => {

   UserExam.findByIdAndRemove(req.params.id)
   .then(response=>{
     res.json({
       response:true
     })
   })

  // UserExam.findByIdAndRemove(req.params.id)
  // .then(res.json({
  //   response:true
  // }))
}


const viewcertificate = (req,res) => {
  UserExam.findOne({student_exam_code:req.params.student_exam_code},(err,examinfo)=>{
    if(examinfo===null){
      res.json({
        response:false
      })
    }else{
      User.findById(examinfo.user_id)
      .then(userinfo=>{
        res.json({
          response:true,
          userinfo,
          examinfo
        })
      })
    }
  })
}



const viewuserexams = (req,res) => {
  UserExam.find({user_id:req.params.user_id, certificate_url: { $ne: 'not_generatedz' } })
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}


const viewexamdetails = (req,res) => {
  UserExam.findOne({user_id:req.body.user_id, exam_id:req.body.exam_id})
  .then(data=>{
    res.json({
      response:true,
      data
    })
  })
}


const userdashboard =(req,res) => {
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


        UserExam.findOne({exam_id:doc._id, user_id:req.body.user_id},(err,docuexam)=>{
          if(docuexam===null){

            Quiz.find({exam_id:doc._id})
            .then(datas=>{
              res.json({
                response:true,
                examinfo:doc,
                questions:datas,
                user_examinfo:false
              })
            })

          }else{
            Quiz.find({exam_id:doc._id})
            .then(datas=>{
              res.json({
                response:true,
                examinfo:doc,
                questions:datas,
                user_examinfo:docuexam
              })
            })
          }

        })





      }
    }
  })
}

module.exports = {
  index,store,viewexamdetails,viewuserexams,userdashboard,viewcertificate,view,update,deleteuserexam,deletefile,latestexam,examcreateview,startexam,viewscore,submitexam,examusersactive,examuserscompleted
};
