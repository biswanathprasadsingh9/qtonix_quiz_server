const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const result = require('dotenv').config();
var path = require("path");

const Exam = require('./routes/exam');
const Quiz = require('./routes/quiz');
const User = require('./routes/user');
const Company = require('./routes/company');


process.env.TZ = "Asia/Calcutta";

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


app.get('/testing',async (req,res)=>{

  ss();
  ss();
  ss();
  ss();


})



async function ss(){
  const puppeteer = require('puppeteer');

  (async () => {

    const browser = await puppeteer.launch({headless: false,defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.goto('http://localhost:3000/login');

    await page.type('#email', "admin@admin.com");
    await page.type('#password', "admin@admin.com");
    await page.evaluate(()=>document.querySelector('#submit').click());


    // await page.waitForNavigation();
    // await page.waitFor(5000);

    // await page.waitForNavigation({waitUntil: 'load'})

    await page.waitForFunction(() => document.readyState === "complete");


    let producttype;
    if ((await page.$('#startexam')) !== null) {
      // await page.click('#startexam');
    } else {
      // await page.click('#continueexam');
    }

  })();
}


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

const server = app.listen(process.env.PORT || 5009, () =>
  console.log("Port 5009")
);


app.use('/api/exam',Exam);
app.use('/api/quiz',Quiz);
app.use('/api/user',User);
app.use('/api/company',Company);




app.use(express.static(path.join(__dirname, "public")));
