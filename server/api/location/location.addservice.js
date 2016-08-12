import _ from 'lodash';

import Location from './location.model';
import SnapToRoad from '../../components/osrm/osrm.service';
import geolib from "geolib";

// 1. Check if the location document is created
export function checkLocationCreated(info, cb) {
  let query = {
    trackId : info.trackId,
    userId : info.userId
  };

  return Location.findOne(query, cb);
}

// 2. Snap the location to a road using osrm
export function snapLocation(location, info, cb) {
  let snapToRoad = new SnapToRoad();
  snapToRoad.nearestRoad(info.location, (error, osrmResponse) => {
    if (error)
      return cb(error);

    info.location = osrmResponse.location;
    info.streetName = osrmResponse.name;

    return cb(null, location, info);
  })
}


// 3. Create the location document if it wasn't created
export function createLocationDocument(location, info, cb) {
  if (!location) {
    // the location was sent for the first time
    // create the location document
    var newLocation = {
      trackId : info.trackId,
      route : [{
        loc : info.location,
        timestamp : info.timestamp
      }],
      username : info.username,
      userId : info.userId,
      currentLocation : info.location,
      currentStreeName : info.name,
      distance : 0,
      avgSpeed : 0
    };

    Location.create(newLocation, function(err, location) {
      if (err) {
        return cb(err);
      }
      return cb(location);
    })
  } else {
    return cb(null, location, info);
  }
}

// Helper function to convert osrm coordinates to geolib
function buildGeolibCoords(osrmCoords) {
  return {
    latitude : osrmCoords[1],
    longitude : osrmCoords[0]
  }
}

// 4. Compute the total distance by adding to the total distance
// the distance between the last two coordinates
export function computeMetrics(location, info, cb) {
  if (location.route.length > 0) {
    let start = buildGeolibCoords(location.currentLocation);
    let end = buildGeolibCoords(info.location);

    let distance = geolib.getDistance(start, end);
    console.log("Geolib distance ", start, end, distance);
    let totalDistance = location.distance + distance;

    let t0 = (new Date(location.route[0].timestamp)).getTime();
    let totalTime = (new Date(info.timestamp)).getTime() - t0; // time in seconds


    let avgSpeed = 0;
    if (totalDistance > 0)
      avgSpeed = totalDistance / (1.0 * totalTime); // avg speed in m/s

    avgSpeed = 3.6 * avgSpeed; // avg speed in km/h

    location.distance = totalDistance;
    location.avgSpeed = avgSpeed;
  }

  return cb(null, location, info);
}


// 5. Update the document with the new information

export function updateLocation(location, info, cb) {
  console.log(location);
  location.route.push({
    loc : info.location,
    timestamp : info.timestamp
  });

  location.currentLocation = info.location;
  location.currentStreetName = info.streetName;
  location.currentTimestamp = info.timestamp;

  location.save(cb);
}
