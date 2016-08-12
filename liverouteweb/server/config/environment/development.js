'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/liveroute-dev'
  },

  osrm : {
    url : 'http://localhost:5000'
  },

  // Seed database on startup
  seedDB: true

};
