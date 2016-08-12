/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tracks              ->  index
 * POST    /api/tracks              ->  create
 * GET     /api/tracks/:id          ->  show
 * PUT     /api/tracks/:id          ->  update
 * DELETE  /api/tracks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Track from './track.model';
import * as validation from './track.validation';
import * as locationController from '../location/location.controller';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Tracks
export function index(req, res) {
  return Track.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Track from the DB
export function show(req, res) {
  return Track.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}



// Updates an existing Track in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Track.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Track from the DB
export function destroy(req, res) {
  return Track.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


// ====================================================
// Not auto generated

// Get a list of all not rejected tracks
export function getMyTracks(req, res) {
  if (!validation.getMyTracksValidation(req, res))
    return;

  var query = {
    users : {
      '$elemMatch' : {
        userId : req.params.userId,
        rejected : false
      }
    }
  };

  return Track.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

// Creates a new Track in the DB
export function create(req, res) {
  if (!validation.createValidation(req, res))
    return;

  var newLocation = req.body;
  newLocation.live = true;

  // confirm that the owner accepted the track
  for (let user of newLocation.users) {
    if (user.username === newLocation.ownerName &&
      user.userId === newLocation.ownerId) {
      user.confirmed = true;
      user.rejected = false;
    } else {
      user.confirmed = false;
      user.rejected = false;
    }
  }

  return Track.create(newLocation)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
