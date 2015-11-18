var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: '' });

});
router.get('*', function(req, res, next) {
  res.render('index', { message: '404,好像出错了' });

});

//处理post表单请求
router.post('/', function(req, res, next) {
  var form = new multiparty.Form({uploadDir: './public/files/',maxFilesSize:10485760});
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log('parse error: ' + err);
      res.json({state:0});//ajax返回值
    } else {
      res.json({state:1});//ajax返回值
      var
          Title=fields.Title[0],
          Name=fields.Name[0],
          Email=fields.Email[0],
          Content=fields.Content[0];
      console.log(Title);
      console.log(Name);
      console.log(Email);
      console.log(Content);
      var inputFile=files.Upload;
      var fileNum=inputFile.length;
      if(inputFile[0].size==0)fileNum=0;//不管是否上传文件，inputFile.length>=1；因此更加文件大小判断该文件是否存在
      console.log(fileNum);

      //重命名为真实文件名
      for(i=0;i<fileNum;i++){
        fs.rename(inputFile[i].path, './public/files/' + inputFile[i].originalFilename, function (err) {
          if (err) {
            console.log('rename error: ' + err);
          } else {
            console.log('rename ok');
          }
        });
      }

//发送邮件模块
      var user="autoapply@ewaybot.com",pass="Ewaybot01";
      var smtpTransport = nodemailer.createTransport({
        service:"QQ",
        auth:{
          user:user,
          pass:pass
        }
      });

      var mailOptions={
        from:"autoapply<"+user+">",
        to:"<pengchongfu@126.com>",
        subject:Title,
        html:'<b>姓名：</b>'+Name+'<br/>'+'<b>邮箱：</b>'+Email+'<br/>'+'<b>内容：</b>'+Content+'<br/>'
      }
      //是否有附件
      if(fileNum!=0) {
        var attOptions=new Array();
        for(i=0;i<fileNum;i++){
          attOptions.push({
            filename: inputFile[i].originalFilename,
            path: './public/files/' + inputFile[i].originalFilename
          })
        }
        mailOptions.attachments=attOptions;
      }

      smtpTransport.sendMail(mailOptions, function (err, res) {
        if (err) {
          return console.log(err, res);
        }
        else{
          //删除临时文件
          for(i=0;i<fileNum;i++){
            fs.unlink('./public/files/' + inputFile[i].originalFilename,function(err){
              if(err){
                console.log('delete err:'+err);
              }else{
                console.log('delete ok');
              }
            });

          }
        }
      });

    }
  });
  });

module.exports = router;