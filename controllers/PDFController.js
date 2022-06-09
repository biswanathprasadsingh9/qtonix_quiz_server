const response = require('express');

// INDEX
const index = (req,res) => {

    var pdf = require("pdf-creator-node");
    // var pdf = require("../index");
    var fs = require("fs");
    var path = require("path");
    // Read HTML Template
    var html = fs.readFileSync(path.join(__dirname, "../pdf_templete/templetetest.html"), "utf8");

    var options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
    };

    var users = [
      {
        name: "Shyam",
        age: "26",
      },
      {
        name: "Navjot",
        age: "26",
      },
      {
        name: "Vitthal",
        age: "26",
      },
    ];


    //INVOICE NUMBER
    var d = new Date();
    var n = d.valueOf();

    var invoice_number = 'EX'+n;






    var document = {
      html: html,
      data: {
        name:'Biswnath Prasad Singh'
      },
      path: "./public/pdf/" + invoice_number + ".pdf",
      type: "pdf", // "stream" || "buffer" || "" ("" defaults to pdf)
    };

    console.log(document);
    pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });


  // res.json({
  //   response:true
  // })
}

module.exports={index};
