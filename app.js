var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var map = require('./routes/map');
var wxjssdktest = require('./routes/wxjssdktest');

var app = express();

var wechat = require('wechat');

var config = {
  token: 'lizikuan',
  appid: 'wx320b9a84f8322df4'
};

app.use(express.query());
app.use('/', wechat(config, function (req, res, next) {
  // ΢��������Ϣ����req.weixin��
  var message = req.weixin;
  if (message.FromUserName === 'diaosi') {
    // �ظ���˿(��ͨ�ظ�)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //��Ҳ���������ظ�text���͵���Ϣ
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // �ظ�һ������
    res.reply({
      type: "music",
      content: {
        title: "�������ְ�",
        description: "һ������",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // �ظ��߸�˧(ͼ�Ļظ�)
    res.reply([
      {
        content: JSON.stringify(message),
        type: 'text'
        //title: "You said: " + JSON.stringify(message),
        //description: 'hello world',
        //picurl: "http://img3.douban.com/lpic/s9117507.jpg",
        //url: "http://52.27.77.52/wxjssdktest/"
      }
    ]);
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/map', map);
app.use('/wxjssdktest', wxjssdktest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
