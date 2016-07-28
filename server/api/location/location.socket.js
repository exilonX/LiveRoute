/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import LocationEvents from './location.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  console.log("Registering a new client socket");
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('location:' + event, socket);

    LocationEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }

  socket.on('register:track', registerTrack(socket));
}


function createListener(event, socket) {
  return function(doc) {
    console.log("Event trigger Location ", event);
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    console.log("Removin listener ", event);
    LocationEvents.removeListener(event, listener);
  };
}

function registerTrack(socket) {
  return (data) => {
    console.log("Register client on a track", data.trackId);
    var listener = createListener('location:update:' + data.trackId, socket);

    var event = 'save:' + data.trackId;
    LocationEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}
