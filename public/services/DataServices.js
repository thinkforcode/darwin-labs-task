
    var DataServices = angular.module('DataServices',[]);

    DataServices.factory('DataServices',['$http','$q',function($http,$q){
        return{

            _getAllImages:function(params){
                var deferred = $q.defer();

                $http.post('/getAllImages',{params:params})
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(){
                    deferred.reject();
                });

                return deferred.promise;
            }
        }
    }]);
