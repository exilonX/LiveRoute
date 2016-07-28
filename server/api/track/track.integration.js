'use strict';

var app = require('../..');
import request from 'supertest';

var newTrack;

describe('Track API:', function() {

  describe('GET /api/tracks', function() {
    var tracks;

    beforeEach(function(done) {
      request(app)
        .get('/api/tracks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tracks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(tracks).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/tracks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tracks')
        .send({
          name: 'New Track',
          info: 'This is the brand new track!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTrack = res.body;
          done();
        });
    });

    it('should respond with the newly created track', function() {
      expect(newTrack.name).to.equal('New Track');
      expect(newTrack.info).to.equal('This is the brand new track!!!');
    });

  });

  describe('GET /api/tracks/:id', function() {
    var track;

    beforeEach(function(done) {
      request(app)
        .get('/api/tracks/' + newTrack._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          track = res.body;
          done();
        });
    });

    afterEach(function() {
      track = {};
    });

    it('should respond with the requested track', function() {
      expect(track.name).to.equal('New Track');
      expect(track.info).to.equal('This is the brand new track!!!');
    });

  });

  describe('PUT /api/tracks/:id', function() {
    var updatedTrack;

    beforeEach(function(done) {
      request(app)
        .put('/api/tracks/' + newTrack._id)
        .send({
          name: 'Updated Track',
          info: 'This is the updated track!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTrack = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrack = {};
    });

    it('should respond with the updated track', function() {
      expect(updatedTrack.name).to.equal('Updated Track');
      expect(updatedTrack.info).to.equal('This is the updated track!!!');
    });

  });

  describe('DELETE /api/tracks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tracks/' + newTrack._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when track does not exist', function(done) {
      request(app)
        .delete('/api/tracks/' + newTrack._id)
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
