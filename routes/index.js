var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

//处理post表单请求
router.post('/', function(req, res, next) {
  var form = new multiparty.Form({uploadDir: './public/files/'});
  form.parse(req, function(err, fields, files) {
    var fieldsTmp = JSON.stringify(fields, null, 2);
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      //console.log(fieldsTmp);
      var
          Title=fields.Title[0],
          Name=fields.Name[0],
          Email=fields.Email[0],
          Content=fields.Content[0];
      console.log(Title);
      console.log(Name);
      console.log(Email);
      console.log(Content);




      //console.log('parse files: ' + filesTmp);
      var inputFile = files.Upload[0];
      //console.log(inputFile);
      var uploadedPath = inputFile.path;
      var dstPath = './public/files/' + inputFile.originalFilename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function (err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });


//发送邮件模块
      var user="autoapply@ewaybot.com",pass="Ewaybot01";
      var smtpTransport = nodemailer.createTransport({
        service:"QQ",
        auth:{
          user:user,
          pass:pass
        }
      });
      smtpTransport.sendMail({
        from:"autoapply<"+user+">",
        to:"<pengchongfu@126.com>",
        subject:Title,
        html:'<b>姓名：</b>'+Name+'<br/>'+'<b>邮箱：</b>'+Email+'<br/>'+'<b>内容：</b>'+Content+'<br/>',
        attachments:[{
          filename:inputFile.originalFilename,
          path:dstPath
        }]
      },function(err,res){
        if(err){
          return console.log(err,res);
        }
      });


    }
  });


  res.render('index', { title: 'Express' });

});

module.exports = router;