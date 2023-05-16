async function logoutHandler(){
  const response = await fetch ('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
      document.location.replace('/');   //When successful load the homepage
      alert ('You have logged out!')
  } else {
      alert ('Failed to log out!') //when unsuccessfule, load the homepage 
  }
};
// Add an event listener to the logout button
const logoutButton = document.querySelector('#logout');
if (logoutButton) {
  logoutButton.addEventListener('click', logoutHandler);
}