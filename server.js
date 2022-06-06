const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const result = require('dotenv').config();


// const Test = require('./routes/test');
const Exam = require('./routes/exam');
const Quiz = require('./routes/quiz');

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

const server = app.listen(process.env.PORT || 5000, () =>
  console.log("Port 5000")
);


app.use('/api/exam',Exam);
app.use('/api/quiz',Quiz);

// app.use('/api/user',User);
// app.use('/api/domainsearch',DomainSearch);
// app.use('/api/emailfinder',EmailFinder);
// app.use('/api/emailverifcation',EmailVeriFication);
// app.use('/api/package',Package);
//
//
// var BulkDomainExtract = require('./routes/bulkdomainextract')(io);
// app.use('/api/bulkdomainextract',BulkDomainExtract);
