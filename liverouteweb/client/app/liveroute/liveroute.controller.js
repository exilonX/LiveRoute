'use strict';
(function(){

class LiverouteComponent {

  set mapObject(map) {
    this.map = map;
  }

  constructor($window, $http, NgMap, socket) {
    var self = this;
    this.message = 'Hello';
    this.windowHeight = $window.innerHeight;
    this.$http = $http;
    this.socket = socket;
    this.mapCoords = [];
    this.mapPath = [];
    this.trackId = '57adaf6369b90f8347981c0f';

    NgMap.getMap().then(function(map) {
      self.map = map;
      //self.setMapCenter([26.06286560000001, 44.420996699999996]);
      self.initMapPath();
    });
  }

  //$onInit() {
  //  this.$http.get('/api/locations/track/' + this.trackId)
  //    .then(response => {
  //      this.extractMapData(response.data[0]);
  //      this.socket.socket.on('location:update:' + this.trackId, (data) => {
  //        //console.log(data);
  //        this.updateMapData(data);
  //      });
  //    });
  //
  //  // register for this track
  //  this.socket.socket.emit('register:track', {
  //    trackId : this.trackId
  //  });
  //}

  initMapPath() {
    this.$http.get('/api/locations/track/' + this.trackId)
      .then(response => {
        console.log("Response: ", response);
        this.extractMapData(response.data[0]);
        this.socket.socket.on('location:update:' + this.trackId, (data) => {
          //console.log(data);
          this.updateMapData(data);
        });
      });

    // register for this track
    this.socket.socket.emit('register:track', {
      trackId : this.trackId
    });
  }

  setMapCenter([lng, lat]) {
    var center = this.getGoogleMapCoordsFromLocation([lng, lat]);
    this.map.setCenter(center);
  }

  extractMapData(trackData) {
    this.extractMapPath(trackData.route);
    this.setMapCenter(trackData.currentLocation);
  }

  extractMapPath(coords) {
    var self = this;
    if (!coords) {
      return console.log("Coordinates could not be loaded")
    } else {
      console.log("Coordinates loaded successfully");
    }
    this.mapPath = _.map(coords, function(coord) {
      return self.getGoogleMapCoordsFromLocation(coord.loc);
    });
  }

  getGoogleMapCoordsFromLocation(location) {
    return new google.maps.LatLng(location[1], location[0]);
  }

  updateMapData(data) {
    this.updateMapCoords(data.currentLocation);
  }

  updateMapCoords(coords) {
    this.mapPath = this.mapPath.concat(coords.loc);
  }
}

angular.module('liverouteApp')
  .component('liveroute', {
    templateUrl: 'app/liveroute/liveroute.html',
    controller: LiverouteComponent
  });

})();
