(function(){
  'use strict';
  var cheerio = require('cheerio');
  var async = require('async');
  var base64Img = require('base64-img');


  module.exports = function(app,request){
    app.post('/getAllImages',function(req,res){
      var image  = req.params.image;
      var allImageUrls = [];
      var url = "https://www.google.com/search?tbm=isch&source=hp&biw=1280&bih=726&ei=hk0YWtDSEsHXvAS9uY2IAw&q="+image+"&oq="+image+"&gs_l=img.3..0l10.8935.9900.0.10141.7.7.0.0.0.0.134.461.0j4.4.0....0...1ac.1.64.img..3.4.461....0.2_VFy89mH4g";
      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html);
              $('img').each(function(o,k){
                var t = $(k).attr('src');
                if(t !== undefined && t !== null && t !== "undefined"){
                  allImageUrls.push({
                    imgUrl:$(k).attr('src')
                  });
                }
              });
              var allImageData = [];
              async.each(allImageUrls,function(item,callback){
                var imgData = {};
                base64Img.requestBase64(item.imgUrl, function(err, res, body) {
                    if(err){
                      callback(error);
                    }else{
                      imgData['url'] = item.imgUrl;
                      imgData['d'] =body;
                      allImageData.push(imgData);
                      callback(null, imgData);
                    }
                });
              },function(err){
                if(err){
                  console.log('A element failed to process', err)
                  res.status(500).json(err)
                }else{
                  console.log('All elements have been processed successfully')
                  // array with the results of each removeTodo job
                  res.status(200).json(allImageData)
                }
              });
          }
      });

    });

    // store the search keywords in SearchKeyword models
    app.post('/storeSearchKeyword',function(req,res){

    });

    app.post('/getSearchKeywords',function(req,res){

    });


    app.post('/delSearchKeywords',function(req,res){

    })


  }

})();
