describe('localStorage token', function(){
 var scope, location = {}; 
 beforeEach(module('relayr'));
  
  setToken();

  function setToken(){
    localStorage.setItem("clientToken", "sometoken");

  }


  function getToken(){
    var token = localStorage.getItem('clientToken')
    if (token.length > 0){
      return token;
    }else{
      return undefined;
    }
  }



  it('Should be defined', function() {
    expect(getToken()).toBeDefined();
  });    
                     
});
