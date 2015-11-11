var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  var
      Title=req.query.Title,
      Name=req.query.Name,
      Email=req.query.Email,
      Content=req.query.Content;
  console.log(Title);
  console.log(Name);
  console.log(Email);
  console.log(Content);
  res.render('index', { title: 'Express' });

});

//处理post表单请求
router.post('/', function(req, res, next) {
  var
      Title=req.body.Title,
      Name=req.body.Name,
      Email=req.body.Email,
      Content=req.body.Content;
  console.log(Title);
  console.log(Name);
  console.log(Email);
  console.log(Content);

  var user="autoapply@ewaybot.com",pass="Ewaybot01";
  var smtpTransport = nodemailer.createTransport({
    service:"QQ",
    auth:{
      user:user,
      pass:pass
    }
  });
  smtpTransport.sendMail({
    from:"彭崇甫<"+user+">",
    to:"<pengchongfu@126.com>",
    subject:Title,
    html:'<b>姓名：</b>'+Name+'<br/>'+'<b>邮箱：</b>'+Email+'<br/>'+'<b>内容：</b>'+Content+'<br/>'
  },function(err,res){
    if(err){
      return console.log(err,res);
    }
  });
  res.render('index', { title: 'Express' });

});

module.exports = router;
