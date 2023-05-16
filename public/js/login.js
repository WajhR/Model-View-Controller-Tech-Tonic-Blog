// Handler function for login form submission 
const loginFormHandler = async (event) => {
  event.preventDefault();
// Get the values of hte username and password for input field
  const usernameEl = document.querySelector("#name-login");
  const passwordEl = document.querySelector("#password-login");

  // If input has values. Send post request to login endpoint with input values as JSON data
  if (usernameEl && passwordEl) {

  const response = await fetch ('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({usernameEl,passwordEl}),
      headers: { 'Content-Type': 'application/json' },
  });

 // If the request was successful, redirect to the homepage
  if (response.ok) {
      document.location.replace('/'); 
  } else {
    // If the request was unsuccessful, show an alert
      alert('Failed to log in!')
  }
};
}
const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}