'use strict';


var handleError = function(req, res) {
  var errors = req.validationErrors();
  if (errors) {
    res.status(500).send(errors);
    return false;
  }
  return true;
};

export function createValidation(req, res) {
  req.checkBody('trackName', 'Please provide a valid trackname').notEmpty().isLength({
    min : 5,
    max : 50
  });

  req.checkBody('trackInfo', 'Please provide valid info').optional().isLength({
    max : 250
  });

  req.checkBody('users', 'Please provide valid users').isLength({
    min : 1,
    max : 500
  });

  req.checkBody('ownerName', "Please provide a valid ownerName").notEmpty().isAlphanumeric();

  //req.checkBody('ownerId', 'Please provide a valid ownerId').notEmpty().isMongoId();

  req.checkBody('public', 'Please provide a valid ownerId').notEmpty().isBoolean();

  return handleError(req, res);
}

export function getMyTracksValidation(req, res) {
  //req.checkParams('userId', "Please provide a valid userId").notEmpty().isMongoId();
  req.checkParams('userId', "Please provide a valid userId").notEmpty();

  return handleError(req, res);
}
