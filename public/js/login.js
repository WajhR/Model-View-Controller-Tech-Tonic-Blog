const loginFormHandler = async (event) => {
  event.preventDefault();

  const usernameEl = document.querySelector("#username-login");
  const passwordEl = document.querySelector("#password-login");

  const response = await fetch ('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
          username: usernameEl.value,
          password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/dashboard'); 
  } else {
      alert('Something wrong!')
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
  
  const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            username, 
            password,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Something wrong!');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);