function handleCredentialResponse(response) {
  if (response.credential) {
    var credential = response.credential;
    var id_token = credential.id_token;
    // Send the id_token to your server for authentication
    console.log('ID Token: ' + id_token);
  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do something with the user's ID
  console.log('Name: ' + profile.getName()); // Do something with the user's name
  console.log('Email: ' + profile.getEmail()); // Do something with the user's email
  window.location.href = 'departments.html'

  // Construct the credential response object
  var response = {
    credential: {
      id_token: googleUser.getAuthResponse().id_token
    }
  };

  // Handle the credential response
  handleCredentialResponse(response);
}
