'use strict';

describe('Component: TracksComponent', function () {

  // load the controller's module
  beforeEach(module('liverouteApp'));

  var TracksComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TracksComponent = $componentController('TracksComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
