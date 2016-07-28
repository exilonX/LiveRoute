'use strict';

import mongoose from 'mongoose';

// informatii de grup
var TrackSchema = new mongoose.Schema({
  trackName: String,
  trackInfo: String,
  live: Boolean,
  public : Boolean,
  users : [{
    username : String,
    userId : String,
    confirmed : Boolean,
    rejected : Boolean
  }],
  ownerName : String,
  ownerId : String
});

export default mongoose.model('Track', TrackSchema);
