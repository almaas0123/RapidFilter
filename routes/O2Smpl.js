// Get the access token object.
var credentials = {
    clientID: 'a8dx216po0ikwmo19tchng8h4os09wc',
    clientSecret: 'lhtw7adzr5m10zl9b0yb3j4bpqmk2c6',
    site: 'api.bigcommerce.com'
};

// Initialize the OAuth2 Library
var oauth2 = require('simple-oauth2')(credentials);
var token;
var tokenConfig = {
    redirect_uri: 'http://localhost:3000/callback'
};

// Callbacks
// Get the access token object for the client
oauth2.client.getToken(tokenConfig, function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
});


// Promises
// Get the access token object for the client
oauth2.client
    .getToken(tokenConfig)
    .then(function saveToken(result) {
        token = oauth2.accessToken.create(result);
        console.log(token)
    })
    .catch(function logError(error) {
        console.log('Access Token error', error.message);
    });