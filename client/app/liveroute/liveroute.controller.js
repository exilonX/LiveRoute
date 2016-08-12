'use strict';
(function(){

class LiverouteComponent {

  set mapObject(map) {
    this.map = map;
  }

  constructor($window, NgMap) {
    var self = this;
    this.message = 'Hello';
    this.windowHeight = $window.innerHeight;
    this.mapCoords = [];

    NgMap.getMap().then(function(map) {
      self.map = map;
      self.setMapCenter([26.06286560000001, 44.420996699999996]);
    });
  }

  setMapCenter = function setMapCenter([lng, lat]) {
    var center = new google.maps.LatLng(lat, lng);
    this.map.setCenter(center);
  }

  drawRoute = function drawRoute(coords) {
    //TODO draw the route on the map - request and prepare mapCoords
  }

  addCoords = function addCoords(coords) {
    this.mapCoords = this.mapCoords.concat(coords);
  }
}

angular.module('liverouteApp')
  .component('liveroute', {
    templateUrl: 'app/liveroute/liveroute.html',
    controller: LiverouteComponent
  });

})();
