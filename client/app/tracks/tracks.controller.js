'use strict';
(function(){

class TracksComponent {
  constructor($scope, $http, socket) {
    this.$http = $http;
    this.$scope = $scope;
    this.message = 'Hello';
    this.socket = socket;
    this.trackId = '5774f31b43365a7c749769c1';
    this.track = [];
  }

  $onInit() {
    this.$http.get('/api/locations/track/' + this.trackId)
      .then(response => {
        this.track = response.data;
        this.socket.socket.on('location:update:' + this.trackId, (data) => {
          console.log(data);
          this.update(data);
        });
      });

    // register for this track
    this.socket.socket.emit('register:track', {
      trackId : this.trackId
    });
  }

  updateMap(data) {
    // TODO redraw the map with the new location
  }

  updateTrack(data) {
    // TODO Update the track array for the specific user

    var toPush = {
      loc : data.currentLocation,
      timestamp : data.currentTimestamp
    };


    for (let tr of this.track) {
      if (tr.username == data.username) {
        tr.route.push(toPush);
      }
    }
  }

  update(data) {
    this.updateMap(data);
    this.updateTrack(data);
  }


}

angular.module('liverouteApp')
  .component('tracks', {
    templateUrl: 'app/tracks/tracks.html',
    controller: TracksComponent
  });

})();
