(function(){

  'use restrict';

  // node server
  var express = require('express');
  var app = express();
  var request = require('request');
  var cheerio = require('cheerio');
  var base64Img = require('base64-img');
  var async = require('async');
  var bodyParser = require('body-parser');
  var mongoose = require('mongoose');
  var configs = require('./configs/configs');


  var redisClient = require('redis').createClient;
  var redis = redisClient(6379, 'localhost');
  var base64Img = require('base64-img');
  var cache_logics = require('./apis/cache_logics');

  app.set('port',process.env.PORT || 8080);

  mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
      // we're connected!
      console.log('open connection')
  });

  app.set('views',__dirname+'/public');
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/public'));

  app.use('pages',express.static(__dirname+'/public/pages'));
  app.use('/img',express.static(__dirname+'/public/assets/img'));
  app.use('css',express.static(__dirname+'/public/assets/css'));
  app.use('js',express.static(__dirname+'/public/assets/js'));

  app.get('*',function(req,response){
      response.render('index.html')
  });

  // require('./apis/GoogleImagesApis')(app,request,redis,cache_logics);

  var searchKeyword = require('./models/SearchKeywords');
  var SearchKeyword = mongoose.model('SearchKeyword',searchKeyword);

  app.get('/getAllImages',function(req,res){
    var image  = req.query.image;
    var allImageUrls = [];
    var url = "https://www.google.com/search?tbm=isch&source=hp&biw=1280&bih=726&ei=hk0YWtDSEsHXvAS9uY2IAw&q="+image+"&oq="+image+"&gs_l=img.3..0l10.8935.9900.0.10141.7.7.0.0.0.0.134.461.0j4.4.0....0...1ac.1.64.img..3.4.461....0.2_VFy89mH4g";
    request.get({
      url:url
    },function(error,response,body){
      try{
        res.send(response.body)
      }catch(e){
        res.send(e);
      }
    });
  });


  app.listen(app.get('port'),function(){
    console.log('all magic happens at port ',app.get('port'));
  });


})();
