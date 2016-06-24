'use strict';

angular.module('liverouteApp', ['liverouteApp.auth', 'liverouteApp.admin', 'liverouteApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'pascalprecht.translate'
  ])
  .config(function($urlRouterProvider, $locationProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    // angular translate using static loader files
    $translateProvider.useStaticFilesLoader({
      prefix : '/components/translate/locale-',
      suffix : '.json'
    });

    $translateProvider.preferredLanguage('en');
  });
