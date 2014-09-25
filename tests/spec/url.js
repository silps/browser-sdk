describe('URL parsing', function(){
 var scope, location = {}; 
 beforeEach(module('relayr'));
    beforeEach(inject(function($httpBackend, $rootScope, $controller, $injector, $timeout, $q) {
      scope = $rootScope.$new();
      $controller('scrapeController', {$scope: scope, $location: location  , userService: {}});
  }));
  var validUrls = [
              "http://localhost:8000/dashboard/scrape?state=123#access_token=6E0ULNdL6lRpD58LzZN0uSy.2ZczQHjv&token_type=Bearer",
              "http://localhost:8000/dashboard/scrape?state=123=#access_token=6E0ULNdL6lRpD58LzZN0uSy.2ZczQHjv&token_type=Bearer",
              "http://localhost:8000/dashboard/scrape?state=123#token_type=Bearer&access_token=6E0ULNdL6lRpD58LzZN0uSy.2ZczQHjv",
              "http://localhost:8000/dashboard/scrape?state=123#access_token=6E0ULNdL6lRpD58LzZN0uSy.2ZczQHjv&=",
              ];

  var invalidUrls = ["http://localhost:8000/dashboard/scrape?state=123"];

  validUrls.forEach(function(url){
    it('should parse token from ' + url, function() {
      location.$$absUrl = url;
      expect(scope.getToken()).toBe("6E0ULNdL6lRpD58LzZN0uSy.2ZczQHjv");
    });    
  });            

  invalidUrls.forEach(function(url){
    it('should parse undefined from ' + url, function() {
        expect(scope.parse(url)).toBe(undefined);
    });    
  });            
});
