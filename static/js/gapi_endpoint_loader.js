/* Define a list of endpoints on our google backend that we will load in using google client js lib */
var endpoints = {
	'main_endpoint'	: {version: "v1"},
};

/* Declare GapiController as a wrapper for encapsulating the functionality that gapi provides, also make it portable so other apps can use it */
function GapiController(endpoints) {
	this.endpoints 			= endpoints;
	this.endpointsKeys		= Object.keys(endpoints);
	this.endpointsLength 	= this.endpointsKeys.length;
	this.gapiClient 		= gapi.client;
	this.rootPath 			= '//' + window.location.host + '/_ah/api';

	//this.loadEndpointsAsync();
	this.loadEndpointsSync(0);
}

/* Setting the api key is for restricting access to certain websites */
GapiController.prototype.setApiKey = function(key) {
	this.gapiClient.setApiKey(key);
}

/* Here we load in the endpoints in Asynchronously */
GapiController.prototype.loadEndpointsAsync = function() {

	var currentVersion;
	var counter = 0;
	var endpointKey;
	var self = this;

	for (endpointKey in this.endpoints) {
		currentVersion = this.endpoints[endpointKey].version;

		(function(endpoint, currentVersion) {
			self.gapiClient.load(endpoint, currentVersion, function() {
	        	log(endpoint + " has been loaded");
	        	counter++;
	        	if (counter === self.endpointsLength) {
	        		log("Done loading endpoints asynchronously, bootstrapping angular to the document");
	        		angular.bootstrap(document, ["swdnP2App"]);
	        	}
	    	}, self.rootPath);
		})(endpointKey, currentVersion)

	}
}

/* Here we load in the endpoints in order synchronously using a little recursion */
GapiController.prototype.loadEndpointsSync = function(counter) {

	if (counter === this.endpointsLength) {
		log("Done loading endpoints synchronously... stopping recursion, bootstrapping angular to the document");
	    angular.bootstrap(document, ["swdnP2App"]);
		return;
	}

	var currentEndpoint = this.endpointsKeys[counter];
	var currentVersion 	= this.endpoints[currentEndpoint].version;
	var self = this;

	this.gapiClient.load(currentEndpoint, currentVersion, function() {
		log(currentEndpoint + " is loaded");
		counter++;
		return self.loadEndpointsSync(counter);
	}, this.rootPath);
}

/* Called Once the Google JS Client lib has loaded*/
function init() {
	// window.gapiController = new GapiController(endpoints);
}