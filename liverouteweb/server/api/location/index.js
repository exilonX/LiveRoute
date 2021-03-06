'use strict';

var express = require('express');
var controller = require('./location.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/track/:trackId', controller.getTrackLocations);
router.post('/', controller.create);
router.put('/:trackId/:userId', controller.addLocation);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
