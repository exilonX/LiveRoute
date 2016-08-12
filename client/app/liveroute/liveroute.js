'use strict';

angular.module('liverouteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liveroute', {
        url: '/liveroute',
        template: '<liveroute></liveroute>'
      });
  });
