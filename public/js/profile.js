const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#note-name').value.trim();
  const description = document.querySelector('#note-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/notes`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create note');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('note-id')) {
    const id = event.target.getAttribute('note-id');

    const response = await fetch(`/notes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-note-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.note-list')
  .addEventListener('click', delButtonHandler);
