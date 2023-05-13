const newpostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;

  const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
          title,
          content,
      }),
      headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert('Failed to create a post!');
  }
};

document.querySelector('#newpost-form').addEventListener('submit', newpostFormHandler);
  
const delButton = document.querySelector('#del-post-btn');
const postId = document.querySelector('input[name="post-id"]').value;

const deleteHandler = async () => {
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

if(delButton!=null){
    delButton.addEventListener('click', deleteHandler);
}