'use strict';

angular.module('liverouteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tracks', {
        url: '/tracks',
        template: '<tracks></tracks>'
      });
  });
