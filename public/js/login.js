// Handler function for login form submission 
const loginFormHandler = async (event) => {
  event.preventDefault();
// Get the values of hte username and password for input field
  const name = document.querySelector("#name-login").value
  const password = document.querySelector("#password-login").value;

  // If input has values. Send post request to login endpoint with input values as JSON data
  if (name && password) {

  const response = await fetch ('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({name,password}),
      headers: { 'Content-Type': 'application/json' },
  });

 // If the request was successful, redirect to the homepage
  if (response.ok) {
      document.location.replace('/dashboard'); 
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