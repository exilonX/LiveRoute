/**
 * Track model events
 */

'use strict';

import {EventEmitter} from 'events';
import Track from './track.model';
var TrackEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TrackEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Track.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TrackEvents.emit(event + ':' + doc._id, doc);
    TrackEvents.emit(event, doc);
  }
}

export default TrackEvents;
