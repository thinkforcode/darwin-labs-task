(function(){
  'use strict';

      var AppController = angular.module('AppController',[]);

      AppController.controller('AppController',['$scope','DataServices','$sce','$routeParams','$location',function($scope,DataServices,$sce,$routeParams,$location){
        $scope.user = {};

        $scope.getAllImages = function(user){
          console.log(user);
          var t = user.keyword;

          DataServices._getAllImages(t).then(function(r){
            try{
              if(r.status === 200){
                $scope.allImages = r.data;
                $scope.allImages.forEach(function(img,key){
                  if(img['d'].indexOf('data:text/html; charset=UTF-8;base64,') !== -1){
                      img['d'] = 'data:image/png;base64,'+img['d'].split('data:text/html; charset=UTF-8;base64,')[1];
                  }

                });
                console.log($scope.allImages);
              }
            }catch(e){
              console.log('server error [$scope.getAllImages]'+e);
            }

          })
        }

      }]);

})();
