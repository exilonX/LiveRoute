'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.tracks = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit() {
      this.$http.get('/api/locations')
        .then(response => {
          this.tracks = response.data;
          //this.socket.syncUpdates('thing', this.awesomeThings);
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/locations', {
          name: this.newThing,
          info : this.newThing,
          users : [{
            username : 'ana',
            userId : 1
          },
            {
              username : 'banana',
              userId : 2
            }]
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/locations/' + thing._id);
    }
  }

  angular.module('liverouteApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
