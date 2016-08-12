'use strict';

describe('Component: LiverouteComponent', function () {

  // load the controller's module
  beforeEach(module('liverouteApp'));

  var LiverouteComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LiverouteComponent = $componentController('LiverouteComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
