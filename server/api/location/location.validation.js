var handleError = function(req, res) {
  var errors = req.validationErrors();
  if (errors) {
    res.status(500).send(errors);
    return false;
  }
  return true;
};

export function createValidation(req, res) {
  return handleError(req, res);
}

export function addLocationValidation(req, res) {
  req.checkParams('trackId', "Please provide a valid trackId").notEmpty().isMongoId();

  req.checkParams('userId', "Please provide a valid userId").notEmpty();

  req.checkBody('lat', 'Please provide a valid latitude').notEmpty()
    .isFloat({
      min : -90,
      max : 90
    });

  req.checkBody('long', 'Please provide a valid longitude').notEmpty()
    .isFloat({
      min : -180,
      max : 180
    });

  req.checkBody('time', "Please provide a valid timestamp").notEmpty().isDate();

  req.checkBody('username', "Please provide a valid username").notEmpty();

  return handleError(req, res);
}
