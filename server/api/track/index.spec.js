'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var trackCtrlStub = {
  index: 'trackCtrl.index',
  show: 'trackCtrl.show',
  create: 'trackCtrl.create',
  update: 'trackCtrl.update',
  destroy: 'trackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var trackIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './track.controller': trackCtrlStub
});

describe('Track API Router:', function() {

  it('should return an express router instance', function() {
    expect(trackIndex).to.equal(routerStub);
  });

  describe('GET /api/tracks', function() {

    it('should route to track.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'trackCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/tracks/:id', function() {

    it('should route to track.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'trackCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/tracks', function() {

    it('should route to track.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'trackCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/tracks/:id', function() {

    it('should route to track.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'trackCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tracks/:id', function() {

    it('should route to track.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'trackCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tracks/:id', function() {

    it('should route to track.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'trackCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
