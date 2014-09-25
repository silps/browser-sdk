var fakeAjax = function(func){
  var xhr = sinon.useFakeXMLHttpRequest();
  var requests = [];
  xhr.onCreate = function(xhr){ 
    requests.push(xhr);
  }
  try{
    func(requests);
  }
  catch (e){
    throw e;
  }
  finally{
    xhr.restore();
  }
}
var relayrInit = function(){
  return RELAYR.init({appId:"testerAppid", redirectUri:"testerRedirectUri"});
};
var token ="testerToken";

describe('initialization', function(){

  var invalidInput = [undefined,{}, null, "", [],{appId:true}, {appId:""}];
  invalidInput.forEach(function(input){

    it('should throw an error with constructor arg['+ JSON.stringify(input)+']', function() {
      var f = function(){
        RELAYR.init(input);
      };
      
      expect(f).toThrow(new Error("Provide credentials: appId and redirectUri"));

    });          
    
  });  

  var validInputs = [{appId:"37648273648628", redirectUri:"34324234"}];
  validInputs.forEach(function(input){

    it('should initialize with constructor arg['+ JSON.stringify(input)+']', function() {
      var relayr= RELAYR.init(input);
    
      
      expect(typeof relayr.login).toBe("function");

    });          
    
  });
    
});


describe('login', function(){
  
  var invalidInput = [undefined,{}, null, "", []];
  invalidInput.forEach(function(input){
    it('should throw an error if callback success not valid or defined with args['+ JSON.stringify(input)+']', function() {
        var f = function(){
          var relayr = relayrInit();
          relayr.login(input);
        };

    });          
  
  });


  it('should call success method when the token exists in localStorage', function() {
    var relayr = relayrInit();
    var callbackCalled = false;




    localStorage.setItem("relayrToken",token);
    fakeAjax(function(requests){
      relayr.login({
        success: function(){
          callbackCalled = true;
        },
        error: function(){

        }
      });
      expect(requests.length).toBe(1);
      var req= requests[0];
      expect(req.url).toBe("https://api.relayr.io/oauth2/user-info");
      req.respond(200, {}, JSON.stringify({id:"42387492730487324", email:"something@something.com", name:"billybob"}));
    });
    expect(callbackCalled).toBe(true);

  });         



  it('should redirect to the correct oauth login page', function(){
    //spyOn(window.document, 'location');
    var relayr = relayrInit();
    relayr.login.redirect = function(uri){

      this.uri = uri;
    };
    relayr.login({
      success: function(){

      }
    });
    expect(relayr.login.uri).toBe("https://api.relayr.io/oauth2/auth?client_id=testerAppid&redirect_uri=testerRedirectUri&response_type=token&scope=access-own-user-info")
  });


  afterEach(function() {
   localStorage.removeItem("relayrToken")
  });


});

describe('User', function(){
  it('should check if user info returns properties', function(){
    //spyOn(window.document, 'location');
    var relayr = relayrInit();
    var callbackCalled = false;




    localStorage.setItem("relayrToken",token);
    fakeAjax(function(requests){
      relayr.login({
        success: function(){
          callbackCalled = true;
        },
        error: function(){

        }
      });
      expect(requests.length).toBe(1);
      var req= requests[0];
      expect(req.url).toBe("https://api.relayr.io/oauth2/user-info");
      req.respond(200, {}, JSON.stringify({id:"42387492730487324", email:"something@something.com", name:"billybob"}));
      expect(relayr.user().getUserInfo().id).toBeDefined();
      expect(relayr.user().getUserInfo().id).toBe("42387492730487324");
    });
    expect(callbackCalled).toBe(true);
    
  });




  it('should give unauthorized 401 if token is invalid', function(){
    //spyOn(window.document, 'location');
    var relayr = relayrInit();
    var callbackCalled = false;




    localStorage.setItem("relayrToken",token);
    fakeAjax(function(requests){
      relayr.login({
        success: function(){
        },
        error: function(){

          callbackCalled = true;
        }
      });
      expect(requests.length).toBe(1);
      var req= requests[0];
      expect(req.url).toBe("https://api.relayr.io/oauth2/user-info");
      req.respond(401, {}, JSON.stringify({id:"42387492730487324", email:"something@something.com", name:"billybob"}));

    });
    expect(callbackCalled).toBe(true);
    
  });

  afterEach(function() {
   localStorage.removeItem("relayrToken")
  });
});

describe("devices", function(){
  it('device should throw an error when missing the method incomingData', function() {
    var relayr = relayrInit();

    var f = function(){
      relayr.devices().getDeviceData({

      });
    };
      
    expect(f).toThrow(new Error("Provide the method incomingData within your parameters"));

  });
});

/*var relayr = RELAYR.init({
  appId: "50163677-306e-4030-b0fd-0d5035702d9f",
  redirectUri:"http://localhost:8001/jsSDK.html" //this setting must match your app
});

relayr.login({
  //This will check if you have a token stored, if not it will redirect to the Login page and use your redirectUri back to come back with the token.
  //It will recognize the token and automatically call the method below "success"
  success : function(token){
    relayr.devices().getDeviceData({
      deviceId: "ee7e9562-2b95-4c93-a1d3-fdbaaea5c160", 
      token: token,
      incomingData: function(data){
        console.log("lighProx",data);
      }
    });     
  }
});
*/