'use strict';

import mongoose from 'mongoose';


var LocationSchema = new mongoose.Schema({
  trackId : mongoose.Schema.Types.ObjectId,
  route: [{
    loc: [Number], // the coordinates long, lat as an array
    timestamp: Date
  }],
  username: String,
  userId: String,
  currentLocation: [Number],
  currentStreetName : String,
  currentTimestamp : Date,
  distance : Number,   // m
  avgSpeed : Number   // m/s
});

export default mongoose.model('Location', LocationSchema);
