'use strict';
(function(){

class TracksComponent {
  constructor($scope, $http) {
    this.$http = $http;
    this.$scope = $scope;
    this.message = 'Hello';
  }

  $onInit() {
    this.$http.get('/api/location')
      .then(response => {
        this.tracks = response.data;

      });
  }
}

angular.module('liverouteApp')
  .component('tracks', {
    templateUrl: 'app/tracks/tracks.html',
    controller: TracksComponent
  });

})();
