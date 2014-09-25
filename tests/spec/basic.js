describe('AccountController', function() {  // Jasmine Test Suite
  describe('Account data check', function(){
    
    beforeEach(module('relayr'));
    var accountFactory;



    beforeEach(inject(function($httpBackend, $rootScope, $controller, $injector, $timeout, $q) {
      scope = $rootScope.$new();
      timeout = $timeout;

      var accountFactory = {
      
        getAccountAsync : function(result){
          var deferred = $q.defer();
          scope.account = { id : "horst"};

          deferred.resolve(scope.account);

          return deferred.promise;
          
        }
      }
      console.log(accountFactory.getAccountAsync().promise);
      ctrl = $controller('accountController', {$scope: scope,$rootScope: $rootScope , accountFactory: accountFactory});


    }));


    it('This should return data', function() {

        expect(scope.account.id).toBe("horst")
    });
  });
}); 