# The relayr JavaScript SDK

Welcome to the relayr JavaScript SDK. This easy to use JavaScript implementation will allow you to quickly create relayr browser side web applications, start receiving data from your sensors and display the data received in your browser. 
Below is a list of the basic methods included in this SDK.


## Implementing the SDK

In order to start using the SDK all you would need to do is to include the `relayr.js` file in your project:

	<script src="https://developer.relayr.io/relayr-browser-sdk.min.js"></script>

## Using the SDK

### Initializing the SDK 

The following function Initializes the Relayr SDK. It receives two parameters: 
`redirectURI` and `appID`

`Appid`: The ID of your app as it appears in the Developer Dashboard [API-Keys Section](https://developer.relayr.io/dashboard/apps/myApps).<br/>
`redirectUri`: The redirectUri provided on App creation. You may use *http://localhost* for locally-hosted projects. 

	var relayr = RELAYR.init({
	  appId: "YOUR_APP_ID",
	  redirectUri:"YOUR_REDIRECT_URL"
	});


----------


### Checking for the Existence of a Token

This function will check for the existence of a token (stored on your browser). If it does not find a token it will redirect to a Login page and use your `redirectUri` to come back with the token.

The function will recognize the token and automatically call the method `success`.

***success*** is a method called when the login flow is completed. 
(it has an optional token return variable: `success: function(token){}`)

	
	relayr.login({
	  success: function(token){
	  
	  }
	});


----------


### Retrieving a List of Devices

This function will return an array of the devices associated with your account.

**Note**: This function should be called following a successful Login.

	relayr.devices().getAllDevices(function(devices){
	        
	});


----------


### Subscribing to a Device Channel and Receiving Data

This function will subscribe the app to a device channel and start listening to your device. Data will be received into the `incomingData` method.
**Note**: This function needs to be called after a successful Login.

The function receives two variables:
 
`deviceId`: The ID of the device to subscribe to.

`incoingData`: This method is triggered each time the device sends data. 

`token`: (optional) you can pass a token variable you generated from the developer dashboard to subscribe to the device *without having to Log in*. 

	relayr.devices().getDeviceData({
	  deviceId: "YOUR DEVICE ID", 
	  incomingData: function(data){
	
	  }
	}); 


----------


### Retrieving User Properties         

This function returns an object with your user properties.
 
**Note**: This function should be called after a successful Login.

	relayr.user().getUserInfo();


----------
