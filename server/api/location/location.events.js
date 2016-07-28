/**
 * Location model events
 */

'use strict';

import {EventEmitter} from 'events';
import Location from './location.model';
var LocationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LocationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Location.schema.post(e, emitEvent(event));
}

function essentialData(doc) {
  var esDoc = {};
  var esProp = ['trackId', 'username', 'distance', 'avgSpeed', 'currentStreetName', 'currentLocation'];
  for (var i = 0; i < esProp.length; ++i) {
    var prop = esProp[i];
    esDoc[prop] = doc[prop];
  }
  return esDoc;
}

function emitEvent(event) {
  return function(doc) {
    // ar trebui prelucrat doc !!!!
    console.log("Dau emit cu ", essentialData(doc));

    //LocationEvents.emit(event + ':' + doc._id, doc);
    //LocationEvents.emit(event, doc);
    LocationEvents.emit(event + ':' + doc.trackId, essentialData(doc));
  }
}

export default LocationEvents;
