describe('main controller', function () {
  beforeEach(module('app'));
  var _scope;
  var _httpBackend;

  beforeEach(inject(function ($controller, $rootScope, EmployeeService, $httpBackend) {
    _scope = $rootScope.$new();
    _httpBackend = $httpBackend;

    $httpBackend.when('GET', "/employees").respond([
      {
        first: 'Abriham',
        last: "Lincoln"
      },
      {
        first: "Andrew",
        last: "Jackson"
      }
    ]);

    $httpBackend.when("POST", "/employees").respond({
      first: "Grover",
      last: "Cleveland"
    });

    $controller("main", {
      $scope: _scope,
      EmployeeService: EmployeeService
    })

  }));

  // Tests
  it ('should disable "add" initially', function () {
    expect(_scope.addDisabled()).to.be.true;
  });

  it ('should allow "add" after firstName and lastName are not empty', function () {
    _scope.firstName = "John";
    _scope.lastName = "Kennedy";
    expect(_scope.addDisabled()).to.be.false;
  });

  it ('should have a list of employees after the http resource is complete.', function () {
    _httpBackend.flush();
    expect(_scope.employees.length).to.equal(2);
  });

  it ('can add an employee to the list and disable the add button afterwards', function () {
    _httpBackend.flush();
    _scope.firstName = "Grover";
    _scope.lastName = "Cleveland";
    _scope.add();
    _httpBackend.flush();
    expect(_scope.employees.length).to.equal(3);

    var result = _scope.employees[2];
    expect(result.first).to.equal("Grover");
    expect(result.last).to.equal("Cleveland");

    expect(_scope.addDisabled()).to.be.true;
  });


});
