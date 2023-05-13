// Get the post ID from the endpoint
const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

// Click on edit post
const editHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            postId: id,
            title,
            content,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert("Something wrong!");
    }
};

document.querySelector('.edit-form').addEventListener('submit', editHandler);