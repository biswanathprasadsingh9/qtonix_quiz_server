const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const result = require('dotenv').config();
var path = require("path");

// const Test = require('./routes/test');
const Exam = require('./routes/exam');
const Quiz = require('./routes/quiz');
const User = require('./routes/user');


// const DomainSearch = require('./routes/domainsearch');
// const EmailFinder = require('./routes/emailfinder');
// const EmailVeriFication = require('./routes/emailverifcation');
// const Package = require('./routes/package');

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('Failed to connect.')
    console.log(err);
});
db.once('open',()=>{
    console.log('Successfully Connected.');
})

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req,res)=>{
    res.send('<h1>Quiz Server</h1>')
})


app.get('/update', (req,res)=>{
    // const QuizDatabase = require('./models/Quiz');
    //
    // QuizDatabase.find({})
    // .then(datas=>{
    //
    //   datas.forEach((item, i) => {
    //
    //     QuizDatabase.findByIdAndUpdate(item._id,{$set:{exam_id:'629f4241b6c5da7ecf6012ad'}})
    //     .then(resu=>[
    //       console.log(i)
    //     ])
    //
    //   });
    //
    //
    // })
      // res.json({
      //   response:true
      // })



      var urlToImage = require('url-to-image');
      urlToImage('https://qtonix-quiz-admin.vercel.app', 'googlesss.png').then(function() {
          // now google.png exists and contains screenshot of google.com
      }).catch(function(err) {
          console.error(err);
      });


})

const server = app.listen(process.env.PORT || 5000, () =>
  console.log("Port 5000")
);


app.use('/api/exam',Exam);
app.use('/api/quiz',Quiz);
app.use('/api/user',User);


// app.use('/api/user',User);
// app.use('/api/domainsearch',DomainSearch);
// app.use('/api/emailfinder',EmailFinder);
// app.use('/api/emailverifcation',EmailVeriFication);
// app.use('/api/package',Package);
//
//
// var BulkDomainExtract = require('./routes/bulkdomainextract')(io);
// app.use('/api/bulkdomainextract',BulkDomainExtract);
app.use(express.static(path.join(__dirname, "public")));
