const editPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to updtate post');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editPostHandler);

document
  .querySelector('.edit-post-form')
  .addEventListener('click', delButtonHandler);