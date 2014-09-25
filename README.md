# The relayr JavaScript SDK

Welcome to the relayr JavaScript SDK. This easy to use JavaScript implementation will allow you to quickly create relayr browser side web applications, start receiving data from your sensors and display the data received in your browser. 
Below is a list of the basic methods included in this SDK.

## Basic Methods

### Using the SDK

In order to start using the SDK all you would need to do is to include the `relayr.js` file in your project:

	<script src="/assets/scripts/relayr.js"></script>

### Initialization 

//Initialize the Relayr SDK, you must give a RedirectURI and AppID
//To initialize the Relayr Library you must pass atleast 2 parameters. 
//**Appid: The name of your app id which you can create on the developer dashboard. 
//**redirectUri: You must provide the same redirectUri that you  provided on the app. You can use http://localhost for local projects. 

	var relayr = RELAYR.init({
	  appId: "YOUR_APP_ID",
	  redirectUri:"YOUR_REDIRECT_URL"
	});

### Check for Token

//This will check if you have a token stored, if not it will redirect to the Login page and use your redirectUri back to come back with the token.
//It will recognize the token and automatically call the method succes
//**success: a method called when your login flow has completed. (it has an optional token return variable: 

	success: function(token){})
	relayr.login({
	  success: function(token){
	  
	  }
	});

### Return a List of Devices

//This will return an array of the devices associated with your account.
//Important: You need to call this function after you have successfully logged in.

	relayr.devices().getAllDevices(function(devices){
	        
	});

### Subscribe to a Device Channel and Receive Data

//This will subscribe and start listening to your device. You will recieve data within the incomingData method
//Important: You need to call this function after you have successfully logged in.
//**deviceId: You must prodive the id of the device that you want to subscribe to
//**incoingData: this method is triggered everytime the device sends data from the Wunderbar, you will get continious data coming in.
//**token: (optional) you can pass a token variable you generated from the developer dashboard to subscribe to the device without Loging in. When using the token variable you dont need to login.

	relayr.devices().getDeviceData({
	  deviceId: "YOUR DEVICE ID", 
	  incomingData: function(data){
	
	  }
	}); 

### Return User Properties         

//This will return an object with your user properties. 
//Important: You need to call this function after you have successfully logged in.

	relayr.user().getUserInfo();