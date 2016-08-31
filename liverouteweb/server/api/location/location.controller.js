/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/locations              ->  index
 * POST    /api/locations              ->  create
 * GET     /api/locations/:id          ->  show
 * PUT     /api/locations/:id          ->  update
 * DELETE  /api/locations/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import * as async from 'async';
import * as Q from 'q';

import Location from './location.model';
import * as validation from './location.validation';
import * as addService from './location.addservice';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}


// Gets a single Location from the DB
export function show(req, res) {
  return Location.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Updates an existing Location in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Location.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Location from the DB
export function destroy(req, res) {
  return Location.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// ================================================


// ===== Add a location sent from the user
export function addLocation(req, res) {
  console.log(req.body);
  console.log(req.params);
  if (!validation.addLocationValidation(req, res))
    return;

  var info = {
    location : [req.body.long, req.body.lat],
    trackId : req.params.trackId,
    userId : req.params.userId,
    timestamp : req.body.time,
    username : req.body.username
  };

  async.waterfall([
    cb => {
      // check if the location document was initialized
      addService.checkLocationCreated(info, cb);
    },
    (location, cb) => {
      // get the nearest coordinates on a road
      addService.snapLocation(location, info, cb);
    },
    (location, info, cb) => {
      // create the document if it wasn't already created
      addService.createLocationDocument(location, info, cb);
    },
    (location, info, cb) => {
      addService.computeMetrics(location, info, cb);
    },
    (location, info, cb) => {
      addService.updateLocation(location, info, cb);
    }
  ], function(err, result) {
    if (err && err instanceof Error) {
      return handleError(res, 500)(err);
    }

    // If the location udpate triggered an insert then err is
    // instance of mongooseObject and it's the created document
    if (err && !(err instanceof Error)) {
      console.log("Waterfall broke create was triggered");
      return respondWithResult(res)(err);
    }

    // An update was made
    // should notify the clients
    res.status(200).send({response : "Location added"});
  })
}



// ====== End Add a location

// Creates a new Location in the DB
export function create(req, res) {
  return Location.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Gets a list of locations
export function index(req, res) {
  return Location.find()
    .select({
      _id : 1,
      name : 1,
      info : 1,
      active : 1,
      users : 1,
      owner : 1
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// for a specific trackId get all the locations - off all users
export function getTrackLocations(req, res) {
  if (!validation.getTrackLocationsValidation(req, res))
    return;

  var fields = {
    _id : 0,
    userId : 0,
    trackId : 0,
    __v : 0,
    'route._id' : 0
  };

  return Location.find({
    trackId : req.params.trackId
  })
    .select(fields)
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
