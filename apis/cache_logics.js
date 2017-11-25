(function(){
  'use strict';

  module.exports = {
    serveImage:function(params,base64Img,redis,callback){
      redis.get(params.imgUrl,function(err,reply){
        if(err){
          callback(null);
        }else if(reply){
          //console.log('img serving from cahce');
          callback(reply);
        }else{
          request.head(params.imgUrl,function(err,res,body){
            if(err){
              callback(null)
            }else{
                redis.set(params.imgUrl,body,function(){
                    callback(body);
                });
            }
          });
        }
      })
    }
  }
})();
