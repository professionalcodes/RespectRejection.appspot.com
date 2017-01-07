
var config = {
    apiKey: "AIzaSyBsxkqcDK_fqEIf_Oja3MOod8L3YIhu4Fw",
    authDomain: "respectrejection.firebaseapp.com",
    databaseURL: "https://respectrejection.firebaseio.com",
    storageBucket: "respectrejection.appspot.com",
    messagingSenderId: "746933029039"
};

firebase.initializeApp(config);

function Firebase() {}

Firebase.prototype.login = function(provider) {
	firebase.auth().signInWithPopup(provider).then(function(result){
		var token = result.credential.accessToken;
		var user = result.user;

	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
};

Firebase.prototype.logout = function() {
	firebase.auth().signout().then(function() {

	}, function(error) {
		log(error);
	})
};

Firebase.prototype.handleGoogle = function() {
	var googleProvider = new firebase.auth.GoogleAuthProvider();
	this.login(googleProvider);	
};

Firebase.prototype.handleFacebook = function() {
	var facebookProvider = new firebase.auth.FacebookAuthProvider();
	this.login(facebookProvider);
};

Firebase.prototype.handleTwitter = function() {
	var twitterProvider = new firebase.auth.TwitterAuthProvider();
	this.login(twitterProvider);
};

Firebase.prototype.handleGithub = function() {
	var githubProvider = new firebase.auth.GithubAuthProvider();
	this.login(githubProvider);
};

var FirebaseHandler = new Firebase();
