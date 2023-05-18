const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const posttitle = document.querySelector('#new-posttitle').value.trim();
    const description = document.querySelector('#new-post').value.trim();
  
    if (posttitle && description) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ posttitle, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // When successful, load the dashboard page
      } else {
        alert('Failed to create a new post.'); // When unsuccessful, show alert
      }
    }
  };
  
  // Event listeners
  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', newPostFormHandler);
  }