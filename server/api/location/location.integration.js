'use strict';

var app = require('../..');
import request from 'supertest';

var newLocation;

describe('Location API:', function() {

  describe('GET /api/locations', function() {
    var locations;

    beforeEach(function(done) {
      request(app)
        .get('/api/locations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          locations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(locations).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/locations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/locations')
        .send({
          name: 'New Location',
          info: 'This is the brand new location!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLocation = res.body;
          done();
        });
    });

    it('should respond with the newly created location', function() {
      expect(newLocation.name).to.equal('New Location');
      expect(newLocation.info).to.equal('This is the brand new location!!!');
    });

  });

  describe('GET /api/locations/:id', function() {
    var location;

    beforeEach(function(done) {
      request(app)
        .get('/api/locations/' + newLocation._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          location = res.body;
          done();
        });
    });

    afterEach(function() {
      location = {};
    });

    it('should respond with the requested location', function() {
      expect(location.name).to.equal('New Location');
      expect(location.info).to.equal('This is the brand new location!!!');
    });

  });

  describe('PUT /api/locations/:id', function() {
    var updatedLocation;

    beforeEach(function(done) {
      request(app)
        .put('/api/locations/' + newLocation._id)
        .send({
          name: 'Updated Location',
          info: 'This is the updated location!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLocation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLocation = {};
    });

    it('should respond with the updated location', function() {
      expect(updatedLocation.name).to.equal('Updated Location');
      expect(updatedLocation.info).to.equal('This is the updated location!!!');
    });

  });

  describe('DELETE /api/locations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/locations/' + newLocation._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when location does not exist', function(done) {
      request(app)
        .delete('/api/locations/' + newLocation._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
