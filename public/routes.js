(function(){
  'use strict';

      var TheSun = angular.module('TheSun',["ngRoute","ngSanitize","angular-loading-bar","AppController","DataServices"]);
      
      TheSun.config(function($routeProvider,cfpLoadingBarProvider,$locationProvider) {

          $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
          });

          cfpLoadingBarProvider.includeSpinner = true;

          $routeProvider
              .when("/darwinthesun", {
                  templateUrl : "pages/DarwinTheSun.html",
                  controller:'AppController'
              })
      });


})();
