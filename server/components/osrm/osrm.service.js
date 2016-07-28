import OSRM from './osrm';
import config from '../../config/environment';

export default class SnapToRoad {
  constructor() {
    this.osrm = new OSRM(config.osrm.url);
  }

  osrmErrorHandler(error, response, cb) {
    if (error) {
      console.log("Error osrm ", error.message);
      cb(error);
      return true;
    }

    if (!response) {
      console.log("Error osrm empty response ");
      cb(new Error('Error osrm empty response'));
      return true;
    }

    if(response.code !== 'Ok') {
      console.log('Error osrm response not ok');
      cb(new Error('Error osrm response not ok'));
      return true;
    }

    if (!response.waypoints || response.waypoints.length === 0) {
      console.log('Error osrm waypoints not ok');
      cb(new Error('Error osrm waypoints not ok'));
      return true;
    }

    return false;
  }


  nearestRoad(location, cb) {
    this.osrm.nearest({
      coordinates : [location]
    }, (error, response) => {
      if (this.osrmErrorHandler(error, response, cb))
        return;

      let waypoint = response.waypoints[0];

      let resp = {};
      resp.location = waypoint.location;
      resp.name = waypoint.name;

      return cb(null, resp);
    });
  }

}


