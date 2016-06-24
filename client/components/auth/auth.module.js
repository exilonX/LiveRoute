'use strict';

angular.module('liverouteApp.auth', ['liverouteApp.constants', 'liverouteApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
