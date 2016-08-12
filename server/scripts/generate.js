var request = require('request');
var route = {"gpx":{"rte":{"name":"Route1","rtept":[{"ele":"86.3","name":"WP01-A","_lat":"44.42068","_lon":"26.06477"},{"ele":"85.7","name":"WP02-B","_lat":"44.42038","_lon":"26.06526"},{"ele":"85.6","name":"WP03-C","_lat":"44.42056","_lon":"26.06589"},{"ele":"85.8","name":"WP04-D","_lat":"44.42103","_lon":"26.06637"},{"ele":"86.1","name":"WP05-E","_lat":"44.42081","_lon":"26.06676"},{"ele":"86.2","name":"WP06-F","_lat":"44.42093","_lon":"26.06703"},{"ele":"85.8","name":"WP07-G","_lat":"44.42128","_lon":"26.06706"},{"ele":"85.8","name":"WP08-H","_lat":"44.42124","_lon":"26.06758"},{"ele":"86.8","name":"WP09-I","_lat":"44.42114","_lon":"26.06792"},{"ele":"86.6","name":"WP10-J","_lat":"44.42166","_lon":"26.06797"},{"ele":"85.9","name":"WP11-K","_lat":"44.42153","_lon":"26.06825"},{"ele":"86","name":"WP12-L","_lat":"44.42163","_lon":"26.06876"},{"ele":"86","name":"WP13-M","_lat":"44.42186","_lon":"26.06916"},{"ele":"86.2","name":"WP14-N","_lat":"44.42214","_lon":"26.0693"},{"ele":"86.3","name":"WP15-O","_lat":"44.42201","_lon":"26.06961"},{"ele":"86.6","name":"WP16-P","_lat":"44.42235","_lon":"26.07011"},{"ele":"86.3","name":"WP17-Q","_lat":"44.42238","_lon":"26.07077"},{"ele":"86.2","name":"WP18-R","_lat":"44.42276","_lon":"26.07099"},{"ele":"86.3","name":"WP19-S","_lat":"44.4227","_lon":"26.07133"},{"ele":"86.2","name":"WP20-T","_lat":"44.423","_lon":"26.07189"},{"ele":"85.8","name":"WP21-U","_lat":"44.42299","_lon":"26.07243"},{"ele":"85.9","name":"WP22-V","_lat":"44.42343","_lon":"26.07314"},{"ele":"85.9","name":"WP23-W","_lat":"44.42343","_lon":"26.07391"},{"ele":"85.5","name":"WP24-X","_lat":"44.42391","_lon":"26.07469"},{"ele":"85.5","name":"WP25-Y","_lat":"44.42415","_lon":"26.07513"},{"ele":"85.5","name":"WP26-Z","_lat":"44.42427","_lon":"26.07558"},{"ele":"85.7","name":"WP27","_lat":"44.42445","_lon":"26.07597"},{"ele":"86.1","name":"WP28","_lat":"44.42476","_lon":"26.07678"},{"ele":"86.8","name":"WP29","_lat":"44.42522","_lon":"26.07764"},{"ele":"86.3","name":"WP30","_lat":"44.42552","_lon":"26.07814"},{"ele":"86","name":"WP31","_lat":"44.42583","_lon":"26.07852"},{"ele":"86.4","name":"WP32","_lat":"44.42628","_lon":"26.07898"},{"ele":"87.3","name":"WP33","_lat":"44.42595","_lon":"26.07908"},{"ele":"85.7","name":"WP34","_lat":"44.42666","_lon":"26.07888"},{"ele":"85.9","name":"WP35","_lat":"44.42689","_lon":"26.07932"},{"ele":"82.2","name":"WP36","_lat":"44.42752","_lon":"26.07934"}]},"_xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","_xmlns":"http://www.topografix.com/GPX/1/1","_version":"1.1","_creator":"http://www.geoplaner.com","_xsi:schemaLocation":"http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"}};
var routePoints = route.gpx.rte.rtept;

for (var i = 0; i < routePoints.length; ++i) {
  function dada(i) {
    setTimeout(function() {
      var obj = {
        "lat" : routePoints[i]._lat,
        "long" : routePoints[i]._lon,
        'time' : new Date(),
        "username" : "user1"
      };

      request({
        url : 'http://localhost:9000/api/locations/5774f31b43365a7c749769c1/100',
        method : 'PUT',
        json : obj
      }, function(err, data) {
        if (err) {
          console.log("Error ", err.message);
          return;
        }
         console.log(data);
      })
    }, i * 1000);

  }

  dada(i);
}



// Step 1 - create a new track

var createTrack = function(obj) {
    request({
        url : 'http://localhost:9000/api/tracks',
        method : 'POST',
        json : obj
    }, function(err, data) {
        if (err) {
            console.log("Error ", err.message);
            return;
        }
        var trackId = data._id;
    })
}

//createTrack({
//    "trackName" : "Ana are mere",
//    "trackInfo" : "Track ana are mere",
//    "public" : true,
//    "users" : [
//        {
//            "username" : "user1",
//            "userId" : 100
//        }],
//    "ownerName" : "user1",
//    "ownerId" : 100
//})

// Step 2 start sending locations
